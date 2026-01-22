import User from "../../domain/User";
import UserRepository from "../../ports/UserRepository";

export interface ValidateNicknameInput {
  nickname: string;
}

class ValidateNickname {
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

  async execute(input: ValidateNicknameInput): Promise<boolean> {

   const existing = await this.userRepository.findByNickname(input.nickname)
   const nicknameAvailable = !existing
   return nicknameAvailable
  }
}

export default ValidateNickname;