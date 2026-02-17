import { API_ROUTES } from '@/constants/apiRoutes';
import { api } from '@/lib/axios';
import { GetAllExpenseCategoriesResponse } from '@/types/expenseCatTypes';
import { CommonGetApiResponse } from '@/types/generalTypes';

// POST - create expense category
export const createExpenseCategory = async ({
    payload,
}: {
    payload: { name: string; icon?: string };
}) => {
    try {
        const response = await api.post(
            API_ROUTES.EXPENSE_CAT.createExpenseCategory,
            payload,
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

// GET - all expense categories
export const getAllExpenseCategories = async (): Promise<
    CommonGetApiResponse<GetAllExpenseCategoriesResponse[]>
> => {
    try {
        const response = await api.get(
            API_ROUTES.EXPENSE_CAT.getAllExpenseCategories,
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

// PUT - update expense category
export const updateExpenseCategory = async ({
    id,
    payload,
}: {
    id: string;
    payload: { name: string; icon?: string };
}) => {
    try {
        const response = await api.put(
            API_ROUTES.EXPENSE_CAT.updateExpenseCategory(id),
            payload,
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

// DELETE - delete expense category
export const deleteExpenseCategory = async ({ id }: { id: string }) => {
    try {
        const response = await api.delete(
            API_ROUTES.EXPENSE_CAT.deleteExpenseCategory(id),
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};
