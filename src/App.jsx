import React from 'react'
import LoginForm from './components/LoginForm'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Expenses from './pages/Expenses'
import { Toaster } from 'react-hot-toast'
import CreateExpense from './components/CreateExpense'

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginForm />
  },
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/create-expense",
    element: <CreateExpense />
  },
  {
    path: "/expenses",
    element: <Expenses />
  }
]);

const App = () => {

  return (
    <div>
      <RouterProvider router={router} />
      <Toaster />
    </div>
  )
}

export default App