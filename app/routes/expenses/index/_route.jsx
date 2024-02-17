import { Link, useLoaderData } from '@remix-run/react'
import ExpensesList from '~/components/expenses/ExpensesList'
import ExpensesHeader from '~/components/navigation/ExpensesHeader'
import { FaPlus, FaDownload } from 'react-icons/fa'
import { getExpenses } from '~/data/expenses.server'

export default function ExpensesPage() {
    const expenses = useLoaderData()
    return (
        <>
            <ExpensesHeader />
            <main>
                <section id="expenses-actions">
                    <Link to="add">
                        <FaPlus />
                        <span>Add Expense</span>
                    </Link>
                    <a href="/expenses/raw">
                        <FaDownload />
                        <span>Load Raw Data</span>
                    </a>
                </section>
                <ExpensesList expenses={expenses} />
            </main>
        </>
    );
}

// loader is always executed in the back end
export async function loader({ request }) {
    // const expenses = await getExpenses();
    // return expenses;

    // or 

    // const expenses = await getExpenses();
    // return json(expenses)

    console.log('EXPENSES LOADER')
    return getExpenses();
}

export function meta() {
    return {
        title: 'Expense',
        description: 'Expense'
    }
}