import AppHeader from "@/components/AppHeader";
import Loader from "@/components/Loader";
import NoDataFound from "@/components/NoDataFound";
import { customDarkTheme } from "@/context/ReactNativePaper";
import { useReactQuery } from "@/hooks/useReactQuery";
import { useAuthStore } from "@/store/authStore";
import { getAllTransaction } from "@/supabase/dbQuery";
import Icon from "@react-native-vector-icons/material-design-icons";
import { format } from "date-fns";
import { Link } from "expo-router";
import { FlatList, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";

type TransactionType = {
  transactionId: string;
  dateOfPayment: string;
  amountPaid: number;
  razorpay_payment_id: string;
};

// Transaction Item Card Component
const TransactionItem = ({
  transactionId,
  dateOfPayment,
  amountPaid,
  razorpay_payment_id,
}: TransactionType) => {
  return (
    <Link asChild href={`/transaction/${transactionId}`}>
      <Card style={styles.transactionCard}>
        <Card.Content style={styles.transactionCardContent}>
          <View>
            <View style={styles.transactionDetailRow}>
              <Icon
                name="receipt"
                size={20}
                color={customDarkTheme.colors.primary}
              />
              <Text style={styles.transactionValue}>
                #_{razorpay_payment_id}
              </Text>
            </View>
            <View style={styles.transactionDetailRow}>
              <Icon
                name="calendar-month"
                size={20}
                color={customDarkTheme.colors.primary}
              />
              <Text style={styles.transactionValue}>
                paid on {format(dateOfPayment, "dd-MM-yyyy")}
              </Text>
            </View>
            <View style={styles.transactionDetailRow}>
              <Icon
                name="currency-inr"
                size={20}
                color={customDarkTheme.colors.accent}
              />

              <Text style={styles.transactionAmount}>
                {amountPaid.toFixed(2)}
              </Text>
            </View>
          </View>
          <View>
            <Icon
              name="chevron-right-circle"
              size={30}
              color={customDarkTheme.colors.primary}
            />
          </View>
        </Card.Content>
      </Card>
    </Link>
  );
};

const Transactions = () => {
  const session = useAuthStore((state) => state.session);

  const { data: transactions, isLoading } = useReactQuery(
    ["transaction"],
    async () => await getAllTransaction(session?.user.id!)
  );

  if (isLoading) return <Loader />;

  return (
    <View style={styles.container}>
      {/* Appbar for navigation back */}
      <AppHeader title="Transactions" backButton={true} icons={false} />

      {/* List of transactions */}
      {transactions?.length === 0 ? (
        <NoDataFound />
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TransactionItem
              transactionId={item.id}
              razorpay_payment_id={item.razorpay_payment_id}
              dateOfPayment={item.created_at!}
              amountPaid={item.amount}
            />
          )}
          contentContainerStyle={styles.transactionsList}
        />
      )}
    </View>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: customDarkTheme.colors.background,
    paddingBottom: 10,
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
  transactionsList: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  transactionCard: {
    marginBottom: 15,
    borderRadius: 12,
    backgroundColor: customDarkTheme.colors.surface,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  transactionCardContent: {
    padding: 15,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  transactionDetailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  transactionLabel: {
    fontSize: 15,
    color: customDarkTheme.colors.onSurface,
    opacity: 0.7,
    marginLeft: 10,
    marginRight: 5,
    minWidth: 90, // Ensure labels align
  },
  transactionValue: {
    marginLeft: 4,
    fontSize: 15,
    color: customDarkTheme.colors.onSurface,
    fontWeight: "500",
    flexShrink: 1, // Allow text to wrap
  },
  transactionAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: customDarkTheme.colors.accent, // Highlight amount
  },
});
