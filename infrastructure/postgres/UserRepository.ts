import UserRepository from "../../ports/UserRepository";
import User from "../../domain/User";

// NOTE: This is currently an in-memory stub. Replace with real Postgres access
// when wiring up a database.
class PostgresUserRepository extends UserRepository {
  private readonly users: User[] = [];

  async save(user: User): Promise<void> {
    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((u) => u.email === email);
  }
}

export default PostgresUserRepository;
