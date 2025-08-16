import AppHeader from "@/components/AppHeader";
import ErrorScreen from "@/components/Error";
import Loader from "@/components/Loader";
import { customDarkTheme } from "@/context/ReactNativePaper";
import { useReactQuery } from "@/hooks/useReactQuery";
import { getCourseByName } from "@/supabase/dbQuery";
import { Link, useLocalSearchParams } from "expo-router";
import { Dimensions, FlatList, Image, StyleSheet, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";

const { width } = Dimensions.get("window");

const CourseNameCategories = () => {
  const { name } = useLocalSearchParams();

  const {
    data: course,
    isLoading,
    isError,
    error,
  } = useReactQuery(
    ["course", name as string],
    async () => await getCourseByName(name as string)
  );

  if (isLoading) return <Loader />;

  if (isError) return <ErrorScreen errorMessage={error?.message} />;

  return (
    <>
      <AppHeader title={name as string} icons={false} backButton={true} />
      {isLoading ? (
        <Loader />
      ) : (
        <FlatList
          data={course}
          renderItem={({ item }) =>
            renderCard({
              id: item.id,
              title: item.title,
              description: item.description,
              image_url: item.image_url!,
            })
          }
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          // ItemSeparatorComponent={() => <View style={{ height: 1 }} />}
        />
      )}
    </>
  );
};

type RenderCardType = {
  id: string;
  title: string;
  image_url: string;
  description: string;
};

const renderCard = ({ title, description, image_url, id }: RenderCardType) => {
  // Define a fixed card height to calculate image height as 45%
  const cardHeight = width * 0.9 * 1.2; // Example: card is 90% of screen width, and 1.2 times taller than wide
  const imageHeight = cardHeight * 0.45; // 45% of card height

  return (
    <Card style={styles.purchaseCourseCard}>
      <Image
        source={{
          uri:
            image_url ||
            "https://plus.unsplash.com/premium_photo-1753089574948-9a9a358bc575?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        }} // Placeholder with fallback
        style={[styles.purchaseCardImage, { height: imageHeight }]}
        onError={(e) =>
          console.log("Image loading error:", e.nativeEvent.error)
        }
      />
      <Card.Content style={styles.purchaseCardContent}>
        <Text style={styles.purchaseCardTitle}>{title}</Text>
        <Text style={styles.purchaseCardDescription} numberOfLines={3}>
          {description}
        </Text>

        <Link asChild href={`/course/details/${id}`}>
          <Button
            mode="contained"
            onPress={() => {}}
            style={styles.buyNowButton}
            labelStyle={styles.buyNowButtonText}
            contentStyle={styles.buyNowButtonContent} // Ensure full width
          >
            Enroll Now
          </Button>
        </Link>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  purchaseCourseCard: {
    width: width * 0.9, // Card takes 90% of screen width
    marginVertical: 15,
    marginHorizontal: width * 0.05, // Center the card
    borderRadius: 12,
    overflow: "hidden", // Ensure image and content respect border radius
    backgroundColor: customDarkTheme.colors.surface, // Card background
    elevation: 8, // More prominent shadow for a "purchase" card
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  purchaseCardImage: {
    width: "100%",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    resizeMode: "cover", // Cover the area, potentially cropping
  },
  purchaseCardContent: {
    padding: 20,
  },
  purchaseCardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: customDarkTheme.colors.onSurface,
    marginBottom: 8,
  },
  purchaseCardDescription: {
    fontSize: 14,
    color: customDarkTheme.colors.onSurface,
    opacity: 0.7,
    marginBottom: 15,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline", // Align text baselines
    marginBottom: 20,
  },
  originalPrice: {
    fontSize: 16,
    color: customDarkTheme.colors.onSurface,
    opacity: 0.6,
    textDecorationLine: "line-through", // Strike-through effect
    marginRight: 10,
  },
  discountedPrice: {
    fontSize: 24,
    fontWeight: "bold",
    color: customDarkTheme.colors.primary, // Highlight discounted price
  },
  buyNowButton: {
    borderRadius: 8,
    backgroundColor: customDarkTheme.colors.primary,
    paddingVertical: 8,
  },
  buyNowButtonText: {
    color: customDarkTheme.colors.onPrimary,
    fontWeight: "bold",
    fontSize: 18,
  },
  buyNowButtonContent: {
    width: "100%", // Make the button take full width of its container
  },
});

export default CourseNameCategories;
