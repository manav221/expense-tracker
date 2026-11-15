import useAuth from '../hooks/useAuth';

const LoginForm = () => {
    const { authCredentials, error, isLoading, handleChange, handleLogin, navigate } = useAuth();
    
    return (
        <div className="min-h-screen block md:flex items-center justify-center bg-gray-50 md:px-4 lg:px-8">

            {/* 2. The Card */}
            <div className="w-full max-w-md p-6 sm:p-8">

                {/* Header */}
                <div className="mb-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Login</h2>
                </div>

                <form onSubmit={handleLogin} className="flex flex-col gap-5">

                    {/* Error Banner */}
                    {error && (
                        <div className="p-3 rounded-lg bg-red-50 border border-red-200 animate-in fade-in slide-in-from-top-2">
                            <p className="text-sm text-red-600 font-medium text-center">
                                {error} {/* Fixed: rendering the string directly */}
                            </p>
                        </div>
                    )}

                    {/* Inputs */}
                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">Email</label>
                            <input
                                name="email"
                                type="email"
                                required
                                value={authCredentials.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                // text-base is crucial for iOS to prevent auto-zoom
                                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                            />
                        </div>

                        <div>
                            <input
                                name="password"
                                type="password" // Fixed: MUST be password!
                                required
                                value={authCredentials.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                            />
                        </div>
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        // active:scale-[0.98] gives that native iPhone tap feedback
                        className="mt-2 w-full flex justify-center py-3.5 px-4 rounded-xl shadow-sm text-base font-semibold text-white bg-black hover:bg-gray-800 active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 transition-all duration-200"
                    >
                        {isLoading ? (
                            // Simple CSS spinner
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            "Log In"
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default LoginForm