import { useState } from 'react';
import { FindBoardGames } from '../../application/FindBoardGames';
import { BoardGame } from '../../domain/entities/BoardGame';

export function useSearchViewModel(findBoardGames: FindBoardGames) {
  const [query, setQuery] = useState('');
  const [games, setGames] = useState<BoardGame[]>([]);
  const [loading, setLoading] = useState(false);

  async function search() {
    setLoading(true);
    const result = await findBoardGames.execute(query);
    setGames(result);
    setLoading(false);
  }

  return {
    query,
    setQuery,
    games,
    loading,
    search,
  };
}
