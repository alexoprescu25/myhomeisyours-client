import { type FC, type ReactNode } from "react";
import classes from './Table.module.scss';

const TableHead: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <thead className={classes.table__head }>
            { children }
        </thead>
    )
}

export default TableHead;