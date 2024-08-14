import { Fragment } from 'react';
import { Outlet, Navigate } from "react-router-dom";

import { useAuthContext } from 'context/AuthContext';
import { CurrentUserProvider } from 'context/CurrentUserProvider';

import { MyAccountNavigation, MyAccountTopNav } from 'views/shared';

import { Wrapper } from 'components/shared';

const PrivateRoute = () => {
    const { token } = useAuthContext();
    
    let tk = token;
    if (!tk) {
        tk = localStorage.getItem('token');
    }

    return (
        <Fragment> 
            { tk ? (
                <CurrentUserProvider>
                    {/* <MyAccountTopNav /> */}
                    <MyAccountNavigation />
                    <Wrapper>
                        <Outlet />
                    </Wrapper>
                </CurrentUserProvider>
            ): <Navigate to='/' /> }
        </Fragment>
    )
}

export default PrivateRoute;