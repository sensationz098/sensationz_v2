import Loader from "@/components/Loader";
import { useAuthStore } from "@/store/authStore";
import { Redirect, Stack } from "expo-router";

export default function AppLayout() {
  const session = useAuthStore((state) => state.session);

  const loading = useAuthStore((state) => state.loading);

  if (loading) return <Loader />;

  if (!session) return <Redirect href="/sign-in" />;

  return (
    <Stack
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="extend-course" />
      <Stack.Screen name="all-categories" />
      <Stack.Screen name="course/categories/[name]" />
      <Stack.Screen name="course/details/[id]" />
      <Stack.Screen name="transaction" />
      <Stack.Screen name="edit-profile" />
      <Stack.Screen name="contact-form" />
      <Stack.Screen name="about-us" />
      <Stack.Screen name="create-profile" />
      <Stack.Screen name="summary" />
      <Stack.Screen name="notification" />
      <Stack.Screen name="teacher/[id]" />
      <Stack.Screen name="transaction/[id]" />
    </Stack>
  );
}
