"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dispatch, SetStateAction } from "react"
import { ArrowDownIcon, ArrowUpIcon, Loader2 } from "lucide-react"

interface ExpenseTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  page: number
  limit: number
  total: number
  sorting: SortingState
  setSorting: Dispatch<SetStateAction<SortingState>>
  onPageChange: (page: number) => void
  data: TData[]
  ExpensesLoading: boolean
}

export default function ExpenseTable<TData, TValue>({
  columns,
  page,
  limit,
  total,
  sorting,
  setSorting,
  onPageChange,
  ExpensesLoading,
  data,
}: ExpenseTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(total / limit),

    state: {
      pagination: {
        pageIndex: page - 1,
        pageSize: limit,
      },
      sorting,
    },

    manualPagination: true,
    manualSorting: true,

    onSortingChange: setSorting,

    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader className="bg-accent">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className="cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-1">
                        {header.column.getIsSorted() === 'asc' ? (
                          <ArrowUpIcon className="h-4 w-4" />
                        ) : header.column.getIsSorted() === 'desc' ? (
                          <ArrowDownIcon className="h-4 w-4" />
                        ) : null}
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </div>
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : ExpensesLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="p-0">
                  <div className="flex items-center justify-center h-24 w-full">
                    <Loader2 className="h-5 w-5 animate-spin" />
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
        >
          Previous
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= Math.ceil(total / limit)}
        >
          Next
        </Button>
      </div>
    </div>
  )
}