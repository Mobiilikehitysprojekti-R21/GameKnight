import React from 'react';
import { BoardGameApiRepository } from './src/infrastructure/api/BoardGameApiRepository';
import { FindBoardGames } from './src/application/FindBoardGames';
import { SearchScreen } from './src/ui/screens/SearchScreen';
import HomeScreen from './src/ui/screens/HomeScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import SignUpScreen from './src/ui/screens/SignUpScreen';
import ProfileScreen from './src/ui/screens/ProfileScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/navigation/types';
import { NavigationContainer } from '@react-navigation/native';
import { colors } from './src/ui/styles/theme';

const Stack = createNativeStackNavigator<RootStackParamList>()

const repo = new BoardGameApiRepository();
const findBoardGames = new FindBoardGames(repo);

export default function App() {
  return (
    <>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#0F172A' }}>
          <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: colors.secondary }, headerTintColor: colors.textPrimary, headerTitleStyle: { color: colors.textPrimary } }}>
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='Search'>
              {() => <SearchScreen findBoardGames={findBoardGames} />}
            </Stack.Screen>
            <Stack.Screen name='SignUp' component={SignUpScreen} />
            <Stack.Screen name='Profile' component={ProfileScreen} />
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
      <StatusBar style="light" />
    </>

  );
}
