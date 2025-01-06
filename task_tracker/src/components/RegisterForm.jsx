import { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { registerUser } from '../services/authService';
import PropTypes from 'prop-types';

export const RegisterForm = ({ onRegisterSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const result = await registerUser(email, password);
            setSuccess(result.message);
            setEmail('');
            setPassword('');
            setTimeout(() => {
                onRegisterSuccess?.();
            }, 1500);
        } catch (err) {
            setError(err.message || 'Registration failed');
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center">
                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                    Create Account
                </h2>
                <p className="mt-2 text-sm text-gray-600">Register to get started</p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-500 text-sm">{success}</p>}
                <div className="rounded-md shadow-sm space-y-4">
                    <div>
                        <label htmlFor="email" className="sr-only">Email address</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Email address"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Password"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <UserPlus className="h-5 w-5 text-white-500 group-hover:text-blue-400" />
                    </span>
                    Register
                </button>
            </form>
        </div>
    );
};

RegisterForm.propTypes = {
    onRegisterSuccess: PropTypes.func
}; 