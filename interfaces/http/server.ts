import express, { Express } from "express";
import userRoutes from "./routes/users";
import CreateUser from "../../application/user/CreateUser";

export interface HttpServerDeps {
  createUser: CreateUser;
}

export default function createHttpServer(deps: HttpServerDeps): Express {
  const app = express();
  app.use(express.json());

  app.use("/users", userRoutes(deps));

  return app;
}
