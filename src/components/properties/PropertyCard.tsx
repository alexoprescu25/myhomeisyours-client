import { type FC } from "react"
import { Link } from "react-router-dom";
import classes from './PropertyCard.module.scss';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faGlobe } from "@fortawesome/free-solid-svg-icons";

import { propertyConfig } from "constant";

const PropertyCard: FC<{ item: any }> = ({ item }) => {
    const parsePropertyLinkType = () => {
        if (!item.livePropertyLink) return;

        if (item.livePropertyLink.includes('airbnb')) {
            return 'airbnb';
        } else if (item.livePropertyLink.includes('booking')) {
            return 'booking';
        } else {
            return 'chain';
        }
    }
    
    return (
        <div className={classes.property}>
            <div className={classes.property__image}>
                {(item.images && item.images.length > 0) ? (
                    <img src={item.images[0].url} alt={item.images[0].name} key={item.images[0]._id} loading="lazy" />
                ) : (
                    <img src="/images/random-house.jpg" loading="lazy" alt="" />
                )}
                
            </div>
            <div className={classes.property__details}>
                
                <div className={classes.property__status}>
                    <div className={ classes.property__title }>
                        <Link to={ `/dashboard/properties/list/${item._id.toString()}` }>{item.name}</Link>
                    </div>
                    {(item.isActive ? <p className={classes['property__status--active']}>Active</p> : <p className={classes['property__status--inactive']}>Inactive</p> )}
                </div>
                <div className={ classes.property__public }>
                </div>
                <div className={classes.property__address}>
                    <p className={classes['property__address--freeForm']}> <FontAwesomeIcon icon={faLocationDot}/> {item.address.freeFormAddress}</p>
                    <p className={classes['property__address--propertyType']}> 
                        { propertyConfig.propertyType[item.type] && <FontAwesomeIcon icon={ propertyConfig.propertyType[item.type].icon } />}
                        { propertyConfig.propertyType[item.type] && propertyConfig.propertyType[item.type].name } 
                    </p>
                </div>
                <div className={classes.property__summary}>
                    <div className={classes['property__summary--item']}>
                        <p className={classes['property__summary--itemBold']}>{item.numberOfBedrooms}</p>
                        <p className={classes['property__summary--itemLight']}>Bedrooms</p>
                    </div>
                    <div className={classes['property__summary--item']}>
                        <p className={classes['property__summary--itemBold']}>{item.numberOfBeds}</p>
                        <p className={classes['property__summary--itemLight']}>Beds</p>
                    </div>
                    <div className={classes['property__summary--item']}>
                        <p className={classes['property__summary--itemBold']}>{item.numberOfBathrooms}</p>
                        <p className={classes['property__summary--itemLight']}>Bathrooms</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PropertyCard;