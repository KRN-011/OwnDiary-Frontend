import { Login } from '@/services/apiServices/auth'
import { useMutation } from '@tanstack/react-query'


// POST - Login
export const useLogin = () => {
    return useMutation({
        mutationFn: ({ payload }: { payload: { email: string, password: string } }) => Login({ payload })
    })
}