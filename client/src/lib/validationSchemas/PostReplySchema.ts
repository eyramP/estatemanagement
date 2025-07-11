import * as z from "zod"

export const replySchema = z.object({
    body: z.string().min(1, "A post body is required"),
});

export type TReplySchema = z.infer<typeof replySchema>;