import { type FC } from "react";
import classes from './Header.module.scss';

const Header: FC = () => {
    return (
        <div className={ classes.header }>
            <div className={ classes.header__container }>
                <div className={ classes.header__logo }>
                    <img src="/images/my-home-is-yours-black.png" alt="MyHomeIsYours" />
                </div>
            </div>
        </div>
    )
}

export default Header;