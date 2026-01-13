const UserRepository = require("../../ports/UserRepository");

class InMemoryUserRepository extends UserRepository {
  constructor() {
    super();
    this.users = [];
  }

  async save(user) {
    this.users.push(user);
  }

  async findByEmail(email) {
    return this.users.find(u => u.email === email);
  }
}

module.exports = InMemoryUserRepository;
