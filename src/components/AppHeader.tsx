import { customDarkTheme } from "@/context/ReactNativePaper";
import { Link, useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";

type AppHeaderType = {
  title: string;
  backButton: boolean;
  icons: boolean;
};

const AppHeader = ({ title, backButton, icons }: AppHeaderType) => {
  const { back } = useRouter();

  return (
    <Appbar.Header style={styles.appBarHeader}>
      {backButton && <Appbar.BackAction onPress={back} />}
      <Appbar.Content title={title} titleStyle={styles.appBarTitle} />
      {icons && (
        <Link asChild href="/notification">
          <Appbar.Action icon="bell" color={customDarkTheme.colors.text} />
        </Link>
      )}
    </Appbar.Header>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
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
});
