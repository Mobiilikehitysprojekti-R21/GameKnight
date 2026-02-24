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
    if (this.getAccessToken) {
      const res = await authFetch(this.getAccessToken, `${this.apiUrl}/users/`, {
        method: 'POST',
        body: JSON.stringify(user),
      });

      if (!res.ok) {
        const body = await res.text();
        // If user already exists, data is not stored in db, login is done instead
        if (res.status === 409) {
          console.warn('User already exists (409) during signUp — continuing login');
          return;
        }

        console.error('signUp failed:', res.status, body);

        throw new Error(`Signup failed: ${res.status}`);
      }

      return;
    }
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

  // Fetch user data from database
  async fetchUser(auth0_id: string): Promise<User | null> {
    try {
      if (this.getAccessToken) {
        const res = await authFetch(this.getAccessToken, `${this.apiUrl}/users/fetchUserNickname`, {
          method: 'POST',
          body: JSON.stringify({ auth0_id }),
        })

        if (!res.ok) {
          console.error('fetchUser failed', res.status, await res.text())
          return null
        }

        const data = await res.json()
        return data as User
      }

      // Fallback to axios if no token provider
      const response = await axios.post(`${this.apiUrl}/users/fetchUserNickname`, { auth0_id })
      return response.data as User
    } catch (e) {
      console.error('fetchUser error', e)
      return null
    }
  }

  // Delete user
  async deleteUser(auth0_id: string): Promise<void> {
    if (this.getAccessToken) {
      const res = await authFetch(this.getAccessToken, `${this.apiUrl}/users/${auth0_id}`, {
        method: "DELETE"
      })
      if (!res.ok) {
        const body = await res.text();
        console.error('delete user failed:', res.status, body);

        throw new Error(`Delete user failed: ${res.status}`);
      }
      return
    }
  }
  
// Maps response data to ensure consistent Location format with normalized ID
  async getFavoriteLocations(userId: number): Promise<Location[]> {
    let data: Array<{ location_id?: number; id?: number; label?: string; name?: string; latitude: number; longitude: number }>;

    if (this.getAccessToken) {
      const res = await authFetch(this.getAccessToken, `${this.apiUrl}/users/${userId}/favorite-locations`);
      if (!res.ok) {
        throw new Error(`Failed to get favorite locations: ${res.status}`);
      }
      data = (await res.json()) as Array<{ 
        location_id?: number; 
        id?: number; 
        label?: string; 
        name?: string; 
        latitude: number; 
        longitude: number }>;
    } else {
      const response = await axios.get(`${this.apiUrl}/users/${userId}/favorite-locations`);
      data = response.data as Array<{ 
        location_id?: number; 
        id?: number; 
        label?: string; 
        name?: string; 
        latitude: number; 
        longitude: number }>;
    }

    return data.map(item => ({
      id: item.location_id ?? item.id,
      label: item.label ?? item.name ?? "",
      latitude: item.latitude,
      longitude: item.longitude,
    }));
  }

  async addFavoriteLocation(
    userId: number,
    location: {
      label: string;
      latitude: number;
      longitude: number;
    }
  ): Promise<{ id: number; label: string; latitude: number; longitude: number }> {
    if (this.getAccessToken) {
      const res = await authFetch(this.getAccessToken, `${this.apiUrl}/users/${userId}/favorite-locations`, {
        method: 'POST',
        body: JSON.stringify({
          name: location.label,
          latitude: location.latitude,
          longitude: location.longitude,
        }),
      });

      if (!res.ok) {
        throw new Error(`Failed to add favorite location: ${res.status}`);
      }
      
      const data = await res.json();
      return {
        id: data.location_id || data.id,
        label: data.name || location.label,
        latitude: data.latitude,
        longitude: data.longitude,
      };
    }

    const response = await axios.post(`${this.apiUrl}/users/${userId}/favorite-locations`, {
      name: location.label,
      latitude: location.latitude,
      longitude: location.longitude,
    });
    
    return {
      id: response.data.location_id || response.data.id,
      label: response.data.name || location.label,
      latitude: response.data.latitude,
      longitude: response.data.longitude,
    };
  }
}
