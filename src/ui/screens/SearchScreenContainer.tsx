import React from 'react';
import { BoardGameApiRepository } from '../../infrastructure/api/BoardGameApiRepository';
import { FindBoardGames } from '../../application/FindBoardGames';
import { SearchScreen } from './SearchScreen';
import { useAuthViewModel } from '../viewModels/useAuthViewModel';

export function SearchScreenContainer() {
  const { getAccessToken } = useAuthViewModel();

  const repo = React.useMemo(
    () => new BoardGameApiRepository(getAccessToken),
    [getAccessToken]
  );

  const findBoardGames = React.useMemo(
    () => new FindBoardGames(repo),
    [repo]
  );

  return <SearchScreen findBoardGames={findBoardGames} />;
}