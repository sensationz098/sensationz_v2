import { customDarkTheme } from "@/context/ReactNativePaper";
import { formatTime } from "@/lib/utils";
import { Picker } from "@react-native-picker/picker";
import { Dimensions, Platform, StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";

const { width } = Dimensions.get("window");

type GenericPickerItemType = {
  [key: string]: any;
};

// Define the props for the SingleItemPicker component, now generic
type SingleItemPickerProps<T extends GenericPickerItemType> = {
  label: string;
  items: T[]; // items is now an array of generic objects
  selectedValue: T[keyof T] | null; // This will be the value of the selected item (e.g., ID, name, or whatever valueKey points to)
  onValueChange: (value: T[keyof T] | null, itemObject: T | null) => void;
  labelKey: keyof T; // Key to use for display label in Picker.Item and TextInput
  valueKey: keyof T; // Key to use for value in Picker.Item and selectedValue
};

const SingleItemPicker = <T extends GenericPickerItemType>({
  label,
  items,
  selectedValue,
  onValueChange,
  labelKey,
  valueKey,
}: SingleItemPickerProps<T>) => {
  // Find the display value for the TextInput based on labelKey
  const displayValue = selectedValue
    ? (items.find((item) => item[valueKey] === selectedValue)?.[
        labelKey
      ] as string) || `Select a ${label.toLowerCase()}`
    : `Select a ${label.toLowerCase()}`;

  return (
    <View style={styles.pickerContainer}>
      <TextInput
        label={label}
        value={displayValue} // Display the name/label here
        mode="outlined"
        editable={false} // Make it non-editable as it's for display
        right={
          <TextInput.Icon
            icon="chevron-down"
            color={customDarkTheme.colors.primary}
          />
        }
        style={styles.textInput}
        theme={{
          colors: {
            primary: customDarkTheme.colors.primary,
            text: customDarkTheme.colors.text,
            background: customDarkTheme.colors.background,
            placeholder: customDarkTheme.colors.placeholder,
          },
        }}
        outlineColor={customDarkTheme.colors.primary}
        activeOutlineColor={customDarkTheme.colors.accent}
        placeholderTextColor={customDarkTheme.colors.placeholder}
      />
      {/* The Picker component itself, hidden but functional */}
      <View style={styles.hiddenPickerOverlay}>
        <Picker
          mode={Platform.OS === "ios" ? "dialog" : "dropdown"}
          selectedValue={selectedValue} // Picker works with the valueKey's value
          onValueChange={(itemValue: T[keyof T] | null) => {
            // Find the full item object based on the selected valueKey's value
            const selectedItemObject =
              items.find((item) => item[valueKey] === itemValue) || null;
            onValueChange(itemValue, selectedItemObject); // Pass both the value and the full object
          }}
          style={styles.picker}
          itemStyle={styles.pickerItem} // Apply style to individual items
        >
          {/* Add a default disabled item if no value is selected */}
          {/* {!selectedValue && (
            <Picker.Item
              label={`-- Select a ${label.toLowerCase()} --`}
              value={null}
              enabled={false}
            />
          )} */}
          {items.map((item) => (
            <Picker.Item
              key={String(item[valueKey])} // Use valueKey for unique key, ensure it's a string
              // label={
              //   item.labelKey === "timing"
              //     ? formatTime(item[labelKey])
              //     : String(item[labelKey])
              // } // Use labelKey for display, ensure it's a string
              label={String(item[labelKey])} // Use labelKey for display, ensure it's a string
              value={item[valueKey]} // Use valueKey for the actual picker value
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default SingleItemPicker;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: customDarkTheme.colors.background,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: customDarkTheme.colors.text,
    marginBottom: 30,
  },
  pickerContainer: {
    width: "100%",
    marginBottom: 20,
    position: "relative",
  },
  textInput: {
    backgroundColor: customDarkTheme.colors.surface,
    color: customDarkTheme.colors.text,
  },
  hiddenPickerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
    overflow: "hidden",
  },
  picker: {
    width: "100%",
    height: 50,
    color: customDarkTheme.colors.text,
  },
  pickerItem: {
    color: customDarkTheme.colors.text,
  },
  selectedValuesContainer: {
    marginTop: 10,
    padding: 15,
    backgroundColor: customDarkTheme.colors.surface,
    borderRadius: 10,
    width: "100%",
    alignItems: "flex-start", // Align text to start for better readability
  },
  selectedText: {
    fontSize: 16,
    color: customDarkTheme.colors.text,
    marginBottom: 5,
  },
  separator: {
    height: 1,
    width: "80%",
    backgroundColor: customDarkTheme.colors.primary,
    marginVertical: 30,
  },
});
