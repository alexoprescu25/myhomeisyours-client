import { type FC, type ReactNode } from "react";
import classes from './Table.module.scss';

import Component from "../component/Component";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Table: FC<{ 
    children: ReactNode; 
    title: string; 
    onClick?: () => void;
}> = ({ children, title, onClick }) => {
    return (
        <Component className={ classes.table }>
            <div className={ classes.table__header }>
                <h2> { title } </h2>
                { onClick && (
                    <button onClick={ () => onClick() } className={ classes.table__button }>
                        <FontAwesomeIcon icon={ faPlus } />
                    </button>
                ) }
            </div>
            <table className={classes.table__table }>
                { children }
            </table>
        </Component>
    )
}

export default Table;