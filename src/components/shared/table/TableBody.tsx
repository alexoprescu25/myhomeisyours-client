import { type FC, type ReactNode } from "react";
import classes from './Table.module.scss';

const TableBody: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <tbody className={classes.table__body }>
            { children }
        </tbody>
    )
}

export default TableBody;