import VerificationEmail from "../../emails/VerificationEmail";

import { resend } from "@/lib/resend";

export async function sendVerificationEmail(email, otp) {
  try {
    const { data, error } = await resend.emails.send({
      from: "AlmaSync-App <onboarding@resend.dev>",
      to: email,
      subject: "signup Message Verification Code",
      react: VerificationEmail({ otp }),
    });

    if (data) {
      return {
        success: true,
        message: "Verification email sent successfully.",
      };
    }
    if (error) {
      console.error("Error sending verification email:",error);
      return {
        success: false,
        message: "error sending Verification email",
      };
    }
  } catch (emailError) {
    console.error("Error sending verification email:", emailError);
    return { success: false, message: "Failed to send verification email." };
  }
}
