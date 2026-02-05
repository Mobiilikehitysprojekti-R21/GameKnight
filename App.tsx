import React from 'react';
import { BoardGameApiRepository } from './src/infrastructure/api/BoardGameApiRepository';
import { FindBoardGames } from './src/application/FindBoardGames';
import { SearchScreen } from './src/ui/screens/SearchScreen';
import HomeScreen from './src/ui/screens/HomeScreen';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import SignUpScreen from './src/ui/screens/SignUpScreen';
import ProfileScreen from './src/ui/screens/ProfileScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/navigation/types';
import { NavigationContainer } from '@react-navigation/native';
import { colors } from './src/ui/styles/theme';
import GameCollectionScreen from './src/ui/screens/GameCollectionScreen';
import GameSessionsScreen from './src/ui/screens/GameSessionsScreen';
import FriendsScreen from './src/ui/screens/FriendsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>()

const repo = new BoardGameApiRepository();
const findBoardGames = new FindBoardGames(repo);

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#0F172A' }}>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: colors.secondary },
              headerTintColor: colors.textPrimary,
              headerTitleStyle: { color: colors.textPrimary },
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Search">
              {() => <SearchScreen findBoardGames={findBoardGames} />}
            </Stack.Screen>
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="GameCollection" component={GameCollectionScreen} />
            <Stack.Screen name="GameSessions" component={GameSessionsScreen} />
            <Stack.Screen name="Friends" component={FriendsScreen} />
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}
