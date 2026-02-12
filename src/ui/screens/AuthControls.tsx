import React from 'react';
import { View, Button, Text } from 'react-native';
import { useAuthViewModel } from '../viewModels/useAuthViewModel';

export function AuthControls() {
  const { loggedIn, displayName, errorMessage, login, logout } =
    useAuthViewModel();

  return (
    <View style={{ padding: 16 }}>
      {loggedIn ? (
        <>
          <Text style={{ color: 'white', marginBottom: 8 }}>
            Logged in as {displayName}
          </Text>
          <Button onPress={logout} title="Log out" />
        </>
      ) : (
        <>
          <Text style={{ color: 'white', marginBottom: 8 }}>
            Not logged in
          </Text>
          <Button onPress={login} title="Log in" />
        </>
      )}
      {errorMessage && (
        <Text style={{ color: 'red', marginTop: 8 }}>{errorMessage}</Text>
      )}
    </View>
  );
}
