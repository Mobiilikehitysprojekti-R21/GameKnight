import { UserRepository } from '../../domain/repositories/UserRepository';
import axios from 'axios';
import { User } from '../../domain/entities/User';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Location } from '../../domain/entities/Location';
import { authFetch } from './authFetch';
/*
    - UserApiRepository handles HTTP requests to the backend
    - Implements the UserRepository interface from the domain layer
*/

type AccessTokenProvider = () => Promise<string | null>;

export class UserApiRepository implements UserRepository {
  private apiUrl = Constants.expoConfig?.extra?.API_URL;

  constructor(private getAccessToken?: AccessTokenProvider) { }

  // Checks if nickname is available
  async validateNickname(nickname: string): Promise<boolean> {
    console.log('userapirepo: validateNickname', nickname);

    // If a token provider was supplied, use authenticated fetch
    if (this.getAccessToken) {
      const res = await authFetch(this.getAccessToken, `${this.apiUrl}/users/validateNickname`, {
        method: 'POST',
        body: JSON.stringify({ nickname }),
      });

      if (!res.ok) {
        console.error('validateNickname failed', res.status, await res.text());
        throw new Error(`validateNickname failed: ${res.status}`);
      }

      const data = await res.json();
      return data === true;
    }

    // Fallback: unauthenticated axios call
    try {
      const response = await axios.post(`${this.apiUrl}/users/validateNickname`, { nickname });
      return response.data === true;
    } catch (e) {
      console.error('axios error:', e);
      throw e;
    }
  }

  // Sign up user and store in the database
  async signUp(user: User): Promise<void> {
    console.log('rekisteröidytään....'); // debugging...
    await axios.post(`${this.apiUrl}/users/`, user);
  }

  // Sign in user and store locally
  async signIn(user: User): Promise<void> {
    try {
      await AsyncStorage.setItem('email', user.email);
      await AsyncStorage.setItem('nickname', user.nickname);
    } catch (e: any) {
      console.error('Error storing data', e.response?.data);
      console.error('Status:', e.response?.status);
      throw e;
    }
  }

  // Update user´s nickname
  async changeNickname(nickname: string, auth0_id: string): Promise<void> {
    try {
      console.log('UserApiRepo ennen kutsua: changeNickname');
      if (this.getAccessToken) {
        const res = await authFetch(this.getAccessToken, `${this.apiUrl}/users/updateNickname`, {
          method: 'PATCH',
          body: JSON.stringify({ nickname, auth0_id }),
        });

        if (!res.ok) {
          console.error('changeNickname failed', res.status, await res.text());
          throw new Error(`changeNickname failed: ${res.status}`);
        }
      } else {
        await axios.patch(`${this.apiUrl}/users/updateNickname`, { nickname, auth0_id });
      }
      console.log('UserApiRepossa: nick ja auth0: ', nickname, auth0_id);
    } catch (e: any) {
      console.error('changeNickname axios error', e.response?.data);
      console.error('Status:', e.response?.status);
      throw e;
    }
  }
  async getFavoriteLocations(userId: number): Promise<Location[]> {
    if (this.getAccessToken) {
      const res = await authFetch(this.getAccessToken, `${this.apiUrl}/users/${userId}/favorite-locations`);
      if (!res.ok) {
        throw new Error(`Failed to get favorite locations: ${res.status}`);
      }
      return (await res.json()) as Location[];
    }

    const response = await axios.get(`${this.apiUrl}/users/${userId}/favorite-locations`);

    return response.data;
  }

  async addFavoriteLocation(
    userId: number,
    location: {
      name: string;
      latitude: number;
      longitude: number;
    }
  ): Promise<void> {
    if (this.getAccessToken) {
      const res = await authFetch(this.getAccessToken, `${this.apiUrl}/users/${userId}/favorite-locations`, {
        method: 'POST',
        body: JSON.stringify(location),
      });

      if (!res.ok) {
        throw new Error(`Failed to add favorite location: ${res.status}`);
      }
      return;
    }

    await axios.post(`${this.apiUrl}/users/${userId}/favorite-locations`, location);
  }
}
