import FindBoardGame from "../application/boardgame/FindBoardGame";
import BoardGameRepository from "../infrastructure/InMemory/BoardGameRepository";

module.exports = function createBoardGameUseCases() {
  const bggApi = new BoardGameRepository();

  return {
    findBoardGame: new FindBoardGame(bggApi),
  };
};