import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn, signOut } from '../services/authService';
import toast from 'react-hot-toast';

const useAuth = () => {
    const [authCredentials, setAuthCredentials] = useState({ email: "", password: "" })
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        if (error) {
            setError(null);
        }
        const { name, value } = e.target;
        setAuthCredentials(prev => ({ ...prev, [name]: value }));
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        setIsLoading(true);

        const result = await signIn(authCredentials);

        if (!result.success) {
            setError(result.error);
            setIsLoading(false);
            return;
        }

        setIsLoading(false);
        navigate("/");
    }

    const handleLogout = async () => {
        const result = await signOut();
        if (!result.success) {
            toast("Failed to Log out. Try again.");
            return;
        };

        navigate("/login");

    }

    return { handleChange, handleLogin, handleLogout, authCredentials, error, isLoading, navigate }
}

export default useAuth