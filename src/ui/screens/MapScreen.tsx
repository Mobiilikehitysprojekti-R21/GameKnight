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
  const { favorites, addFavorite } = useFavoriteLocationsViewModel();
  const { location: userLocation, loading, error, refreshLocation } = useUserLocation();
  const mapRef = useRef<MapView>(null);
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const { setLocation } = useGameSessionDraftViewModel();
  const [name, setName] = useState("");
  const [saveMessage, setSaveMessage] = useState<string | null>(null);


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

  const handleMapPress = (event: MapPressEvent) => {
    setSelectedLocation(event.nativeEvent.coordinate);
  };

  const handleMarkerDragEnd = (event: any) => {
    setSelectedLocation(event.nativeEvent.coordinate);
  };

  const saveAsFavorite = async () => {
    if (!selectedLocation || !name.trim()) {
      setSaveMessage("Anna sijainnille nimi");
      return;
    }

    const result = await addFavorite({
      label: name,
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
    });

    if (result.success) {
      setSaveMessage("✓ Sijainti tallennettu suosikiksi");
      // Go back and pass the newly saved favorite
      setTimeout(() => {
        navigation.goBack();
      }, 1000);
    } else {
      setSaveMessage(`Virhe: ${result.error}`);
    }
  };

const confirmLocation = () => {
  if (!selectedLocation) return;

  setLocation({
    label: name || "Valittu sijainti",
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
          value={name}
          onChangeText={setName}
        />

        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Pressable
            style={[styles.confirmButton, { flex: 1 }]}
            onPress={saveAsFavorite}
          >
            <Text style={styles.confirmButtonText}>Tallenna suosikiksi</Text>
          </Pressable>

          <Pressable
            style={[styles.confirmButton, { flex: 1 }]}
            onPress={confirmLocation}
          >
            <Text style={styles.confirmButtonText}>Valitse sijainti</Text>
          </Pressable>
        </View>

        {saveMessage && (
          <Text style={{ marginTop: 8, textAlign: 'center', color: colors.textSecondary }}>
            {saveMessage}
          </Text>
        )}
      </View>
    </View>
  );
};