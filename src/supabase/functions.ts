import { generateTransactionId } from "@/lib/utils";
import { supabase } from "./supabaseConfig";

type PurchaseCourseData = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  discount_code: string;
  amount: number;
  payment_status: "Success" | "Failed" | "Capture";
  course_id: string;
  counsellor_id: string;
  profile_id: string;
  loyality_points: number;
  date_of_payment: string;
};

type EnrollCourseData = {
  profile_id: string;
  teacher_id: string;
  course_id: string;
  purchase_id: string;
  schedule_id: string;
  duration_id: string;
  start_date: string | Date;
  end_date: string | Date;
};
type Invoice = {
  email: string;
  customer_name: string;
  course_name: string;
  discounted_amount: number;
  payment_method: "UPI" | "Online" | "Cash";
  transaction_id: string;
  razorpay_payment_id: string;
  counsellor: string;
};

type VerifyRazorpayPaymentUpdateType = {
  purchase: PurchaseCourseData;
  enroll: EnrollCourseData;
  invoice: Invoice;
};

export const verifyRazorpayPaymentUpdate = async ({
  data,
}: {
  data: VerifyRazorpayPaymentUpdateType;
}) => {
  const { data: resData, error } = await supabase.functions.invoke(
    "verify_razorpay",
    {
      method: "POST",
      body: data,
    }
  );

  if (error) return false;

  return resData;
};

export type RazorpayPaymentType = {
  amount: number;
  contact: string;
  description: string;
  email: string;
  name: string;
};

export const getRazorPayOrderId = async ({
  amount,
  contact,
  description,
  email,
  name,
}: RazorpayPaymentType) => {
  const { data, error } = await supabase.functions.invoke(
    "razorpay_create_order",
    {
      method: "POST",
      body: {
        receipt: generateTransactionId(),
        amount: amount,
        notes: {
          contact,
          description,
          email,
          name,
        },
      },
    }
  );

  if (error) return null;
  return data;
};
