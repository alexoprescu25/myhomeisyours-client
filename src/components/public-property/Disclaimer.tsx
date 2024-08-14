import { type FC } from "react";
import classes from './Disclaimer.module.scss';

import Lottie from 'lottie-react';
import notAvailable from '../../assets/animations/notAvailable.json';

const Disclaimer: FC = () => {
    return (
        <div className={ classes.property }>
            <div className={ classes.property__container }>
                <div className={ classes.property__animation }>
                    <Lottie 
                        animationData={ notAvailable }
                        loop={ true }
                    />
                </div>
                <h1 className={ classes.property__heading }>
                    This Property is No Longer Available
                </h1>
                <p className={ classes.property__text }>
                    Thank you for your interest in our property. Unfortunately, this property is no longer available. Please explore our other listings or contact us for assistance in finding your perfect home.
                </p>
            </div>
        </div>
    )
}

export default Disclaimer;