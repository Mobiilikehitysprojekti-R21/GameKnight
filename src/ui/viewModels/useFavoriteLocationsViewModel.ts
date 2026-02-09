import { useEffect, useState } from "react";
import { UserApiRepository } from "../../infrastructure/api/UserApiRepository";
import type { Location } from "../../domain/entities/Location";

const repo = new UserApiRepository();

// dummy käyttäjä 
const USER_ID = 1;

export const useFavoriteLocationsViewModel = () => {
  const [favorites, setFavorites] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);

  const loadFavorites = async () => {
    setLoading(true);
    try {
      const data = await repo.getFavoriteLocations(USER_ID);
      setFavorites(data);
    } finally {
      setLoading(false);
    }
  };

  const addFavorite = async (
    location: { name: string; latitude: number; longitude: number }
  ) => {
    await repo.addFavoriteLocation(USER_ID, location);
    await loadFavorites();
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  return {
    favorites,
    loading,
    addFavorite,
    reload: loadFavorites,
  };
};
