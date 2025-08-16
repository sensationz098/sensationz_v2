import { GetAllCourseType } from "@/types";
import { supabase } from "./supabaseConfig";

export const getTransactionById = async (id: string) => {
  const { data, error } = await supabase
    .from("purchase_course")
    .select(
      "id,razorpay_payment_id,amount,discount_code,date_of_payment,course (title),counsellor (name),payment_status,loyality_points"
    )
    .eq("id", id)
    .single();

  if (error) return null;

  return data;
};

export const checkCourseTrial = async (id: string) => {
  const { data, error } = await supabase
    .from("enrolled_course")
    .select("id")
    .eq("profile_id", id)
    .is("purchase_id", null);

  if (error || data.length === 0) return null;
  return data.length;
};

export const checkUserProfile = async (id: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select(
      "id,full_name,avatar_url,email,contact,state,country,date_of_birth,loyality_points"
    )
    .eq("id", id)
    .single();
  if (error) return null;
  return data;
};

export const getEnrollTrialCourse = async (id: string) => {
  const today = new Date().toISOString();

  const { data, error } = await supabase
    .from("enrolled_course")
    .select("id,course (title,class_days),schedule (timing,meeting_link)")
    .eq("profile_id", id)
    .is("purchase_id", null)
    .gt("end_date", today);

  if (error || data.length === 0) return null;

  return data;
};

export const getTeacherById = async (id: string) => {
  const { data, error } = await supabase
    .from("teacher")
    .select(
      "id,name,gender,biography,state,country,email,portfolio_url,image_url,language_proficiency,specialization"
    )
    .eq("id", id)
    .single();

  if (error) return null;

  return data;
};

export const getHomeExtendCourse = async (id: string) => {
  const { data, error } = await supabase
    .from("enrolled_course")
    .select("id,course (id,title,image_url),teacher (name)")
    .eq("profile_id", id)
    .limit(3)
    .order("created_at", { ascending: false });

  if (error) return null;

  return data;
};

export const getExtendCourse = async (id: string) => {
  const { data, error } = await supabase
    .from("enrolled_course")
    .select("id,course (id,title,image_url), teacher (name), end_date")
    .eq("profile_id", id);

  if (error) return null;

  return data;
};

export const getAllTransaction = async (id: string) => {
  const { data, error } = await supabase
    .from("purchase_course")
    .select("id,razorpay_payment_id,amount,created_at")
    .eq("profile_id", id)
    .order("created_at", { ascending: false });
  if (error) return null;

  return data;
};

export const getAllCounsellor = async () => {
  const { data, error } = await supabase
    .from("counsellor")
    .select("id,name,counsellor_id");

  if (error || data.length === 0) return null;

  return data;
};

export const getEnrolledCourse = async (id: string) => {
  const today = new Date().toISOString();

  const { data, error } = await supabase
    .from("enrolled_course")
    .select(
      "id,course (title,class_days),schedule (timing,meeting_link,whatsapp_group_link),created_at"
    )
    .eq("profile_id", id)
    // .lte("end_date", today)
    .not("purchase_id", "is", null); // checks if purchase_id IS NULL

  if (error || data.length === 0) return null;

  return data;
};

export const getAllCourse = async (): Promise<GetAllCourseType[] | null> => {
  const { data, error } = await supabase
    .from("course")
    .select("id,title,description,image_url");

  if (error || data.length === 0) return null;

  return data;
};

export const getCourseByName = async (course: string) => {
  const { data, error } = await supabase
    .from("course")
    .select("id,title,description,image_url")
    .eq("course_type", course);

  if (error || data.length === 0) return null;

  return data;
};

export const getCourseById = async (id: string) => {
  const { data, error } = await supabase
    .from("course")
    .select(
      "id,title,description,image_url,class_days,level,teacher (id,name),schedule (timing,id),duration!duration_course_id_course_id_fk(id, months,price,discounted_price)"
    )
    .eq("id", id);

  if (error || data.length === 0) return null;

  return data[0];
};
