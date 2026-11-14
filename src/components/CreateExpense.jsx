import { useState } from 'react'
import { createExpense } from '../services/createExpense';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ChevronRight, Zap } from 'lucide-react';

const CreateExpense = () => {
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("food");
    const [description, setDescription] = useState("");
    const [paymentMode, setPaymentMode] = useState("online");
    const [error, setError] = useState(null);
    const [isCreating, setIsCreating] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setError(null);
        const { name, value } = e.target;
        if (name === "amount") return setAmount(value);
        if (name === "category") return setCategory(value);
        if (name === "description") return setDescription(value);
    }

    const changePaymentMode = () => {
        if (paymentMode === "cash") return setPaymentMode("online");
        return setPaymentMode("cash");
    }

    const handleCreate = async (e) => {
        e.preventDefault();
        setError(null);

        setIsCreating(true);

        const result = await createExpense({ amount, category, description, paymentMode });

        if (!result.success) {
            setError(result.error);
            setIsCreating(false);
            return;
        }

        setIsCreating(false);
        toast("Expense created successfully");
        navigate("/");
    }
    return (
        <div className="min-h-screen block md:flex items-center justify-center bg-gray-50 p-0 md:px-4 sm:w-full lg:px-8">
            <div className="w-full max-w-md p-6 sm:p-8">

                {/* Header */}
                <div className="mb-6 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">New Expense</h2>
                        <p className="text-sm text-gray-500 mt-1">Track where your money goes</p>
                    </div>
                    {/* Back button */}
                    <Link to="/" className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                        <ChevronRight size={20} />
                    </Link>
                </div>

                <form onSubmit={handleCreate} className="flex flex-col gap-5">

                    {/* Error Banner */}
                    {error && (
                        <div className="p-3 rounded-lg bg-red-50 border border-red-200 animate-in fade-in slide-in-from-top-2">
                            <p className="text-sm text-red-600 font-medium text-center">
                                {error}
                            </p>
                        </div>
                    )}

                    <div className="flex flex-col gap-4">
                        {/* Amount Input */}
                        <div className='flex flex-col gap-2'>
                            <div className='flex items-center justify-between '>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">Amount ($)</label>
                                <button
                                    type='button'
                                    onClick={changePaymentMode}
                                    className='flex items-center p-0.5 bg-neutral-200 rounded-sm font-semibold'>
                                    <Zap size={15} />
                                    {paymentMode}
                                </button>
                            </div>
                            <input
                                name="amount"
                                type="number"
                                step="0.01"
                                min="0"
                                placeholder='0.00'
                                value={amount}
                                onChange={handleChange}
                                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                required
                            />

                        </div>

                        {/* Category Select */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">Category</label>
                            <select
                                name="category"
                                value={category}
                                onChange={handleChange}
                                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all appearance-none"
                                required
                            >
                                {/* 2. Added placeholder option so state matches UI */}
                                <option value="" disabled>Select a category</option>
                                <option value="food">Food</option>
                                <option value="travel">Travel</option>
                                <option value="rent">Rent</option>
                                <option value="shopping">Shopping</option>
                                <option value="health">Health</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {/* Description Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">Description</label>
                            <input
                                name="description"
                                type="text"
                                placeholder='e.g., Coffee with friends'
                                value={description}
                                onChange={handleChange}
                                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        disabled={isCreating}
                        type='submit'
                        className="mt-4 w-full flex justify-center items-center py-3.5 px-4 rounded-xl shadow-sm text-base font-semibold text-white bg-black hover:bg-gray-800 active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 transition-all duration-200"
                    >
                        {isCreating ? (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            "Create Expense"
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateExpense