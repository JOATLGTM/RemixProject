import ExpenseForm from '~/components/expenses/ExpenseForm'
import Modal from '~/components/util/Modal'
import { useNavigate, useActionData } from '@remix-run/react'
import { redirect } from '@remix-run/node'
import { addExpense } from '~/data/expenses.server'
import { validateExpenseInput } from '~/data/validation.server'

export default function ExpenseAddPage() {
    const navigate = useNavigate();
    function closeHandler() {
        navigate('/expenses')
    }

    return (
        <Modal onClose={closeHandler}>
            <ExpenseForm />
        </Modal>
    )
}

export async function action({ request, params }) {
    const formData = await request.formData();
    const expenseData = Object.fromEntries(formData)

    try {
        validateExpenseInput(expenseData)
    } catch (error) {
        console.log(error)
        return error;
    }

    await addExpense(expenseData)
    return redirect('/expenses')
}

export function meta() {
    return [
        { title: 'Add Expense', },
        {
            name: "description",
            content: "Add Expense"
        }
    ]
}