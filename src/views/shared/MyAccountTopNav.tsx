import { type FC, Fragment, useState } from "react";
import classes from './MyAccountTopNav.module.scss';

import { useCurrentUser } from "context/CurrentUserProvider";

import MyAccountDropdown from "./MyAccountDropdown";

import { Acronim } from "components/shared";

const MyAccountTopNav: FC = () => {
    const [dropdownIsOpen, setIsOpen] = useState<boolean>(false);
    const { currentUser } = useCurrentUser();

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    if (!currentUser) return;
    
    return (
        <Fragment>
            <div className={ classes.navigation }>
                <div className={ classes.navigation__container }>
                    <div className={ classes.navigation__actions }>

                    </div>
                    <div className={ classes.navigation__profile } onClick={ handleOpen }>
                        <div className={ classes.navigation__image }>
                            <Acronim name={ currentUser.fullName } color="rgb(189, 81, 83)" />
                        </div>
                        <div className={ classes.navigation__info }>
                            <p> { currentUser?.fullName } </p>
                        </div>
                    </div>
                </div>
            </div>
            { dropdownIsOpen && <MyAccountDropdown onClose={ handleClose } /> }
        </Fragment>
    )
}

export default MyAccountTopNav;