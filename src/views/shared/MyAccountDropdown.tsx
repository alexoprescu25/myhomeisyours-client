import { FC } from "react";
import { useNavigate } from "react-router-dom";
import classes from './MyAccountDropdown.module.scss';

import { useCurrentUser } from "context/CurrentUserProvider";
import { useAuthContext } from "context/AuthContext";

import { CloseButton, Acronim } from "components/shared";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import { logOutCurrentAccount } from "service/account.service";

const MyAccountDropdown: FC<{ onClose: () => void }> = ({ onClose }) => {
    const navigate = useNavigate();
    const { currentUser } = useCurrentUser();
    const { onLogout } = useAuthContext();

    const handleClose = () => {
        onClose();
    }

    const handleLogOut = async () => {
        const res = await logOutCurrentAccount();
        if (res?.status === 200) {
            onLogout();
            navigate('/');
        } 
    }

    if (!currentUser) return;

    return (
        <div className={ classes.dropdown }>
            <CloseButton onClick={ handleClose } />
            <div className={ classes.dropdown__container }>
                <div className={ classes.dropdown__header }>
                    <div className={ classes.dropdown__image }>
                        <Acronim name={ currentUser.fullName } color="rgb(189, 81, 83)" />
                    </div>
                    <div className={ classes.dropdown__name }>
                        <p> Hi, { currentUser?.firstName }! </p>
                    </div>
                </div>
                <div className={ classes.dropdown__list }>
                    <a className={ classes.dropdown__link } onClick={ handleLogOut }>
                        <FontAwesomeIcon icon={ faArrowRightFromBracket } />
                        Log Out
                    </a>
                </div>
            </div>
        </div>
    )
}

export default MyAccountDropdown;