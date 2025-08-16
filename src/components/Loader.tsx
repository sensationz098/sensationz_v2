import { customDarkTheme } from "@/context/ReactNativePaper";
import { View, Text, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size={"large"}
        color={customDarkTheme.colors.primary}
      />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
