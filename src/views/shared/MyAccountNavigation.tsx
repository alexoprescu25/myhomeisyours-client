import { type FC } from "react";
import { useNavigate } from "react-router-dom";
import classes from './MyAccountNavigation.module.scss';

import { useCurrentUser } from "context/CurrentUserProvider";
import { useAuthContext } from "context/AuthContext";

import { hasPermission } from "utils/permissions";
import { NavItem, CompanyLogo, Acronim } from "components/shared";
import { myAccountNavItems } from "constant";
import { lArray } from "utils";
import { logOutCurrentAccount } from "service/account.service";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const MyAccountNavigation: FC = () => {
    const { currentUser } = useCurrentUser();
    const navigate = useNavigate();
    const { onLogout } = useAuthContext();

    const handleLogOut = async () => {
        const res = await logOutCurrentAccount();
        if (res?.status === 200) {
            onLogout();
            navigate('/');
        } 
    }
    
    if (!currentUser) return;

    return (
        <div className={ classes.navigation }>
            <div className={ classes.navigation__logo }>
                <CompanyLogo />
            </div>
            <div className={ classes.navigation__container }>
                
                <div className={ classes.navigation__list }>
                    { lArray(myAccountNavItems).map(({ path, icon, permissions, end, name, submenus}: any, index) => (
                        hasPermission(currentUser.role, permissions) && (
                            <NavItem 
                                key={ index }
                                href={ path } 
                                icon={ icon } 
                                active={ true }
                                color={ name.split(" ").join("").toLowerCase() } 
                                submenus={ submenus && submenus }
                                end={ end } 
                            >
                                { name }
                            </NavItem>
                        )
                    )) }
                </div>
                <div className={ classes.navigation__account }>
                    <div>
                        <Acronim color='rgb(142, 217, 160)' name={ currentUser.fullName } width={40} />
                    </div>
                    <div>
                        <p>Hi, { currentUser.firstName }! </p>
                        <a className={ classes.dropdown__link } onClick={ handleLogOut }>
                            <FontAwesomeIcon icon={ faArrowRightFromBracket } />
                            Log Out  
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyAccountNavigation;