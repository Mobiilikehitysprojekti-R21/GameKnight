import type { FriendRepository } from "../domain/repositories/FriendRepository";

export class AcceptRequest {
  constructor(private repo: FriendRepository) {}

  execute (request_id: string) {
    if (!request_id) throw new Error("request_id missing");
    this.repo.acceptRequest(request_id);
  }
}
