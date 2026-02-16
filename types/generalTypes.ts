

// Common Params for All GET APIs
export type CommonParams = {
    search?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: string;
    categoryId?: string;
    startDate?: string;
    endDate?: string;
}

// Common GET APIs Response
export type CommonGetApiResponse<T> = {
    success: boolean;
    message: string;
    data: T;
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    }
}