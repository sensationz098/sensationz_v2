import {
  isAfter,
  isBefore,
  parse,
  format,
  addMonths,
  parseISO,
  isEqual,
  subMinutes,
  formatISO,
  isDate,
  differenceInCalendarDays,
  addDays,
  getDay,
  differenceInDays,
  isValid,
} from "date-fns";

export const Wait = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const formatDate = (date: string | Date) => {
  const parsedDate = parseISO(date);
  if (isValid(parsedDate)) {
    const formattedDate = format(parsedDate, "PPP");
    return formattedDate;
  }

  return "date error";
};

export const isMoreThan3DaysPassed = (createdAt: string): boolean => {
  if (typeof createdAt !== "string") return false;
  if (!createdAt) return false; // handles undefined, null, or empty

  const parsedDate = parseISO(createdAt);
  if (!isValid(parsedDate)) return false;

  const now = new Date();
  const daysPassed = differenceInDays(now, parsedDate);
  return daysPassed < 3;
};

export const findExpiryDateForTrial = (
  selectedDate: Date | string,
  selectedDays: string[]
) => {
  // Day name to number mapping (Sunday = 0, Monday = 1, ..., Saturday = 6)
  const dayNameToNumber: Record<string, number> = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };

  // Get today's weekday number
  const todayDayNumber = getDay(selectedDate); // 6 for Saturday

  // Calculate how many days to add for each target day
  const daysToAdd = selectedDays.map((day) => {
    const targetDayNumber = dayNameToNumber[day];
    const diff = (targetDayNumber - todayDayNumber + 7) % 7;
    return diff === 0 ? 7 : diff; // skip today if it's the same day
  });

  // Find the minimum days to add
  const minDaysToAdd = Math.min(...daysToAdd);

  // Get the next date
  const nextDate = addDays(selectedDate, minDaysToAdd);

  return format(nextDate, "yyyy-MM-dd");
};

export const dateDifference = (date: string) => {
  const endDate = parseISO(date);

  return differenceInCalendarDays(endDate, new Date());
};

export const parse_ISO_Date = (date: string | Date) => {
  if (typeof date === "string") {
    const parsed = Date.parse(date); // check if it's already ISO
    if (!isNaN(parsed)) {
      return new Date(parsed).toISOString(); // already ISO or convertible
    }

    // otherwise assume it's "dd/MM/yyyy"
    const fallbackParsed = parse(date, "dd/MM/yyyy", new Date());
    return formatISO(fallbackParsed);
  }

  if (isDate(date)) {
    return formatISO(date);
  }

  throw new Error("Invalid date input");
};

export const generateTransactionId = (length = 12) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `Receipt_${result}`;
};

export const isTimeCorrect = (time: string) => {
  const [startStr, endStr] = time.split(" - ");

  const now = new Date();

  // Parse time using today's date
  const todayStr = format(now, "yyyy-MM-dd");
  const start = parse(
    `${todayStr} ${startStr}`,
    "yyyy-MM-dd HH:mm",
    new Date()
  );
  const end = parse(`${todayStr} ${endStr}`, "yyyy-MM-dd HH:mm", new Date());

  // Subtract 5 minutes from start
  const adjustedStart = subMinutes(start, 10);

  // Format for 12-hour clock
  // const formatted = `${format(start, "h:mm a")} - ${format(end, "h:mm a")}`;

  // Check if current time is within range
  const isNow =
    (isAfter(now, adjustedStart) || isEqual(now, start)) &&
    (isBefore(now, end) || isEqual(now, end));

  return isNow;
};

export const calculateEndDate = (startDate: string, months: string): Date => {
  const monthsNumber = Number(months.split(" ")[0]);

  const parseDate = parseISO(startDate as string);

  return addMonths(parseDate, monthsNumber);
};

export const formatTime = (time: string) => {
  const normalizeTime = (str: string) =>
    str
      .trim()
      .toUpperCase()
      .replace(/(AM|PM)/, " $1") // ensure space before AM/PM
      .replace(/\s+/, " "); // collapse any extra spaces

  // Split and normalize both times

  const [rawStart, rawEnd] = time.split("-");
  const startTimeStr = normalizeTime(rawStart);
  const endTimeStr = normalizeTime(rawEnd);

  // Remove AM/PM if time is in 24h format (e.g., 14:00)
  const cleanTime = (str: string) => str.replace(/\s*(AM|PM)/i, "");

  const startDate = parse(cleanTime(startTimeStr), "HH:mm", new Date());
  const endDate = parse(cleanTime(endTimeStr), "HH:mm", new Date());

  const formattedStart = format(startDate, "h:mm a");
  const formattedEnd = format(endDate, "h:mm a");

  return `${formattedStart} - ${formattedEnd}`;
};

export const isClassActive = (timing: string, days: string[]): boolean => {
  const [startTime, endTime] = timing.split(" - ");
  const now = new Date();

  const today = format(now, "EEEE");
  if (!days.includes(today)) return false;

  const dateStr = format(now, "yyyy-MM-dd");
  const start = parse(`${dateStr} ${startTime}`, "yyyy-MM-dd HH:mm", now);
  const end = parse(`${dateStr} ${endTime}`, "yyyy-MM-dd HH:mm", now);

  return isAfter(now, start) && isBefore(now, end);
};

export const generateDateSelection = (days: number = 15) => {
  const result = [];
  const today = new Date();

  for (let i = 1; i <= days; i++) {
    // Create local date and zero the time
    const localDate = new Date(today);
    localDate.setDate(today.getDate() + i);
    localDate.setHours(0, 0, 0, 0);

    // Convert to UTC date (so ISO string won't shift the date)
    const utcDate = new Date(
      Date.UTC(
        localDate.getFullYear(),
        localDate.getMonth(),
        localDate.getDate()
      )
    );

    const displayValue = localDate.toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    result.push({
      key: i.toString(),
      value: displayValue,
      dateValue: utcDate.toISOString(), // ✅ Matches displayed date
    });
  }

  return result;
};

export const convertArrayToList = (value: any[]) => {
  return value.map((i) => {
    return {
      key: i.id,
      value: i.name,
      code: i.counsellor_id,
    };
  });
};

export const convertTeacherArrayToList = (value: any[]) => {
  return value.map((i) => {
    return {
      key: i.id,
      value: i.name,
    };
  });
};
