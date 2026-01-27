import React from 'react';
import { BoardGameApiRepository } from './src/infrastructure/api/BoardGameApiRepository';
import { FindBoardGames } from './src/application/FindBoardGames';
import { SearchScreen } from './src/ui/screens/SearchScreen';
import HomeScreen from './src/ui/screens/HomeScreen';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Auth0Provider } from 'react-native-auth0';

const repo = new BoardGameApiRepository();
const findBoardGames = new FindBoardGames(repo);

export default function App() {
  return (
    <Auth0Provider
      domain={'gameknight.eu.auth0.com'}
      clientId={'7fgZoHliyAcQanPFFr5fBgtq3vu1BTJe'}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: '#0F172A' }}>
        <HomeScreen />
        <SearchScreen findBoardGames={findBoardGames} />
        <StatusBar style="light" />
      </SafeAreaView>
    </Auth0Provider>
  );
}
