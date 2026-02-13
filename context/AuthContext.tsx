'use client'

import { useLogin } from "@/hooks/apiHooks/Auth";
import { showToast } from "@/lib/toast";
import { createContext, useContext, useState } from "react";

// Auth Context Type
interface AuthContextType {
    user: any;
    loading: boolean;
    login: (params: { email: string, password: string }) => Promise<void>;
}

// Auth Context
export const AuthContext = createContext<AuthContextType | null>(null);

// Auth Hook
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

// Auth Provider
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    // states
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    // API hooks
    const { mutateAsync: loginMutation } = useLogin()

    // handle login
    const handleLogin = async ({ email, password }: { email: string, password: string }) => {
        try {
            setLoading(true);

            const payload = {
                email,
                password
            }

            const response = await loginMutation({ payload })

            if (response.success) {
                setUser(response.data.user)
                localStorage.setItem('token', response.data.token)
                showToast.success("Login Successful", "Welcome back to OwnDiary!")
            } else {
                showToast.error("Login Failed", response.message || "Invalid credentials")
            }
        } catch (error: any) {
            console.error("Login error:", error)
            showToast.error("Login Error", error?.response?.data?.message || "Something went wrong. Please try again.")
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            login: handleLogin
        }}>
            {children}
        </AuthContext.Provider>
    )
}