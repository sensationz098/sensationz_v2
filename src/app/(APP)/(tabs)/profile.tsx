import AppHeader from "@/components/AppHeader";
import { customDarkTheme } from "@/context/ReactNativePaper";
import { useAuthStore } from "@/store/authStore";
import { supabase } from "@/supabase/supabaseConfig";
import Icon from "@react-native-vector-icons/material-design-icons"; // Import MaterialCommunityIcons
import { Link, useRouter } from "expo-router";
import React from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

const ProfileScreen = () => {
  const { push } = useRouter();
  const session = useAuthStore((state) => state.session);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) return Alert.alert(error.message);
  };

  return (
    <View style={styles.profileContainer}>
      {/* Appbar for navigation back */}
      <AppHeader title="Profile" backButton={false} icons={false} />

      {/* Scrollable content for the profile screen */}
      <ScrollView
        contentContainerStyle={styles.profileScrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar Section */}
        <View style={styles.avatarContainer}>
          <Image
            source={{
              uri: session?.user.user_metadata.avatar_url,
            }} // Placeholder for user avatar
            style={styles.avatar}
          />
          <Text style={styles.userName}>
            {session?.user.user_metadata.full_name}
          </Text>
          <Text style={styles.userEmail}>{session?.user.email}</Text>
        </View>

        {/* Navigation Links */}
        <View style={styles.navigationLinksContainer}>
          <Link asChild href={"/edit-profile"}>
            <Button
              mode="text"
              onPress={() => push("/edit-profile")}
              icon={({ color, size }) => (
                <Icon name="account-edit" size={size} color={color} />
              )}
              labelStyle={styles.navLinkText}
              contentStyle={styles.navLinkContent}
              style={styles.navLinkButton}
            >
              Edit Profile
            </Button>
          </Link>

          <Link asChild href={"/transaction"}>
            <Button
              mode="text"
              icon={({ color, size }) => (
                <Icon name="cash-multiple" size={size} color={color} />
              )}
              labelStyle={styles.navLinkText}
              contentStyle={styles.navLinkContent}
              style={styles.navLinkButton}
            >
              Transactions
            </Button>
          </Link>

          <Link asChild href={"/contact-form"}>
            <Button
              mode="text"
              icon={({ color, size }) => (
                <Icon name="form-select" size={size} color={color} />
              )}
              labelStyle={styles.navLinkText}
              contentStyle={styles.navLinkContent}
              style={styles.navLinkButton}
            >
              Contact Forms
            </Button>
          </Link>

          <Link asChild href={"/about-us"}>
            <Button
              mode="text"
              icon={({ color, size }) => (
                <Icon name="information" size={size} color={color} />
              )}
              labelStyle={styles.navLinkText}
              contentStyle={styles.navLinkContent}
              style={styles.navLinkButton}
            >
              About Us
            </Button>
          </Link>

          <Button
            mode="contained"
            onPress={handleSignOut}
            icon={({ color, size }) => (
              <Icon name="account" size={size} color={color} />
            )}
            style={styles.logoutButton}
            labelStyle={styles.logoutButtonText}
          >
            Log Out
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    borderRadius: 8,
    marginVertical: 10,
    height: 40,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },

  profileContainer: {
    flex: 1,
    backgroundColor: customDarkTheme.colors.background,
  },
  appBarHeader: {
    backgroundColor: customDarkTheme.colors.surface, // AppBar background
    elevation: 0, // No shadow for a flatter look
    borderBottomWidth: 1,
    borderBottomColor: "#333333",
  },
  appBarTitle: {
    color: customDarkTheme.colors.text, // White text for app bar title
    fontWeight: "bold",
    fontSize: 22,
  },
  profileScrollViewContent: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: "center", // Center content horizontally
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60, // Make it circular
    borderWidth: 3,
    borderColor: customDarkTheme.colors.primary, // Primary color border for avatar
    marginBottom: 10,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: customDarkTheme.colors.text,
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: customDarkTheme.colors.text,
    opacity: 0.7,
  },
  navigationLinksContainer: {
    width: "100%", // Take full width
    paddingHorizontal: 10,
  },
  navLinkButton: {
    marginBottom: 10,
    borderRadius: 8,
    justifyContent: "flex-start", // Align icon and text to the start
    backgroundColor: customDarkTheme.colors.surface, // Background for navigation links
    elevation: 2, // Subtle shadow for buttons
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    paddingVertical: 5, // Add some vertical padding
  },
  navLinkContent: {
    height: 50, // Fixed height for consistent button size
  },
  navLinkText: {
    color: customDarkTheme.colors.onSurface, // Text color for navigation links
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 10, // Space between icon and text
  },
});

export default ProfileScreen;
