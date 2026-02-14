import { useEffect, useState, useCallback } from "react";
import * as Location from "expo-location";

type Coordinates = {
  latitude: number;
  longitude: number;
};

export const useUserLocation = () => {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLocation = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { status } =
        await Location.getForegroundPermissionsAsync();

      if (status !== "granted") {
        const request =
          await Location.requestForegroundPermissionsAsync();

        if (request.status !== "granted") {
          setError("Location permission denied");
          return;
        }
      }

      const userLocation =
        await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

      setLocation({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      });
    } catch (err) {
      setError("Failed to fetch location");
    } finally {
      setLoading(false); 
    }
  }, []);

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  return {
    location,
    loading,
    error,
    refreshLocation: fetchLocation,
  };
};
