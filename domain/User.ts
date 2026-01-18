export interface UserProps {
  user_id: string;
  email: string;
  password: string;
  nickname: string;
}

class User {
  public readonly user_id: string;
  public readonly email: string;
  public readonly password: string;
  public readonly nickname: string;

  constructor({ user_id, email, password, nickname }: UserProps) {
    if (!email.includes("@")) {
      throw new Error("Invalid email");
    }
    this.user_id = user_id;
    this.email = email;
    this.password = password;
    this.nickname = nickname;
  }
}

export default User;
