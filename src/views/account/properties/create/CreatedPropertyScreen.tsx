import { type FC } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import classes from './CreatedPropertyScreen.module.scss';

import Lottie from 'lottie-react';
import completed from '../../../../assets/animations/completed.json';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faCity, faSignHanging } from "@fortawesome/free-solid-svg-icons";

const CreatedPropertyScreen: FC<{ property: any; onChangeStep: () => void; }> = ({ property, onChangeStep }) => {
    if (!property) {
        return <Navigate to='/dashboard/properties/create' />
    }
    
    return (
        <div className={ classes.property }>
            <div className={ classes.property__container }>
                <div className={ classes.property__animation }>
                    <Lottie 
                        animationData={ completed }
                        loop={ true }
                    />
                </div>
                <h1 className={ classes.property__heading }>Your property has been successfully created and is now live on our platform! 🎉</h1>
                <div className={ classes.property__info }>
                    { (property.images && property.images.length > 0) ? (
                        <div className={ classes.property__image }>
                            <img src={ property.images[0].url } alt={ property.images[0].name } />
                        </div>
                    ) : (
                        <div className={ classes.property__image }>
                            <img src='/images/random-house.jpg' alt='Real Estate' />
                        </div>
                    ) }
                    <div className={ classes.property__details }>
                        <h2> { property.name } </h2>
                        <p>Address: { property.address.freeFormAddress } </p>
                        <p>Listing ID: { property._id.toString() } </p>
                        <p>Description: [Brief Description of the Property]</p>
                    </div>
                </div>
                <div className={ classes.property__actions }>
                    <Link to={ `/dashboard/properties/list/${property._id.toString()}` }>
                        <FontAwesomeIcon icon={ faEye } />
                        View Property
                    </Link>
                    <Link to='/dashboard/properties/create' onClick={ onChangeStep }>
                        <FontAwesomeIcon icon={ faSignHanging } />
                        Create Another Property
                    </Link>
                    <Link to="/dashboard/properties/list">
                        <FontAwesomeIcon icon={ faCity } />
                        Listings
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CreatedPropertyScreen;