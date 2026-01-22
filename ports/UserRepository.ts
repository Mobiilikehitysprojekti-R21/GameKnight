import User from "../domain/User";

abstract class UserRepository {
  abstract save(user: User): Promise<User>;
  abstract findByEmail(email: string): Promise<User | undefined>;
  abstract findByNickname(nickname: string): Promise<User | undefined>;
}

export default UserRepository;
