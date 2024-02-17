import ExpenseForm from '~/components/expenses/ExpenseForm'
import Modal from '~/components/util/Modal'
import { useNavigate, useParams, Link } from '@remix-run/react'
import { getExpense, updateExpense, deleteExpense } from '~/data/expenses.server'
import { validateExpenseInput } from '~/data/validation.server'
import { redirect } from '@remix-run/node'
import Error from '~/components/util/Error'

export default function UpdateExpensePage() {
    const navigate = useNavigate();
    function closeHandler() {
        navigate('/expenses')
    }

    return (
        <Modal onClose={closeHandler}>
            <ExpenseForm />
        </Modal>)
}

export async function loader({ params }) {
    console.log('$ LOADER')
    const expenseId = params.id;
    const expense = await getExpense(expenseId)
    return expense;
}

export async function action({ params, request }) {
    const expenseId = params.id;
    if (request.method === 'PATCH') {
        const formData = await request.formData();
        const expenseData = Object.fromEntries(formData)

        try {
            validateExpenseInput(expenseData)
        } catch (error) {
            console.log(error)
            return error;
        }

        await updateExpense(expenseId, expenseData)
        return redirect('/expenses')
    } else {
        await deleteExpense(expenseId)
        return redirect('/expenses')
    }
}

export function ErrorBoundary() {
    const params = useParams();
    return (
        <>
            <main>
                <Error>
                    <p>{`Nice try. The path to ${params.id} does not exist`}</p>
                    <p>Back to <Link to="/">main page you go</Link></p>
                </Error>
            </main>
        </>
    );
}