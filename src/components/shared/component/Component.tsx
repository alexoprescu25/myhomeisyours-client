import { type FC, type ReactNode } from "react";
import classes from './Component.module.scss';

import classNames from "classnames";

const Component: FC<{ children: ReactNode; className: string }> = ({ children, className }) => {
    const componentClass = classNames(classes.component, className);
    
    return (
        <div className={ componentClass }>
            { children }
        </div>
    )
}

export default Component;