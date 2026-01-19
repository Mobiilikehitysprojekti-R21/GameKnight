import CreateUser from "../application/user/CreateUser";
// import InMemoryUserRepository from "../infrastructure/InMemory/UserRepository";
import postgresUserRepository from "../infrastructure/postgres/UserRepository";
import { pool } from "../infrastructure/postgres/db";
module.exports = function createUserUseCases() {
  const userRepo = new postgresUserRepository(pool);

  return {
    createUser: new CreateUser(userRepo),
  };
};
