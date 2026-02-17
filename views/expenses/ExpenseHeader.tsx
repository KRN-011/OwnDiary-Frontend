"use client"

import CreateExpenseModal from "@/components/modals/expenses/CreateExpenseModal"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"


export default function ExpenseHeader() {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            {/* Heading */}
            <div className="flex flex-col gap-1">
                <div className="text-3xl font-semibold">
                    Expenses
                </div>
                <div className="text-base font-light">
                    Track and Manage your expenses
                </div>
            </div>

            {/* Actions */}
            <div>
                <CreateExpenseModal />
            </div>
        </div>
    )
}