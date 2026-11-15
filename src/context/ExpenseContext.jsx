import { createContext, useState } from 'react'

export const ExpensesProvider = createContext();

const ExpenseContext = ({ children }) => {
    const [expenses, setExpenses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <ExpensesProvider.Provider value={{ expenses, setExpenses, isLoading, setIsLoading }}>
            {children}
        </ExpensesProvider.Provider>
    )
}

export default ExpenseContext;