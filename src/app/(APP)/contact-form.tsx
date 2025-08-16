import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { TextInput, Button } from "react-native-paper";
import Icon from "@react-native-vector-icons/material-design-icons";
import { useState } from "react";
import { customDarkTheme } from "@/context/ReactNativePaper";
import AppHeader from "@/components/AppHeader";
import { Picker } from "@react-native-picker/picker";

const { width } = Dimensions.get("window");

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    console.log("Contact Form Submitted:");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Query:", query);
    console.log("Message:", message);
    // Add logic to send the form data (e.g., API call)
    // You might want to show a success message or navigate back
    alert("Thank you for your message! We will get back to you soon."); // Using alert for demo, replace with custom modal
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <View style={styles.container}>
      {/* Appbar for navigation back */}
      <AppHeader title="Contact Form" backButton={true} icons={false} />

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.formDescription}>
          Have a question or feedback? Fill out the form below and we'll get
          back to you!
        </Text>

        {/* Name Input */}
        <TextInput
          label="Your Name"
          value={name}
          onChangeText={setName}
          mode="outlined"
          style={styles.textInput}
          theme={{
            colors: {
              primary: customDarkTheme.colors.primary,
              text: customDarkTheme.colors.text,
              background: customDarkTheme.colors.surface,
              placeholder: customDarkTheme.colors.placeholder,
            },
          }}
          outlineColor={customDarkTheme.colors.primary}
          activeOutlineColor={customDarkTheme.colors.accent}
          placeholderTextColor={customDarkTheme.colors.placeholder}
        />

        {/* Email Input */}
        <TextInput
          label="Your Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.textInput}
          theme={{
            colors: {
              primary: customDarkTheme.colors.primary,
              text: customDarkTheme.colors.text,
              background: customDarkTheme.colors.surface,
              placeholder: customDarkTheme.colors.placeholder,
            },
          }}
          outlineColor={customDarkTheme.colors.primary}
          activeOutlineColor={customDarkTheme.colors.accent}
          placeholderTextColor={customDarkTheme.colors.placeholder}
        />

        {/* Message Input */}
        <TextInput
          label="Your Message"
          value={message}
          onChangeText={setMessage}
          mode="outlined"
          multiline={true} // Enable multi-line input
          numberOfLines={6} // Initial number of lines
          style={[styles.textInput, styles.messageInput]} // Apply message-specific styles
          theme={{
            colors: {
              primary: customDarkTheme.colors.primary,
              text: customDarkTheme.colors.text,
              background: customDarkTheme.colors.surface,
              placeholder: customDarkTheme.colors.placeholder,
            },
          }}
          outlineColor={customDarkTheme.colors.primary}
          activeOutlineColor={customDarkTheme.colors.accent}
          placeholderTextColor={customDarkTheme.colors.placeholder}
        />

        <Picker
          selectedValue={query}
          onValueChange={(itemValue) => setQuery(itemValue)}
          mode="dropdown"
          selectionColor={"#000000"}
          style={{ color: "black", fontWeight: "bold" }}
        >
          <Picker.Item label="Course related enquiry" value="course related" />
          <Picker.Item
            label="Invoice related enquiry"
            value="invoice related"
          />
          <Picker.Item
            label="Account related enquiry"
            value="account related"
          />
          <Picker.Item
            label="Profile related enquiry"
            value="profile related"
          />
        </Picker>

        {/* Submit Button */}

        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.submitButton}
          labelStyle={styles.submitButtonText}
          contentStyle={styles.submitButtonContent}
        >
          Send Message
        </Button>
      </ScrollView>
    </View>
  );
};

export default ContactForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: customDarkTheme.colors.background,
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
  },
  formDescription: {
    fontSize: 16,
    color: customDarkTheme.colors.text,
    opacity: 0.8,
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 24,
  },
  textInput: {
    marginBottom: 15,
    backgroundColor: customDarkTheme.colors.surface,
    color: customDarkTheme.colors.text,
  },
  messageInput: {
    height: 150, // Make the message input taller
    textAlignVertical: "top", // Align text to the top for multiline
  },
  submitButton: {
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: customDarkTheme.colors.primary,
    paddingVertical: 10,
    width: "100%", // Full width button
  },
  submitButtonText: {
    color: customDarkTheme.colors.onPrimary,
    fontWeight: "bold",
    fontSize: 18,
  },
  submitButtonContent: {
    height: 40, // Ensure a good touch target size
  },
});
