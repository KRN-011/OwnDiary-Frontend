import { API_ROUTES } from "@/constants/apiRoutes"
import { api } from "@/lib/axios"
import { Expense } from "@/types/expenseTypes"
import { CommonGetApiResponse, CommonParams } from "@/types/generalTypes"


// POST - create expense
export const createExpense = async () => {
    try {
        const response = await api.post(API_ROUTES.EXPENSES.createExpense)
        return response.data
    } catch (error) {
        throw error
    }
}

// GET - get all expenses
export const getAllExpenses = async ({ params }: { params: CommonParams }): Promise<CommonGetApiResponse<Expense[]>> => {
    try {
        const response = await api.get(API_ROUTES.EXPENSES.getAllExpenses, { params })
        return response.data
    } catch (error) {
        throw error
    }
}

// POST - create sub expenses
export const createSubExpenses = async () => {
    try {
        const response = await api.post(API_ROUTES.EXPENSES.createSubExpenses)
        return response.data
    } catch (error) {
        throw error
    }
}

// PUT - update expense
export const updateExpense = async ({ id }: { id: string }) => {
    try {
        const response = await api.put(API_ROUTES.EXPENSES.updateExpense(id))
        return response.data
    } catch (error) {
        throw error
    }
}

// DELETE - delete expense
export const deleteExpense = async ({ id }: { id: string }) => {
    try {
        const response = await api.delete(API_ROUTES.EXPENSES.deleteExpense(id))
        return response.data
    } catch (error) {
        throw error
    }
}