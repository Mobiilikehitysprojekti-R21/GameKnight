import { BoardGameRepository } from '../../domain/repositories/BoardGameRepository';
import { authFetch } from './authFetch';

type AccessTokenProvider = () => Promise<string | null>;

export class BoardGameApiRepository implements BoardGameRepository {
  constructor(private readonly getAccessToken: AccessTokenProvider) {}

  async findByName(name: string) {
    const res = await authFetch(
      this.getAccessToken,
      `http://localhost:3000/boardgames?query=${encodeURIComponent(name)}`
    );
    console.log(res);
    return res.json();
  }
}
