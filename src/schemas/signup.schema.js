import { z } from "zod";

export const signupSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  college: z.string(),
  enrollmentNumber: z.string(),
  admissionYear: z
    .string({ message: "enter a valid input" })
    .length(4, { message: "Admission year is required" }),
  passoutYear: z
    .string({ message: "enter a valid input" })
    .length(4, { message: "Passout year is required" }),
  degree: z.string(),
  department: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "the password should be of atleast 6 characters" })
    .max(20, { message: "the password should be not more than 20 characters" }),
});
