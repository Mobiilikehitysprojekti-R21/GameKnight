import { GameSessionRepository } from '../../domain/repositories/GameSessionRepository';

export class GameSessionsApiRepository implements GameSessionRepository {
  async getSessions() {
    const res = await fetch(`http://localhost:3000/gamesessions`);
    console.log(res);
    return res.json();
  }

  async getSessionsByUserId(user_id: number) {
    const res = await fetch(`http://localhost:3000/gamesessions/user/${user_id}`);
    return res.json();
  }

  async getSessionById(session_id: number) {
    const res = await fetch(`http://localhost:3000/gamesessions/${session_id}`);
    return res.json();
  }

  async createSession(session: any) {
    const res = await fetch(`http://localhost:3000/gamesessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(session),
    });
    return res.json();
  }

  async updateSession(session_id: number, session: any) {
    const res = await fetch(`http://localhost:3000/gamesessions/${session_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(session),
    });
    return res.json();
  }

  async addLocation(session_id: number, location: any) {
    const res = await fetch(`http://localhost:3000/gamesessions/${session_id}/location`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(location),
    });
    return res.json();
  }
}