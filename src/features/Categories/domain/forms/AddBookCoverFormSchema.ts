import z from 'zod';

const expoFileSchema = z.object({
    uri: z.string(),
    type: z.string().optional(),
    name: z.string().optional(),
    mimeType: z.string().optional(),
    size: z.number().optional(),
});

export const bookCoverSchema = z.object({
    coverImage: expoFileSchema.optional(),
});

export type BookCoverFormData = z.infer<typeof bookCoverSchema>;
