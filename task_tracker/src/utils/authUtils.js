import { useAuthStore } from '../store/authStore';

export const onLogin = (email, password) => {
    console.log('Login attempt with:', { email, password });
    const token = 'mock-token'; // Replace with actual token from backend
    const userId = 'mock-user-id';
    const storedToken = localStorage.getItem(`auth_token_${email}`);
    if (storedToken) {
        alert('This email is already logged in.');
        return;
    }
    useAuthStore.getState().login(token, email, userId);
};
