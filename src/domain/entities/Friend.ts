export type Friend = {
  user_id: string
  nickname: string
  email?: string;
  status?: "pending" | "accepted";
}
