import { Link } from 'react-router-dom';
import { Plus, ArrowRight } from 'lucide-react';
import ExpenseTile from '../components/ExpenseTile.jsx';
import { useExpenses } from '../hooks/useExpenses.js';

const Home = () => {
  const { expenses, isLoading } = useExpenses();

  const recentExpenses = expenses.slice(0, 6);
  let totalSpent = expenses.reduce((acc, { amount }) => {
    return acc + amount;
  }, 0);


  return (
    <main className="min-h-screen bg-gray-50 pb-24">

      <div className="px-4 pt-4 max-w-md mx-auto">

        {/* Quick Summary Card */}
        <div className="bg-black text-white rounded-2xl p-6 shadow-md mb-8">
          <p className="text-sm font-medium text-gray-400 mb-1">Total Spent</p>
          <h2 className="text-3xl font-bold tracking-tight">
            {
              isLoading ? (
                <div className='w-fit px-18 py-5 rounded-lg bg-white/15 animate-pulse'></div>
              ) :
                `₹${totalSpent.toFixed(2)}`
            }
          </h2>
        </div>

        {/* Recent Expenses Section */}
        <div className="flex items-center justify-between mb-4 px-1">
          <h3 className="text-lg font-bold text-gray-900">Recent Expenses</h3>
          <Link
            to="/expenses"
            className="text-sm font-semibold text-gray-500 flex items-center gap-1 hover:text-black transition-colors active:scale-95"
          >
            See all <ArrowRight size={16} />
          </Link>
        </div>

        {/* List Container */}
        <div className="flex flex-col gap-3">
          {recentExpenses.length > 0 ? (
            recentExpenses.slice(0, 3).map((expense) => (
              <ExpenseTile key={expense.id}
                amount={expense.amount}
                category={expense.category}
                desc={expense.description}
                paymentMode={expense.payment_mode}
              />
            ))
          ) :
            (
              /* Minimal Empty State */
              <div className="flex flex-col items-center justify-center py-12 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <p className="text-gray-400 text-sm italic">{isLoading ? "Loading..." : "No recent expenses"}</p>
              </div>
            )}
        </div>

        {/* Primary Action Button */}
        <Link
          to="/create-expense"
          className="mt-6 w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl shadow-sm text-base font-semibold text-white bg-black hover:bg-gray-800 active:scale-[0.98] transition-all"
        >
          <Plus size={20} />
          Add Expense
        </Link>

      </div>
    </main>
  );
};

export default Home;