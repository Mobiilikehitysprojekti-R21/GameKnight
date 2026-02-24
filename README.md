# GameKnight - Mobile app

> ⚠️ IMPORTANT! ⚠️
> This project is two parted. Server implementation is [here](https://github.com/Mobiilikehitysprojekti-R21/GameKnight-server):

## Styling guide

Install prettier with `npm i` in project root folder and install [prettier extension for VS Code](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).

Optional (but recommended):

- [Format On Save Mode = File](vscode://settings/editor.formatOnSaveMode)
- [Format On Save = Check](vscode://settings/editor.formatOnSave)
- [Default formatter = Prettier - Code Formatter](vscode://settings/editor.defaultFormatter)

Prettier config is in .prettierrc file.

## Architecture

Mobile app is designed with MVVM architecture. Below is short guidance on file responsibilites.

### `Domain`

No React. No HTTP. No storage.

```ts
// Entities - Domain types
export type BoardGame = {
  id: string;
  name: string;
  imageUrl?: string;
};
```

```ts
// repositories - Interfaces for outside sources
import { BoardGame } from '../entities/BoardGame';

export interface BoardGameRepository {
  findByName(name: string): Promise<BoardGame[]>;
}
```

### `Application layer` - use cases

No React - Only business logic

```ts
import { BoardGameRepository } from '../domain/repositories/BoardGameRepository';

export class FindBoardGames {
  // This can be any repo implementing BoardGameRepository interface
  // dummy/private api/public api/...
  constructor(private repo: BoardGameRepository) {}

  async execute(query: string) {
    if (!query.trim()) return [];
    return this.repo.findByName(query);
  }
}
```

### Infrastructure layer

Implementation of repositories: HTTP / LocalStorage...

```ts
// infrastructure/api/BoardGameRepository.ts
import { BoardGameRepository } from '../../domain/repositories/BoardGameRepository';

export class BoardGameApiRepository implements BoardGameRepository {
  async findByName(name: string) {
    const res = await fetch(
      `https://your-backend.example.com/games?query=${encodeURIComponent(name)}`
    );
    return res.json();
  }
}
```

### UI layer

Here is where React lives.

**ViewModel** - As name implies, model and implementation for **View**

```ts
// ui/screens/SearchScreen.tsx
import { useState } from 'react';
import { FindBoardGames } from '../../application/FindBoardGames';

export function useSearchViewModel(findBoardGames: FindBoardGames) {
  const [query, setQuery] = useState('');
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);

  async function search() {
    setLoading(true);
    const result = await findBoardGames.execute(query);
    setGames(result);
    setLoading(false);
  }

  // Return all needed states, functions, etc for View
  return {
    query,
    setQuery,
    games,
    loading,
    search,
  };
}
```

**View** - Actual view for screen. Uses viewModel for state handling, functions...

```tsx
import React from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import { useSearchViewModel } from '../viewModels/useSearchViewModel';
import { FindBoardGames } from '../../application/FindBoardGames';
import type { BoardGame } from '../../domain/entities/BoardGame';

interface SearchScreenProps {
  findBoardGames: FindBoardGames;
}

export function SearchScreen({ findBoardGames }: SearchScreenProps) {
  const vm = useSearchViewModel(findBoardGames);

  return (
    <View>
      <TextInput
        value={vm.query}
        onChangeText={vm.setQuery}
        placeholder="Search board games"
      />
      <Button title="Search" onPress={vm.search} />

      {vm.loading && <Text>Loading...</Text>}

      <FlatList<BoardGame>
        data={vm.games}
        keyExtractor={(g) => g.id}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
}
```
