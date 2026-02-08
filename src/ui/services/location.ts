import * as Location from "expo-location";

export type ResolvedLocation = {
  label: string;
  latitude?: number;
  longitude?: number;
};

export const getCurrentLocation = async (): Promise<ResolvedLocation> => {
  const { status } =
    await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") {
    throw new Error("LOCATION_PERMISSION_DENIED");
  }

  const position = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  });
  const { latitude, longitude } = position.coords;

  const address = await Location.reverseGeocodeAsync({
    latitude,
    longitude,
  });

  if (address.length > 0) {
    const a = address[0];
    const label = `${a.city ?? ""} ${a.street ?? ""}`.trim();

    return {
      label: label || "Nykyinen sijainti",
      latitude,
      longitude,
    };
  }

  return {
    label: "Nykyinen sijainti",
    latitude,
    longitude,
  };
};
