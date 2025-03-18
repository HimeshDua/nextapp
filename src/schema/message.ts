import { z } from "zod";

export const messageSchema = z.object({
  content: z
    .string()
    .min(1, { message: "Message content is required" })
    .max(500, {
      message: "Message content must be at most 500 characters long",
    }),
});
