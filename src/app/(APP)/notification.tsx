import React from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import Icon from "@react-native-vector-icons/material-design-icons";
import AppHeader from "@/components/AppHeader";
import { customLightTheme } from "@/context/ReactNativePaper";

// Dummy data for notifications
const dummyNotifications = [
  {
    id: "n1",
    title: "New Course Enrollment",
    description:
      'You have been successfully enrolled in the "Advanced Data Science" course.',
    expiryDate: "2024-12-31",
  },
  {
    id: "n2",
    title: "Upcoming Class Reminder",
    description:
      'Your "Introduction to Machine Learning" class is scheduled for tomorrow at 10:00 AM.',
    expiryDate: "2024-12-01",
  },
  {
    id: "n3",
    title: "Account Update Required",
    description:
      "Please update your payment information to avoid interruption of service.",
    expiryDate: "2024-11-20",
  },
  {
    id: "n4",
    title: "System Maintenance",
    description:
      "Our servers will undergo maintenance tonight at 11 PM. The service may be briefly unavailable.",
    expiryDate: "2024-11-15",
  },
];

const NotificationScreen = () => {
  return (
    <>
      <AppHeader title="Notifications" icons={false} backButton={true} />
      <ScrollView style={styles.container}>
        {dummyNotifications.map((notification) => (
          <Card key={notification.id} style={styles.notificationCard}>
            <Card.Content style={styles.cardContent}>
              <View style={styles.iconContainer}>
                <Icon
                  name="bell-outline"
                  size={24}
                  color={customLightTheme.colors.primary}
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.notificationTitle}>
                  {notification.title}
                </Text>
                <Text style={styles.notificationDescription}>
                  {notification.description}
                </Text>
                <View style={styles.expiryContainer}>
                  <Icon
                    name="calendar-alert"
                    size={16}
                    color={customLightTheme.colors.accent}
                  />
                  <Text style={styles.expiryText}>
                    Expires: {notification.expiryDate}
                  </Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        ))}
        {dummyNotifications.length === 0 && (
          <Text style={styles.noNotificationsText}>
            You have no notifications at this time.
          </Text>
        )}
      </ScrollView>
    </>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: customLightTheme.colors.background,
    paddingVertical: 20,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: customLightTheme.colors.text,
  },
  notificationCard: {
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
  cardContent: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  iconContainer: {
    marginRight: 15,
    paddingTop: 5,
  },
  textContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: customLightTheme.colors.text,
    marginBottom: 5,
  },
  notificationDescription: {
    fontSize: 14,
    color: customLightTheme.colors.text,
    lineHeight: 20,
  },
  expiryContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  expiryText: {
    fontSize: 12,
    color: customLightTheme.colors.accent,
    marginLeft: 5,
    fontWeight: "500",
  },
  noNotificationsText: {
    fontSize: 16,
    fontStyle: "italic",
    color: customLightTheme.colors.placeholder,
    textAlign: "center",
    marginTop: 50,
  },
});
