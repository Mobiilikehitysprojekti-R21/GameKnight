import type { FriendRepository } from "../../domain/repositories/FriendRepository";
import type { Friend } from "../../domain/entities/Friend";
import type { FriendInviteResult } from "../../domain/entities/FriendInviteResult";
import type { FriendRequest } from "../../domain/entities/FriendRequest";
import { authFetch } from './authFetch';

const API_BASE = "http://localhost:3000";
type AccessTokenProvider = () => Promise<string | null>;

export class FriendApiRepository implements FriendRepository {
  constructor(private getAccessToken: AccessTokenProvider) {}

   async getFriends(): Promise<Friend[]> {
    const res = await authFetch(this.getAccessToken, `${API_BASE}/friendships`);
    if (!res.ok) throw new Error("Kavereiden haku epäonnistui");
    return await res.json();
  }

  async addFriend(user_id: number, nickname: string): Promise<void> {
    const res = await authFetch(this.getAccessToken, `${API_BASE}/friendships`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id, nickname }),
    });
    if (!res.ok) throw new Error("Kaverin lisääminen epäonnistui");
  }

  async inviteFriend(email: string): Promise<FriendInviteResult> {
    const res = await authFetch(this.getAccessToken, `${API_BASE}/friendships/invite`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (!res.ok) throw new Error("Kutsun lähetys epäonnistui");
    return await res.json();
  }

async getFriendRequests(): Promise<FriendRequest[]> {
  const res = await authFetch(this.getAccessToken, `${API_BASE}/friendships/requests`);
  if (!res.ok) throw new Error("Kaveripyyntöjen haku epäonnistui");
  return await res.json();
}

async acceptRequest(request_id: string): Promise<void> {
    const res = await authFetch(this.getAccessToken, `${API_BASE}/friendships/requests/accept`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ request_id }),
    });
    if (!res.ok) throw new Error("Kaveripyynnön hyväksyminen epäonnistui");
  }

  async declineRequest(request_id: string): Promise<void> {
    const res = await authFetch(this.getAccessToken, `${API_BASE}/friendships/requests/decline`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ request_id }),
    });
    if (!res.ok) throw new Error("Kaveripyynnön hylkääminen epäonnistui");
  }


  async getIncomingRequests(): Promise<FriendRequest[]> {
    return this.getFriendRequests();
  }
}