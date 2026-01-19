import UserRepository from "../../ports/UserRepository";
import User from "../../domain/User";

class InMemoryUserRepository extends UserRepository {
  private readonly users: User[] = [];
  private serial = 0;

  async save(user: User): Promise<User> {
    this.serial++;
    const userWithId = new User({
      user_id: this.serial,
      email: user.email,
      password: user.password,
      nickname: user.nickname,
    });
    this.users.push(userWithId);
    return userWithId;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((u) => u.email === email);
  }
}

export default InMemoryUserRepository;
