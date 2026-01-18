export interface FriendshipProps {
  user_id: number;
  friend_id: number;
  status: 'accepted' | 'pending' | 'blocked';
}

class Friendship {
  public readonly user_id: number;
  public readonly friend_id: number;
  public readonly status: 'accepted' | 'pending' | 'blocked';

  constructor({ user_id, friend_id, status }: FriendshipProps) {
    if (user_id === friend_id) {
      throw new Error("A user cannot be friends with themselves");
    }
    this.user_id = user_id;
    this.friend_id = friend_id;
    this.status = status;
  }
}

export default Friendship;
