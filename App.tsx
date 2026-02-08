import React from 'react';
import HomeScreen from './src/ui/screens/HomeScreen';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Auth0Provider } from 'react-native-auth0';
import { SearchScreenContainer } from './src/ui/screens/SearchScreenContainer';
import * as Linking from 'expo-linking';

export default function App() {
  return (
    <Auth0Provider
      domain={'gameknight.eu.auth0.com'}
      clientId={'7fgZoHliyAcQanPFFr5fBgtq3vu1BTJe'}
      scope="openid profile email offline_access"
      redirectUri={Linking.createURL('/')}
      audience="api.gameknight.app"
      useDPoP={false}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: '#0F172A' }}>
        <HomeScreen />
        <SearchScreenContainer />
        <StatusBar style="light" />
      </SafeAreaView>
    </Auth0Provider>
  );
}
