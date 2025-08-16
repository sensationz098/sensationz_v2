import Logo from "@/assets/images/icon.png";
import RazorpayCheckout from "react-native-razorpay";
import { getRazorPayOrderId } from "@/supabase/functions";

type RazorpayPaymentType = {
  amount: number;
  description: string;
  name: string;
  email: string;
  contact: string;
};

type RazorpayCheckoutType = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

export const RazorpayPayment = async ({
  amount,
  contact = "0000000000",
  description = "course payment",
  email = "void@razorpay",
  name = "void",
}: RazorpayPaymentType): Promise<RazorpayCheckoutType | null> => {
  try {
    const res = await getRazorPayOrderId({
      amount,
      contact,
      description,
      email,
      name,
    });

    const razorpayInfo = await RazorpayCheckout.open({
      description: description!,
      image: Logo,
      currency: "INR",
      key: "rzp_test_X7FkvCyH4xcT9Q", // Your api key
      order_id: res.order.id,
      amount: amount * 100,
      name: name!,
      prefill: {
        email: email,
        contact: contact,
        name: name,
      },
      theme: { color: "#F37254" },
    });

    return razorpayInfo;
  } catch (err) {
    return null;
  }
};
