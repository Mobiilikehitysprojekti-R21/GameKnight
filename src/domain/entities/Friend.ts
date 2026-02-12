export type Friend = {
  id: string | undefined;
  user_id: string
  nickname: string
  email?: string;
  status?: "pending" | "accepted";
}