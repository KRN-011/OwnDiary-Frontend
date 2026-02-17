import { API_QUERIES } from "@/constants/apiQueries"
import { createExpense, createSubExpenses, deleteExpense, getAllExpenses, updateExpense } from "@/services/expenses"
import { CreateExpensePayload } from "@/types/expenseTypes"
import { CommonParams } from "@/types/generalTypes"
import { useMutation, useQuery } from "@tanstack/react-query"




// POST - create expense
export const useCreateExpense = () => {
    return useMutation({
        mutationFn: ({ payload }: { payload: CreateExpensePayload }) => createExpense({ payload })
    })
}

// GET - all expenses
export const useGetAllExpenses = ({ params }: { params: CommonParams }) => {
    return useQuery({
        queryKey: [API_QUERIES.EXPENSE.getAllExpenses, params],
        queryFn: () => getAllExpenses({ params })
    })
}

// POST - create sub expenses
export const useCreateSubExpenses = () => {
    return useMutation({
        mutationFn: () => createSubExpenses()
    })
}

// PUT - update expense
export const useUpdateExpense = () => {
    return useMutation({
        mutationFn: ({ id, payload }: { id: string, payload: CreateExpensePayload }) => updateExpense({ id, payload })
    })
}

// DELETE - delete expense
export const useDeleteExpense = () => {
    return useMutation({
        mutationFn: ({ id }: { id: string }) => deleteExpense({ id })
    })
}