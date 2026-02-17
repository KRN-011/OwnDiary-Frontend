"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Pencil, Upload } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateExpenseSchema, createExpenseSchema } from "@/schemas/expenseSchema"
import { useUpdateExpense } from "@/hooks/apiHooks/Expenses"
import { CreateExpensePayload, Expense } from "@/types/expenseTypes"
import { showToast } from "@/lib/toast"
import { useQueryClient } from "@tanstack/react-query"
import { API_QUERIES } from "@/constants/apiQueries"
import { useGetAllExpenseCategories } from "@/hooks/apiHooks/Expense-category"

export default function EditExpenseModal({ expense }: { expense: Expense }) {

    // hooks
    const useQuery = useQueryClient()

    // states
    const [images, setImages] = useState<File[]>([])
    const [open, setOpen] = useState(false)

    // API hooks
    const { mutateAsync: updateExpenseMutation } = useUpdateExpense()
    const { data: ExpensesCatData, isLoading: ExpensesCatLoading } = useGetAllExpenseCategories()

    // react hook form
    const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
        defaultValues: {
            title: expense.title,
            description: expense.description,
            amount: expense.amount,
            category: expense.categoryId,
            images: [],
        },
        resolver: zodResolver(createExpenseSchema),
        mode: "onChange",
    })

    // Image hander
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return
        setImages(Array.from(e.target.files))
    }

    // handle submit
    const onSubmit = async (data: CreateExpenseSchema) => {
        try {
            const payload: CreateExpensePayload = {
                title: data.title,
                description: data.description || "",
                amount: data.amount,
                categoryId: data.category,
                imageAttachments: images
            }

            const response = await updateExpenseMutation({ id: expense.id, payload })

            if (response.success) {
                showToast.success("Expense updated successfully")
                useQuery.invalidateQueries({ queryKey: [API_QUERIES.EXPENSE.getAllExpenses] })
                reset()
                setOpen(false)
            }
        } catch (error) {
            showToast.error("Something went wrong")
            console.log(error)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size={"icon"} onClick={() => setOpen(true)}>
                    <Pencil className="h-4 w-4" />
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Add New Expense</DialogTitle>
                    <DialogDescription>
                        Tell us where your money quietly disappeared. 💸
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Title */}
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            {...register("title")}
                            id="title"
                            placeholder="e.g. Dinner with friends"
                        />
                        {errors.title && <p className="text-destructive text-sm">{errors.title.message}</p>}
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            {...register("description")}
                            id="description"
                            placeholder="Optional details..."
                            className="resize-none"
                        />
                        {errors.description && <p className="text-destructive text-sm">{errors.description.message}</p>}
                    </div>

                    {/* Amount + Category (Responsive Grid) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Amount */}
                        <div className="space-y-2">
                            <Label htmlFor="amount">Amount</Label>
                            <Input
                                {...register("amount")}
                                id="amount"
                                type="number"
                                placeholder="₹ 0.00"
                            />
                            {errors.amount && <p className="text-destructive text-sm">{errors.amount.message}</p>}
                        </div>

                        {/* Category */}
                        <div className="space-y-2">
                            <Label>Category</Label>
                            <Controller
                                name="category"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Select name={field.name} value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger
                                            id="form-rhf-select-language"
                                            aria-invalid={fieldState.invalid}
                                        >
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {
                                                ExpensesCatLoading ? (
                                                    <SelectItem value="" disabled>Loading...</SelectItem>
                                                ) : (
                                                    ExpensesCatData?.data?.map((category) => (
                                                        <SelectItem key={category.id} value={category.id}>
                                                            {category.name}
                                                        </SelectItem>
                                                    ))
                                                )}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.category && <p className="text-destructive text-sm">{errors.category.message}</p>}
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-2">
                        <Label htmlFor="images">Attachments (Optional)</Label>
                        <div className="flex flex-col gap-3">
                            <label
                                htmlFor="images"
                                className="flex items-center justify-center gap-2 border border-dashed rounded-lg p-6 cursor-pointer hover:bg-muted transition"
                            >
                                <Upload className="h-4 w-4" />
                                <span className="text-sm text-muted-foreground">
                                    Click to upload multiple images
                                </span>
                            </label>
                            <Input
                                {...register("images")}
                                id="images"
                                type="file"
                                multiple
                                className="hidden"
                                onChange={handleImageChange}
                            />

                            {images.length > 0 && (
                                <div className="text-sm text-muted-foreground">
                                    {images.length} file(s) selected
                                </div>
                            )}
                            {errors.images && <p className="text-destructive text-sm">{errors.images.message}</p>}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3">
                        <Button onClick={() => setOpen(false)} type="button" variant="outline">
                            Cancel
                        </Button>
                        <Button type="submit">
                            Save Expense
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
