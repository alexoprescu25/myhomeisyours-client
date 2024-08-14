import { type FC, type ReactNode } from "react";
import classes from './Wrapper.module.scss';

const Wrapper: FC<{ children: ReactNode; }> = ({ children }) => {
    return (
        <div className={ classes.wrapper }>
            { children }
        </div>
    )
}

export default Wrapper;