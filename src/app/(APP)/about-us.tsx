import NewLogo from "@/assets/images/logo-new.png";
import AppHeader from "@/components/AppHeader";
import { customDarkTheme } from "@/context/ReactNativePaper";
import Icon from "@react-native-vector-icons/material-design-icons";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Card } from "react-native-paper";
import * as ExpoWebBrowser from "expo-web-browser";

const { width } = Dimensions.get("window");

const AboutUs = () => {
  const handleCardPress = (type: string, value: string) => {
    console.log(`Action for ${type}: ${value}`);
    // Implement actual navigation or action here
    if (type === "Website") {
      // Linking.openURL(value); // In a real app, use Linking from react-native
    } else if (type === "Email Us") {
      // Linking.openURL(`mailto:${value}`);
    } else if (type === "Contact No.") {
      // Linking.openURL(`tel:${value}`);
    }
  };

  const handleTerms = async (variant: "terms" | "privacy") => {
    const termsPage =
      "https://sensationzperformingarts.com/terms-and-conditions/";

    const privacyPage = "https://sensationzperformingarts.com/privacy-policy/";

    if (variant === "terms") {
      await ExpoWebBrowser.openAuthSessionAsync(termsPage);
    } else {
      await ExpoWebBrowser.openAuthSessionAsync(privacyPage);
    }
  };

  return (
    <View style={styles.container}>
      {/* Appbar for navigation back */}
      <AppHeader title="About Us" icons={false} backButton={true} />

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Hero Image/Banner */}
        <Image
          source={NewLogo}
          style={styles.heroImage}
          onError={(e) =>
            console.log("Hero image loading error:", e.nativeEvent.error)
          }
        />
        {/* Who We Are Section */}
        <View style={styles.whoWeAreContainer}>
          <Text style={styles.whoWeAreTitle}>Who We Are</Text>
          <Text style={styles.whoWeAreText}>
            Sensationz Media and Arts Pvt. Ltd. is a leading online platform
            dedicated to nurturing creativity through expert-led virtual classes
            in Dance, Yoga, Fitness, and Music.
          </Text>
          <Text style={styles.whoWeAreText}>
            Since 2007, we've been empowering learners across all 28 Indian
            states and 18+ countries worldwide with high-quality training,
            flexible learning options, and performance opportunities — all from
            the comfort of your home.
          </Text>

          <Text style={styles.whoWeAreText}>
            With live sessions, recorded demos, and certified instructors,
            Sensationz helps you build confidence, skill, and global
            recognition.
          </Text>

          <Text style={styles.whoWeAreText}>
            100% Online | Certified Instructors | Global Reach
          </Text>
        </View>
        <Text style={styles.sectionDescription}>
          Connect with us and explore our policies below.
        </Text>
        {/* Bento Grid for Info Cards */}
        {/*  <View style={styles.bentoGridContainer}>
         {aboutInfo.map((item) => (
            <TouchableOpacity
              key={item.id}
              // style={styles.infoCardWrapper}
              style={[
                styles.infoCardWrapper,
                item.type === "large" ? styles.largeCard : styles.smallCard,
              ]}
              onPress={() => handleCardPress(item.title, item.value)}
            >
              <Card style={styles.infoCard} key={item.id}>
                <Card.Content style={styles.infoCardContent}>
                  <Icon
                    name={item.icon}
                    size={50}
                    color={customDarkTheme.colors.primary}
                    style={styles.infoIcon}
                  />
                  <Text style={styles.infoIcon}>{item.icon}</Text>
                  <Text style={styles.infoCardTitle}>{item.title}</Text>
                  <Text style={styles.infoCardValue}>{item.value}</Text>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          ))} 
        </View> */}
        {/* Policy Links in a Card */}
        <Card style={styles.policyCard}>
          <Card.Content>
            <Text style={styles.policyCardTitle}>Our Policies</Text>
            <TouchableOpacity
              onPress={() => handleTerms("privacy")}
              style={styles.policyLinkButton}
            >
              <Icon
                name="shield-lock"
                size={20}
                color={customDarkTheme.colors.accent}
              />
              <Text style={styles.policyLinkText}>Privacy Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleTerms("terms")}
              style={styles.policyLinkButton}
            >
              <Icon
                name="file-document"
                size={20}
                color={customDarkTheme.colors.accent}
              />
              <Text style={styles.policyLinkText}>Terms & Conditions</Text>
            </TouchableOpacity>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
};

export default AboutUs;

const styles = StyleSheet.create({
  ModalButton: {
    marginTop: 10,
    width: "100%",
    color: customDarkTheme.colors.primary,
    borderRadius: 10,
  },
  ModalText: {
    fontSize: 16,
    color: customDarkTheme.colors.text,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  ModalHeader: {
    paddingHorizontal: 8,
    fontSize: 20,
    fontWeight: "bold",
    color: customDarkTheme.colors.primary,
  },
  ModalContainer: {
    padding: 10,
    backgroundColor: customDarkTheme.colors.surface,
    margin: 15,
    borderRadius: 10,
  },
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
  heroImage: {
    width: "100%",
    height: width * 0.5, // Responsive height
    borderRadius: 12,
    marginBottom: 30,
    resizeMode: "contain",
  },
  whoWeAreContainer: {
    width: "100%",
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  whoWeAreTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: customDarkTheme.colors.text,
    textAlign: "center",
    marginBottom: 15,
  },
  whoWeAreText: {
    fontSize: 16,
    color: customDarkTheme.colors.text,
    opacity: 0.8,
    textAlign: "center",
    lineHeight: 24,
  },
  sectionDescription: {
    fontSize: 16,
    color: customDarkTheme.colors.text,
    opacity: 0.8,
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  bentoGridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 30,
  },
  infoCardWrapper: {
    aspectRatio: 1, // Ensure cards are square
    marginBottom: 15,
    borderRadius: 12,
    overflow: "hidden",
    // Add a subtle border or shadow for better separation
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)", // Light border
  },
  largeCard: {
    width: "98%", // Nearly full width for the first card
  },
  smallCard: {
    width: "48%", // Half width for the other two cards
  },
  infoCard: {
    flex: 1,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  infoCardContent: {
    backgroundColor: "red",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  infoIcon: {
    marginBottom: 10,
  },
  infoCardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: customDarkTheme.colors.onSurface,
    textAlign: "center",
    marginBottom: 5,
  },
  infoCardValue: {
    fontSize: 14,
    color: customDarkTheme.colors.onSurface,
    opacity: 0.7,
    textAlign: "center",
  },
  policyCard: {
    width: "100%",
    borderRadius: 12,
    backgroundColor: customDarkTheme.colors.surface,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    paddingVertical: 10, // Add some vertical padding inside the card
  },
  policyCardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: customDarkTheme.colors.onSurface,
    textAlign: "center",
    marginBottom: 15,
  },
  policyLinkButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.05)", // Subtle background for links
  },
  policyLinkText: {
    fontSize: 16,
    color: customDarkTheme.colors.accent,
    fontWeight: "600",
    marginLeft: 10,
  },
});
