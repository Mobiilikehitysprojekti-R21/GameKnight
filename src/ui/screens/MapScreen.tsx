import { View, Text, Pressable } from 'react-native';
import MapView, { Marker, MapPressEvent } from 'react-native-maps';
import { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/MapStyles';
import { TextInput } from 'react-native';
import { useRoute } from '@react-navigation/native';
import type { Location as DomainLocation } from '../../domain/entities/Location';
import { colors } from '../styles/theme';
import { useUserLocation } from '../viewModels/useUserLocation';
import { useFavoriteLocationsViewModel } from '../viewModels/useFavoriteLocationsViewModel';
import { useGameSessionDraftViewModel } from "../viewModels/useGameSessionDraftViewModel";


export const MapScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { favorites } = useFavoriteLocationsViewModel();
  const { location: userLocation, loading, error, refreshLocation } = useUserLocation();
  const mapRef = useRef<MapView>(null);
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const { setLocation } = useGameSessionDraftViewModel();


  useEffect(() => {
    if (userLocation) {
      setSelectedLocation(userLocation);

      mapRef.current?.animateToRegion(
        {
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000
      );
    }
  }, [userLocation]);

  const [favoriteName, setFavoriteName] = useState("");

  const handleMapPress = (event: MapPressEvent) => {
    setSelectedLocation(event.nativeEvent.coordinate);
  };

  const handleMarkerDragEnd = (event: any) => {
    setSelectedLocation(event.nativeEvent.coordinate);
  };

const confirmLocation = () => {
  if (!selectedLocation) return;

  setLocation({
    label: favoriteName || "Valittu sijainti",
    latitude: selectedLocation.latitude,
    longitude: selectedLocation.longitude,
  });

  navigation.goBack();
};

  if (loading)
    return (
      <View style={styles.container}>
        <Text>Haetaan sijaintia...</Text>
      </View>
    );


  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!selectedLocation) {
    return null;
  }


  return (
    <View style={styles.container}>
      <Pressable
        style={styles.refreshButton}
        onPress={refreshLocation}
      >
        <Text style={{ color: "white" }}>Päivitä sijainti</Text>
      </Pressable>

      <MapView
        ref={mapRef}
        style={styles.map}
        region={{
          latitude: selectedLocation.latitude,
          longitude: selectedLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onPress={handleMapPress}
      >
        {favorites.map((fav) => (
          <Marker
            key={`${fav.latitude}-${fav.longitude}`}
            coordinate={{
              latitude: fav.latitude,
              longitude: fav.longitude,
            }}
            title={fav.label}
            pinColor="gold"
            onPress={() =>
              setSelectedLocation({
                latitude: fav.latitude,
                longitude: fav.longitude,
              })
            }
          />
        ))}

        <Marker
          coordinate={selectedLocation}
          draggable
          onDragEnd={handleMarkerDragEnd}
        />
      </MapView>


      <View style={styles.bottomContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nimeä sijainti"
          placeholderTextColor={colors.textSecondary}
          value={favoriteName}
          onChangeText={setFavoriteName}
        />

        <Pressable
          style={styles.confirmButton}
          onPress={confirmLocation}
        >
          <Text style={styles.confirmButtonText}>
            Valitse sijainti
          </Text>
        </Pressable>
      </View>
    </View>
  );
};