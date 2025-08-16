import AppHeader from "@/components/AppHeader";
import Loader from "@/components/Loader";
import NoDataFound from "@/components/NoDataFound";
import { customDarkTheme } from "@/context/ReactNativePaper";
import { formatTime, isClassActive, isMoreThan3DaysPassed } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { getEnrolledCourse, getEnrollTrialCourse } from "@/supabase/dbQuery";
import { useQueries } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  Linking,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Button, Card, Text } from "react-native-paper";

const { width } = Dimensions.get("window");

type ClassCardType = {
  title: string;
  timing: string;
  days: string[] | null;
  whatsapp_group_link?: string;
  created_at?: string | null;
  variant: "trial" | "enrolled";
  enroll_loader: boolean;
  onJoinPress: () => void;
};

// New Class Card Component
const ClassCard = ({
  variant,
  title,
  timing,
  days,
  created_at,
  whatsapp_group_link,
  onJoinPress,
  enroll_loader,
}: ClassCardType) => {
  const [classStarted, setClassStarted] = useState(false);

  useEffect(() => {
    const check = () => {
      setClassStarted(
        isClassActive(timing, days || ["monday", "tuesday", "wednesday"])
      );
    };

    check();

    const interval = setInterval(check, 10000);
    return () => clearInterval(interval);
  }, [timing]);

  const handleJoinWhatsapp = async () => {
    const res = await Linking.canOpenURL(whatsapp_group_link as string);

    if (res) {
      await Linking.openURL(whatsapp_group_link as string);
    } else {
      Alert.alert("Failed to open link");
    }
  };

  return (
    <Card style={styles.classCard}>
      <Card.Content>
        <Text style={styles.classCardTitle}>{title}</Text>
        <View style={styles.classDetailsContainer}>
          <Text style={styles.classDetailText}>
            Time: {formatTime(timing || "12:00-13:00")}
          </Text>
          <Text style={styles.classDetailText}>
            Days: {days?.map((i) => i).join(", ")}
          </Text>
        </View>

        {variant === "enrolled" &&
          (enroll_loader ? (
            <Loader />
          ) : (
            isMoreThan3DaysPassed(created_at as string) && (
              <Button
                onPress={handleJoinWhatsapp}
                labelStyle={styles.whatsappButton}
                icon={"whatsapp"}
              >
                Join Whatsapp
              </Button>
            )
          ))}

        {classStarted && (
          <Button
            mode={"contained"}
            disabled={!classStarted}
            onPress={onJoinPress}
            style={styles.joinButton}
            labelStyle={styles.joinButtonText}
            contentStyle={styles.joinButtonContent} // Apply contentStyle for full width
          >
            Join Class
          </Button>
        )}
      </Card.Content>
    </Card>
  );
};

const HomeTab = () => {
  const session = useAuthStore((state) => state.session);

  const [courseQuery, trialCourseQuery] = useQueries({
    queries: [
      {
        queryKey: ["enrolledCourse"],
        queryFn: async () => await getEnrolledCourse(session?.user.id!),
      },
      {
        queryKey: ["enrolled-trial-course"],
        queryFn: async () => await getEnrollTrialCourse(session?.user.id!),
      },
    ],
  });

  const { data: course, isLoading: courseLoading } = courseQuery;

  const { data: trialCourse, isLoading: trialCourseLoading } = trialCourseQuery;

  const handleJoinClass = async (url: string) => {
    const res = await Linking.openURL(url);

    if (!res) {
      Alert.alert("Failed to join class");
    }
  };

  if (courseLoading && trialCourseLoading) return <Loader />;

  return (
    <View style={styles.container}>
      {/* Header Component */}
      <AppHeader title="Enrolled Courses" icons={true} backButton={false} />

      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Trial Course */}
        {trialCourse && (
          <>
            <View style={styles.sectionHeaderContainer}>
              <Text style={styles.sectionTitle}>Trial Course</Text>
            </View>

            <FlatList
              data={trialCourse}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.upcomingClassesList}
              scrollEnabled={false} // Disable scrolling for FlatList inside ScrollView
              renderItem={({ item }) => (
                <ClassCard
                  variant="trial"
                  title={item.course.title}
                  timing={item.schedule.timing}
                  days={item.course.class_days}
                  onJoinPress={() =>
                    handleJoinClass(item.schedule.meeting_link)
                  }
                />
              )}
            />
          </>
        )}

        {/* Section: Upcoming Classes */}
        {course === null ? (
          <NoDataFound />
        ) : (
          <>
            <View style={styles.sectionHeaderContainer}>
              <Text style={styles.sectionTitle}>In-Progress Course</Text>
            </View>
            <FlatList
              data={course}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.upcomingClassesList}
              scrollEnabled={false} // Disable scrolling for FlatList inside ScrollView
              renderItem={({ item }) => (
                <ClassCard
                  enroll_loader={courseLoading}
                  variant="enrolled"
                  title={item.course.title}
                  timing={item.schedule.timing}
                  days={item.course.class_days}
                  created_at={item.created_at}
                  whatsapp_group_link={item.schedule.whatsapp_group_link}
                  onJoinPress={() =>
                    handleJoinClass(item.schedule.meeting_link)
                  }
                />
              )}
            />
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  whatsappButton: {
    color: customDarkTheme.colors.accent,
  },
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
    color: customDarkTheme.colors.primary, // Primary color for "View All" button
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
    fontSize: 18,
    fontWeight: "bold",
    color: customDarkTheme.colors.onSurface, // White text on card surface
    marginBottom: 5,
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
    color: customDarkTheme.colors.primary, // Primary color for text
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
  // Styles for the new ClassCard component
  classCard: {
    marginBottom: 15,
    borderRadius: 12,
    backgroundColor: customDarkTheme.colors.surface,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  classCardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: customDarkTheme.colors.onSurface,
    marginBottom: 10,
  },
  classDetailsContainer: {
    marginBottom: 15,
  },
  classDetailText: {
    fontSize: 14,
    color: customDarkTheme.colors.onSurface,
    opacity: 0.8,
    marginBottom: 5,
  },
  joinButton: {
    borderRadius: 8,
    backgroundColor: customDarkTheme.colors.primary,
    paddingVertical: 5,
  },
  joinButtonText: {
    color: customDarkTheme.colors.onPrimary,
    fontWeight: "bold",
  },
  joinButtonContent: {
    width: "100%", // Make the button take full width of its container
  },
  upcomingClassesList: {
    paddingBottom: 10, // Add some padding at the bottom of the list
  },
});

export default HomeTab;
