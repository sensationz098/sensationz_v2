import AppHeader from "@/components/AppHeader";
import { customDarkTheme } from "@/context/ReactNativePaper";
import Icon, {
  MaterialDesignIcons,
} from "@react-native-vector-icons/material-design-icons";
import { Link, useRouter } from "expo-router";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Card } from "react-native-paper";

const { width } = Dimensions.get("window");

const AllCategories = () => {
  const categories = [
    { id: "1", name: "Yoga", icon: "meditation", size: "large" },
    { id: "2", name: "Spoken", icon: "microphone-variant", size: "small" },
    { id: "3", name: "Dance", icon: "human-female-dance", size: "small" },
    { id: "4", name: "Fitness", icon: "dumbbell", size: "large" },
    { id: "5", name: "Crash", icon: "lightning-bolt", size: "small" },
    { id: "6", name: "Music", icon: "music", size: "small" },
  ];

  type RenderItemType = {
    id: string;
    name: string;
    icon: (typeof MaterialDesignIcons)[keyof typeof MaterialDesignIcons];
    size: string;
  };

  // Function to render each category item
  const renderCategoryItem = (item: RenderItemType) => {
    const { push } = useRouter();

    // Calculate width based on 'size' property for bento grid effect
    // Small items will be roughly half the width, large items will be wider
    const itemWidth = item.size === "large" ? width * 0.92 : width * 0.44; // Adjusted for padding/margins

    return (
      <TouchableOpacity
        key={item.id}
        style={[styles.categoryCardWrapper, { width: itemWidth }]}
        onPress={() => push(`/course/categories/${item.name}`)}
      >
        <Card style={styles.categoryCard}>
          <Card.Content style={styles.categoryCardContent}>
            <Icon
              name={item.icon}
              size={50}
              color={customDarkTheme.colors.primary}
              style={styles.categoryIcon}
            />
            <Text style={styles.categoryTitle}>{item.name}</Text>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <AppHeader title="All Categories" backButton={true} icons={false} />

      {/* Scrollable content for the categories grid */}
      <ScrollView contentContainerStyle={styles.categoriesGridContainer}>
        <View style={styles.bentoGrid}>
          {categories.map((item) => renderCategoryItem(item))}
        </View>
      </ScrollView>
    </View>
  );
};

export default AllCategories;

const styles = StyleSheet.create({
  container: {
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
  categoriesGridContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10, // Slightly less horizontal padding for grid items
  },
  bentoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between", // Distribute items evenly
    alignItems: "flex-start", // Align items to the top
  },
  categoryCardWrapper: {
    marginBottom: 15, // Space between rows
    marginHorizontal: 5, // Space between columns
    aspectRatio: 1, // Ensure cards are square for a grid look
  },
  categoryCard: {
    flex: 1, // Take full space of wrapper
    borderRadius: 12,
    backgroundColor: customDarkTheme.colors.surface,
    elevation: 5, // Subtle shadow for depth
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
  },
  categoryCardContent: {
    justifyContent: "center",
    alignItems: "center",
    padding: 15, // Padding inside the card content
  },
  categoryIcon: {
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: customDarkTheme.colors.onSurface,
    textAlign: "center",
  },
});
