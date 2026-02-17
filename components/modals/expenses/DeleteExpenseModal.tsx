"use client"

import { useDeleteExpense } from "@/hooks/apiHooks/Expenses";
import { Expense } from "@/types/expenseTypes";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { API_QUERIES } from "@/constants/apiQueries";
import { showToast } from "@/lib/toast";


export default function DeleteExpenseModal({ row }: { row: Expense }) {

    // hooks
    const queryClient = useQueryClient()

    // states
    const [open, setOpen] = useState(false)

    // API hooks
    const { mutateAsync: deleteExpenseMutation } = useDeleteExpense()

    // Delete Expense handler
    const handleDeleteExpense = async () => {
        try {
            const deletedExpense = await deleteExpenseMutation({ id: row.id })

            if (deletedExpense.success) {
                queryClient.invalidateQueries({ queryKey: [API_QUERIES.EXPENSE.getAllExpenses] })
                setOpen(false)
                showToast.success(deletedExpense.message)
            }
        } catch (error: any) {
            showToast.error(error.message)
            setOpen(false)
        }
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size={"icon"} onClick={() => setOpen(true)}>
                    <Trash className="h-4 w-4" />
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Expense</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this expense with title <strong>{row.title}</strong>?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleDeleteExpense}>
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}