import { Router } from "express";
import createUserController from "../controllers/createUserController";
import CreateUser from "../../../application/user/CreateUser";
import ValidateNickname from "../../../application/user/ValidateNickname";
import validateNicknameController from "../controllers/validateNicknameController";

export interface UserRoutesDeps {
  createUser: CreateUser;
  validateNickname: ValidateNickname
}

export default function userRoutes({ createUser, validateNickname }: UserRoutesDeps): Router {
  const router = Router();

  router.post("/", createUserController(createUser));
  router.post("/validateNickname", validateNicknameController(validateNickname))

  return router;
}
