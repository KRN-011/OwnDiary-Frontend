import { AuthProvider } from "@/context/AuthContext";
import ClientQueryProvider from "@/lib/clientQueryProvider";
import { LoadingProvider } from "./loading-provider";


export default function MainProvider({ children }: { children: React.ReactNode }) {
    return (
        <LoadingProvider>
            <ClientQueryProvider>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </ClientQueryProvider>
        </LoadingProvider>
    )
}