import { type FC, memo } from "react";
import classes from './View.module.scss';

import { useCurrentUser } from "context/CurrentUserProvider";

const View: FC = () => {
    const { currentUser } = useCurrentUser();
    
    if (!currentUser) return;

    return (
        <div className={ classes.view }>
            <div className={ classes.view__container }>
                <div className={ classes.view__header }>
                    <h1 className={ classes.view__heading }>Welcome, { currentUser.firstName }!</h1>
                </div>
                <div className={ classes.view__content }>
                    <div className={ classes.view__details }>
                        <h1 className={ classes.view__heading }>Transform Your Real Estate Workflow</h1>
                        <p className={ classes.view__text }>Leverage Powerful Search Algorithms to Find and Save the Perfect Listings</p>
                    </div>
                    <div className={ classes.view__box }>
                        <img src="/images/building.png" alt="Building" />
                        <p className={ classes.view__counter }>100+</p>
                        <p className={ classes.view__note }>Listings</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(View);