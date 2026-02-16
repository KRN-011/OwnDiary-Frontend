import { API_QUERIES } from '@/constants/apiQueries'
import { GetCurrentUser, Login, Logout, Signup } from '@/services/auth'
import { useMutation, useQuery } from '@tanstack/react-query'


// POST - Login
export const useLogin = () => {
    return useMutation({
        mutationFn: ({ payload }: { payload: { email: string, password: string } }) => Login({ payload })
    })
}

// POST - Signup
export const useSignup = () => {
    return useMutation({
        mutationFn: ({ payload }: { payload: { username: string, email: string, password: string } }) => Signup({ payload })
    })
}

// GET - Current user
export const useGetCurrentUser = () => {
    return useQuery({
        queryKey: [API_QUERIES.AUTH.currentUser],
        queryFn: () => GetCurrentUser()
    })
}

// POST - Logout
export const useLogout = () => {
    return useMutation({
        mutationFn: () => Logout()
    })
}
