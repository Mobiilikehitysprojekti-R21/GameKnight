import { BoardGameRepository } from '../../domain/repositories/BoardGameRepository';
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

  // Function to add game to user´s game collection
  async addGameToCollection(user_id: string, bgg_id: BoardGame['bgg_id']): Promise<void> {

    try {
      const res = await authFetch(
        this.getAccessToken, `${this.apiUrl}/boardgames/addToUser`, {
        method: "POST",
        body: JSON.stringify({ userId: user_id, game: bgg_id })
      })

      if (!res.ok) {
        const text = await res.text()
        console.error('Add game failed:', res.status, text)
        throw new Error(`Add game failed: ${res.status}`)
      }

      const data = await res.json()
      console.log('Added game to collection:', data)
    } catch (e: any) {
      console.error("Error adding game to collection:", e.response?.data)
      console.error("Status:", e.response?.status)
      throw e
    }
  }

  // Function to fetch user´s game collection
  async getGameCollection(user_id: string): Promise<BoardGame[]> {
    
     try {
      const res = await authFetch(
      this.getAccessToken,
      `${this.apiUrl}/boardgames/getUserGameCollection/${encodeURIComponent(user_id)}`)
      console.log('etsitään käyttäjän pelejä')
      return (await res.json()) as BoardGame[]
    } catch (e) {
      console.error('Error finding boardgames:', e)
      throw e
    }
  }

  // Delete boardgame from user's game collection
  async deleteBoardGame(bgg_id: number, auth0_id: string): Promise<void> {
    if (this.getAccessToken) {
      const res = await authFetch(this.getAccessToken, `${this.apiUrl}/boardgames/${encodeURIComponent(auth0_id)}/${bgg_id}`, {
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

    async getGameById(game_id: number): Promise<BoardGame | undefined> {
    const res = await authFetch(
      this.getAccessToken,
      `${this.apiUrl}/boardgames/${encodeURIComponent(game_id)}`
    );
    if (res.status === 404) {
      return undefined;
    }
    return (await res.json()) as BoardGame;
  }

}
