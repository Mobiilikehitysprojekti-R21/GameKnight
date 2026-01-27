import express, { Express } from "express";
import cors from "cors";
import userRoutes from "./routes/users";
import CreateUser from "../../application/user/CreateUser";
import FindBoardGame from "../../application/boardgame/FindBoardGame";
import boardGameRouter from "./routes/boardgames";
import ValidateNickname from "../../application/user/ValidateNickname";
const { auth } = require("express-openid-connect");

const authConfig = {
  authRequired: false,
  auth0Logout: true,
  secret: "a long, randomly-generated string stored in env",
  baseURL: "http://localhost:3000/",
  clientID: "GiR9CnNp3tEtfBwin2V1C7ineiqaogD3",
  issuerBaseURL: "https://gameknight.eu.auth0.com",
};

export interface HttpServerDeps {
  createUser: CreateUser;
  validateNickname: ValidateNickname;
  findBoardGame: FindBoardGame;
}

export default function createHttpServer(deps: HttpServerDeps): Express {
  const app = express();
  // auth router attaches /login, /logout, and /callback routes to the baseURL
  app.use(auth(authConfig));

  app.use(cors());
  app.use(express.json());

  app.use("/users", userRoutes(deps));
  app.use("/boardgames", boardGameRouter(deps));

  // req.isAuthenticated is provided from the auth router
  app.get("/", (req, res) => {
    res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
  });

  return app;
}
