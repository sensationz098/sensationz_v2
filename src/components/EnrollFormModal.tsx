import { customDarkTheme } from "@/context/ReactNativePaper";
import { useCourse } from "@/store/zustand";
import Icon from "@react-native-vector-icons/material-design-icons";
import { Link } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Button, Modal, Portal, Text, TextInput } from "react-native-paper";
import DatePicker from "./DatePicker";
import SingleItemPicker from "./ItemPicker";

const { width } = Dimensions.get("window");

type TeacherType = {
  id: string;
  name: string;
};

type DurationType = {
  id: string;
  months: string;
  discounted_price: number;
  price: number;
};

type CounsellorType = {
  id: string;
  name: string;
  counsellor_id: string;
};

type ScheduleType = {
  id: string;
  timing: string;
};

interface EnrollFormModalProps {
  course_id: string;
  cousre_title: string;
  visible: boolean;
  setShowVisible: (visible: boolean) => void;
  teacher: TeacherType[];
  duration: DurationType[];
  counsellor: CounsellorType[];
  schedule: ScheduleType[];
  days: string[];
}

const EnrollFormModal = ({
  course_id,
  cousre_title,
  visible,
  setShowVisible,
  counsellor,
  duration,
  teacher,
  schedule,
  days,
}: EnrollFormModalProps) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  // details
  const [pickTeacher, setPickTeacher] = useState<string | null>(null);
  const [pickCounsellor, setPickCounsellor] = useState<CounsellorType | null>(
    null
  );
  const [pickDuration, setPickDuration] = useState<string | null>(null);
  const [pickSchedule, setPickSchedule] = useState<string | null>(null);
  const [textCounsellor, setTextCounsellor] = useState("");
  const [searchedCounsellor, setSearchedCounsellor] = useState<
    CounsellorType | undefined
  >(undefined);

  const course = useCourse((state) => state.course);
  const setCourse = useCourse((state) => state.setCourse);

  const teacherContext = useCourse((state) => state.teacher);
  const setTeacherContext = useCourse((state) => state.setTeacher);

  const durationContext = useCourse((state) => state.duration);
  const setDurationContext = useCourse((state) => state.setDuration);

  const counsellorContext = useCourse((state) => state.counsellor);
  const setCounsellorContext = useCourse((state) => state.setCounsellor);

  const scheduleContext = useCourse((state) => state.schedule);
  const setScheduleContext = useCourse((state) => state.setSchedule);

  const resetContext = useCourse((state) => state.reset);

  const hideModal = () => setShowVisible(false);

  const searchCounsellor = () => {
    const searchedCounsellor = counsellor.find(
      (counsellor) => counsellor.counsellor_id === textCounsellor
    );
    setCounsellorContext({
      name: searchedCounsellor?.name!,
      counsellor_id: searchedCounsellor?.id!,
    });
    setSearchedCounsellor(searchedCounsellor);
  };

  const handleTeacherSelect = (
    itemValue: string | null,
    selectedItemObject: TeacherType | null
  ) => {
    setPickTeacher(itemValue);
    setTeacherContext({
      teacher_id: selectedItemObject?.id!,
      name: selectedItemObject?.name!,
    });
  };

  const handleScheduleSelect = (
    itemValue: string | null,
    selectedItemObject: ScheduleType | null
  ) => {
    setPickSchedule(itemValue);
    setScheduleContext({
      schedule_id: selectedItemObject?.id!,
      timing: selectedItemObject?.timing!,
    });
  };

  const handleDurationSelect = (
    itemValue: string | null,
    selectedItemObject: DurationType | null
  ) => {
    setPickDuration(itemValue);
    setDurationContext({
      duration_id: selectedItemObject?.id!,
      months: selectedItemObject?.months!,
      discounted_price: selectedItemObject?.discounted_price!,
      price: selectedItemObject?.price!,
    });
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.modalContainer}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            style={styles.modalContent}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.modalTitle}>Enroll in {course?.name}</Text>

            {/* select teacher */}
            <Text style={styles.headingTextStyle}>Select Teacher</Text>
            <SingleItemPicker<TeacherType>
              label="Select Teacher"
              items={teacher}
              selectedValue={pickTeacher}
              onValueChange={handleTeacherSelect}
              labelKey="name"
              valueKey="id"
            />

            {/* select timing */}
            <Text style={styles.headingTextStyle}>Select Timings</Text>
            <SingleItemPicker<ScheduleType>
              label="Select Schedule"
              items={schedule}
              selectedValue={pickSchedule}
              onValueChange={handleScheduleSelect}
              labelKey="timing"
              valueKey="id"
            />

            {/* select durations */}
            <Text style={styles.headingTextStyle}>Select Durations</Text>
            <SingleItemPicker<DurationType>
              label="Select Duration"
              items={duration}
              selectedValue={pickDuration}
              onValueChange={handleDurationSelect}
              labelKey="months"
              valueKey="id"
            />

            {/* course start date */}
            <Text style={styles.headingTextStyle}>Course Start Date</Text>
            <DatePicker
              type="start_date"
              date={date}
              setDate={setDate}
              show={show}
              setShow={setShow}
            />

            {/* select counsellor */}
            <Text style={styles.headingTextStyle}>Select Counsellor</Text>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                gap: 8,
              }}
            >
              <TextInput
                style={{
                  flex: 1,
                  width: "75%",
                }}
                keyboardType="number-pad"
                label={"Counsellor"}
                value={textCounsellor}
                onChangeText={setTextCounsellor}
              />
              <Button
                onPress={searchCounsellor}
                style={{ borderRadius: 10 }}
                mode="contained"
              >
                check
              </Button>
            </View>

            <Text
              style={{
                marginTop: 10,
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              <Icon
                name="check-circle"
                color="green"
                size={15}
                style={{ marginRight: 5 }}
              />
              {searchedCounsellor?.name} counsellor selected
            </Text>

            <View style={styles.modalButtonContainer}>
              <Button
                mode="outlined"
                onPress={() => {
                  hideModal();
                  resetContext();
                }}
                style={styles.modalButton}
                labelStyle={styles.modalButtonText}
              >
                Cancel
              </Button>

              <Link
                asChild
                href={{
                  pathname: "/summary",
                  params: { course_days: JSON.stringify(days) },
                }}
              >
                <Button
                  mode={"contained"}
                  onPress={() => {
                    setCourse({
                      course_id: course_id,
                      name: cousre_title,
                    });
                    hideModal();
                  }}
                  disabled={
                    !counsellorContext?.counsellor_id ||
                    !durationContext?.duration_id ||
                    !scheduleContext?.schedule_id ||
                    !date
                  }
                  style={styles.modalButton}
                  labelStyle={styles.modalButtonText}
                >
                  Submit
                </Button>
              </Link>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  headingTextStyle: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  pickerContainer: {
    width: "100%",
    marginBottom: 20,
    position: "relative", // Needed for absolute positioning of picker
  },

  hiddenPickerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0, // Make it completely transparent
    overflow: "hidden", // Hide any overflow from the picker itself
  },
  pickerItem: {
    color: customDarkTheme.colors.text, // Text color for picker items (iOS)
  },
  picker: {
    width: "100%",
    height: 50, // Standard height for picker
    color: customDarkTheme.colors.text, // Text color inside picker (Android)
  },

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
  courseImage: {
    width: "100%",
    height: width * 0.55, // Responsive height based on width
    borderRadius: 12,
    marginBottom: 20,
    resizeMode: "cover",
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
  courseTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: customDarkTheme.colors.onSurface,
    marginBottom: 10,
  },
  courseDescription: {
    fontSize: 16,
    color: customDarkTheme.colors.onSurface,
    opacity: 0.8,
    lineHeight: 24,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: "bold",
    color: customDarkTheme.colors.primary,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#333333",
    paddingBottom: 5,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    color: customDarkTheme.colors.onSurface,
    marginLeft: 10,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 15,
  },
  originalPrice: {
    fontSize: 18,
    color: customDarkTheme.colors.onSurface,
    opacity: 0.6,
    textDecorationLine: "line-through",
    marginRight: 15,
  },
  discountedPrice: {
    fontSize: 28,
    fontWeight: "bold",
    color: customDarkTheme.colors.accent, // Use accent color for discounted price
  },
  enrollButton: {
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: customDarkTheme.colors.primary,
    paddingVertical: 10,
    width: "100%", // Full width button
  },
  enrollButtonText: {
    color: customDarkTheme.colors.onPrimary,
    fontWeight: "bold",
    fontSize: 18,
  },
  enrollButtonContent: {
    height: 60, // Ensure a good touch target size
  },
  // Modal styles
  modalContainer: {
    paddingBottom: 40,
    backgroundColor: customDarkTheme.colors.surface,
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 12,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.35,
    shadowRadius: 6.27,
  },
  modalContent: {
    width: "100%",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: customDarkTheme.colors.onSurface,
    marginBottom: 20,
    textAlign: "center",
  },
  textInput: {
    marginBottom: 15,
    backgroundColor: customDarkTheme.colors.background, // Input background slightly darker than modal surface
    color: customDarkTheme.colors.text, // Text color inside input
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 8,
    paddingVertical: 5,
  },
  modalButtonText: {
    fontWeight: "bold",
  },
});

export default EnrollFormModal;
