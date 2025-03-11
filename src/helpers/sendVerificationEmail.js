import { Resend } from "resend";
import VerificationEmail from "../../emails/VerificationEmail";

export async function sendVerificationEmail(email, otp) {
  const resend = new Resend(
    process.env.RESEND_API_KEY || "re_aP8nJNWv_Jpxx5NKVkEavAVeFnPzHXyVh"
  );
  try {
    const { data, error } = await resend.emails.send({
      from: "AlmaSync-App <onboarding@resend.dev>",
      to: "almasyncapp@gmail.com",
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
