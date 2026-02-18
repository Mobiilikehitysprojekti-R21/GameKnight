import * as ImagePicker from "expo-image-picker";

// Image picker helper for selecting and returning a gallery image URI.

export async function pickImageFromGallery(): Promise<string | null> {
  // Ask media library permission
  const permission =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permission.granted) {
    throw new Error("MEDIA_PERMISSION_DENIED");
  }

  // Open picker
  // use square crop
  // moderate quality to keep uploads small 
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.7,
  });

  // User closed picker without selecting an image
  if (result.canceled) {
    return null;
  }

  return result.assets[0].uri;
}
