import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string({ message: "Invalid email format" }).email(),
  verifyOtp: z
    .string({ message: "Invalid otp format" })
    .length(6, {
      message: "the length of the otp should be only 6 characters",
    }),
});
