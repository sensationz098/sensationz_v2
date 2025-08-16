import IconImage from "@/assets/images/icon.png";
import GoogleAuth from "@/components/GoogleAuth";
import { customDarkTheme } from "@/context/ReactNativePaper";
import Icon from "@react-native-vector-icons/material-design-icons";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const SignInScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Central Image */}
        <View style={styles.imageContainer}>
          <Image
            source={IconImage} // Placeholder for LMS image
            style={styles.lmsImage}
            onError={(e) =>
              console.log("Image loading error:", e.nativeEvent.error)
            }
          />
        </View>

        {/* Platform Highlights */}
        <View style={styles.highlightsContainer}>
          <Text style={styles.highlightTitle}>
            Your One-Stop Platform to Learn, Perform & Grow
          </Text>
          <Text style={styles.highlightText}>
            <Icon
              name="check-circle"
              size={16}
              color={customDarkTheme.colors.primary}
            />
            Access live dance, music, yoga & fitness classes anytime, anywhere.
          </Text>
          <Text style={styles.highlightText}>
            <Icon
              name="check-circle"
              size={16}
              color={customDarkTheme.colors.primary}
            />
            Learn from certified professionals with interactive sessions.
          </Text>
          <Text style={styles.highlightText}>
            <Icon
              name="check-circle"
              size={16}
              color={customDarkTheme.colors.primary}
            />
            Get practice videos, notes, and free trial classes.
          </Text>
          <Text style={styles.highlightText}>
            <Icon
              name="check-circle"
              size={16}
              color={customDarkTheme.colors.primary}
            />
            Perform in national events and earn trophies & certificates.
          </Text>
        </View>

        {/* Continue with Google Button */}
        <GoogleAuth />

        {/* Optional: Terms and Privacy */}
        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>
            By continuing, you agree to our{" "}
            <Text style={styles.linkText}>Terms of Service</Text> and{" "}
            <Text style={styles.linkText}>Privacy Policy</Text>.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: customDarkTheme.colors.background,
  },
  scrollViewContent: {
    flexGrow: 1, // Allow content to grow and be scrollable
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  imageContainer: {
    marginBottom: 5,
    alignItems: "center",
  },
  lmsImage: {
    width: width * 0.7, // 70% of screen width
    height: width * 0.7 * (400 / 500), // Maintain aspect ratio of placeholder image (300x200)
    borderRadius: 15,
    resizeMode: "contain", // Ensure the whole image is visible
  },
  highlightsContainer: {
    marginBottom: 30,
    width: "100%",
    alignItems: "flex-start", // Align text to the left
  },
  highlightTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: customDarkTheme.colors.text,
    textAlign: "center",
    marginBottom: 20,
    width: "100%", // Ensure title takes full width for centering
  },
  highlightText: {
    fontSize: 16,
    color: customDarkTheme.colors.text,
    marginBottom: 10,
    lineHeight: 24, // Improve readability
    flexDirection: "row", // For icon and text alignment
    alignItems: "center",
  },

  termsContainer: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  termsText: {
    fontSize: 12,
    color: customDarkTheme.colors.text,
    opacity: 0.6,
    textAlign: "center",
    lineHeight: 18,
  },
  linkText: {
    color: customDarkTheme.colors.accent, // Use accent color for links
    fontWeight: "bold",
  },
});
