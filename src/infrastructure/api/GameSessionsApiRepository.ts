import { GameSessionRepository } from '../../domain/repositories/GameSessionRepository';

export class GameSessionsApiRepository implements GameSessionRepository {
  async getSessions() {
    const res = await fetch(`http://localhost:3000/gamesessions`);
    console.log(res);
    return res.json();
  }

  async addSession(session: any) {
    const res = await fetch(`http://localhost:3000/gamesessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(session),
    });
    console.log(res);
    return res.json();
  }
}