import { z } from "zod";

export const loginSchema = z.object({
  email: z.string({ required_error: "Please enter Email" }),
  password: z.string({ required_error: "Please enter Password" }),
});
