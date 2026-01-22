import User from "../../domain/User";
import UserRepository from "../../ports/UserRepository";

export interface CreateUserInput {
  email: string;
  auth0_id?: string;  // valinnainen, että voi testata ennen Auth0 käyttöönottoa
  nickname: string;
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

  async execute(input: CreateUserInput): Promise<User> {
    /*const existing = await this.userRepository.findByEmail(input.email);
    if (existing) {
      throw new Error("User already exists");
    }*/
   const existing = await this.userRepository.findByNickname(input.nickname);
    if (existing) {
      throw new Error("Nickname already exists");
    }

    const user = new User(input);
    const saved = await this.userRepository.save(user);

    return saved;
  }
}

export default CreateUser;
