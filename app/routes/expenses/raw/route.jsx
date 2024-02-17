import { getExpenses } from '~/data/expenses.server'

export async function loader({ request }) {
    return getExpenses();
}