import { Router } from "express";
import createUserController from "../controllers/createUserController";
import CreateUser from "../../../application/user/CreateUser";

export interface UserRoutesDeps {
  createUser: CreateUser;
}

export default function userRoutes({ createUser }: UserRoutesDeps): Router {
  const router = Router();

  router.post("/", createUserController(createUser));

  return router;
}
