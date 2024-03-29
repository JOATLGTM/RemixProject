import { Link, useActionData, Form, useNavigation, useLoaderData } from '@remix-run/react'

function ExpenseForm() {
  const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10
  const validationErrors = useActionData();
  const navigation = useNavigation()
  const expenseData = useLoaderData()
  const isSubmitting = navigation.state !== 'idle'

  const defaultVaules = expenseData ?
    {
      title: expenseData.title,
      amount: expenseData.amount,
      date: expenseData.date
    } : {
      title: '',
      amount: '',
      date: ''
    }

  return (
    <Form
      method={expenseData ? "patch" : "post"}
      className="form"
      id="expense-form"
    >
      <p>
        <label htmlFor="title">Expense Title</label>
        <input type="text" id="title" name="title" defaultValue={defaultVaules.title} required maxLength={30} />
      </p>

      <div className="form-row">
        <p>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            min="0"
            step="0.01"
            defaultValue={defaultVaules.amount}
            required
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input type="date" id="date" name="date" max={today} defaultValue={defaultVaules.date ? defaultVaules.date.slice(0, 10) : ''} required />
        </p>
      </div>
      {validationErrors && <ul>
        {Object.values(validationErrors).map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>}
      <div className="form-actions">
        <button disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Save Expense'}</button>
        <Link to="/expenses">Cancel</Link>
      </div>
    </Form>
  );
}

export default ExpenseForm;
