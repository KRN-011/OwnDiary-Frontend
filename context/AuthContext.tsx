"use client";

import { useGetCurrentUser, useLogin, useLogout, useSignup } from "@/hooks/apiHooks/Auth";
import { API_QUERIES } from "@/constants/apiQueries";
import { showToast } from "@/lib/toast";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

// Auth Context Type
interface AuthContextType {
  user: any;
  loading: boolean;
  login: (params: { email: string; password: string }) => Promise<void>;
  signup: (params: {
    username: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
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
  // router
  const router = useRouter();

  // query client
  const queryClient = useQueryClient();

  // states
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // API hooks
  const { mutateAsync: loginMutation } = useLogin();
  const { mutateAsync: signupMutation } = useSignup();
  const { mutateAsync: logoutMutation } = useLogout();
  const { data: currentUser, isLoading: isUserLoading } = useGetCurrentUser();

  // sync user from query
  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
    } else if (!isUserLoading) {
      setUser(null);
    }
    setLoading(isUserLoading);
  }, [currentUser, isUserLoading]);

  // handle login
  const handleLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      setLoading(true);

      const payload = {
        email,
        password,
      };

      const response = await loginMutation({ payload });

      if (response.success) {
        // Update local state and query cache
        const userData = response.data.user;
        setUser(userData);
        queryClient.invalidateQueries({queryKey: [API_QUERIES.AUTH.currentUser]});

        showToast.success("Login Successful", "Welcome back to OwnDiary!");
        router.push("/dashboard");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      showToast.error(
        "Login Error",
        error?.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // handle signup
  const handleSignup = async ({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) => {
    try {
      setLoading(true);

      const payload = {
        username,
        email,
        password,
      };

      const response = await signupMutation({ payload });

      if (response.success) {
        showToast.success("Signup Successful", "Welcome to OwnDiary!");
        router.push("/login");
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      showToast.error(
        "Signup Error",
        error?.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // handle logout
  const handleLogout = async () => {
    try {
      setLoading(true);

      const response = await logoutMutation();

      if (response.success) {
        setUser(null);
        queryClient.setQueryData([API_QUERIES.AUTH.currentUser], null);
        queryClient.clear(); // Clear all cache on logout for security

        showToast.success("Logout Successful", "Goodbye!");
        router.push("/login");
      }
    } catch (error: any) {
      console.error("Logout error:", error);
      showToast.error(
        "Logout Error",
        error?.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login: handleLogin,
        signup: handleSignup,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
