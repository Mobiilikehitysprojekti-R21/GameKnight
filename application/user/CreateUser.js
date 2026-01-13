const User = require("../../domain/User");

class CreateUser {
  /** userRepository is port that describes infrastructure holding user data.
   This is selected in server.js -file
   `const createUser = new CreateUser(userRepo)`
   Here userRepo can be any implemented repository, for example
   infrastructure/InMemory/UserRepository.js 
   or
   infrastructure/postgres/UserRepository.js
  */ 
  constructor(userRepository) {
    
    this.userRepository = userRepository;
  }

  async execute({ id, email }) {
    const existing = await this.userRepository.findByEmail(email);
    if (existing) {
      throw new Error("User already exists");
    }

    const user = new User({ id, email });
    await this.userRepository.save(user);

    return user;
  }
}

module.exports = CreateUser;
