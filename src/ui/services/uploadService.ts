import { Platform } from 'react-native';
import { readAsStringAsync, EncodingType } from 'expo-file-system/legacy';
import { authFetch } from '../../infrastructure/api/authFetch';
import Constants from 'expo-constants';

export async function uploadProfileImage(
    imageUri: string,
    getAccessToken: () => Promise<string | null>
): Promise<string> {
    const apiUrl = Constants.expoConfig?.extra?.API_URL;
    let base64Image: string;

    try {
        if (Platform.OS === 'web') {
            console.log("1. Web platform: using FileReader");
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

            console.log("2. Base64 extracted from FileReader, length:", base64Image.length);
        } else {
            console.log("1. Native platform: using expo-file-system");
            base64Image = await readAsStringAsync(imageUri, {
                encoding: EncodingType.Base64,
            });
            console.log("2. Base64 read from file system, length:", base64Image.length);
        }

        console.log("3. API URL:", apiUrl);
        console.log("4. Uploading base64 image...");
        const response = await authFetch(
            getAccessToken,
            `${apiUrl}/users/newAvatar`,
            {
                method: "POST",
                body: JSON.stringify({ image: base64Image }),
            }
        );

        console.log("5. Response status:", response.status, "ok:", response.ok);

        if (!response.ok) {
            const text = await response.text();
            console.error("6. Upload failed:", response.status, text);
            throw new Error(`UPLOAD_FAILED: ${response.status} ${text}`);
        }

        const result = await response.json();
        console.log("6. Full backend response:", result);
        console.log("7. result.avatarUrl:", result.avatarUrl);
        console.log("7. result.avatar_url:", result.avatar_url);
        console.log("7. result.filePath:", result.filePath);
        console.log("7. All keys in response:", Object.keys(result));
        return result.avatar_url || result.avatarUrl;  // Support both snake_case and camelCase
    } catch (error) {
        console.error("Upload error:", error);
        throw error;
    }
}