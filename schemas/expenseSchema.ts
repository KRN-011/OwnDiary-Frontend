import z from "zod";


// create expense schema
export const createExpenseSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    amount: z.coerce.number().min(1, "Amount must be greater than 0"),
    category: z.string().min(1, "Category is required"),
    images: z.array(z.instanceof(File)).optional(),
})

export type CreateExpenseSchema = z.infer<typeof createExpenseSchema>;