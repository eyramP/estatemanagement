import * as z from "zod"

export const postSchema = z.object({
    title: z.string().trim().min(1, "A post title is required"),
    tags: z.array(z.string()).min(1, "At least one tag is required"),
    body: z.string().min(1, "A post body is required"),
});

export type TPostSchema = z.infer<typeof postSchema>;