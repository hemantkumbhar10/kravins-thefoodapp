import { SignInFormData } from '../components/auth/Login';
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
    return responseBody;
}

export const login = async (formData: SignInFormData) => {
    const response = await fetch(`${URL}/api/auth/login`, {

        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
    });

    const responsesBody = await response.json();
    if (!response.ok) {
        throw new Error(responsesBody.message);
    }
    return responsesBody;
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


export const logout = async () => {
    const response = await fetch(`${URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Couldnt log out!');
    }
}