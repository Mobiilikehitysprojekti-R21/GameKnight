import { Router } from "express";
import FindBoardgame from "../../../application/boardgame/FindBoardGame";
import findBoardGameController from "../controllers/findBoardGameController";
const { requiresAuth } = require("express-openid-connect");

export interface BoardGameRoutesDeps {
  findBoardGame: FindBoardgame;
}

export default function userRoutes({
  findBoardGame,
}: BoardGameRoutesDeps): Router {
  const router = Router();

  router.get("/", requiresAuth(), findBoardGameController(findBoardGame));

  return router;
}
