import * as z from "zod"

export const reportCreateSchema = z.object({
    title: z.string().trim().min(1, "Add your teport title"),
    description: z.string().trim().min(1, "Description what happened"),
    reported_user_username: z
    .string()
    .min(
        1,
        "The tenant's username is required. You can get it from the tenants page."
    ),
})

export type TReportCreateSchema = z.infer<typeof reportCreateSchema>