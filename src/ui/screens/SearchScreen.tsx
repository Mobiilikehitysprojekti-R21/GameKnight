import React from "react";
import { View, TextInput, Button, FlatList, Text } from "react-native";
import { useSearchViewModel } from "../viewModels/useSearchViewModel";
import { FindBoardGames } from "../../application/FindBoardGames";
import type { BoardGame } from "../../domain/entities/BoardGame";

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
