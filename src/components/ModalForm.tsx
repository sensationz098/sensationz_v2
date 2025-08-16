import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import {
  Button,
  Modal,
  Portal,
  Provider as PaperProvider,
  Title,
  TextInput,
} from "react-native-paper";
import { useState } from "react";

import Icon from "@react-native-vector-icons/material-design-icons";
import { customDarkTheme } from "@/context/ReactNativePaper";

const { height } = Dimensions.get("window");

const ModalForm = () => {
  const [visible, setVisible] = useState(false);
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [selectedTimings, setSelectedTimings] = useState([]);
  const [selectedDurations, setSelectedDurations] = useState([]);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  // Dummy data for selections
  const availableTeachers = [
    "Mr. John Doe",
    "Ms. Jane Smith",
    "Dr. Alex Brown",
  ];
  const availableTimings = [
    "09:00 AM - 10:00 AM",
    "02:00 PM - 03:00 PM",
    "06:00 PM - 07:00 PM",
  ];
  const availableDurations = ["1 Month", "3 Months", "6 Months", "1 Year"];

  // Helper to simulate selection (in a real app, this would open a multi-select picker)
  const handleSelection = (field, options) => {
    // For demonstration, we'll just pick the first option if nothing is selected,
    // or toggle a few options. In a real app, this would trigger a dedicated
    // multi-select UI (e.g., another modal with checkboxes).
    if (field === "teachers") {
      setSelectedTeachers((prev) =>
        prev.length === 0 ? [options[0]] : options.slice(0, 2)
      );
    } else if (field === "timings") {
      setSelectedTimings((prev) =>
        prev.length === 0 ? [options[1]] : options.slice(1, 3)
      );
    } else if (field === "durations") {
      setSelectedDurations((prev) =>
        prev.length === 0 ? [options[2]] : options.slice(0, 1)
      );
    }
    console.log(`Simulating selection for ${field}`);
  };

  const handleSubmit = () => {
    console.log("Form Submitted:");
    console.log("Selected Teachers:", selectedTeachers);
    console.log("Selected Timings:", selectedTimings);
    console.log("Selected Durations:", selectedDurations);
    // Add actual form submission logic here (e.g., API call)
    hideModal();
    // Reset form fields
    setSelectedTeachers([]);
    setSelectedTimings([]);
    setSelectedDurations([]);
  };
  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        onPress={showModal}
        style={styles.openModalButton}
      >
        Open Course Form
      </Button>

      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalContainer}
        >
          <View style={styles.modalHeader}>
            <Title style={styles.modalTitle}>Configure Class</Title>
            <Icon
              name="close-circle"
              size={24}
              color={customDarkTheme.colors.text}
              onPress={hideModal}
            />
          </View>
          <ScrollView style={styles.scrollView}>
            {/* Teacher Selection */}
            <TouchableOpacity
              onPress={() => handleSelection("teachers", availableTeachers)}
              style={styles.inputTouchable}
            >
              <TextInput
                label="Select Teacher(s)"
                value={selectedTeachers.join(", ")}
                mode="outlined"
                editable={false} // Make it non-editable to indicate selection
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
            </TouchableOpacity>

            {/* Timing Selection */}
            <TouchableOpacity
              onPress={() => handleSelection("timings", availableTimings)}
              style={styles.inputTouchable}
            >
              <TextInput
                label="Select Timing(s)"
                value={selectedTimings.join(", ")}
                mode="outlined"
                editable={false}
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
            </TouchableOpacity>

            {/* Duration Selection */}
            <TouchableOpacity
              onPress={() => handleSelection("durations", availableDurations)}
              style={styles.inputTouchable}
            >
              <TextInput
                label="Select Duration(s)"
                value={selectedDurations.join(", ")}
                mode="outlined"
                editable={false}
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
            </TouchableOpacity>

            {/* Submit Button */}
            <Button
              mode="contained"
              onPress={handleSubmit}
              style={styles.submitButton}
            >
              Submit Configuration
            </Button>
          </ScrollView>
          <Button
            mode="outlined"
            onPress={hideModal}
            style={styles.closeButton}
          >
            Cancel
          </Button>
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: customDarkTheme.colors.background,
  },
  openModalButton: {
    backgroundColor: customDarkTheme.colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  modalContainer: {
    backgroundColor: customDarkTheme.colors.surface,
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 20,
    maxHeight: height * 0.8, // Limit modal height to 80% of screen height
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.35,
    shadowRadius: 6.27,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#333333",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: customDarkTheme.colors.onSurface,
  },
  scrollView: {
    flexGrow: 1, // Allows content to grow and enable scrolling
    marginBottom: 15,
    width: "100%", // Ensure scroll view takes full width
  },
  inputTouchable: {
    width: "100%",
    marginBottom: 15, // Space between inputs
  },
  textInput: {
    backgroundColor: customDarkTheme.colors.background, // Input background slightly darker than modal surface
    color: customDarkTheme.colors.text, // Text color inside input
  },
  submitButton: {
    marginTop: 10,
    backgroundColor: customDarkTheme.colors.primary,
    borderRadius: 8,
    paddingVertical: 5,
    width: "100%",
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: "transparent", // Transparent background for cancel
    borderColor: customDarkTheme.colors.primary,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 5,
    width: "100%",
  },
});

export default ModalForm;
