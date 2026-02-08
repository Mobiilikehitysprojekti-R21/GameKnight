import React from 'react';
import { View, TextInput, Pressable, FlatList, Text } from 'react-native';
import { useSearchViewModel } from '../viewModels/useSearchViewModel';
import { FindBoardGames } from '../../application/FindBoardGames';
import type { BoardGame } from '../../domain/entities/BoardGame';
import { styles } from '../styles/SearchStyles';

interface SearchScreenProps {
  findBoardGames: FindBoardGames;
}

export function SearchScreen({ findBoardGames }: SearchScreenProps) {
  const vm = useSearchViewModel(findBoardGames);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        value={vm.query}
        onChangeText={vm.setQuery}
        placeholder="Search board games"
        placeholderTextColor="#94A3B8"
      />
      <Pressable 
        style={styles.searchButton} 
        onPress={vm.search}
      >
        <Text style={styles.searchButtonText}>Search</Text>
      </Pressable>

      {vm.loading && <Text style={styles.loadingText}>Loading...</Text>}

      <FlatList<BoardGame>
        data={vm.games}
        keyExtractor={(g) => g.id}
        renderItem={({ item }) => (
        <View style={styles.listItem}>
          <Text style={styles.listItemText}>
            {item.name}
            </Text>
        </View>
        )}
      />
    </View>
  );
}
