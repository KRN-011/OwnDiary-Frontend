import { API_QUERIES } from "@/constants/apiQueries"
import { createExpenseCategory, deleteExpenseCategory, getAllExpenseCategories, updateExpenseCategory } from "@/services/expense-category"
import { useMutation, useQuery } from "@tanstack/react-query"



// POST - create expense category
export const useCreateExpenseCategory = () => {
    return useMutation({
        mutationFn: (payload: { name: string, icon?: string }) => createExpenseCategory({ payload }),
    })
}

// GET - all expense categories
export const useGetAllExpenseCategories = () => {
    return useQuery({
        queryKey: [API_QUERIES.EXPENSE_CAT.getAllExpenseCategories],
        queryFn: getAllExpenseCategories,
    })
}

// PUT - update expense category
export const useUpdateExpenseCategory = () => {
    return useMutation({
        mutationFn: ({ id, payload }: { id: string, payload: { name: string, icon?: string } }) => updateExpenseCategory({ id, payload }),
    })
}

// DELETE - delete expense category
export const useDeleteExpenseCategory = () => {
    return useMutation({
        mutationFn: ({ id }: { id: string }) => deleteExpenseCategory({ id }),
    })
}