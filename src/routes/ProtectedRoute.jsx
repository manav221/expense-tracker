import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const [session, setSession] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setIsLoading(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        })

        return () => subscription.unsubscribe();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
            </div>
        );
    }

    if(!session){
        return <Navigate to={"/login"} replace />
    }

    return <Outlet />
}

export default ProtectedRoute