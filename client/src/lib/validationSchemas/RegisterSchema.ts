import * as z from "zod"

const userNameRegex = /^[a-zA-Z0-9_@+.-]+$/;

export const registerUserSchema = z.object({
    username: z.string().regex(userNameRegex, {
        message: "Username can only contain letters(uppercase and lowercase), digits, _, @, +, and -",
    }),

    first_name: z.string()
    .trim()
    .min(2, {message: "First name must be a least 2 charcaters long"})
    .max(50, {message: "First name must be less than 50 charcaters long"}),

    last_name: z.string()
    .trim()
    .min(2, {message: "First name must be a least 2 charcaters long"})
    .max(50, {message: "First name must be less than 50 charcaters long"}),
    email: z.string().trim().email({message: "Enter a valid email address"}),

    password: z.string().trim().min(8, {message: "Password must be a least 8 characters long"}),

    re_password: z.string().trim().min(8, {message: "Confirm Password must be a least 8 characters long"}),

}).refine((data) => data.password === data.re_password, {
    message: "Passwords do not match",
    path: ["re_password"],
});

export type TRegisterUserSchema = z.infer<typeof registerUserSchema>;

