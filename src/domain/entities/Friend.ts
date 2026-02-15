export type Friend = {
  user_id: number
  nickname: string
  email?: string;
  status?: "pending" | "accepted";
}
