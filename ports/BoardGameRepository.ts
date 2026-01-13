import BoardGame from "../domain/BoardGame";

abstract class BoardGameRepository {
  abstract search(query: string): Promise<BoardGame[] | undefined>;
}

export default BoardGameRepository;
