import { z } from 'zod'

const userSchema = z.object({
    username: z
        .string()
        .min(3, "Username must be at least 3 characters")
        .max(30, "Username must be 30 characters or less")
        .regex(/^[a-zA-Z0-9_.-]*$/, "Username can only contain letters, numbers, underscores, and dashes")
        .trim(),
    email: z
        .string()
        .email("Invalid email address")
        .trim(),
    fullname: z
        .string()
        .min(3, "Fullname must be at least 3 characters")
        .max(50, "Fullname must be 50 characters or less")
        .trim(),
    avatar: z.object({
        url: z.string().url("Invalid URL for avatar"),
        public_id: z.string().nonempty("Public ID is required")
    }),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(100, "Password must be 100 characters or less"),
    refreshToken: z.string().optional(),
    role: z
        .enum(['Admin', 'Patient', 'Doctor'])
        .optional()
        .default('Patient'),
    isverified: z.boolean().optional().default(false),  // Keep it consistent with your Mongoose schema
    verifycode: z
        .string()
        .min(6, "Verify code must be at least 6 characters")
        .max(6, "Verify code must be at most 6 characters"),  // Adjusted based on common length for verification codes
    verifycodeExpiry: z
        .date("Invalid date for verify code expiry"),  // Should be a Date type
    isAcceptingMessage: z.boolean().optional().default(false),
    messages: z.array(z.string())  // Assuming ObjectId is represented as a string
});

export default userSchema;