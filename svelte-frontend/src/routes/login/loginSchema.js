import { z } from "zod";

// Define outside the load function so the adapter can be cached
export const schema = z.object({
    username: z.string().min(3, "Username must contain at least 3 characters").max(50, "Username can not be longer than 50 characters"),
    password: z.string().min(4, "Password must have at least 4 characters").max(8),
});
