import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, type FC } from "react";
import { Link } from "react-router-dom";
import classes from './General.module.scss';

import { Title } from "components/shared";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faLink, faCopyright } from "@fortawesome/free-solid-svg-icons";

import parse from 'html-react-parser';

import { categories } from "constant";
import { lArray } from "utils";

type GeneralProps = {
    property: any;
}

const General: FC<GeneralProps> = ({ property }) => {
    const hasImages = () => Boolean(property.images && property.images.length > 0);
    const hasSellingPoints = () => Boolean(property.sellingPoints && property.sellingPoints.length > 0);
    const hasFloorplan = () => Boolean(
        property.floorplan &&
        property.floorplan.hasOwnProperty('url') &&
        property.floorplan.url !== ''
    )

    return (
        <div className={ classes.property__container }>
            <div className={classes['property__container--left']}>
                { hasImages() ? (
                    <div className={ classes.property__gallery }>
                        <img src={ property.images[0].url } alt={ property.images[0].name } />
                        <div className={ classes.property__showImages }>
                        </div>
                    </div>
                ) : (
                    <div className={ classes.property__gallery }>
                        <img src="/images/random-house.jpg" alt="Random House" />
                    </div>
                ) }

                <div className={classes.property__underImageInformation}>
                    <p className={classes['property__underImageInformation--item']}>Bedrooms <span>{property.numberOfBedrooms}</span></p>
                    <p className={classes['property__underImageInformation--item']}>Beds <span>{property.numberOfBeds}</span></p>
                    <p className={classes['property__underImageInformation--item']}>Bathrooms <span>{property.numberOfBathrooms}</span></p>
                    <p className={classes['property__underImageInformation--item']}>Photos <span>{property.images.length}</span></p>
                    <p className={classes['property__underImageInformation--item']}>Video <span>{property.videos.length}</span></p>
                    <p className={classes['property__underImageInformation--item']}>Floorplan <span>{hasFloorplan() ? 1 : 0}</span></p>
                </div>
                <div className={ classes.property__description }>
                    <Title>Description</Title>
                    { parse(property.description) }
                </div>
                { hasSellingPoints() && (
                    <div>
                        <Title>Selling points</Title>
                        { property.sellingPoints.map((sellingPoint: { text: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; _id: string; }) => (
                            <p key={ sellingPoint._id.toString() }>- { sellingPoint.text }</p>
                        ))}
                    </div>
                ) }
                
                <div className={ classes.property__amenities }>
                    { categories.map((item: { name: string; value: string; }) => (
                        <div className={ classes.property__summary }>
                            <div className={ classes.property__title }>
                                <Title> { item.name } </Title>
                            </div>
                            <div className={ classes.property__items }>
                                { lArray(property.summary[item.value]).map((item: any) => (
                                    item.isAvailable && (
                                        <div className={ classes.property__item } key={ item.value }>
                                            <img src={ `/images/icons/${item.value}.png` } alt={ item.name } loading="lazy" />
                                            <p> { item.name } </p>
                                        </div>
                                    )
                                )) }
                            </div>
                        </div>
                    )) }
                </div>
                
            </div>
            <div className={classes['property__container--right']}>
                <div className={classes.property__externalbuttons}>
                    <Link to={ `/public/property/${property._id.toString()}` } target="_blank">
                        <FontAwesomeIcon icon={ faStar }/> 
                        <span>Live Link</span>
                    </Link>
                    <Link to={ `/public/property/${property._id.toString()}?branded=true` } target="_blank">
                        <FontAwesomeIcon icon={ faCopyright }/>
                        <span>Live Branded Link</span>
                    </Link>
                    {property.livePropertyLink ? (
                        <a href="#" onClick={() => window.open(property.livePropertyLink)}>
                            <FontAwesomeIcon icon={ faLink }/> 
                            External Link
                        </a>
                    ) : (
                        <a href="#" className={ classes.inactive }>
                            <FontAwesomeIcon icon={ faLink }/> 
                            External Link
                        </a>
                    ) }
                </div>

                <div className={ classes.property__infocards }>
                    <p className={classes['property__infocards--title']}>Property address</p>
                    <span>Number: <p className={classes['property__infocards--item']}>&nbsp;{property.address.number}</p></span>
                    <span>Street: <p className={classes['property__infocards--itemUpperCase']}>&nbsp;{property.address.street}</p></span>
                    <span>City: <p className={classes['property__infocards--itemUpperCase']}>&nbsp;{property.address.city}</p></span>
                    <span>Postcode: <p className={classes['property__infocards--postcode']}>&nbsp;{property.address.zip}</p></span>
                </div>
                <div className={ classes.property__infocards }>
                    <p className={classes['property__infocards--title']}>Quote Out Costs</p>
                    <span>Nightly Rate: <p className={classes['property__infocards--item']}>&nbsp;{property.landlord.nightlyRate ? '£'+property.landlord.nightlyRate : 'N/A' }</p></span>
                    <span>Deposit: <p className={classes['property__infocards--item']}>&nbsp;{property.landlord.deposit ? '£'+property.landlord.deposit : 'N/A' }</p></span>
                    <span>Cleaning Fee: <p className={classes['property__infocards--item']}>&nbsp;{property.landlord.cleaningFee ? '£'+property.landlord.cleaningFee : 'N/A' }</p></span>
                    <span>Parking: <p className={classes['property__infocards--item']}>&nbsp;{property.landlord.parking ? '£'+property.landlord.parking : 'N/A' }</p></span>
                    <span>Pet Fee: <p className={classes['property__infocards--item']}>&nbsp;{property.landlord.petFee ? '£'+property.landlord.petFee : 'N/A' }</p></span>
                </div>
                <div className={ classes.property__infocards }>
                    <p className={classes['property__infocards--title']}>Landlord contact</p>
                    <span>Name: <p className={classes['property__infocards--item']}>&nbsp;{ property.landlord.name ? property.landlord.name : 'N/A' }</p></span>
                    <span>Phone: <p className={classes['property__infocards--item']}>&nbsp;{ property.landlord.email ? property.landlord.email : 'N/A' }</p></span>
                    <span>Email: <p className={classes['property__infocards--item']}>&nbsp;{ property.landlord.phone ? property.landlord.phone : 'N/A' }</p></span>
                </div>
            </div>
        </div>
    )
} 

export default General;