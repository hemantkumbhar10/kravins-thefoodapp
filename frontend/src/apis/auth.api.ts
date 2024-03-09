import { RegisterFormData } from '../components/auth/Register';


const URL = import.meta.env.VITE_BACKEND_API_BASE_URL;

export const register = async (formData: RegisterFormData) => {
    const response = await fetch(`${URL}/api/user/register`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
    });

    const responseBody = await response.json();

    if (!response.ok) {
        throw new Error(responseBody.message);
    }
}

export const validateToken = async () => {
    const response = await fetch(`${URL}/api/auth/validate-token`, {
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Invalid user token!');
    }

    return response.json();
}