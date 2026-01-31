import { View, Text, Pressable } from 'react-native';
import MapView, { Marker, MapPressEvent } from 'react-native-maps';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/MapStyles';
import { TextInput } from 'react-native';
import { useRoute } from '@react-navigation/native';
import type { Location } from '../../domain/entities/Location';
import { useFavoriteLocationsViewModel } from '../viewModels/useFavoriteLocationsViewModel';

export const MapScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const [location, setLocation] = useState({
    latitude: 60.1699,
    longitude: 24.9384,
  });

  const { addFavorite } = useFavoriteLocationsViewModel();
  const [favoriteName, setFavoriteName] = useState("");

  /* Karttaa painamalla siirretään pinni */
  const handleMapPress = (event: MapPressEvent) => {
    setLocation(event.nativeEvent.coordinate);
  };

  /* Pinniä vetämällä siirretään pinni */
  const handleMarkerDragEnd = (event: any) => {
    setLocation(event.nativeEvent.coordinate);
  };

  /* Palautetaan sijainti NewGameScreeniin */
  const confirmLocation = () => {
    const pickedLocation: Location = {
      label: favoriteName || "Valittu sijainti",
      latitude: location.latitude,
      longitude: location.longitude,
    };

    route.params?.onPickLocation?.(pickedLocation);

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onPress={handleMapPress}
      >
        <Marker
          coordinate={location}
          draggable
          onDragEnd={handleMarkerDragEnd}
        />
      </MapView>

      <TextInput
        style={styles.input}
        placeholder="Nimeä sijainti (esim. Koti)"
        value={favoriteName}
        onChangeText={setFavoriteName}
      />

      <Pressable
        style={styles.secondaryButton}
        onPress={async () => {
          if (!favoriteName.trim()) return;

          await addFavorite({
            name: favoriteName,
            latitude: location.latitude,
            longitude: location.longitude,
          });

          setFavoriteName("");
        }}
      >
        <Text style={styles.secondaryButtonText}>
          Tallenna suosikiksi
        </Text>
      </Pressable>

      <View style={styles.header}>
        <Text style={styles.headerText}>
          Valitse sijainti kartalta
        </Text>

        <TextInput
          style={{
            backgroundColor: "#1E293B",
            color: "#F8FAFC",
            padding: 8,
            borderRadius: 8,
            marginTop: 8,
          }}
        />
      </View>

      <Pressable style={styles.confirmButton} onPress={confirmLocation}>
        <Text style={styles.confirmButtonText}>
          Valitse sijainti
        </Text>
      </Pressable>
    </View>
  );
};
