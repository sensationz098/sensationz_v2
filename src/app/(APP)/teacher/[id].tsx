import AppHeader from "@/components/AppHeader";
import Loader from "@/components/Loader";
import { customLightTheme } from "@/context/ReactNativePaper";
import { useReactQuery } from "@/hooks/useReactQuery";
import { getTeacherById } from "@/supabase/dbQuery";
import { TeacherType } from "@/types";
import Icon from "@react-native-vector-icons/material-design-icons";
import { useLocalSearchParams } from "expo-router";
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, Card, Text } from "react-native-paper";

const TeacherDetailScreen = () => {
  const { id } = useLocalSearchParams();

  const { data: teacher, isLoading } = useReactQuery<TeacherType | null>(
    ["teacher", id as string],
    async () => await getTeacherById(id as string)
  );

  if (isLoading) return <Loader />;

  const handleOpenLink = async (url: string) => {
    const res = await Linking.canOpenURL(url);

    if (res) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Failed to open link");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar.Image
          size={120}
          source={{
            uri:
              teacher?.image_url ||
              "https://images.unsplash.com/photo-1511629091441-ee46146481b6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
          style={styles.avatar}
        />
        <Text style={styles.title}>{teacher?.name}</Text>
        <Text style={styles.subtitle}>{teacher?.specialization}</Text>
      </View>

      {/* Biography Card */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>Biography</Text>
          <Text style={styles.paragraph}>{teacher?.biography}</Text>
        </Card.Content>
      </Card>

      {/* Details Card */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>Teacher Details</Text>
          <View style={styles.detailItem}>
            <Icon
              name="gender-female"
              size={20}
              color={customLightTheme.colors.accent}
            />
            <Text style={styles.detailText}>Gender: {teacher?.gender}</Text>
          </View>
          <View style={styles.detailItem}>
            <Icon
              name="medal"
              size={20}
              color={customLightTheme.colors.accent}
            />
            <Text style={styles.detailText}>
              Proficiency: {teacher?.language_proficiency}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Icon
              name="map-marker"
              size={20}
              color={customLightTheme.colors.accent}
            />
            <Text style={styles.detailText}>
              Location: {teacher?.state}, {teacher?.country}
            </Text>
          </View>
        </Card.Content>
      </Card>

      {/* Contact and Portfolio Card */}
      <Card style={styles.bottomCard}>
        <Card.Content>
          <Text style={styles.cardTitle}>Contact & Portfolio</Text>
          <TouchableOpacity
            onPress={() => handleOpenLink(`mailto:${teacher?.email}`)}
            style={styles.detailItem}
          >
            <Icon
              name="email"
              size={20}
              color={customLightTheme.colors.accent}
            />
            <Text style={[styles.detailText, styles.linkText]}>
              Email: {teacher?.email}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleOpenLink(teacher?.portfolio_url || "")}
            style={styles.detailItem}
          >
            <Icon name="web" size={20} color={customLightTheme.colors.accent} />
            <Text style={[styles.detailText, styles.linkText]}>
              Portfolio: {teacher?.portfolio_url}
            </Text>
          </TouchableOpacity>
        </Card.Content>
      </Card>

      {/* Courses Taught Card */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>On going course by instructor</Text>
          {/* {teacher?.course.length > 0 ? (
            teacher?.course.map((course) => (
              <View key={course.id} style={styles.courseItem}>
                <View style={styles.courseIconContainer}>
                  <Icon
                    name="book-multiple"
                    size={24}
                    color={customLightTheme.colors.primary}
                  />
                </View>
                <View style={styles.courseDetails}>
                  <Text style={styles.courseTitle}>{course.title}</Text>
                  <View style={styles.courseInfoRow}>
                    <View style={styles.courseInfoItem}>
                      <Icon
                        name="account-group"
                        size={16}
                        color={customLightTheme.colors.accent}
                      />
                      <Text style={styles.courseInfoText}>
                        {course.students} Students
                      </Text>
                    </View>
                    <View style={styles.courseInfoItem}>
                      <Icon
                        name="clock-outline"
                        size={16}
                        color={customLightTheme.colors.accent}
                      />
                      <Text style={styles.courseInfoText}>
                        {course.duration}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noCoursesText}>
              This teacher has no assigned courses yet.
            </Text>
          )} */}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

export default TeacherDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: customLightTheme.colors.background,
    paddingVertical: 60,
    paddingBottom: 60,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  avatar: {
    marginBottom: 10,
    backgroundColor: customLightTheme.colors.surface,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: customLightTheme.colors.text,
  },
  subtitle: {
    fontSize: 18,
    color: customLightTheme.colors.primary,
    fontWeight: "600",
    marginTop: 5,
    textAlign: "center",
  },
  card: {
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 12,
    backgroundColor: customLightTheme.colors.surface,
    elevation: 3,
    shadowColor: customLightTheme.colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bottomCard: {
    marginHorizontal: 20,
    marginBottom: 150,
    borderRadius: 12,
    backgroundColor: customLightTheme.colors.surface,
    elevation: 3,
    shadowColor: customLightTheme.colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: customLightTheme.colors.text,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 5,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    color: customLightTheme.colors.text,
    marginLeft: 10,
  },
  linkText: {
    color: customLightTheme.colors.accent,
    textDecorationLine: "underline",
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: customLightTheme.colors.text,
  },
  courseItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    padding: 10,
    backgroundColor: customLightTheme.colors.background,
    borderRadius: 8,
  },
  courseIconContainer: {
    marginRight: 15,
    padding: 8,
    backgroundColor: customLightTheme.colors.surface,
    borderRadius: 10,
  },
  courseDetails: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: customLightTheme.colors.text,
    marginBottom: 5,
  },
  courseInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  courseInfoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  courseInfoText: {
    fontSize: 14,
    color: customLightTheme.colors.text,
    marginLeft: 5,
  },
  noCoursesText: {
    fontSize: 16,
    fontStyle: "italic",
    color: customLightTheme.colors.placeholder,
    textAlign: "center",
    paddingVertical: 20,
  },
});
