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
}
