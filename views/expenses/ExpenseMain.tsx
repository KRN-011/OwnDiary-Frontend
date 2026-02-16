"use client"

import ExpenseFilter from "./ExpenseFilter";
import ExpenseTable from "./ExpenseTable";
import { columns } from "./ExpenseTableColumns";

export default function ExpenseMain() {

    const data = [
        {
            id: "1",
            amount: 100,
            status: "pending",
            email: "test@gmail.com",
        },
        {
            id: "2",
            amount: 200,
            status: "processing",
            email: "test2@gmail.com",
        },
    ];

    return (
        <>
        <div className="flex flex-col gap-5">
            {/* Filter */}
            <ExpenseFilter />

            {/* Table */}
            <ExpenseTable columns={columns} data={data} />
        </div>
        </>
    )
}