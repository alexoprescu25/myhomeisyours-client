import { type FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from './SignIn.module.scss';

import { AuthLayout } from "layout";
import { Input, Button, Checkbox, Component } from 'components/shared';

import { handleAPIError, validateEmail } from "utils";
import { signIn } from "service/auth.service";

import { useForm, Controller, SubmitHandler } from "react-hook-form"

import { useAuthContext } from "context/AuthContext";

interface IFormInputs {
    email: string;
    password: string;
    rememberMe: boolean;
}

const SignIn: FC = () => {
    const { handleSubmit, control, watch, formState: { isValid, errors } } = useForm<IFormInputs>({
        defaultValues: {
          email: '',
          password: '',
          rememberMe: false
        },
    })  

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const { onLogin } = useAuthContext();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
            setIsLoading(true);

            try {
                const res = await signIn(data);
                onLogin(res?.data);
                navigate('/dashboard');
            } catch (error) {
                const message = handleAPIError(error, true);
                if (message) {
                    setError(message);
                }
            } finally {
                setIsLoading(false);
            }
    }

    return (
        <AuthLayout> 
            <Component className={ classes.auth__component }>
                <div className={ classes.auth__logo }>
                    <img src="/images/my-home-is-yours.png" alt="My Home Is Yours" />
                </div>
                <form className={ classes.auth__form } onSubmit={ handleSubmit(onSubmit) }>
                    { error && <p className={ classes.auth__error }> { error } </p> }
                    <Controller
                        name="email"
                        control={control}
                        rules={{ required: 'Email is required', pattern: validateEmail }}
                        render={({ field }) => <Input label="Email" {...field} errors={ errors } />}
                    />
                    <Controller
                        name="password"
                        control={control}
                        rules={{ required: 'Password is required' }}
                        render={({ field }) => <Input type="password" label="Password" {...field} errors={ errors } />}
                    />
                    <div>
                        <Controller name="rememberMe" control={ control } render={({ field }) => (
                            <Checkbox id="rememberMe" checked={ watch("rememberMe") } label="Remember Me" {...field} />
                        )} />
                    </div>
                    <Button type="submit" mode="main" disabled={ !isValid } isLoading={ isLoading }>Sign In</Button>
                </form>
            </Component>
        </AuthLayout>
    )
}

export default SignIn;