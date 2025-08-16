import Loader from "@/components/Loader";
import { useAuthStore } from "@/store/authStore";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const session = useAuthStore((state) => state.session);

  const loading = useAuthStore((state) => state.loading);

  if (loading) return <Loader />;

  if (session) return <Redirect href="/" />;
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sign-in" />
    </Stack>
  );
}
