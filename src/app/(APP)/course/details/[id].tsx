import AppHeader from "@/components/AppHeader";
import EnrollFormModal from "@/components/EnrollFormModal";
import ErrorScreen from "@/components/Error";
import Loader from "@/components/Loader";
import { customDarkTheme } from "@/context/ReactNativePaper";
import { useReactQuery } from "@/hooks/useReactQuery";
import { getAllCounsellor, getCourseById } from "@/supabase/dbQuery";
import { CounsellorType } from "@/types";
import Icon from "@react-native-vector-icons/material-design-icons";
import { Link, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";

const { width } = Dimensions.get("window");

const CourseDetails = () => {
  const { id } = useLocalSearchParams();
  const [visible, setVisible] = useState(false);

  const {
    data: course,
    isLoading,
    isError,
    error,
  } = useReactQuery(
    ["course", id as string],
    async () => await getCourseById(id as string)
  );

  const { data: counsellor } = useReactQuery<CounsellorType[] | null>(
    ["counsellor"],
    getAllCounsellor
  );

  if (isLoading) return <Loader />;
  if (isError) return <ErrorScreen errorMessage={error?.message} />;

  const showModal = () => setVisible(true);

  return (
    <View style={styles.container}>
      <AppHeader title={course?.title!} icons={false} backButton={true} />
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Course Image */}
        <Image
          source={{
            uri:
              course?.image_url ||
              "https://images.unsplash.com/photo-1752490891350-3cf965c544b4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
          style={styles.courseImage}
          onError={(e) =>
            console.log("Image loading error:", e.nativeEvent.error)
          }
        />

        {/* Course Title and Description */}
        <Card style={styles.infoCard}>
          <Card.Content>
            <Text style={styles.courseTitle}>{course?.title}</Text>
            <Text style={styles.courseDescription}>{course?.description}</Text>
          </Card.Content>
        </Card>

        {/* Course Details Section */}
        <Card style={styles.infoCard}>
          <Card.Content>
            <Text style={styles.sectionHeading}>Course Information</Text>
            <View style={styles.detailRow}>
              <Icon
                name="calendar-check"
                size={20}
                color={customDarkTheme.colors.primary}
              />
              <Text style={styles.detailText}>
                Class Days: {course?.class_days?.map((i) => i).join(", ")}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Icon
                name="signal"
                size={20}
                color={customDarkTheme.colors.primary}
              />
              <Text style={styles.detailText}>Level: {course?.level}</Text>
            </View>
            <View style={styles.detailRow}>
              <Icon
                name="account-tie"
                size={20}
                color={customDarkTheme.colors.primary}
              />
              <Text style={styles.detailText}>
                Teacher:{" "}
                {course?.teacher.map((i, index) => (
                  // <Link key={i.id} href={`/teacher/${i.id}`}>
                  //   {i.name}
                  // </Link>
                  <React.Fragment key={i.id}>
                    <Link
                      href={`/teacher/${i.id}`}
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      {i.name}
                    </Link>
                    {index < course.teacher.length - 1 && ", "}
                  </React.Fragment>
                ))}
              </Text>
            </View>
          </Card.Content>
        </Card>

        <Button
          mode="contained"
          onPress={showModal}
          style={styles.enrollButton}
          labelStyle={styles.enrollButtonText}
          contentStyle={styles.enrollButtonContent}
        >
          Enroll Now
        </Button>
      </ScrollView>

      {visible && (
        <EnrollFormModal
          course_id={id as string}
          cousre_title={course?.title as string}
          visible={visible}
          setShowVisible={setVisible}
          schedule={course?.schedule!}
          duration={course?.duration!}
          teacher={course?.teacher!}
          counsellor={counsellor!}
          days={course?.class_days!}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: customDarkTheme.colors.background,
    paddingBottom: 50,
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
  },
  courseImage: {
    width: "100%",
    height: width * 0.55, // Responsive height based on width
    borderRadius: 12,
    marginBottom: 20,
    resizeMode: "cover",
  },
  infoCard: {
    marginBottom: 20,
    borderRadius: 12,
    backgroundColor: customDarkTheme.colors.surface,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  courseTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: customDarkTheme.colors.onSurface,
    marginBottom: 10,
  },
  courseDescription: {
    fontSize: 16,
    color: customDarkTheme.colors.onSurface,
    opacity: 0.8,
    lineHeight: 24,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: "bold",
    color: customDarkTheme.colors.primary,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#333333",
    paddingBottom: 5,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    color: customDarkTheme.colors.onSurface,
    marginLeft: 10,
    flex: 1,
    flexDirection: "row",
    flexShrink: 1,
    flexWrap: "wrap",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 15,
  },
  originalPrice: {
    fontSize: 18,
    color: customDarkTheme.colors.onSurface,
    opacity: 0.6,
    textDecorationLine: "line-through",
    marginRight: 15,
  },
  discountedPrice: {
    fontSize: 28,
    fontWeight: "bold",
    color: customDarkTheme.colors.accent, // Use accent color for discounted price
  },
  enrollButton: {
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: customDarkTheme.colors.primary,
    paddingVertical: 1,
    width: "100%", // Full width button
  },
  enrollButtonText: {
    color: customDarkTheme.colors.onPrimary,
    fontWeight: "bold",
    fontSize: 18,
  },
  enrollButtonContent: {
    height: 60, // Ensure a good touch target size
  },
});

export default CourseDetails;
