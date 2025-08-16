import { customDarkTheme } from "@/context/ReactNativePaper";
import Icon from "@react-native-vector-icons/material-design-icons";
import { Dimensions, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

const { width } = Dimensions.get("window");

const JoinWhatsapp = () => {
  const handleJoinWhatsApp = () => {
    // In a real application, you would use Linking to open the WhatsApp group link
    // Example: Linking.openURL('https://chat.whatsapp.com/YOUR_GROUP_INVITE_CODE');
    console.log("Attempting to join WhatsApp group...");

    // You might want to show a success message or navigate back
  };
  return (
    <View style={styles.container}>
      {/* Optional Appbar for navigation back */}
      {/* <AppHeader title="Join Our Community" backButton={false} icons={false} /> */}

      <View style={styles.content}>
        {/* WhatsApp Icon */}
        <Icon
          name="whatsapp"
          size={120}
          color="#25D366"
          style={styles.whatsappIcon}
        />
        {/* Text Message */}
        <Text style={styles.messageTitle}>Join Our Community on WhatsApp!</Text>
        <Text style={styles.messageText}>
          Stay updated with announcements, connect with fellow learners, and get
          quick support.
        </Text>
        {/* Join WhatsApp Group Button */}
        <Button
          mode="contained"
          onPress={handleJoinWhatsApp}
          style={styles.joinButton}
          labelStyle={styles.joinButtonText}
          icon={({ color, size }) => (
            <Icon name="whatsapp" size={size} color={color} />
          )}
        >
          Join WhatsApp Group
        </Button>
      </View>
    </View>
  );
};

export default JoinWhatsapp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: customDarkTheme.colors.background,
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
  },
  appBarHeader: {
    backgroundColor: customDarkTheme.colors.surface,
    elevation: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#333333",
    position: "absolute", // Position at top
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1, // Ensure it's above other content
  },
  appBarTitle: {
    color: customDarkTheme.colors.text,
    fontWeight: "bold",
    fontSize: 22,
  },
  content: {
    flex: 1, // Take available space
    justifyContent: "center", // Center content within this view
    alignItems: "center",
    padding: 20,
    width: "90%", // Constrain width for better readability
    maxWidth: 400, // Max width for larger screens
    backgroundColor: customDarkTheme.colors.surface,
    borderRadius: 12,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  whatsappIcon: {
    marginBottom: 30,
  },
  messageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: customDarkTheme.colors.text,
    textAlign: "center",
    marginBottom: 15,
  },
  messageText: {
    fontSize: 16,
    color: customDarkTheme.colors.text,
    opacity: 0.7,
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 24,
  },
  joinButton: {
    width: "90%", // Button width within the card
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#25D366", // WhatsApp green
  },
  joinButtonText: {
    color: "#FFFFFF", // White text on WhatsApp green
    fontWeight: "bold",
    fontSize: 18,
  },
});
