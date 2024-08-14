import { type ReactNode, type ComponentPropsWithoutRef, type FC } from "react";
import classes from './Button.module.scss';

import Spinner from "../spinner/Spinner";

type ButtonType = {
    mode: string;
    isLoading?: boolean;
    children: ReactNode;
} & ComponentPropsWithoutRef<'button'>;

const Button: FC<ButtonType> = ({ children, isLoading, mode, ...props }) => {
    return (
        <button className={ classes[`btn-${mode}`] } {...props} disabled={ isLoading || props.disabled }>
            { isLoading ? <Spinner /> : children }
        </button>
    )
}

export default Button;