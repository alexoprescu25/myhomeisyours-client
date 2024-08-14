import { type FC, Fragment, useEffect, useState } from "react";
import classes from './ChangePassword.module.scss';

import { Input, Button, Component, Title } from "components/shared";

import { useForm, SubmitHandler, Controller } from "react-hook-form";

import { passwordType, initialPasswordState } from "./config";

import { changePassword } from "service/user.service";

import { waitFor } from "utils";

const ChangePassword: FC<{ accountId: string; onSave: () => void; }> = ({ accountId, onSave }) => {
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const {
        control, 
        handleSubmit,
        formState: { errors } 
    } = useForm<passwordType>({ defaultValues: initialPasswordState });
    
    const onSubmitForm: SubmitHandler<passwordType> = async (data) => {
        setIsLoading(true);

        try {
            const response = await changePassword(accountId, data.password);

            if (response && response.status === 200) {
                setSuccessMessage(response.data.message);
                onSave();
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        waitFor(3000).then(() => {
            setSuccessMessage('');
        })
    }, [successMessage])

    return (
        <Fragment>
            <Component className={ classes.password }>
                <div className={ classes.password__container }>
                    <Title>Change Password</Title>
                    { successMessage && (
                        <div className={ classes.password__success }>
                            <p> { successMessage } </p>
                        </div>
                    ) }
                    <div className={ classes.password__form }>
                        <form onSubmit={ handleSubmit(onSubmitForm) }>
                            <Controller name="password" control={ control } rules={{ required: 'Password is required' }} render={({ field }) => (
                                <Input type="password" label="Password" {...field} errors={ errors } />
                            )} />
                            <Controller name="confirmPassword" control={ control } rules={{ required: 'Confirm password is required' }} render={({ field }) => (
                                <Input type="password" label="Confirm Password" {...field} errors={ errors } />
                            )} />
                            <Button mode="main" isLoading={ isLoading }>Save</Button>
                        </form>
                    </div>
                </div>
            </Component>
        </Fragment>
    )
}

export default ChangePassword;