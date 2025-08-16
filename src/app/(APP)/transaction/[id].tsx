import Icon from "@react-native-vector-icons/material-design-icons";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { customLightTheme } from "@/context/ReactNativePaper";
import AppHeader from "@/components/AppHeader";
import { useReactQuery } from "@/hooks/useReactQuery";
import { getTransactionById } from "@/supabase/dbQuery";
import { useLocalSearchParams } from "expo-router";
import { formatDate } from "@/lib/utils";
import Loader from "@/components/Loader";

const TransactionDetails = () => {
  const { id } = useLocalSearchParams();

  const { data: transactionData, isLoading } = useReactQuery(
    ["transaction-details", id as string],
    async () => await getTransactionById(id as string)
  );

  if (isLoading) return <Loader />;

  return (
    <>
      <AppHeader
        title={"Transaction Details"}
        backButton={true}
        icons={false}
      />

      <ScrollView style={styles.container}>
        {/* Overview Card */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>Transaction Overview</Text>
            <View style={styles.detailItem}>
              <Icon
                name="tag"
                size={20}
                color={customLightTheme.colors.primary}
              />
              <Text style={styles.detailText}>
                ID: {transactionData?.razorpay_payment_id}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Icon
                name="currency-inr"
                size={20}
                color={customLightTheme.colors.primary}
              />
              <Text style={styles.detailText}>
                Amount: {transactionData?.amount.toFixed(2)}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Icon
                name="check-circle"
                size={20}
                color={customLightTheme.colors.accent}
              />
              <Text style={styles.detailText}>
                Status: {transactionData?.payment_status}
              </Text>
            </View>
            {/* <View style={styles.detailItem}>
                <Icon
                  name="credit-card-settings"
                  size={20}
                  color={customLightTheme.colors.accent}
                />
                <Text style={styles.detailText}>
                  Payment Date:{" "}
                  {formatDate(transactionData?.date_of_payment as string)}
                </Text>
              </View> */}
          </Card.Content>
        </Card>

        {/* Discounts Card */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>Discounts & Rewards</Text>
            <View style={styles.detailItem}>
              <Icon
                name="gift"
                size={20}
                color={customLightTheme.colors.accent}
              />
              <Text style={styles.detailText}>
                Loyalty Points: {transactionData?.loyality_points}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Icon
                name="sale"
                size={20}
                color={customLightTheme.colors.accent}
              />
              <Text style={styles.detailText}>
                Discount Code: {transactionData?.discount_code}
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Courses Card */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>Courses Enrolled</Text>
            {/* {dummyTransactionData.course_relations.map((course) => ( */}
            <View style={styles.courseItem}>
              <Icon
                name="book-multiple"
                size={20}
                color={customLightTheme.colors.primary}
              />
              <Text style={styles.courseTitle}>
                {transactionData?.course.title}
              </Text>
            </View>
            <View style={styles.courseItem}>
              <Icon
                name="book-multiple"
                size={20}
                color={customLightTheme.colors.primary}
              />
              <Text style={styles.courseTitle}>
                {transactionData?.counsellor.name}
              </Text>
            </View>

            {/* ))} */}
          </Card.Content>
        </Card>
      </ScrollView>
    </>
  );
};

export default TransactionDetails;

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
  courseItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    paddingLeft: 10,
  },
  courseTitle: {
    fontSize: 16,
    color: customLightTheme.colors.text,
    marginLeft: 15,
    fontWeight: "500",
  },
});
