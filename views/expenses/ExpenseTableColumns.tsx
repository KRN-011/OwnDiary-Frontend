"use client"

import DeleteExpenseModal from "@/components/modals/expenses/DeleteExpenseModal"
import EditExpenseModal from "@/components/modals/expenses/EditExpenseModal"
import { Button } from "@/components/ui/button"
import { Expense } from "@/types/expenseTypes"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { Pencil, Trash } from "lucide-react"

export const getColumns = (page: number, limit: number): ColumnDef<Expense>[] => [
  {
    header: "#",
    cell: ({ row }) => {
      return (page - 1) * limit + row.index + 1
    },
    enableSorting: false,
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
    enableSorting: false,
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.original.category;
      if (!category) return "—";
      return category.name;
    },
    enableSorting: false,
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const value = row.getValue("createdAt")
      if (!value) return "—"

      const date =
        typeof value === "string" || typeof value === "number"
          ? new Date(value)
          : value instanceof Date
            ? value
            : null

      if (!date || isNaN(date.getTime())) return "Invalid date"

      return format(date, "LLL dd, yyyy")
    },
  },
  {
    accessorKey: "actions",
    cell: ({ row }) => {
      return getRowActions(row.original)
    },
    enableSorting: false,
  }
]

export const getRowActions = (row: Expense) => {
  return (
    <div className="flex gap-2">
      {/* Edit Expense Modal */}
      <EditExpenseModal expense={row} />
      
      {/* Delete Expense Modal */}
      <DeleteExpenseModal row={row} />
    </div>
  )
}
