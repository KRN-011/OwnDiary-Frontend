import ExpenseHeader from "./ExpenseHeader";
import ExpenseMain from "./ExpenseMain";



export default function Expenses() {
    return (
        <>
            <div className="flex flex-col gap-5 w-full">
                {/* Header */}
                <ExpenseHeader />

                {/* Main Content */}
                <ExpenseMain />
            </div>
        </>
    )
}