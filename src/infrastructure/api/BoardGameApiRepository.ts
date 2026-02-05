import { BoardGameRepository } from '../../domain/repositories/BoardGameRepository';
import axios from "axios";
import Constants from "expo-constants";
import { BoardGame } from '../../domain/entities/BoardGame';


export class BoardGameApiRepository implements BoardGameRepository {
  
  private apiUrl = Constants.expoConfig?.extra?.API_URL
  
  async findByName(name: string) {

    try {
      const res = await axios.get<BoardGame[]>(`${this.apiUrl}/boardgames/findByName/?query=${encodeURIComponent(name)}`)
      console.log('etsitään pelejä')
      console.log(res.data);
      return res.data
    } catch (e) {
      console.error('Error finding boardgames:', e)
      throw e
    }
    
  }

  async addGame(game: BoardGame): Promise<void> {
    
  }

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
}
