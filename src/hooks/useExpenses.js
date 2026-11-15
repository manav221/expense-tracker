import { useContext, useEffect, useState } from 'react'
import { ExpensesProvider } from '../context/ExpenseContext';
import { fetchExpenses } from '../services/expensesService';

export const useExpenses = () => {
    const { expenses, setExpenses, isLoading, setIsLoading } = useContext(ExpensesProvider);
    const [error, setError] = useState(null);

    const getAllExpenses = async () => {
        setError(null);
        setIsLoading(true);

        const result = await fetchExpenses();
        if (!result.success) {
            setIsLoading(false);
            return setError(result.error);
        }

        setExpenses(result.data);
        setIsLoading(false);
    }

    useEffect(() => {
        if (expenses.length > 0) return;
        
        getAllExpenses();
    }, []);

    return { expenses, isLoading, error, getAllExpenses }
}
