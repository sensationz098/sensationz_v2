import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Button } from "react-native-paper";
import Icon from "@react-native-vector-icons/material-design-icons";
import { customDarkTheme } from "@/context/ReactNativePaper";
import { Link } from "expo-router";

const { width } = Dimensions.get("window");
const NoCourse = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Icon for no courses */}
        <Icon
          name="book-open-outline"
          size={100}
          color={customDarkTheme.colors.primary}
          style={styles.icon}
        />

        {/* Headline and message */}
        <Text style={styles.headline}>No Courses Enrolled Yet!</Text>
        <Text style={styles.message}>
          It looks like you haven't enrolled in any courses. Start your learning
          journey now!
        </Text>

        {/* Browse All Courses Button */}
        <Link asChild href={"/"}>
          <Button
            mode="contained"
            style={styles.browseButton}
            labelStyle={styles.browseButtonText}
            icon={({ color, size }) => (
              <Icon name="magnify" size={size} color={color} />
            )}
          >
            Browse All Courses
          </Button>
        </Link>
      </View>
    </View>
  );
};

export default NoCourse;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: customDarkTheme.colors.background,
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
    padding: 20,
  },
  content: {
    alignItems: "center",
    padding: 20,
    backgroundColor: customDarkTheme.colors.surface,
    borderRadius: 12,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    width: "90%", // Make the card take up a good portion of the screen
    maxWidth: 400, // Limit max width for larger screens
  },
  icon: {
    marginBottom: 20,
  },
  headline: {
    fontSize: 24,
    fontWeight: "bold",
    color: customDarkTheme.colors.text,
    marginBottom: 10,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    color: customDarkTheme.colors.text,
    opacity: 0.7,
    marginBottom: 30,
    textAlign: "center",
    lineHeight: 24,
  },
  browseButton: {
    width: "100%", // Make the button a good width within the card
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: customDarkTheme.colors.primary,
  },
  browseButtonText: {
    color: customDarkTheme.colors.onPrimary,
    fontWeight: "bold",
    fontSize: 18,
  },
});
