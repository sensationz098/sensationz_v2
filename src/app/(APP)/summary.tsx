import AppHeader from "@/components/AppHeader";
import { customDarkTheme, customLightTheme } from "@/context/ReactNativePaper";
import { useReactMutation } from "@/hooks/useReactQuery";
import { RazorpayPayment } from "@/lib/Razorpay";
import {
  findExpiryDateForTrial,
  formatTime,
  parse_ISO_Date,
} from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { useCourse } from "@/store/zustand";
import {
  enrollCourseMutation,
  purchaseCourseMutation,
  trialCourseMutation,
} from "@/supabase/dbMutation";
import { verifyRazorpayPaymentUpdate } from "@/supabase/functions";
import Icon from "@react-native-vector-icons/material-design-icons";
import { useQueryClient } from "@tanstack/react-query";
import { addMonths } from "date-fns";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button, Card } from "react-native-paper";
// import Checkbox from "expo-checkbox";
// import { useState } from "react";

const { width } = Dimensions.get("window");

const SummaryScreen = () => {
  const { course_days } = useLocalSearchParams();

  // loyalty points state
  // const [pointsRedeemed, setPointsRedeemed] = useState(false);

  const days = JSON.parse(course_days as string);

  const session = useAuthStore((state) => state.session);
  const profile = useAuthStore((state) => state.profile);
  const trial = useAuthStore((state) => state.trial);

  const client = useQueryClient();
  const { push } = useRouter();

  const course = useCourse((state) => state.course);
  const counsellor = useCourse((state) => state.counsellor);
  const teacher = useCourse((state) => state.teacher);
  const duration = useCourse((state) => state.duration);
  const schedule = useCourse((state) => state.schedule);
  const start_date = useCourse((state) => state.start_date);

  // Calculations
  const discountedPrice = Number(duration?.discounted_price || 0);
  const taxes = discountedPrice * 0.18; // 18% tax
  const grandTotal = discountedPrice + taxes;
  const loyalty = discountedPrice * 0.1; // 10% loyalty points

  const startPayment = async () => {
    const razorpayPayment = await RazorpayPayment({
      amount: grandTotal,
      contact: profile?.profile?.contact!,
      description: course?.name!,
      email: session?.user.user_metadata.email,
      name: session?.user.user_metadata.full_name,
    });

    const enrollStudentData = await verifyRazorpayPaymentUpdate({
      data: {
        enroll: {
          course_id: course?.course_id!,
          duration_id: duration?.duration_id!,
          profile_id: session?.user.id!,
          purchase_id: razorpayPayment?.razorpay_payment_id!,
          schedule_id: schedule?.schedule_id!,
          teacher_id: teacher?.teacher_id!,
          start_date: parse_ISO_Date(start_date),
          end_date: addMonths(
            new Date(start_date),
            Number(duration?.months.split(" ")[0])
          ).toISOString(),
        },
        invoice: {
          counsellor: counsellor?.counsellor_id!,
          course_name: course?.name!,
          customer_name: session?.user.user_metadata.full_name,
          email: session?.user.user_metadata.email,
          payment_method: "Online",
          razorpay_payment_id: razorpayPayment?.razorpay_payment_id!,
          transaction_id: razorpayPayment?.razorpay_payment_id!,
          discounted_amount: discountedPrice,
        },
        purchase: {
          amount: grandTotal,
          counsellor_id: counsellor?.counsellor_id!,
          course_id: course?.course_id!,
          date_of_payment: new Date().toISOString(),
          discount_code: "Discount",
          loyality_points: loyalty,
          payment_status: "Success",
          profile_id: session?.user.id!,
          razorpay_order_id: razorpayPayment?.razorpay_order_id!,
          razorpay_payment_id: razorpayPayment?.razorpay_payment_id!,
          razorpay_signature: razorpayPayment?.razorpay_signature!,
        },
      },
    });

    return enrollStudentData;
  };

  const { mutate, isPending } = useReactMutation(["summary"], startPayment, {
    onSuccess: (data) => {
      client.invalidateQueries({
        queryKey: ["enrolledCourse"],
      });
      if (data) {
        push("/course");
      }
    },
    onError: (error) => {
      Alert.alert(error.message);
    },
  });

  const { mutate: trialMutation, isPending: trialPending } = useReactMutation(
    ["enrolled-trial-course"],
    async () =>
      await trialCourseMutation({
        course_id: course?.course_id!,
        duration_id: duration?.duration_id!,
        profile_id: session?.user.id!,
        schedule_id: schedule?.schedule_id!,
        teacher_id: teacher?.teacher_id!,
        purchase_id: null,
        start_date: parse_ISO_Date(start_date),
        end_date: findExpiryDateForTrial(start_date, days),
      }),
    {
      onSuccess: (data) => {
        client.invalidateQueries({
          queryKey: ["enrolled-trial-course"],
        });
        if (data) {
          push("/course");
        }
      },
      onError: (error) => {
        Alert.alert(error.message);
      },
    }
  );

  return (
    <View style={styles.container}>
      {/* Appbar for navigation back */}
      <AppHeader title="Summary" backButton={true} icons={false} />

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Course Details Card */}
        <Card style={styles.infoCard}>
          <Card.Content>
            <Text style={styles.cardTitle}>{course?.name}</Text>
            {/* <Paragraph style={styles.cardDescription}>
              {course.descriptio}
            </Paragraph> */}
            <View style={styles.detailRow}>
              <Icon
                name="signal"
                size={20}
                color={customDarkTheme.colors.primary}
              />
              <Text style={styles.detailText}>Level: {"Intermediate"}</Text>
            </View>
          </Card.Content>
        </Card>

        {/* Selected Preferences Card */}
        <Card style={styles.infoCard}>
          <Card.Content>
            <Text style={styles.sectionSubHeading}>Selected Preferences</Text>
            <View style={styles.detailRow}>
              <Icon
                name="account-tie"
                size={20}
                color={customDarkTheme.colors.primary}
              />
              <Text style={styles.detailText}>Teacher: {teacher?.name}</Text>
            </View>
            <View style={styles.detailRow}>
              <Icon
                name="account-group"
                size={20}
                color={customDarkTheme.colors.primary}
              />
              <Text style={styles.detailText}>
                Counselor: {counsellor?.name}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Icon
                name="clock-outline"
                size={20}
                color={customDarkTheme.colors.primary}
              />
              <Text style={styles.detailText}>
                Timing: {formatTime(schedule?.timing as string)} {"\n"}(
                {"Monday, Wednesday, Friday"})
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Icon
                name="timer-sand"
                size={20}
                color={customDarkTheme.colors.primary}
              />
              <Text style={styles.detailText}>
                Duration: {duration?.months}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Icon
                name="calendar-start"
                size={20}
                color={customDarkTheme.colors.primary}
              />
              <Text style={styles.detailText}>
                Start Date: {new Date().toDateString()}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Icon
                name="calendar-start"
                size={20}
                color={customDarkTheme.colors.primary}
              />
              <Text style={styles.detailText}>
                End Date:{" "}
                {addMonths(
                  new Date(start_date),
                  Number(duration?.months.split(" ")[0])
                ).toDateString()}
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Price Breakdown Card */}
        <Card style={styles.infoCard}>
          <Card.Content>
            <Text style={styles.sectionSubHeading}>Price Breakdown</Text>
            <View style={styles.priceItemRow}>
              <Text style={styles.priceItemLabel}>Course Price:</Text>
              <Text
                style={[
                  styles.priceItemValue,
                  {
                    textDecorationStyle: "solid",
                    textDecorationLine: "line-through",
                    textDecorationColor: customDarkTheme.colors.primary,
                  },
                ]}
              >
                ₹ {duration?.price.toFixed(2)}
              </Text>
            </View>
            <View style={styles.priceItemRow}>
              <Text style={styles.priceItemLabel}>Discounted Price:</Text>
              <Text style={styles.priceItemValue}>
                ₹ {discountedPrice.toFixed(2)}
              </Text>
            </View>
            <View style={styles.priceItemRow}>
              <Text style={styles.priceItemLabel}>Taxes (18%):</Text>
              <Text style={styles.priceItemValue}>₹ {taxes.toFixed(2)}</Text>
            </View>
            <View style={[styles.priceItemRow, styles.grandTotalRow]}>
              <Text style={styles.grandTotalLabel}>Grand Total:</Text>
              <Text style={styles.grandTotalValue}>
                ₹ {grandTotal.toFixed(2)}
              </Text>
            </View>
            <View style={styles.loyaltyRow}>
              <Icon
                name="star-circle"
                size={20}
                color={customDarkTheme.colors.accent}
              />
              <Text style={styles.loyaltyText}>
                Earn {loyalty.toFixed(2)} Loyalty Points!
              </Text>
            </View>

            {/* loyality points container  */}
            {/* <View style={styles.loyaltyPoints}>
              <Icon
                name="gift"
                size={20}
                color={customDarkTheme.colors.accent}
              />

              <Checkbox
                style={styles.checkboxStyle}
                value={pointsRedeemed}
                onValueChange={setPointsRedeemed}
                color={pointsRedeemed ? "#4630EB" : undefined}
              />
              <Text style={styles.loyaltyText}>
                50 Loyalty points to redeem
              </Text>
            </View> */}
          </Card.Content>
        </Card>

        {/* Pay Now Button */}
        <Button
          mode="contained"
          onPress={mutate}
          disabled={isPending}
          style={styles.payNowButton}
          labelStyle={styles.payNowButtonText}
          contentStyle={styles.payNowButtonContent}
        >
          Pay Now
        </Button>

        {trial?.isTrialAvailable && (
          <>
            {/* divider */}

            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* trial button */}

            <Button
              mode="outlined"
              onPress={trialMutation}
              disabled={trialPending}
              style={styles.trialButton}
              labelStyle={styles.trialButtonText}
              contentStyle={styles.trialContent}
            >
              Start a free trial at @ ₹0
            </Button>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default SummaryScreen;

const styles = StyleSheet.create({
  loyaltyPoints: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  checkboxStyle: {
    height: 20,
    width: 20,
  },

  trialButton: {
    borderRadius: 10,
    paddingVertical: 10,
    width: "100%", // Full width button
  },
  trialButtonText: {
    color: customDarkTheme.colors.primary,
    fontWeight: "bold",
    fontSize: 18,
  },
  trialContent: {
    height: 40, // Ensure a good touch target size
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  dividerLine: {
    width: 50,
    height: 2,
    backgroundColor: customLightTheme.colors.placeholder,
    marginVertical: 5,
  },
  dividerText: {
    fontSize: 16,
    color: customLightTheme.colors.placeholder,
    fontWeight: "bold",
    marginVertical: 5,
  },
  container: {
    flex: 1,
    backgroundColor: customDarkTheme.colors.background,
    paddingBottom: 30,
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
    paddingBottom: 50,
  },
  sectionHeading: {
    fontSize: 22,
    fontWeight: "bold",
    color: customDarkTheme.colors.text,
    marginBottom: 20,
    textAlign: "center",
  },
  sectionSubHeading: {
    fontSize: 18,
    fontWeight: "bold",
    color: customDarkTheme.colors.primary,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#333333",
    paddingBottom: 5,
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
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: customDarkTheme.colors.onSurface,
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 15,
    color: customDarkTheme.colors.onSurface,
    opacity: 0.8,
    lineHeight: 22,
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailText: {
    fontSize: 16,
    color: customDarkTheme.colors.onSurface,
    marginLeft: 10,
  },
  priceItemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  priceItemLabel: {
    fontSize: 16,
    color: customDarkTheme.colors.onSurface,
    opacity: 0.8,
  },
  priceItemValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: customDarkTheme.colors.onSurface,
  },
  grandTotalRow: {
    borderTopWidth: 1,
    borderTopColor: "#333333",
    paddingTop: 10,
    marginTop: 10,
  },
  grandTotalLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: customDarkTheme.colors.text,
  },
  grandTotalValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: customDarkTheme.colors.accent, // Highlight grand total
  },
  loyaltyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    backgroundColor: "rgba(3,218,198,0.1)", // Light accent background
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  loyaltyText: {
    fontSize: 15,
    color: customDarkTheme.colors.accent,
    fontWeight: "600",
    marginLeft: 10,
  },
  payNowButton: {
    marginTop: 30,
    borderRadius: 10,
    backgroundColor: customDarkTheme.colors.primary,
    paddingVertical: 10,
    width: "100%", // Full width button
  },
  payNowButtonText: {
    color: customDarkTheme.colors.onPrimary,
    fontWeight: "bold",
    fontSize: 18,
  },
  payNowButtonContent: {
    height: 40, // Ensure a good touch target size
  },
});
