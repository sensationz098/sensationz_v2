import AppHeader from "@/components/AppHeader";
import ErrorScreen from "@/components/Error";
import Loader from "@/components/Loader";
import { customDarkTheme } from "@/context/ReactNativePaper";
import { useReactQuery } from "@/hooks/useReactQuery";
import { useAuthStore } from "@/store/authStore";
import { getAllCourse } from "@/supabase/dbQuery";
import { GetAllCourseType } from "@/types";
import { Link, useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Button, Card, Text } from "react-native-paper";

const { width } = Dimensions.get("window");

const CourseTab = () => {
  const { push } = useRouter();
  const session = useAuthStore((state) => state.session);

  const {
    data: course,
    isLoading,
    isError,
    error,
  } = useReactQuery<GetAllCourseType[] | null>(["course"], getAllCourse);

  if (isLoading) return <Loader />;

  if (isError) return <ErrorScreen errorMessage={error?.message} />;

  // const handleExtendPress = (id: string) => {
  //   push(`/course/details/${id}`);
  // };

  // const { isLoading: isLoadingExtendCourse } = extendCourse;

  return (
    <View style={styles.container}>
      {/* Header Component */}
      <AppHeader title="Courses" backButton={false} icons={true} />

      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Section: Popular Categories */}
        <View style={styles.sectionHeaderContainer}>
          <Text style={styles.sectionTitle}>Popular Categories</Text>
          <Link asChild href={"/all-categories"}>
            <Button
              mode="text"
              onPress={() => {}}
              labelStyle={styles.viewAllButtonText}
              contentStyle={styles.viewAllButtonContent}
            >
              Explore All
            </Button>
          </Link>
        </View>

        <View style={styles.categoryGrid}>
          <Link asChild href={"/course/categories/Yoga"}>
            <Button
              mode="contained"
              style={styles.categoryButton}
              labelStyle={styles.categoryButtonText}
            >
              Yoga
            </Button>
          </Link>
          <Link asChild href={"/course/categories/Dance"}>
            <Button
              mode="outlined"
              style={styles.categoryButton}
              labelStyle={styles.categoryButtonText}
            >
              Dance
            </Button>
          </Link>
          <Link asChild href={"/course/categories/Music"}>
            <Button
              mode="outlined"
              style={styles.categoryButton}
              labelStyle={styles.categoryButtonText}
            >
              Music
            </Button>
          </Link>

          <Link asChild href={"/course/categories/Fitness"}>
            <Button
              mode="outlined"
              style={styles.categoryButton}
              labelStyle={styles.categoryButtonText}
            >
              Fitness
            </Button>
          </Link>

          <Link asChild href={"/course/categories/Spoken"}>
            <Button
              mode="outlined"
              style={styles.categoryButton}
              labelStyle={styles.categoryButtonText}
            >
              Spoken
            </Button>
          </Link>

          <Link asChild href={"/course/categories/Crash"}>
            <Button
              mode="outlined"
              style={styles.categoryButton}
              labelStyle={styles.categoryButtonText}
            >
              Crash
            </Button>
          </Link>
        </View>

        {/* Section: Recommended for You */}
        <View style={styles.sectionHeaderContainer}>
          <Text style={styles.sectionTitle}>Recommended for You</Text>
        </View>
        <FlatList
          data={course}
          scrollEnabled={false}
          keyExtractor={(item) => item.id}
          bounces
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Card key={item.image_url} style={styles.featuredCourseCard}>
              <Card.Cover
                source={{
                  uri:
                    item.image_url ||
                    "https://unsplash.com/photos/a-lone-person-standing-in-the-middle-of-a-desert-bhKqZNZeAR0",
                }}
                style={styles.featuredCardImage}
              />
              <Card.Content>
                <Text style={styles.featuredCardTitle}>{item.title}</Text>
                <Text style={styles.featuredCardSubtitle} numberOfLines={2}>
                  {item.description}
                </Text>
                <Link asChild href={`/course/details/${item.id}`}>
                  <Button
                    mode="contained"
                    style={styles.cardButton}
                    labelStyle={styles.cardButtonText}
                  >
                    Enroll Now
                  </Button>
                </Link>
              </Card.Content>
            </Card>
          )}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: customDarkTheme.colors.background, // Use the custom dark background
  },
  scrollViewContent: {
    paddingVertical: 20,
    paddingHorizontal: 16,
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
  sectionHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: customDarkTheme.colors.text, // White text for section titles
  },
  viewAllButtonText: {
    color: "black", // Primary color for "View All" button
    fontSize: 14,
    fontWeight: "600",
  },
  viewAllButtonContent: {
    paddingHorizontal: 0, // Remove default horizontal padding
  },
  horizontalScroll: {
    paddingRight: 16, // Add some padding at the end for the last card
  },
  courseCard: {
    width: width * 0.75, // Make cards take up 75% of screen width
    marginRight: 15,
    borderRadius: 12,
    overflow: "hidden", // Ensure image respects border radius
    backgroundColor: customDarkTheme.colors.surface, // Card background
    elevation: 5, // Subtle shadow for depth
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardImage: {
    height: 150,
    width: "100%",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardTitle: {
    marginVertical: 5,
    fontSize: 18,
    fontWeight: "bold",
    color: customDarkTheme.colors.onSurface, // White text on card surface
  },
  cardSubtitle: {
    fontSize: 14,
    color: customDarkTheme.colors.onSurface, // White text on card surface
    opacity: 0.7, // Slightly faded for subtitle
    marginBottom: 10,
  },
  progressBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  progressBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    marginRight: 10,
    backgroundColor: "#333333", // Darker background for progress bar track
  },
  progressText: {
    fontSize: 12,
    color: customDarkTheme.colors.text, // White text for progress
  },
  cardButton: {
    marginTop: 10,
    borderRadius: 8,
    backgroundColor: customDarkTheme.colors.primary, // Primary color for button background
    paddingVertical: 5,
  },
  cardButtonText: {
    color: customDarkTheme.colors.onPrimary, // Text color on primary background (usually white)
    fontWeight: "bold",
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 20,
  },
  categoryButton: {
    width: "48%", // Roughly half width for two columns
    marginBottom: 10,
    borderRadius: 8,
    borderColor: customDarkTheme.colors.primary, // Primary color for outline
    borderWidth: 1,
    paddingVertical: 10,
    backgroundColor: "transparent", // Transparent background
  },
  categoryButtonText: {
    // color: customDarkTheme.colors.primary, // Primary color for text
    color: "black", // Primary color for text
    fontWeight: "600",
  },
  featuredCourseCard: {
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: customDarkTheme.colors.surface,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 20,
  },
  featuredCardImage: {
    height: 200,
    width: "100%",
  },
  featuredCardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: customDarkTheme.colors.onSurface,
    marginTop: 10,
    marginBottom: 5,
  },
  featuredCardSubtitle: {
    fontSize: 16,
    color: customDarkTheme.colors.onSurface,
    opacity: 0.8,
    marginBottom: 15,
  },
});

export default CourseTab;
