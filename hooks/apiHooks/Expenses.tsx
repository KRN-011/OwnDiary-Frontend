import { createExpense, createSubExpenses, deleteExpense, getAllExpenses, updateExpense } from "@/services/expenses"
import { CommonParams } from "@/types/generalTypes"
import { useMutation, useQuery } from "@tanstack/react-query"




// POST - create expense
export const useCreateExpense = () => {
    return useMutation({
        mutationFn: () => createExpense()
    })
}

// GET - all expenses
export const useGetAllExpenses = ({ params }: { params: CommonParams }) => {
    return useQuery({
        queryKey: ['all-expenses', params],
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
        mutationFn: ({ id }: { id: string }) => updateExpense({ id })
    })
}

// DELETE - delete expense
export const useDeleteExpense = () => {
    return useMutation({
        mutationFn: ({ id }: { id: string }) => deleteExpense({ id })
    })
}