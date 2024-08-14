import { type FC, useState, useEffect, Fragment } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import classes from './Property.module.scss';

import { Header } from "views/shared";
import { Loader, Title } from "components/shared";
import { Amenities, Description, Disclaimer, Gallery, Map } from "components/public-property";

import { fetchProperty } from "service/public.service";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faCheck } from "@fortawesome/free-solid-svg-icons";

import DOMPurify from 'dompurify';
import parse from 'html-react-parser';

import { categories } from "constant";

import { lArray } from "utils";
import classNames from "classnames";

enum BedTypes {
    Single = 'single',
    Double = 'double',
    King = 'king',
    Sofa = 'sofa',
    Cots = 'cots',
    Twins = 'twins',
}

const bedConfiguration = {
    single: { name: 'Single', value: 'single', type: 'bed' },
    double: { name: 'Double', value: 'double', type: 'bed' },
    king: { name: 'King', value: 'king', type: 'bed' },
    sofa: { name: 'Sofa Bed', value: 'sofa', type: 'sofa' },
    cots: { name: 'Cots', value: 'cots', type: 'cots' },
    twins: { name: 'Twins Single', value: 'twins', type: 'bed' }
}

const googleMapApiKey = process.env.REACT_APP_GOOGLE_MAPS;

const Property: FC = () => {
    const [defaultTab, setDefaultTab] = useState<number>(0);
    const [showAll, setShowAll] = useState<boolean>(false);
    const [property, setProperty] = useState<any>(null);

    const [descriptionIsOpen, setDescription] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [searchParams] = useSearchParams();
    const branded = searchParams.get('branded');

    const { propertyId } = useParams();

    const fetchPropertyById = async () => {
        if (!propertyId) return;

        try {
            const response = await fetchProperty(propertyId);

            if (response && response.status === 200) {
                setProperty({
                    ...response.data.property,
                    description: DOMPurify.sanitize(response.data.property.description)
                });
            }
        } catch (error) {
            console.error(error);
        }
    }

    const hasImages = () => property.images && property.images.length > 0;
    const hasSellingPoints = () => property.sellingPoints && property.sellingPoints.length > 0; 
    const isAvailable = () => Boolean(
        property.isActive &&
        !property.isDeleted
    )

    const numberOfAmenities = () => categories
        .flatMap(item => lArray(property.summary[item.value]))
        .filter((asset: any) => asset.isAvailable)
        .length; 

    const displayAddress = () => {
        return [
            property.address.street,
            property.address.city,
            property.address.zip
        ].join(", ");
    }

    const hasFloorplan = () => Boolean(
        property.floorplan &&
        property.floorplan.hasOwnProperty('url') &&
        property.floorplan.url !== ''
    )

    const hasVideos = () => Boolean(
        property.videos &&
        property.videos.length > 0
    )

    const handleShowAll = (defaultTab: number) => {
        setDefaultTab(defaultTab);
        setShowAll(true);
    }

    const hasLivingRooms = () => Boolean(
        property.livingRooms &&
        property.livingRooms.length > 0
    )

    const hasBedrooms = () => Boolean(
        property.bedrooms &&
        property.bedrooms.length > 0
    )

    useEffect(() => {
        fetchPropertyById();
    }, [])

    if (!property) {
        return <Loader />
    }

    if (!isAvailable()) {
        return <Disclaimer />
    }
    
    if (showAll) {
        return (
            <Gallery 
                defaultTab={ defaultTab } 
                images={ property.images } 
                floorplan={ {...property.floorplan, _id: property.floorplan.key} } 
                videos={ property.videos } 
                onBack={ () => { setShowAll(false); setDefaultTab(0); } } 
            />
        )
    }

    return (
        <Fragment>
            <Amenities isOpen={ isOpen } onClose={ () => { setIsOpen(false) } } summary={ property.summary } />
            <Description isOpen={ descriptionIsOpen } onClose={ () => setDescription(false) } description={ property.description } />

            <div className={ classNames(classes.property, { [classes['property--branded']]: branded }) }>
                { branded && <Header /> }
                <div className={ classes.property__container }>
                    <div className={ classes.property__content }>
                        <div className={ classes.property__header }>
                            <h1 className={ classes.property__heading }> { property.name } </h1>
                            <p className={ classes.property__address }>
                                <FontAwesomeIcon icon={ faLocationDot } />
                                <span> { displayAddress() } </span>
                            </p>
                            <div className={ classes.property__general }>
                                <div className={ classes.property__count }>
                                    <img src="/images/icons/bedroom.png" alt="Bedroom" loading="lazy" />
                                    <div>
                                        <p> { property.numberOfBedrooms } </p>
                                        <p>Bedrooms</p>
                                    </div>
                                </div>
                                <div className={ classes.property__count }>
                                    <img src="/images/icons/bathroom.png" alt="Bathroom" loading="lazy" />
                                    <div>
                                        <p> { property.numberOfBathrooms } </p>
                                        <p>Bathrooms</p>
                                    </div>
                                </div>
                                <div className={ classes.property__count }>
                                    <img src="/images/icons/double-bed.png" alt="Bed" loading="lazy" />
                                    <div>
                                        <p> { property.numberOfBeds } </p>
                                        <p>Beds</p>     
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={ classes.property__main }>
                            <div className={ classes.property__description }>
                                <div className={ classNames(classes.property__html, { [classes['property__html--long']]: property.description.length > 400 }) }>
                                    { parse(property.description) }
                                </div>
                                { property.description.length > 400 && (
                                    <div className={ classes.property__actions }>
                                        <button className={ classes.property__btn } onClick={ () => setDescription(true) }>Read More</button>
                                    </div>
                                ) }
                            </div>
                            <div className={ classes.property__summary }>
                                <div className={ classes.property__title }>
                                    <Title>Summary</Title>
                                </div>
                                <div className={ classes.property__items }>
                                    { lArray(property.summary.general).map((item: any) => (
                                        item.isAvailable && (
                                            <div className={ classes.property__item } key={ item.value }>
                                                <img src={ `/images/icons/${item.value}.png` } alt={ item.name } loading="lazy" />
                                                <p> { item.name } </p>
                                            </div>
                                        )
                                    )) }
                                </div>
                                <div className={ classes.property__actions }>
                                    <button className={ classes.property__btn } onClick={ () => setIsOpen(true) }>Show all { numberOfAmenities() } amenities</button>
                                </div>
                            </div>
                            
                            { hasSellingPoints() && (
                                <div className={ classes.property__sellingPoints }>
                                    <div className={ classes.property__title }>
                                        <Title>Included Benefits</Title>
                                    </div>
                                    <div className={ classes.property__benefits }>
                                        { property.sellingPoints.map((item: {text: string; _id: string;}) => (
                                            <div className={ classes.property__point } key={ item._id.toString() }>
                                                <FontAwesomeIcon icon={ faCheck } />
                                                <p> { item.text } </p>
                                            </div>
                                        )) }
                                    </div>
                                </div>
                            ) }

                            <div className={ classes.property__sleep }>
                                <div className={ classes.property__title }>
                                    <Title>Where you'll sleep</Title>
                                </div>
                                <div className={ classes.property__assets }>
                                    { hasLivingRooms() && property.livingRooms.map((item: any) => (
                                        <div className={ classes.asset } key={ item._id.toString() }>
                                            <div className={ classes.asset__container }>
                                                <p className={ classes.asset__type }>Living Room</p>
                                                <img src="/images/icons/living-room.png" alt="Living Room" />
                                                { item.beds.map((bed: { type: BedTypes; }) => (
                                                    <p className={ classes.asset__bed } key={ item.type }> 
                                                        { bedConfiguration[bed.type].type === 'bed' ? (
                                                            `1 ${bedConfiguration[bed.type].name} Bed`
                                                        ) : (
                                                            `1 ${bedConfiguration[bed.type].name}`
                                                        ) } 
                                                    </p>
                                                )) }
                                            </div>
                                        </div>
                                    )) }

                                    { hasBedrooms() && property.bedrooms.map((item: any) => (
                                        <div className={ classes.asset } key={ item._id.toString() }>
                                            <div className={ classes.asset__container }>
                                                <p className={ classes.asset__type }>Bedroom</p>
                                                <img src="/images/icons/bedroom-icon.png" alt="Living Room" />
                                                { item.beds.map((bed: { type: BedTypes; }) => (
                                                     <p className={ classes.asset__bed } key={ bed.type }> 
                                                        { bedConfiguration[bed.type].type === 'bed' ? (
                                                            `1 ${bedConfiguration[bed.type].name} Bed`
                                                        ) : (
                                                            `1 ${bedConfiguration[bed.type].name}`
                                                        ) } 
                                                    </p>
                                                )) }
                                            </div>
                                        </div>
                                    )) }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={ classes.property__gallery }>
                        { hasImages() ? (
                            <div className={ classes.property__images }>
                                <div className={ classes.property__image }>
                                    <img src={ property.images[0].url } alt={ property.images[0].name } />
                                    <div className={ classes.property__showAll }>
                                        <button className={ classes.property__btn } onClick={ () => handleShowAll(0) }>Show All</button>
                                        { hasFloorplan() && <button className={ classes.property__btn } onClick={ () => handleShowAll(1) }>Show Floorplan</button> }
                                        { hasVideos() && <button className={ classes.property__btn } onClick={ () => handleShowAll(2) }>Show Video</button> }
                                    </div>
                                </div>
                                { property.images.length > 2 && (
                                   <div className={ classes.property__secondaryGallery }>
                                        <div className={ classes.property__secondaryImage }>
                                            <img src={ property.images[1].url } alt={ property.images[1].name } />
                                        </div>
                                        <div className={ classes.property__secondaryImage }>
                                            <img src={ property.images[2].url } alt={ property.images[2].name } />
                                        </div>
                                   </div>
                                ) }
                            </div>
                        ) : (
                            <div className={ classes.property__image }>
                                <img src="/images/random-house.jpg" alt="My Home Is Yours" loading="lazy" />
                            </div>
                        ) }
                    </div>
                </div>
                <div className={ classes.property__map }>
                    <Map 
                        lat={ property.address.position.coordinates[1] } 
                        lon={ property.address.position.coordinates[0] } 
                        apiKey={ googleMapApiKey ? googleMapApiKey : '' }    
                    />
                </div>
            </div>
        </Fragment>
    )
}

export default Property;