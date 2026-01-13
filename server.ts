import createHttpServer from "./interfaces/http/server";
import CreateUser from "./application/user/CreateUser";
import InMemoryUserRepository from "./infrastructure/InMemory/UserRepository";

const userRepo = new InMemoryUserRepository();
const createUser = new CreateUser(userRepo);

const app = createHttpServer({
  createUser,
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
