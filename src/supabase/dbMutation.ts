import { CreateUserProfileType } from "@/types";
import { supabase } from "./supabaseConfig";

type TrialCourseMutationType = {
  profile_id: string;
  teacher_id: string;
  course_id: string;
  purchase_id: null;
  schedule_id: string;
  duration_id: string;
  start_date: string | Date;
  end_date: string | Date;
};

export const trialCourseMutation = async ({
  course_id,
  duration_id,
  end_date,
  profile_id,
  purchase_id,
  schedule_id,
  start_date,
  teacher_id,
}: TrialCourseMutationType) => {
  const { error } = await supabase.from("enrolled_course").insert({
    course_id: course_id,
    duration_id: duration_id,
    profile_id: profile_id,
    purchase_id: purchase_id,
    schedule_id: schedule_id,
    teacher_id: teacher_id,
    start_date: start_date,
    end_date: end_date,
  });

  if (error) return false;

  return true;
};

export const createProfileMutation = async ({
  contact,
  country,
  date_of_birth,
  state,
  user_id,
}: CreateUserProfileType) => {
  const { error } = await supabase
    .from("profiles")
    .update({
      contact: contact,
      state: state,
      country: country,
      date_of_birth: date_of_birth,
    })
    .eq("id", user_id);

  if (error) return false;
  return true;
};

type PurchaseCourseType = {
  loyality_points: number;
  discount_code: string;
  amount: number;
  date_of_payment: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  payment_status: "Success" | "Failed" | "Capture";
  transaction_created_status: string;
  course_id: string;
  profile_id: string;
  counsellor_id: string;
};

export const purchaseCourseMutation = async ({
  amount,
  counsellor_id,
  course_id,
  date_of_payment,
  discount_code,
  loyality_points,
  payment_status,
  profile_id,
  razorpay_order_id,
  razorpay_payment_id,
  transaction_created_status,
  razorpay_signature,
}: PurchaseCourseType) => {
  const { data, error } = await supabase
    .from("purchase_course")
    .insert({
      amount: amount,
      counsellor_id: counsellor_id,
      course_id: course_id,
      date_of_payment: date_of_payment.toString(),
      discount_code: discount_code,
      loyality_points: loyality_points,
      payment_status: payment_status,
      profile_id: profile_id,
      razorpay_order_id: razorpay_order_id,
      razorpay_payment_id: razorpay_payment_id,
      transaction_created_status: transaction_created_status,
      razorpay_signature: razorpay_signature,
    })
    .select("id");

  if (error) return null;
  return data[0];
};

type EnrollCourseMutationType = {
  profile_id: string;
  teacher_id: string;
  course_id: string;
  purchase_id: string;
  schedule_id: string;
  duration_id: string;
  start_date: string | Date;
  end_date: string | Date;
};

export const enrollCourseMutation = async ({
  course_id,
  duration_id,
  end_date,
  profile_id,
  purchase_id,
  schedule_id,
  start_date,
  teacher_id,
}: EnrollCourseMutationType) => {
  const { data, error } = await supabase
    .from("enrolled_course")
    .insert({
      profile_id: profile_id,
      teacher_id: teacher_id,
      course_id: course_id,
      purchase_id: purchase_id,
      duration_id: duration_id,
      schedule_id: schedule_id,
      end_date: end_date,
      start_date: start_date,
    })
    .select("id");

  if (error) return null;

  return data;
};

type UpdateProfileType = {
  full_name: string;
  contact: string;
  state: string;
  country: string;
  date_of_birth: string | Date;
};

export const editUserProfile = async ({
  id,
  value,
}: {
  id: string;
  value: UpdateProfileType;
}) => {
  const { error } = await supabase
    .from("profiles")
    .update({
      contact: value.contact,
      full_name: value.full_name,
      country: value.country,
      state: value.state,
      date_of_birth: value.date_of_birth as string,
    })
    .eq("id", id);

  if (error) return false;

  return true;
};
