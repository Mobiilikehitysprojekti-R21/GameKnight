// server.js
const createHttpServer = require("./interfaces/http/server");

const CreateUser = require("./application/user/CreateUser");
const InMemoryUserRepository = require("./infrastructure/InMemory/UserRepository");

const userRepo = new InMemoryUserRepository();
const createUser = new CreateUser(userRepo);

const app = createHttpServer({
  createUser,
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
