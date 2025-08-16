import { create } from "zustand";

// TYPES
type TeacherType = {
  teacher_id: string;
  name: string;
} | null;

type CourseType = {
  course_id: string;
  name: string;
} | null;

type ScheduleType = {
  schedule_id: string;
  timing: string;
} | null;

type CounsellorType = {
  counsellor_id: string;
  name: string;
} | null;

type DurationType = {
  duration_id: string;
  months: string;
  price: number;
  discounted_price: number;
} | null;

// STORE TYPE
type CourseContextType = {
  course: CourseType;
  schedule: ScheduleType;
  counsellor: CounsellorType;
  teacher: TeacherType;
  duration: DurationType;
  start_date: Date | string;

  setCourse: (course: CourseType) => void;
  setSchedule: (schedule: ScheduleType) => void;
  setCounsellor: (counsellor: CounsellorType) => void;
  setTeacher: (teacher: TeacherType) => void;
  setDuration: (duration: DurationType) => void;
  setStartDate: (date: Date | string) => void;

  reset: () => void;
};

// INITIAL STATE
const initialState: Pick<
  CourseContextType,
  "course" | "schedule" | "counsellor" | "teacher" | "duration"
> = {
  course: null,
  schedule: null,
  counsellor: null,
  teacher: null,
  duration: null,
};

// STORE
export const useCourse = create<CourseContextType>((set) => ({
  ...initialState,
  start_date: new Date(),

  setTeacher: (teacher) => set({ teacher }),
  setCourse: (course) => set({ course }),
  setSchedule: (schedule) => set({ schedule }),
  setCounsellor: (counsellor) => set({ counsellor }),
  setDuration: (duration) => set({ duration }),
  setStartDate: (start_date) => set({ start_date }),

  reset: () => set(initialState),
}));

////////////////////////////////////////////////////////////////////////////////////
