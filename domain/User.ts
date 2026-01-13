export interface UserProps {
  id: string;
  email: string;
}

class User {
  public readonly id: string;
  public readonly email: string;

  constructor({ id, email }: UserProps) {
    if (!email.includes("@")) {
      throw new Error("Invalid email");
    }
    this.id = id;
    this.email = email;
  }
}

export default User;
