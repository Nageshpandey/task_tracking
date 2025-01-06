import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { useAuthStore } from '../store/authStore';
import { loginUser } from '../services/authService';

export const AuthPage = () => {
    const [isLoginView, setIsLoginView] = useState(true);
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);

    const handleLogin = async (email, password) => {
        try {
            const data = await loginUser(email, password);
            login(data.token, email, data.userId);
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex flex-col items-center pt-10">
                <div className="bg-white rounded-lg p-1 shadow-sm mb-8">
                    <div className="flex space-x-1">
                        <button
                            className={`px-4 py-2 rounded-md transition-colors ${
                                isLoginView 
                                    ? 'bg-blue-500 text-white' 
                                    : 'text-gray-500 hover:bg-gray-100'
                            }`}
                            onClick={() => setIsLoginView(true)}
                        >
                            Login
                        </button>
                        <button
                            className={`px-4 py-2 rounded-md transition-colors ${
                                !isLoginView 
                                    ? 'bg-blue-500 text-white' 
                                    : 'text-gray-500 hover:bg-gray-100'
                            }`}
                            onClick={() => setIsLoginView(false)}
                        >
                            Register
                        </button>
                    </div>
                </div>

                <div className="w-full max-w-md">
                    {isLoginView ? (
                        <LoginForm onLogin={handleLogin} />
                    ) : (
                        <RegisterForm onRegisterSuccess={() => setIsLoginView(true)} />
                    )}
                </div>
            </div>
        </div>
    );
}; 