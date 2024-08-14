export type formDataType = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
}

export const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
}

export const optionsArray = [
    { name: 'User', value: 'user' },
    { name: 'Moderator', value: 'moderator' },
    { name: 'Admin', value: 'admin' },
    { name: 'Masteradmin', value: 'masteradmin' }
]

export const initialPasswordState = {
    password: '',
    confirmPassword: ''
}

export type passwordType = {
    password: string;
    confirmPassword: string;
}