import { BoardGameRepository } from '../../domain/repositories/BoardGameRepository';

export class BoardGameApiRepository implements BoardGameRepository {
  async findByName(name: string) {
    const res = await fetch(
      `http://localhost:3000/boardgames?query=${encodeURIComponent(name)}`
    );
    console.log(res);
    return res.json();
  }
}
