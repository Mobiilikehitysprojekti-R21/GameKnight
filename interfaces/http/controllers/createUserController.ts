import { Request, Response } from "express";
import CreateUser from "../../../application/user/CreateUser";

export default (createUser: CreateUser) =>
  async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await createUser.execute(req.body);
      res.status(201).json(user);
    } catch (e) {
      const error = e as Error;
      res.status(400).json({ error: error.message });
    }
  };
