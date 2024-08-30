import {z} from "zod";

export const userSchema = z.object({
    username: z
        .string()
        .min(3, "Username must contain at least 3 characters")
        .max(40, "Username can not be longer than 40 characters"),
    firstName: z
        .string({ required_error: 'First Name is required' })
        .min(1, { message: 'First Name is required' })
        .trim(),
    lastName: z
        .string({ required_error: 'Last Name is required' })
        .min(1, { message: 'Last Name is required' })
        .trim(),
    email: z
        .string({ required_error: 'Email is required' })
        .email({ message: 'Please enter a valid email address' }),
    password: z
        .string({ required_error: 'Password is required' })
        .min(6, { message: 'Password must be at least 6 characters' })
        .max(40, 'Password should not exceed 40 characters')
        .trim(),
    confirmPassword: z
        .string({ required_error: 'Password is required' })
        .min(6, { message: 'Password must be at least 6 characters' })
        .trim(),
    //terms: z.boolean({ required_error: 'You must accept the terms and privacy policy' }),
    role: z
        .enum(['USER', 'PREMIUM', 'ADMIN'], { required_error: 'You must have a role' })
        .default('USER'),
    // verified: z.boolean().default(false),
    token: z.string().optional(),
    receiveEmail: z.boolean().default(true),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional()
})

export const signUpSchema = userSchema.pick({
    firstName: true,
    lastName: true,
    username: true,
    password: true,
    confirmPassword: true,
    email: true,
})

export const userUpdateSchema = userSchema.pick({
    firstName: true,
    lastName: true,
    username: true,
    password: true,
    email: true,
}).partial({
    password: true,
})

export const loginSchema = userSchema.pick({
    username: true,
    password: true,
})