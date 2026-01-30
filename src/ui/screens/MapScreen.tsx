import { View, Pressable, Text } from "react-native";
import MapView, { Marker, MapPressEvent } from "react-native-maps";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export const MapScreen = () => {
  const navigation = useNavigation<any>();

  const [location, setLocation] = useState({
    latitude: 60.1699,
    longitude: 24.9384,
  });

  const onMapPress = (e: MapPressEvent) => {
    setLocation(e.nativeEvent.coordinate);
  };

  const confirmLocation = () => {
    navigation.navigate("NewGame", {
      pickedLocation: location,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onPress={onMapPress}
      >
        <Marker coordinate={location} />
      </MapView>

      <Pressable
        onPress={confirmLocation}
        style={{
          position: "absolute",
          bottom: 20,
          alignSelf: "center",
          backgroundColor: "#6c5ce7",
          padding: 12,
          borderRadius: 6,
        }}
      >
        <Text style={{ color: "white" }}>Valitse sijainti</Text>
      </Pressable>
    </View>
  );
};
