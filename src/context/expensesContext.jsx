import React, { createContext, useState } from 'react'

const ExpensesContext = createContext();
const expensesContext = ({ children }) => {
    const [expenses, setExpenses] = useState([])
    return (
        <ExpensesContext.Provider value={expenses}>
            {children}
        </ExpensesContext.Provider>
    )
}

export default expensesContext