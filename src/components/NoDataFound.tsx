import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Button } from "react-native-paper";
import Icon from "@react-native-vector-icons/material-design-icons";
import { customDarkTheme } from "@/context/ReactNativePaper";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

type NoDataFoundProps = {
  backButton?: boolean;
};

const NoDataFound = () => {
  const { back } = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Not Found Icon */}
        <Icon
          name="database-remove"
          size={100}
          color={customDarkTheme.colors.primary}
          style={styles.icon}
        />
        {/* Text: Data Not Found */}
        <Text style={styles.message}>Data Not Found</Text>
        <Text style={styles.subMessage}>
          We couldn't find the information you're looking for.
        </Text>
        {/* Go Back Button */}

        <Button
          mode="contained"
          onPress={back}
          style={styles.goBackButton}
          labelStyle={styles.goBackButtonText}
        >
          Go Back
        </Button>
      </View>
    </View>
  );
};

export default NoDataFound;

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
  message: {
    fontSize: 24,
    fontWeight: "bold",
    color: customDarkTheme.colors.text,
    marginBottom: 10,
    textAlign: "center",
  },
  subMessage: {
    fontSize: 16,
    color: customDarkTheme.colors.text,
    opacity: 0.7,
    marginBottom: 30,
    textAlign: "center",
  },
  goBackButton: {
    width: "80%", // Make the button a good width within the card
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: customDarkTheme.colors.primary,
  },
  goBackButtonText: {
    color: customDarkTheme.colors.onPrimary,
    fontWeight: "bold",
    fontSize: 18,
  },
});
