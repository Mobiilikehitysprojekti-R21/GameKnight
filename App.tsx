
import React from "react";
import { BoardGameApiRepository } from "./src/infrastructure/api/BoardGameApiRepository";
import { FindBoardGames } from "./src/application/FindBoardGames";
import { SearchScreen } from "./src/ui/screens/SearchScreen";
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './screens/HomeScreen';

const repo = new BoardGameApiRepository();
const findBoardGames = new FindBoardGames(repo);

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0F172A' }}>
      <HomeScreen />
      <SearchScreen findBoardGames={findBoardGames} />
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
