import { Platform } from 'react-native';
import { readAsStringAsync, EncodingType } from 'expo-file-system/legacy';
import { authFetch } from '../../infrastructure/api/authFetch';
import Constants from 'expo-constants';

// Uploads a profile image by converting it to base64 and calling the backend.
// This way uploading works both on web and native
export async function uploadProfileImage(
    imageUri: string,
    getAccessToken: () => Promise<string | null>
): Promise<string> {
    const apiUrl = Constants.expoConfig?.extra?.API_URL;
    let base64Image: string;

    try {
        if (Platform.OS === 'web') {
            // On web, convert the fetched blob to base64 using FileReader
            const response = await fetch(imageUri);
            const blob = await response.blob();

            base64Image = await new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const result = reader.result as string;
                    const base64 = result.split(',')[1];
                    resolve(base64);
                };
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });

        } else {
            // On native, read the local file directly as base64
            base64Image = await readAsStringAsync(imageUri, {
                encoding: EncodingType.Base64,
            });
        }

        // Upload to backend
        const response = await authFetch(
            getAccessToken,
            `${apiUrl}/users/newAvatar`,
            {
                method: "POST",
                body: JSON.stringify({ image: base64Image }),
            }
        );

        if (!response.ok) {
            const text = await response.text();
            throw new Error(`UPLOAD_FAILED: ${response.status} ${text}`);
        }

        const result = await response.json();
        return result.avatar_url || result.avatarUrl;  // Support both snake_case and camelCase
    } catch (error) {
        console.error("Upload error:", error);
        throw error;
    }
}