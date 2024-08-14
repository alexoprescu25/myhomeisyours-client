import { api } from './dataService';
import { HTTP_METHODS } from 'constant';
import { handleAPIError } from "utils";

// CREATE ACCOUNT

export const createAccount = async (formData: {email: string; password: string;}) => {
    try {
        const res = await api('/account/signup', {
            method: HTTP_METHODS.POST,
            data: JSON.stringify(formData)
        })
    
        return res;
    } catch (error) {
        handleAPIError(error);
    }
}

// SIGN IN

export const signIn = async (formData: {email: string; password: string;}) => {
    const res = await api('/account/signin', {
        method: HTTP_METHODS.POST,
        data: JSON.stringify(formData)
    })

    return res;
}