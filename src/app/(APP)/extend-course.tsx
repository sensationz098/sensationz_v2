import AppHeader from "@/components/AppHeader";
import Loader from "@/components/Loader";
import { customDarkTheme } from "@/context/ReactNativePaper";
import { useReactQuery } from "@/hooks/useReactQuery";
import { dateDifference } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { getExtendCourse } from "@/supabase/dbQuery";
import { useRouter } from "expo-router";
import { Dimensions, FlatList, Image, StyleSheet } from "react-native";
import { Button, Card, Text } from "react-native-paper";

const { width } = Dimensions.get("window");

type ExtendedCourseType = {
  id: string;
  end_date: string;
  course: {
    id: string;
    title: string;
    image_url: string | null;
  };
  teacher: {
    name: string;
  };
};

type CourseEnrollmentCardType = {
  title: string;
  image_url: string | null;
  teacher: string;
  expiryDate: string;
  expiresInDays: number;
  onExtendPress: () => void;
};

// New Course Enrollment Card Component
const CourseEnrollmentCard = ({
  title,
  image_url,
  teacher,
  expiryDate,
  expiresInDays,
  onExtendPress,
}: CourseEnrollmentCardType) => {
  return (
    <Card style={styles.enrolledCourseCard}>
      <Image
        source={{
          uri:
            image_url ||
            "https://plus.unsplash.com/premium_photo-1753089574948-9a9a358bc575?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        }} // Placeholder image
        style={styles.enrolledCardImage}
      />
      <Card.Content>
        <Text style={styles.enrolledCardTitle}>{title}</Text>
        <Text variant="bodySmall" style={styles.enrolledCardDetail}>
          By - {teacher}
        </Text>
        <Text variant="bodySmall" style={styles.enrolledCardDetail}>
          Expiry Date - {expiryDate}
        </Text>
        <Text variant="bodySmall" style={styles.enrolledCardDetail}>
          Expiring in - {expiresInDays} days left
        </Text>
        <Button
          mode="contained"
          onPress={onExtendPress}
          style={styles.extendButton}
          labelStyle={styles.extendButtonText}
          contentStyle={styles.extendButtonContent} // Apply contentStyle for full width
        >
          Extend Course
        </Button>
      </Card.Content>
    </Card>
  );
};

const ExtendCourse = () => {
  const { push } = useRouter();

  const session = useAuthStore((state) => state.session);

  const { data: extended_course, isLoading } = useReactQuery<
    ExtendedCourseType[] | null
  >(["extend-course"], async () => await getExtendCourse(session?.user.id!));

  const handleExtendCourse = (courseTitle: string) => {
    console.log(`Extending course: ${courseTitle}`);
    push(`/course/details/${courseTitle}`);
  };

  return (
    <>
      <AppHeader title="Extend Course" backButton={true} icons={false} />
      {/* List of enrolled courses */}
      {isLoading ? (
        <Loader />
      ) : (
        <FlatList
          data={extended_course}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CourseEnrollmentCard
              title={item.course.title}
              image_url={item.course.image_url}
              teacher={item.teacher.name}
              expiryDate={item.end_date}
              expiresInDays={dateDifference(item.end_date)}
              onExtendPress={() => handleExtendCourse(item.course.id)}
            />
          )}
          contentContainerStyle={styles.enrolledCoursesList}
        />
      )}
    </>
  );
};

export default ExtendCourse;

const styles = StyleSheet.create({
  allCoursesContainer: {
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
  enrolledCoursesList: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  enrolledCourseCard: {
    marginBottom: 20,
    borderRadius: 12,
    overflow: "hidden", // Ensure image respects border radius
    backgroundColor: customDarkTheme.colors.surface, // Card background
    elevation: 5, // Subtle shadow for depth
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  enrolledCardImage: {
    height: 180, // Slightly taller image for better visual
    width: "100%",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  enrolledCardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: customDarkTheme.colors.onSurface,
    marginVertical: 10,
  },
  enrolledCardDetail: {
    fontSize: 14,
    color: customDarkTheme.colors.onSurface,
    opacity: 0.8,
    marginBottom: 4,
  },
  extendButton: {
    marginTop: 15,
    borderRadius: 8,
    backgroundColor: customDarkTheme.colors.primary, // Primary color for button background
    paddingVertical: 5,
  },
  extendButtonText: {
    color: customDarkTheme.colors.onPrimary, // Text color on primary background (usually white)
    fontWeight: "bold",
  },
  extendButtonContent: {
    width: "100%", // Make the button take full width of its container
  },
});
