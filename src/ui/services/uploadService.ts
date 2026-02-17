import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { authFetchMultipart } from '../../infrastructure/api/authFetch';
import Constants from 'expo-constants';

export async function uploadProfileImage(
    imageUri: string,
    getAccessToken: () => Promise<string | null>
): Promise<void> {

    console.log("Image URI:", imageUri);
    console.log("URI type:", typeof imageUri);
    const token = getAccessToken()
    try {
        console.log("1. Fetching image as blob...");
        const res = await fetch(imageUri);
        console.log("2. Fetch response status:", res.status);

        const blob = await res.blob();
        console.log("3. Blob created, size:", blob.size, "type:", blob.type);

        const formData = new FormData();
        formData.append("file", blob, "profile.jpg");
        console.log("4. FormData created");

        const apiUrl = Constants.expoConfig?.extra?.API_URL;
        console.log("5. API URL:", apiUrl);

        console.log("6. Calling authFetchMultipart...");
        const response = await authFetchMultipart(
            getAccessToken,
            `${apiUrl}/users/newAvatar`,
            {
                method: "POST",
                body: formData,
            }
        );

        console.log("7. Response status:", response.status, "ok:", response.ok);

        if (!response.ok) {
            const text = await response.text();
            console.error("8. Upload failed:", response.status, text);
            throw new Error(`UPLOAD_FAILED: ${response.status} ${text}`);
        }

        console.log("9. Upload successful!");
    } catch (error) {
        console.error("Upload error at some point:", error);
        throw error;
    }
}