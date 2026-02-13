import { BoardGameRepository } from '../../domain/repositories/BoardGameRepository';
import axios from 'axios';
import Constants from 'expo-constants';
import { BoardGame } from '../../domain/entities/BoardGame';

import { authFetch } from './authFetch';

type AccessTokenProvider = () => Promise<string | null>;

export class BoardGameApiRepository implements BoardGameRepository {
  private apiUrl = Constants.expoConfig?.extra?.API_URL;

  constructor(private readonly getAccessToken: AccessTokenProvider) {}

  async findByName(name: string): Promise<BoardGame[]> {
    const res = await authFetch(
      this.getAccessToken,
      `${this.apiUrl}/boardgames/findByName/?query=${encodeURIComponent(name)}`
    );
    console.log(res);
    return (await res.json()) as BoardGame[];
  }

  // TODO: function to add game to db
  async addGame(game: BoardGame): Promise<void> {
    
  }

  // Function to add game to user´s game collection
  async addGameToCollection(user_id: number, bgg_id: BoardGame['bgg_id']): Promise<void> {

    try {
      const res = await axios.post(`${this.apiUrl}/boardgames/addToUser`, {userId: user_id, game: bgg_id})
      console.log(res.data)  // debugging...
    } catch (e: any) {
      console.error("Error adding game to collection:", e.response?.data)
      console.error("Status:", e.response?.status)
      throw e
    }
  }

  // Function to fetch user´s game collection
  async getGameCollection(user_id: number): Promise<BoardGame[]> {
    
     try {
      const res = await authFetch(
      this.getAccessToken,
      `${this.apiUrl}/boardgames/getUserGameCollection/${user_id}`)
      console.log('etsitään käyttäjän pelejä')
      return (await res.json()) as BoardGame[]
    } catch (e) {
      console.error('Error finding boardgames:', e)
      throw e
    }
  }

  async deleteBoardGame(bgg_id: number): Promise<void> {
    if (this.getAccessToken) {
      const res = await authFetch(this.getAccessToken, `${this.apiUrl}/boardgames/${bgg_id}`, {
        method: "DELETE"
      })
      if (!res.ok) {
        const body = await res.text();
        
        console.error('delete game from collection failed:', res.status, body);

        throw new Error(`Delete game from collection failed: ${res.status}`);
      }
      return
    }
  }

}
