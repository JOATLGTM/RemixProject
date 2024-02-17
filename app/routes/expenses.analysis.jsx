import ExpensesHeader from '~/components/navigation/ExpensesHeader'
import ExpenseStatistics from '~/components/expenses/ExpenseStatistics'
import Chart from '~/components/expenses/Chart'
import { useLoaderData } from '@remix-run/react'
import { getExpenses } from '~/data/expenses.server'

export default function ExpenseAnalysisPage() {
    const expenses = useLoaderData()
    return (
        <>
            <ExpensesHeader />
            <main>
                <Chart expenses={expenses} />
                <ExpenseStatistics expenses={expenses} />
            </main>
        </>
    )
}

export async function loader({ request }) {
    console.log('ANALYSIS LOADER')
    return getExpenses();
}