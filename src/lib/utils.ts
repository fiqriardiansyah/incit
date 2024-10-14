import { z } from 'zod';

// Password validation regex
export const passwordSchema = z
    .string()
    .min(8, "Password must contain at least 8 characters")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/\d/, "Password must contain at least one digit")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character");

export function parseErrors(result: z.SafeParseReturnType<any, any>) {
    if (result.success) return [];

    const errors = result.error.format() as any;
    const formattedErrors: string[] = [];

    for (const field in errors) {
        const fieldErrors = errors[field]?._errors;
        if (fieldErrors && fieldErrors.length > 0) {
            formattedErrors.push(...fieldErrors);
        }
    }

    return formattedErrors;
}