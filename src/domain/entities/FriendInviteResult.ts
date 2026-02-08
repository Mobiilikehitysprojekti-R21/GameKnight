export type FriendInviteResult = {
  email: string;
  status: "sent" | "already_invited" | "already_user" | "error";
};
