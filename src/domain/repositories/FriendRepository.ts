import { Friend } from "../entities/Friend";
import { FriendRequest } from "../entities/FriendRequest";
import { FriendInviteResult } from "../entities/FriendInviteResult";

export interface FriendRepository {
  getFriends(): Promise<Friend[]>

  inviteFriend(email: string): Promise<FriendInviteResult>
  addFriend(user_id: number, nickname: string): Promise<void>
  
  getFriendRequests(): Promise<FriendRequest[]>
  acceptRequest(request_id: string): Promise<void>;
  declineRequest(request_id: string): Promise<void>;
}