import { Request, Response } from "express";
import FindBoardGame from "../../../application/boardgame/FindBoardGame";

export default (findBoardGame: FindBoardGame) => 
  async (req: Request, res: Response): Promise<void> => {
    try {
      const query = String(req.query.query)
      const boardgames = await findBoardGame.execute({query});
      res.status(200).json(boardgames);
    } catch (e) {
      const error = e as Error;
      res.status(400).json({ error: error.message });
    }
  };

