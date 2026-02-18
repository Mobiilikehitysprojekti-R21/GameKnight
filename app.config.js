const config = {
    name: 'GameKnight',
    slug: 'GameKnight',
    scheme: "gameknight",
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    newArchEnabled: true,
    plugins: [
        [
            "expo-web-browser",
            "expo-secure-store",
        ]
    ],
    splash: {
        image: './assets/splash-icon.png',
        resizeMode: 'contain',
        backgroundColor: '#ffffff',
    },
    ios: {
        supportsTablet: true,
    },
    android: {
        adaptiveIcon: {
            foregroundImage: './assets/adaptive-icon.png',
            backgroundColor: '#ffffff',
        },
        edgeToEdgeEnabled: true,
        predictiveBackGestureEnabled: false,
    },
    web: {
        favicon: './assets/favicon.png',
    },
    extra: {
        API_URL: process.env.EXPO_PUBLIC_API_URL ?? process.env.API_URL,
    },

};

export default config;