import AppHeader from "@/components/AppHeader";
import { customDarkTheme } from "@/context/ReactNativePaper";
import { useReactMutation } from "@/hooks/useReactQuery";
import { useAuthStore } from "@/store/authStore";
import { createProfileMutation } from "@/supabase/dbMutation";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button, TextInput } from "react-native-paper";

const CreateProfile = () => {
  const session = useAuthStore((state) => state.session);
  const { push } = useRouter();

  const fullName = session?.user.user_metadata.full_name;
  const email = session?.user?.email;

  const [contact, setContact] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  const { mutate, isPending } = useReactMutation(
    ["create-profile"],
    createProfileMutation,
    {
      onSuccess: () => {
        push("/");
      },
      onError: (error) => {
        Alert.alert(error.message);
      },
    }
  );

  return (
    <View style={styles.container}>
      {/* Appbar for navigation back (optional, depending on flow) */}
      <AppHeader title="Create Profile" icons={false} backButton={false} />

      <KeyboardAvoidingView
        style={{ flex: 1 }} // Ensure it takes full height
        behavior={Platform.OS === "ios" ? "padding" : "height"} // 'padding' for iOS, 'height' for Android
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0} // Adjust offset if you have a fixed header
      >
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.headline}>Tell Us About Yourself</Text>

          {/* Full Name Input */}
          <TextInput
            label="Full Name"
            value={fullName}
            mode="outlined"
            style={styles.textInput}
            autoComplete="name"
            autoCapitalize="words"
            autoCorrect={false}
            maxLength={40}
            theme={{
              colors: {
                primary: customDarkTheme.colors.primary,
                text: customDarkTheme.colors.text,
                background: customDarkTheme.colors.surface,
                placeholder: customDarkTheme.colors.placeholder,
              },
            }}
            outlineColor={customDarkTheme.colors.primary}
            activeOutlineColor={customDarkTheme.colors.accent}
            placeholderTextColor={customDarkTheme.colors.placeholder}
          />

          <TextInput
            label="Email"
            value={email}
            mode="outlined"
            style={styles.textInput}
            disabled
            theme={{
              colors: {
                primary: customDarkTheme.colors.primary,
                text: customDarkTheme.colors.text,
                background: customDarkTheme.colors.surface,
                placeholder: customDarkTheme.colors.placeholder,
              },
            }}
            outlineColor={customDarkTheme.colors.primary}
            activeOutlineColor={customDarkTheme.colors.accent}
            placeholderTextColor={customDarkTheme.colors.placeholder}
          />

          {/* Contact Input */}
          <TextInput
            label="Contact Number"
            value={contact}
            onChangeText={setContact}
            mode="outlined"
            keyboardType="phone-pad"
            autoComplete="tel"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.textInput}
            maxLength={14}
            theme={{
              colors: {
                primary: customDarkTheme.colors.primary,
                text: customDarkTheme.colors.text,
                background: customDarkTheme.colors.surface,
                placeholder: customDarkTheme.colors.placeholder,
              },
            }}
            outlineColor={customDarkTheme.colors.primary}
            activeOutlineColor={customDarkTheme.colors.accent}
            placeholderTextColor={customDarkTheme.colors.placeholder}
          />

          {/* State Input */}
          <TextInput
            label="State"
            value={state}
            onChangeText={setState}
            mode="outlined"
            style={styles.textInput}
            autoComplete="postal-address-region"
            autoCapitalize="words"
            maxLength={40}
            theme={{
              colors: {
                primary: customDarkTheme.colors.primary,
                text: customDarkTheme.colors.text,
                background: customDarkTheme.colors.surface,
                placeholder: customDarkTheme.colors.placeholder,
              },
            }}
            outlineColor={customDarkTheme.colors.primary}
            activeOutlineColor={customDarkTheme.colors.accent}
            placeholderTextColor={customDarkTheme.colors.placeholder}
          />

          {/* Country Input */}
          <TextInput
            label="Country"
            value={country}
            onChangeText={setCountry}
            mode="outlined"
            style={styles.textInput}
            autoComplete="country"
            autoCapitalize="words"
            autoCorrect={false}
            maxLength={40}
            theme={{
              colors: {
                primary: customDarkTheme.colors.primary,
                text: customDarkTheme.colors.text,
                background: customDarkTheme.colors.surface,
                placeholder: customDarkTheme.colors.placeholder,
              },
            }}
            outlineColor={customDarkTheme.colors.primary}
            activeOutlineColor={customDarkTheme.colors.accent}
            placeholderTextColor={customDarkTheme.colors.placeholder}
          />

          {/* Create Profile Button */}
          <Button
            mode={isPending ? "outlined" : "contained"}
            disabled={isPending}
            onPress={() =>
              mutate({
                contact,
                state,
                country,
                date_of_birth: new Date(),
                user_id: session?.user.id!,
              })
            }
            style={styles.createButton}
            labelStyle={styles.createButtonText}
            contentStyle={styles.createButtonContent}
          >
            Create Profile
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default CreateProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: customDarkTheme.colors.background,
  },
  appBarHeader: {
    backgroundColor: customDarkTheme.colors.surface,
    elevation: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#333333",
  },
  appBarTitle: {
    color: customDarkTheme.colors.text,
    fontWeight: "bold",
    fontSize: 22,
  },
  scrollViewContent: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: "center", // Center content horizontally
  },
  headline: {
    fontSize: 26,
    fontWeight: "bold",
    color: customDarkTheme.colors.text,
    textAlign: "center",
    marginBottom: 30,
    marginTop: 10,
  },
  textInput: {
    marginBottom: 15,
    backgroundColor: customDarkTheme.colors.surface,
    color: customDarkTheme.colors.text,
    width: "100%", // Ensure inputs take full width
  },
  createButton: {
    marginTop: 30,
    borderRadius: 10,
    backgroundColor: customDarkTheme.colors.primary,
    paddingVertical: 10,
    width: "100%", // Full width button
  },
  createButtonText: {
    color: customDarkTheme.colors.onPrimary,
    fontWeight: "bold",
    fontSize: 18,
  },
  createButtonContent: {
    height: 40, // Ensure a good touch target size
  },
});
