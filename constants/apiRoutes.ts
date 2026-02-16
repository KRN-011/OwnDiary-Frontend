

export const API_ROUTES = {
    AUTH : {
        login: '/auth/login',
        register: '/auth/register',
        logout: '/auth/logout',
        currentUser: '/auth/current-user'
    },
    EXPENSES: {
        createExpense: '/expense/create',
        getAllExpenses: '/expense/get-all',
        createSubExpenses: '/expense/create-sub-expenses',
        updateExpense: (id: string) => `/expense/update/${id}`,
        deleteExpense: (id: string) => `/expense/delete/${id}`
    }
}