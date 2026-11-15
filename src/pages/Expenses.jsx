import ExpenseTile from '../components/ExpenseTile';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useExpenses } from '../hooks/useExpenses';

const Expenses = () => {
  const { expenses, isLoading, error, getAllExpenses } = useExpenses();

  return (
    <div className='w-full h-screen overflow-y-auto'>
      {error && (
        <div className="p-4 mb-4 rounded-xl bg-red-50 border border-red-200">
          <p className="text-sm text-red-600 text-center">{error}</p>
          <button
            onClick={getAllExpenses}
            className="mt-2 w-full py-2 bg-red-100 text-red-700 font-semibold rounded-lg active:scale-95 transition-transform"
          >
            Try Again
          </button>
        </div>
      )}

      <div className="flex flex-col">
        {isLoading ? (
          // Skeleton Loading State
          <div className="flex flex-col gap-3">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-19 w-full bg-gray-200 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : expenses.length > 0 ? (
          // Data Loaded State
          expenses.map((expense) => (
            <ExpenseTile
              key={expense.id}
              amount={expense.amount}
              category={expense.category}
              desc={expense.description}
              paymentMode={expense.payment_mode}
            />
          ))
        ) : (
          // Empty State
          <div className="flex flex-col items-center justify-center h-[50vh] text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-4xl">💸</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">No expenses yet</h3>
            <p className="text-gray-500 mt-1 mb-6 max-w-62.5">
              Looks like you haven't tracked any spending. Time to start!
            </p>
            <Link
              to="/create-expense"
              className="px-6 py-3 bg-black text-white font-semibold rounded-xl active:scale-95 transition-transform"
            >
              Add First Expense
            </Link>
          </div>
        )}
      </div>

      {
        expenses.length > 0 &&
        (
          <div className='w-full flex items-center justify-center'>
            <Link to={"/create-expense"} className='w-fit flex justify-center items-center py-3.5 px-4 rounded-xl shadow-sm text-base font-semibold text-white bg-black hover:bg-gray-800 active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 transition-all duration-200'>
              <Plus />
            </Link>
          </div>
        )
      }
    </div>
  )
}

export default Expenses