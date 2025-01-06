import { useAuthStore } from '../store/authStore';

export const onLogin = (email, password) => {
    console.log('Login attempt with:', { email, password });
    const token = 'mock-token';
    const userId = 'mock-user-id';
    const storedToken = localStorage.getItem(`auth_token_${email}`);
    if (storedToken) {
        alert('This email is already logged in.');
        return;
    }
    useAuthStore.getState().login(token, email, userId);
};

export const loginUser = async (email, password) => {
    const existingSession = localStorage.getItem('userSession');
    if (existingSession) {
        try {
            const session = JSON.parse(existingSession);
            if (session && session.email === email && session.token) {
                throw new Error('This email is already logged in. Please logout first.');
            }
        } catch {
            localStorage.removeItem('userSession');
        }
    }

    // Check if user is registered
    const storedPassword = localStorage.getItem(`pwd_${email}`);
    if (!storedPassword) {
        throw new Error('Email not registered. Please register first.');
    }

    // Verify password
    if (storedPassword !== password) {
        throw new Error('Invalid password');
    }

    const mockResponse = {
        data: {
            token: 'mock-jwt-token-' + Math.random(),
            userId: 'user-' + Math.random()
        }
    };

    localStorage.setItem('userSession', JSON.stringify({
        token: mockResponse.data.token,
        email: email
    }));
    return mockResponse.data;
};

export const logoutUser = () => {
    const session = JSON.parse(localStorage.getItem('userSession') || '{}');
    const email = session.email;

    // Only remove auth related items
    localStorage.removeItem('userSession');
    localStorage.removeItem(`auth_token_${email}`);

    useAuthStore.getState().logout();
};

export const registerUser = async (email, password) => {
    // Check if user already exists
    const storedPassword = localStorage.getItem(`pwd_${email}`);
    if (storedPassword) {
        throw new Error('This email is already registered');
    }

    // Store user credentials
    localStorage.setItem(`pwd_${email}`, password);

    return {
        success: true,
        message: 'Registration successful. Please login.'
    };
};
