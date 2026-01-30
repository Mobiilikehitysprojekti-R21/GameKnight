import React from 'react';
import HomeScreen from './src/ui/screens/HomeScreen';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';

import { SearchScreenContainer } from './src/ui/screens/SearchScreenContainer';

import SignUpScreen from './src/ui/screens/SignUpScreen';
import ProfileScreen from './src/ui/screens/ProfileScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/navigation/types';
import { NavigationContainer } from '@react-navigation/native';
import { colors } from './src/ui/styles/theme';
import GameCollectionScreen from './src/ui/screens/GameCollectionScreen';
import GameSessionsScreen from './src/ui/screens/GameSessionsScreen';
import FriendsScreen from './src/ui/screens/FriendsScreen';
import { NewGameScreen } from './src/ui/screens/NewGameScreen';
import { MapScreen } from './src/ui/screens/MapScreen';
import { AuthProvider } from './src/ui/auth/AuthContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
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
                {() => <SearchScreenContainer />}
              </Stack.Screen>
              <Stack.Screen name="SignUp" component={SignUpScreen} />
              <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen
                name="GameCollection"
                component={GameCollectionScreen}
              />
              <Stack.Screen
                name="GameSessions"
                component={GameSessionsScreen}
              />
              <Stack.Screen name="Friends" component={FriendsScreen} />
              <Stack.Screen name="NewGame" component={NewGameScreen} />
              <Stack.Screen name="MapScreen" component={MapScreen} />
            </Stack.Navigator>
          </SafeAreaView>
        </NavigationContainer>
      </AuthProvider>
      <StatusBar style="light" />
      <Toast />
    </SafeAreaProvider>
  );
}
