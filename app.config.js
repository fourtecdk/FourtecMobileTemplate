import 'dotenv/config'; // Required if building locally to read .env

export default {
  expo: {
    // Dynamically set from .env
    name: process.env.EXPO_PUBLIC_APP_NAME || "Fourtec Mobile Template",
    slug: process.env.EXPO_PUBLIC_APP_SLUG || "fourtec-mobile",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true,
      // Dynamic Bundle ID (e.g., com.fourtec.renoas)
      bundleIdentifier: `com.fourtec.${process.env.EXPO_PUBLIC_APP_SLUG || 'mobile'}`
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      // Dynamic Package Name
      package: `com.fourtec.${process.env.EXPO_PUBLIC_APP_SLUG || 'mobile'}`
    },
    web: {
      favicon: "./assets/images/favicon.png"
    },
    extra: {
      "eas": {
        "projectId": "114e515a-70f9-46d4-9d2c-9fcd1908d2e9"
      }
    }
  }
};