import { customDarkTheme } from "@/context/ReactNativePaper";
import {
  GoogleSignin,
  isSuccessResponse,
} from "@react-native-google-signin/google-signin";
import Icon from "@react-native-vector-icons/material-design-icons";
import React from "react";
import { Alert, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { supabase } from "../supabase/supabaseConfig";

const GoogleAuth = () => {
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      const response = await GoogleSignin.signIn();

      if (isSuccessResponse(response)) {
        const { error } = await supabase.auth.signInWithIdToken({
          provider: "google",
          token: response.data.idToken!,
        });

        if (error) throw new Error(error.message);
      }
    } catch (err) {
      Alert.alert("Internal Server Error");
    }
  };
  return (
    <Button
      mode="contained"
      onPress={signIn}
      style={styles.googleButton}
      labelStyle={styles.googleButtonText}
      icon={({ color, size }) => (
        <Icon name="google" size={size} color={color} />
      )}
    >
      Continue with Google
    </Button>
  );
};

export default GoogleAuth;

const styles = StyleSheet.create({
  googleButton: {
    width: "100%",
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: customDarkTheme.colors.primary, // Use primary color for button
    marginBottom: 20,
    elevation: 5, // Add shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  googleButtonText: {
    color: customDarkTheme.colors.onPrimary, // Text color on primary background
    fontSize: 16,
    fontWeight: "bold",
  },
});
