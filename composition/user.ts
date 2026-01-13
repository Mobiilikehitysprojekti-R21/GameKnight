import CreateUser from "../application/user/CreateUser";
import InMemoryUserRepository from "../infrastructure/InMemory/UserRepository";

module.exports = function createUserUseCases() {
  const userRepo = new InMemoryUserRepository();

  return {
    createUser: new CreateUser(userRepo),
  };
};
