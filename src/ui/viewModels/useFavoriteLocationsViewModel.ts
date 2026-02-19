import { useEffect, useState } from "react";
import { UserApiRepository } from "../../infrastructure/api/UserApiRepository";
import type { Location } from "../../domain/entities/Location";
import { useAuth } from "../auth/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useFavoriteLocationsViewModel = () => {
  const { user, getAccessToken } = useAuth();
  const repo = new UserApiRepository(getAccessToken);
  const [favorites, setFavorites] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadFavorites = async () => {
    setLoading(true);
    setError(null);
    try {
      // Use logged-in user's ID, fallback to AsyncStorage
      let userId = user?.user_id;
      if (!userId) {
        const storedUserId = await AsyncStorage.getItem("user_id");
        userId = storedUserId ? parseInt(storedUserId) : null;
      }
      
      if (!userId) {
        console.warn("No user_id available for loading favorite locations");
        return;
      }

      const data = await repo.getFavoriteLocations(userId);
      setFavorites(data);
    } catch (err: any) {
      const errMsg = err?.message ?? "Failed to load favorite locations";
      console.error(errMsg);
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const addFavorite = async (
    location: { label: string; latitude: number; longitude: number }
  ): Promise<{ success: boolean; error?: string }> => {
    setError(null);
    try {
      let userId = user?.user_id;
      if (!userId) {
        const storedUserId = await AsyncStorage.getItem("user_id");
        userId = storedUserId ? parseInt(storedUserId) : null;
      }
      
      if (!userId) {
        const errMsg = "No user_id available for adding favorite location";
        console.warn(errMsg);
        setError(errMsg);
        return { success: false, error: errMsg };
      }

      await repo.addFavoriteLocation(userId, location);
      await loadFavorites();
      return { success: true };
    } catch (err: any) {
      const errMsg = err?.message ?? "Failed to add favorite location";
      console.error(errMsg);
      setError(errMsg);
      return { success: false, error: errMsg };
    }
  };

  useEffect(() => {
    loadFavorites();
  }, [user?.user_id]);

  return {
    favorites,
    loading,
    error,
    addFavorite,
    reload: loadFavorites,
  };
};
