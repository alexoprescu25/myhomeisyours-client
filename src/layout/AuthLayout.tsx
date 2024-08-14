import { type FC, type ReactNode } from "react";
import classes from './AuthLayout.module.scss';

type AuthLayoutTypes = {
    children: ReactNode;
}

const AuthLayout: FC<AuthLayoutTypes> = ({ children }) => {
    return (
        <div className={ classes.layout }>
            <div className={ classes.layout__content }>
                { children }
            </div>
        </div>
    )
}

export default AuthLayout;