import UserRepository from "../../ports/UserRepository";
import User from "../../domain/User";

class InMemoryUserRepository extends UserRepository {
  private readonly users: User[] = [];

  async save(user: User): Promise<void> {
    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((u) => u.email === email);
  }
}

export default InMemoryUserRepository;
