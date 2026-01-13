import User from "../../domain/User";
import UserRepository from "../../ports/UserRepository";

export interface CreateUserInput {
  id: string;
  email: string;
}

class CreateUser {
  /** userRepository is port that describes infrastructure holding user data.
   * This is selected in server.ts
   * `const createUser = new CreateUser(userRepo)`
   * Here userRepo can be any implemented repository, for example
   * infrastructure/InMemory/UserRepository.ts
   * or
   * infrastructure/postgres/UserRepository.ts
   */
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute({ id, email }: CreateUserInput): Promise<User> {
    const existing = await this.userRepository.findByEmail(email);
    if (existing) {
      throw new Error("User already exists");
    }

    const user = new User({ id, email });
    await this.userRepository.save(user);

    return user;
  }
}

export default CreateUser;
