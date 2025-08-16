import ReactNativePaper from "@/context/ReactNativePaper";
import ReactQueryProvider from "@/context/ReactQueryProvider";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeProvider, DefaultTheme } from "@react-navigation/native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useAuthStore } from "@/store/authStore";
import { supabase } from "@/supabase/supabaseConfig";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

SplashScreen.preventAutoHideAsync();

GoogleSignin.configure({
  webClientId:
    "535569396954-vdc1cuvdgdrm5rotsj9hiphupqicmcgm.apps.googleusercontent.com",
  iosClientId:
    "535569396954-6j8dqr7ko76igo1e7gnl1bu9uv318p9k.apps.googleusercontent.com",
});

const InitialLayout = () => {
  const fetchSession = useAuthStore((state) => state.fetchSession);

  const [fontsLoaded, error] = useFonts({
    "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
    "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
    "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    fetchSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        useAuthStore.setState({ session });
        if (session) fetchSession();
        else
          useAuthStore.setState({ profile: { status: false, profile: null } });
      }
    );

    if (fontsLoaded) SplashScreen.hideAsync();

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView
      edges={["left", "right"]}
      style={{
        flex: 1,
      }}
    >
      <Slot />
    </SafeAreaView>
  );
};

export default function RootLayout() {
  return (
    <ReactQueryProvider>
      <ReactNativePaper>
        <ThemeProvider value={DefaultTheme}>
          <StatusBar style="dark" />
          <InitialLayout />
        </ThemeProvider>
      </ReactNativePaper>
    </ReactQueryProvider>
  );
}

// sumvanik technology
// import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
// import { useEffect } from 'react';
// import 'react-native-reanimated';

// import { useColorScheme } from '@/components/useColorScheme';

// export {
//   // Catch any errors thrown by the Layout component.
//   ErrorBoundary,
// } from 'expo-router';

// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: '(tabs)',
// };

// // Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const [loaded, error] = useFonts({
//     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//     ...FontAwesome.font,
//   });

//   // Expo Router uses Error Boundaries to catch errors in the navigation tree.
//   useEffect(() => {
//     if (error) throw error;
//   }, [error]);

//   useEffect(() => {
//     if (loaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded]);

//   if (!loaded) {
//     return null;
//   }

//   return <RootLayoutNav />;
// }

// function RootLayoutNav() {
//   const colorScheme = useColorScheme();

//   return (
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//       <Stack>
//         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//         <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
//       </Stack>
//     </ThemeProvider>
//   );
// }
