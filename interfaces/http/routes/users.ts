import { Router } from "express";
import createUserController from "../controllers/createUserController";
import CreateUser from "../../../application/user/CreateUser";
import ValidateNickname from "../../../application/user/ValidateNickname";
import validateNicknameController from "../controllers/validateNicknameController";
import { requireAuth } from "../middleware/auth";

export interface UserRoutesDeps {
  createUser: CreateUser;
  validateNickname: ValidateNickname
}

export default function userRoutes({ createUser, validateNickname }: UserRoutesDeps): Router {
  const router = Router();

  // Protected routes - require valid JWT token
  router.post("/", requireAuth, createUserController(createUser));
  router.post("/validateNickname", requireAuth, validateNicknameController(validateNickname));

  return router;
}
