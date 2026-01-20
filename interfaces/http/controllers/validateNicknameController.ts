import { Request, Response } from "express";
import ValidateNickname from "../../../application/user/ValidateNickname";

export default (validateNickname: ValidateNickname) =>
  async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await validateNickname.execute(req.body);
      res.status(201).json(user);
    } catch (e) {
      const error = e as Error;
      res.status(400).json({ error: error.message });
    }
  };