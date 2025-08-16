import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Button, View } from "react-native";
import { format, addYears, subYears, addMonths } from "date-fns";
import { useCourse } from "@/store/zustand";

type DateTimePickerPropsType = {
  type: "start_date" | "date_of_birth";
  date: string | Date;
  setDate: (value: Date) => void;
  show: boolean;
  setShow: (value: boolean) => void;
};

const DatePicker = ({
  type,
  date,
  setDate,
  setShow,
  show,
}: DateTimePickerPropsType) => {
  const setStartDate = useCourse((state) => state.setStartDate);

  const onChange = (event: DateTimePickerEvent, selectedDate: Date) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    setStartDate(currentDate);
    setShow(false);
  };

  return (
    <View>
      <Button
        title={format(date, "dd-MMMM-yyyy")}
        onPress={() => setShow(true)}
      />

      {show && (
        <DateTimePicker
          minimumDate={
            type === "start_date" ? new Date() : subYears(new Date(), 60)
          }
          maximumDate={
            type === "start_date"
              ? addMonths(new Date(), 3)
              : addYears(new Date(), 15)
          }
          value={new Date(date)}
          mode={"date"}
          display={type === "start_date" ? "calendar" : "spinner"}
          accentColor="black"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default DatePicker;
