import { prisma } from './database.server'

export async function addExpense(expenseData) {
    try {
        return await prisma.expenses.create({
            data: {
                title: expenseData.title,
                amount: +expenseData.amount,
                date: new Date(expenseData.date)
            }
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getExpenses() {
    try {
        const expenses = await prisma.expenses.findMany({ orderBy: { date: 'desc' } });
        return expenses;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export async function getExpense(id) {
    try {
        const expense = await prisma.expenses.findFirst({ where: { id: id } });
        return expense;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export async function updateExpense(id, expenseData) {
    try {
        await prisma.expenses.update({
            where: { id: id },
            data: {
                title: expenseData.title,
                amount: +expenseData.amount,
                date: new Date(expenseData.date)
            }
        })
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function deleteExpense(id) {
    try {
        await prisma.expenses.delete({
            where: { id: id }
        })
    } catch (error) {
        console.log(error)
        throw error
    }
}