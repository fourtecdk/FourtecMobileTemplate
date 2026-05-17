module.exports = {
  expo: {
    // 1. App Identity Mapping
    name: process.env.EXPO_PUBLIC_APP_NAME || "Fourtec Mobile Template",
    slug: process.env.EXPO_PUBLIC_APP_SLUG || "fourtec-mobile",
    owner: "bruger2",
    
    // 2. Main Bundle and Platform Specifications
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: `com.fourtec.${process.env.EXPO_PUBLIC_APP_SLUG || 'mobile'}`
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      // Dynamically matches the package namespace to prevent cross-app installation overwrites
      package: `com.fourtec.${(process.env.EXPO_PUBLIC_APP_SLUG || 'mobile').replace(/[^a-zA-Z0-9]/g, '')}`
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    plugins: ["expo-router"],
    
    // 3. The Dynamic Linking Engine
    extra: {
      eas: {
        // Reads the UUID from the pipeline execution block.
        // If undefined, local builds gracefully fall back to native credentials.
        projectId: process.env.EXPO_PROJECT_ID || undefined
      }
    }
  }
};