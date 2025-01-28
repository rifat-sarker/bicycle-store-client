import { z } from "zod";

export const registerSchema = z.object({
  name: z.string({ required_error: "Please enter your name" }),
  email: z.string({ required_error: "Please enter Email" }),
  password: z.string({ required_error: "Please enter Password" }),
});
