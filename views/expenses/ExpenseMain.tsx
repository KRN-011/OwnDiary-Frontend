"use client"

import { useEffect, useState } from "react";
import ExpenseFilter from "./ExpenseFilter";
import ExpenseTable from "./ExpenseTable";
import { getColumns } from "./ExpenseTableColumns";
import { useGetAllExpenses } from "@/hooks/apiHooks/Expenses";
import { CommonParams } from "@/types/generalTypes";
import { format } from "date-fns";
import { useGetAllExpenseCategories } from "@/hooks/apiHooks/Expense-category";
import useDebounce from "@/hooks/useDebounce";
import { SortingState } from "@tanstack/react-table";

// Params builder
const buildParams = (filters: CommonParams) => {
    return Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => {
            // remove empty string, undefined, null
            if (value === "" || value === undefined || value === null) return false

            // keep page & limit always
            return true
        })
    )
}

// Variables for starDate & endDate filters
const today = new Date();
const firstDayOfYear = new Date(today.getFullYear(), 0, 1);

export default function ExpenseMain() {

    // states
    const [filters, setFilters] = useState<CommonParams>({
        search: "",
        categoryId: "",
        startDate: format(firstDayOfYear, "yyyy-MM-dd"),
        endDate: format(today, "yyyy-MM-dd"),
        sortBy: undefined,
        sortOrder: undefined,
        page: 1,
        limit: 10
    })
    const [sorting, setSorting] = useState<SortingState>([]);

    // Debounce Search
    const debouncedSearch = useDebounce(filters.search || "", 500);

    // For Search debounce
    useEffect(() => {
        setFilters(prev => {
            if (prev.search === debouncedSearch) return prev;

            return {
                ...prev,
                search: debouncedSearch,
                page: 1,
            };
        });
    }, [debouncedSearch, setFilters]);

    // For Sorting Sync
    useEffect(() => {
        if (sorting.length > 0) {
            setFilters(prev => ({
                ...prev,
                sortBy: sorting[0].id,
                sortOrder: sorting[0].desc ? "desc" : "asc",
                page: 1,
            }));
        } else {
            setFilters(prev => ({
                ...prev,
                sortBy: undefined,
                sortOrder: undefined,
            }));
        }
    }, [sorting]);

    // cleaned Params from which filters are not exists
    const cleanedParams = buildParams(filters)

    // final Params object
    const finalParams = {
        ...cleanedParams,
        ...(debouncedSearch ? { search: debouncedSearch } : {})
    }

    // API hooks
    const { data: ExpensesData, isLoading: ExpensesLoading } = useGetAllExpenses({ params: finalParams })
    const { data: ExpensesCatData, isLoading: ExpensesCatLoading } = useGetAllExpenseCategories()

    // serverside pagination handler
    const handlePageChange = (page: number) => {
        setFilters((prev) => ({
            ...prev,
            page,
        }));
    };

    // columns
    const columns = getColumns(filters.page || 1, filters.limit || 10);

    return (
        <>
            <div className="flex flex-col gap-5">
                {/* Filter */}
                <ExpenseFilter filters={filters} setFilters={setFilters} ExpensesCatData={ExpensesCatData} ExpensesCatLoading={ExpensesCatLoading} />

                {/* Table */}
                <ExpenseTable
                    columns={columns}
                    data={ExpensesData?.data || []}
                    sorting={sorting}
                    setSorting={setSorting}
                    page={filters.page || 1}
                    limit={filters.limit || 10}
                    total={ExpensesData?.meta?.total || 0}
                    onPageChange={handlePageChange}
                    ExpensesLoading={ExpensesLoading} 
                />
            </div>
        </>
    )
}