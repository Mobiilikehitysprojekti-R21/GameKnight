import { UserRepository } from '../../domain/repositories/UserRepository';
import axios from 'axios';
import { User } from '../../domain/entities/User';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Location } from '../../domain/entities/Location';

/*
    - UserApiRepository handles HTTP requests to the backend
    - Implements the UserRepository interface from the domain layer
*/

export class UserApiRepository implements UserRepository {
  private apiUrl = Constants.expoConfig?.extra?.API_URL;

  // Checks if nickname is available
  async validateNickname(nickname: string): Promise<boolean> {
    // Debugging...
    console.log('userapirepo: validoidaan nickia');
    console.log('apiURL: ', this.apiUrl);
    console.log('nicki: ', nickname);

    try {
      //POST request to backend
      const response = await axios.post(
        `${this.apiUrl}/users/validateNickname`,
        { nickname }
      );

      console.log(response.data); // debugging...
      // return true, if nickname is available
      // if nickname is unavailable -> backend returns false -> false === true --> return false
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
      console.log('UserApiRepo ennen axios kutsua');
      await axios.patch(`${this.apiUrl}/users/updateNickname`, {
        nickname,
        auth0_id,
      });
      console.log('UserApiRepossa: nick ja auth0: ', nickname, auth0_id);
    } catch (e: any) {
      console.error('changeNickname axios error', e.response?.data);
      console.error('Status:', e.response?.status);
      throw e;
    }
  }
  async getFavoriteLocations(userId: number): Promise<Location[]> {
    const response = await axios.get(
      `${this.apiUrl}/users/${userId}/favorite-locations`
    );

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
    await axios.post(
      `${this.apiUrl}/users/${userId}/favorite-locations`,
      location
    );
  }
}
