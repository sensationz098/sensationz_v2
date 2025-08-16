import AppHeader from "@/components/AppHeader";
import DatePicker from "@/components/DatePicker";
import { customDarkTheme } from "@/context/ReactNativePaper";
import { useReactMutation } from "@/hooks/useReactQuery";
import { formatTime } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { editUserProfile } from "@/supabase/dbMutation";
import { parse } from "date-fns";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import Icon from "@react-native-vector-icons/material-design-icons";
import { useQueryClient } from "@tanstack/react-query";

const { width } = Dimensions.get("window");

const EditProfile = () => {
  const { push } = useRouter();

  const client = useQueryClient();

  const session = useAuthStore((state) => state.session);
  const profile = useAuthStore((state) => state.profile);

  const [fullName, setFullName] = useState(
    session?.user.user_metadata.full_name
  );
  const [email, setEmail] = useState(session?.user.email);
  const [contact, setContact] = useState(profile?.profile?.contact || "");
  const [state, setState] = useState(profile?.profile?.state || "");
  const [country, setCountry] = useState(profile?.profile?.country || "");
  const [dateOfBirth, setDateOfBirth] = useState(
    parse(profile?.profile?.date_of_birth as string, "yyyy-MM-dd", new Date())
  );
  const [showDatePicker, setShowDatePicker] = useState(false);

  const { mutate, isPending } = useReactMutation(
    ["edit-profile"],
    async () =>
      await editUserProfile({
        id: session?.user.id!,
        value: {
          contact,
          full_name: fullName,
          country,
          state,
          date_of_birth: dateOfBirth,
        },
      }),
    {
      onSuccess: (data) => {
        if (data) {
          Alert.alert("Profile updated successfully");
          client.invalidateQueries({ queryKey: ["edit-profile"] });
          push("/profile");
        } else {
          Alert.alert("Something went wrong");
        }
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  return (
    <View style={styles.container}>
      {/* Appbar for navigation back */}
      <AppHeader title="Edit Profile" backButton={true} icons={false} />

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Email Input */}
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          disabled
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

        {/* Full Name Input */}
        <TextInput
          label="Full Name"
          value={fullName}
          onChangeText={setFullName}
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

        {/* Contact Input */}
        <TextInput
          label="Contact"
          value={contact}
          onChangeText={setContact}
          mode="outlined"
          keyboardType="phone-pad"
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

        {/* State Input */}
        <TextInput
          label="State"
          value={state}
          onChangeText={setState}
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

        {/* Country Input */}
        <TextInput
          label="Country"
          value={country}
          onChangeText={setCountry}
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

        {/* Date of Birth Input with Date Picker */}
        <DatePicker
          type="date_of_birth"
          date={dateOfBirth}
          setDate={setDateOfBirth}
          setShow={setShowDatePicker}
          show={showDatePicker}
        />

        {/* Update Profile Button */}
        <Button
          mode={isPending ? "outlined" : "contained"}
          onPress={mutate}
          disabled={isPending}
          style={styles.updateButton}
          labelStyle={styles.updateButtonText}
          contentStyle={styles.updateButtonContent}
        >
          {isPending ? "Updating..." : "Update Profile"}
        </Button>
      </ScrollView>
    </View>
  );
};

export default EditProfile;

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
  textInput: {
    marginBottom: 15,
    backgroundColor: customDarkTheme.colors.surface,
    color: customDarkTheme.colors.text,
  },
  datePickerTouchable: {
    width: "100%", // Ensure touchable takes full width
  },
  updateButton: {
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: customDarkTheme.colors.primary,
    paddingVertical: 10,
    width: "100%", // Full width button
  },
  updateButtonText: {
    color: customDarkTheme.colors.onPrimary,
    fontWeight: "bold",
    fontSize: 18,
  },
  updateButtonContent: {
    height: 40, // Ensure a good touch target size
  },
  // Date Picker Modal Styles (for simulation)
  datePickerModalContainer: {
    backgroundColor: customDarkTheme.colors.surface,
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 12,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.35,
    shadowRadius: 6.27,
    alignItems: "center",
  },
  datePickerModalContent: {
    width: "100%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: customDarkTheme.colors.onSurface,
    marginBottom: 20,
  },
  datePickerPlaceholderText: {
    color: customDarkTheme.colors.placeholder,
    marginBottom: 20,
    fontSize: 16,
    textAlign: "center",
  },
  modalConfirmButton: {
    marginTop: 10,
    width: "80%",
    borderRadius: 8,
    backgroundColor: customDarkTheme.colors.primary,
  },
  modalCancelButton: {
    marginTop: 10,
    width: "80%",
    borderRadius: 8,
    borderColor: customDarkTheme.colors.primary,
    borderWidth: 1,
  },
});
