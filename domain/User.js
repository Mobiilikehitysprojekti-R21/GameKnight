

class User {
  /**
   * User Constructor
   * @typedef {{id: string, email: string}}
   */
  constructor({ id, email }) {
    if (!email.includes("@")) {
      throw new Error("Invalid email");
    }
    this.id = id;      
    this.email = email;
  }
}

module.exports = User;
