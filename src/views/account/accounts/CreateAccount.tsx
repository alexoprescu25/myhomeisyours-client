import { type FC, useState } from "react";
import classes from './CreateAccount.module.scss';

import { Input, Select, Button } from 'components/shared';

import { createAccount } from "service/auth.service";

import { useForm, SubmitHandler, Controller } from "react-hook-form";

import { validateEmail, validatePassword } from "utils";

import { formDataType, initialState, optionsArray } from "./config";

const CreateAccount: FC<{ onSubmit: () => void }> = ({ onSubmit }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {
        control, 
        register,
        handleSubmit, 
        formState: { errors } 
    } = useForm<formDataType>({ defaultValues: initialState });

    const onSubmitForm: SubmitHandler<formDataType> = async (data) => {
        setIsLoading(true);

        try {
            const response = await createAccount(data);

            if (response && response.status === 201) {
                onSubmit();
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form className={ classes.auth__form } onSubmit={ handleSubmit(onSubmitForm) }>
            <Input label="First Name" name="firstName" register={ register } rules={{ required: 'First name is required' }} errors={ errors } required={ true } />
            <Input label="Last Name" name="lastName" register={ register } rules={{ required: 'Last name is required' }} errors={ errors } required={ true } />
            <Input label="Email" name="email" register={ register } rules={{ required: 'Email is required', pattern: validateEmail }} errors={ errors } required={ true } />
            <Input type="password" label="Password" name="password" register={ register } rules={{ required: 'Password is required', pattern: validatePassword }} errors={ errors } required={ true } />
            <Input type="password" label="Confirm Password" name="confirmPassword" register={ register } rules={{ required: 'Type the same password twice' }} errors={ errors } required={ true } />
            <Controller name="role" control={ control } rules={{ required: 'Role is required' }} render={({ field }) => (
                <Select {...field} optionsArray={ optionsArray } errors={ errors } defaultValue='Role' />
            )} />
            <Button type="submit" mode="main" isLoading={ isLoading }>Create Account</Button>
        </form>
    )
}

export default CreateAccount;