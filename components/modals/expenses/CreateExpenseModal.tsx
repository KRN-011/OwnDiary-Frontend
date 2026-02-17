"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"

export default function CreateExpenseModal() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"default"}>
                    <Plus />
                    Add Expense
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Expense</DialogTitle>
                    <DialogDescription>
                        Tell us where your money quietly disappeared. 💸
                    </DialogDescription>
                </DialogHeader>
                
            </DialogContent>
        </Dialog>
    )
}