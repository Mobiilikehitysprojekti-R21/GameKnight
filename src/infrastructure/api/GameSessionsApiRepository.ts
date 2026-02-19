import { GameSessionRepository } from '../../domain/repositories/GameSessionRepository';
import { authFetch } from './authFetch';
import Constants from 'expo-constants';

type AccessTokenProvider = () => Promise<string | null>;

export class GameSessionsApiRepository implements GameSessionRepository {
  private apiUrl = Constants.expoConfig?.extra?.API_URL || 'http://localhost:3000';

  constructor(private getAccessToken?: AccessTokenProvider) { }

  async getSessions() {
    if (this.getAccessToken) {
      const res = await authFetch(this.getAccessToken, `${this.apiUrl}/gamesessions`, {
        method: 'GET',
      });
      return res.json();
    }

    const res = await fetch(`${this.apiUrl}/gamesessions`);
    return res.json();
  }

  async getSessionsByUserId(user_id: number) {
    if (this.getAccessToken) {
      const res = await authFetch(this.getAccessToken, `${this.apiUrl}/gamesessions/user/${user_id}`, {
        method: 'GET',
      });
      return res.json();
    }

    const res = await fetch(`${this.apiUrl}/gamesessions/user/${user_id}`);
    return res.json();
  }

  async getSessionById(session_id: number) {
    if (this.getAccessToken) {
      const res = await authFetch(this.getAccessToken, `${this.apiUrl}/gamesessions/${session_id}`, {
        method: 'GET',
      });
      return res.json();
    }

    const res = await fetch(`${this.apiUrl}/gamesessions/${session_id}`);
    return res.json();
  }

  async createSession(session: any) {
    // Use authenticated fetch if token provider is available
    if (this.getAccessToken) {
      const res = await authFetch(this.getAccessToken, `${this.apiUrl}/gamesessions`, {
        method: 'POST',
        body: JSON.stringify(session),
      });
      return res.json();
    }

    // Fallback to unauthenticated request (development only)
    const res = await fetch(`${this.apiUrl}/gamesessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(session),
    });
    return res.json();
  }

  async updateSession(session_id: number, session: any) {
    if (this.getAccessToken) {
      const res = await authFetch(this.getAccessToken, `${this.apiUrl}/gamesessions/${session_id}`, {
        method: 'PUT',
        body: JSON.stringify(session),
      });
      return res.json();
    }

    const res = await fetch(`${this.apiUrl}/gamesessions/${session_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(session),
    });
    return res.json();
  }

  async addLocation(session_id: number, location: any) {
    if (this.getAccessToken) {
      const res = await authFetch(this.getAccessToken, `${this.apiUrl}/gamesessions/${session_id}/location`, {
        method: 'POST',
        body: JSON.stringify(location),
      });
      return res.json();
    }

    const res = await fetch(`${this.apiUrl}/gamesessions/${session_id}/location`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(location),
    });
    return res.json();
  }
}