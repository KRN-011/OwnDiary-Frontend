import { toast } from 'sonner';

/**
 * Optimized toast utility wrapper for Sonner
 */
export const showToast = {
    success: (message: string, description?: string) => {
        return toast.success(message, {
            description,
        });
    },
    error: (message: string, description?: string) => {
        return toast.error(message, {
            description,
        });
    },
    info: (message: string, description?: string) => {
        return toast.info(message, {
            description,
        });
    },
    warning: (message: string, description?: string) => {
        return toast.warning(message, {
            description,
        });
    },
    loading: (message: string, description?: string) => {
        return toast.loading(message, {
            description,
        });
    },
    promise: <T>(
        promise: Promise<T>,
        {
            loading,
            success,
            error,
        }: {
            loading: string;
            success: string | ((data: T) => string);
            error: string | ((error: any) => string);
        },
    ) => {
        return toast.promise(promise, {
            loading,
            success,
            error,
        });
    },
    dismiss: (id?: string | number) => {
        return toast.dismiss(id);
    },
};
