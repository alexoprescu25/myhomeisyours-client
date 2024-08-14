import { type ReactNode, type FC, type ChangeEvent, useState } from "react";
import { NavLink } from 'react-router-dom';
import classes from './NavItem.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classNames from "classnames";
import { lArray } from "utils";

type NavItemProps = {
    href: string;
    end: boolean;
    children: ReactNode;
    icon?: string | any;
    active: boolean;
    color: string;
    submenus: object | null ;
}

const NavItem: FC<NavItemProps> = ({ href, end = false, children, icon, color, submenus, active = true }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    
    const parseClasses = (isActive: boolean) => {
        if (isActive) {
            return classNames(classes.item, {
                [classes['item--active']]: isActive 
            })
        }

        return classes.item;
    }

    const parseDropdownClasses = () => {
        return classNames(classes.item__dropdown, {
            [classes['item__dropdown--open']]: isOpen
        })
    }

    const parseSubmenuClasses = (isActive: boolean) => {
        if (isActive) {
            return classNames(classes.subitem, {
                [classes['subitem--active']]: isActive 
            })
        }

        return classes.subitem;
    }

    const toggleNaviationDropdown = (e: ChangeEvent<EventTarget>) => {
        e.preventDefault()

        setIsOpen(state => !state);
    }
    
    return (
        <li>
            { submenus ? (
                <div className={ parseDropdownClasses() }>
                    <NavLink to={ href } end={ end } className={ ({ isActive }) => parseClasses(isActive) } onClick={ toggleNaviationDropdown }>
                        { icon && <FontAwesomeIcon icon={ icon } className={ classes[`item__icon--${color}`] } /> }
                        <span> { children } </span>
                    </NavLink>

                    { isOpen && lArray(submenus).map((item: any, index) => (
                        <NavLink to={ item.path } end={ item.end } key={ index } className={ ({ isActive }) => parseSubmenuClasses(isActive) }>
                            <span> { item.name } </span>
                        </NavLink>
                    )) }
                </div>
            ) : (
                <NavLink to={ href } end={ end } className={ ({ isActive }) => parseClasses(isActive) }>
                    { icon && <FontAwesomeIcon icon={ icon } className={ classes[`item__icon--${color}`] } /> }
                    <span> { children } </span>
                </NavLink>
            ) }
        </li>
    )
}

export default NavItem;