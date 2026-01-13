import express, { Express } from "express";
import userRoutes from "./routes/users";
import CreateUser from "../../application/user/CreateUser";
import FindBoardGame from "../../application/boardgame/FindBoardGame";
import boardGameRouter from "./routes/boardgames";

export interface HttpServerDeps {
  createUser: CreateUser;
  findBoardGame: FindBoardGame;
}

export default function createHttpServer(deps: HttpServerDeps): Express {
  const app = express();
  app.use(express.json());

  app.use("/users", userRoutes(deps));
  app.use("/boardgames", boardGameRouter(deps))

  return app;
}
