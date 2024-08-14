import { type FC, useState, useEffect, type FormEvent, lazy, Fragment, JSXElementConstructor, ReactElement, ReactNode, ReactPortal } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import classes from './Property.module.scss';
import classNames from "classnames";

import { Loader, Button, ReactModal } from "components/shared";
import { CreatePropertyFrom } from "components/form";
import { ActivityCard } from "components/property-details"; 

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import DOMPurify from 'dompurify';

import { ActivityType } from "types/shared";

import { config } from "../create/config";
import { formatDate, waitFor } from "utils";
import { normalStyles } from "constant";

import { 
    updateProperty, 
    deleteImage, 
    uploadImage, 
    updateImages, 
    uploadFloorplan, 
    changeFloorplan,
    updateFloorplan,
    deleteFloorplan,
    updateImagesOrder,
    fetchPropertyById,
    saveVideos,
    deleteProperty
} from "service/property.service";

import Toggle from 'react-toggle';
import "react-toggle/style.css";

import { useAppDispatch } from "store/hooks";
import { toggleSnackbar } from "store/ui/ui-slice";

import { items } from "utils/permissions";
import { hasPermission } from "utils/permissions";
import { useCurrentUser } from "context/CurrentUserProvider";

const General = lazy(() => import('components/property-details/General'));
const Gallery = lazy(() => import('components/property-details/Gallery'));
const Booking = lazy(() => import('./Booking'));

type Video = { name: string; url: string; type: string; _id?: string; };
type Image = { name: string; url: string; _id: string; thumbnail: boolean; id: number; };

const tabs = {
    general: { name: 'General', value: 'general' },
    edit: { name: 'Edit', value: 'edit' },
    gallery: { name: 'Gallery', value: 'gallery' },
    booking: { name: 'Bookings', value: 'booking' },
    activity: { name: 'Log', value: 'activity' },
    email: { name: 'Email', value: 'email' }
}

const Property: FC = () => {
    const [activeTab, setActiveTab] = useState('general');
    const [deleteModalIsOpen, setDeleteModalStatus] = useState<boolean>(false);
    const [propertyIsLoading, setPropertyIsLoading] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [property, setProperty] = useState<any>(null);
    
    const { currentUser } = useCurrentUser();
    const { propertyId } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleToggleChange = (e: FormEvent<HTMLInputElement>) => {
        const { id } = e.target as HTMLInputElement;

        setProperty((prevState: any) => {
            return {
                ...prevState,
                [id]: !prevState[id]
            }
        })
    }

    const getProperty = async () => {
        if (!propertyId) return;

        try {
            const response = await fetchPropertyById(propertyId);

            if (response && response.status === 200) {
                const cleanDescription = DOMPurify.sanitize(response.data.property.description);
                
                setProperty({
                    ...response.data.property,
                    description: cleanDescription 
                });
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleDeleteProperty = async () => {
        if (!propertyId) return;
        setPropertyIsLoading(true);

        try {
            const response = await deleteProperty(propertyId);

            if (response && response.status === 200) {
                dispatch(toggleSnackbar({ type: 'success', text: response.data.message }));
                navigate('/dashboard/properties/list');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setPropertyIsLoading(false);
        }
    }

    const handleEdit = async (formData: any) => {
        if (!propertyId) return;
        setIsLoading(true);

        try {
            const response = await updateProperty({
                ...formData,
                isActive: property.isActive
            }, propertyId);

            if (response && response.status === 200) {
                await getProperty();
                await waitFor(100);
                setActiveTab(tabs.general.value);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleDeleteImage = async (id: string) => {
        if (!propertyId) return;
        setPropertyIsLoading(true);
        
        try {
            const response = await deleteImage(propertyId, id);

            if (response && response.status === 200) {
                await getProperty()
            }
        } catch (error) {
            console.error(error);
        } finally {
            setPropertyIsLoading(false)
        }
    }

    const handleUpdateImagesOrder = async (images: Image[]) => {
        if (!propertyId) return;
        setPropertyIsLoading(true);

        try {
            const response = await updateImagesOrder(propertyId, images);

            if (response && response.status === 200) {
                await getProperty();
                setActiveTab(tabs.general.value);
            }
        } catch (error) { 
            console.error(error);
        } finally {
            setPropertyIsLoading(false);
        }
    }

    const handleSaveGallery = async (data: any) => {
        if (!data) return;
        setPropertyIsLoading(true);

        try {
            const formData = new FormData();
            let imageResponse;
    
            for (const item of data) {
                formData.append('images', item);
            }
    
            const response = await uploadImage(formData); 
            
            if (response && response.status === 200) {
                imageResponse =  await updateImages(property._id.toString(), response.data.images)
            
                if (imageResponse && imageResponse.status === 200) {
                    await getProperty();
                }
            }   
        } catch (error) {
            console.error(error);
        } finally {
            setPropertyIsLoading(false);
        }
    }

    const handleUpdateVideos = async (videos: Video[]) => {
        setPropertyIsLoading(true);

        try {   
            const response = await saveVideos(property._id.toString(), videos);

            if (response && response.status === 200) {
                await getProperty();
                
                dispatch(toggleSnackbar({
                    type: 'success',
                    text: response.data.message
                }))
            }
        } catch (err) { 
            console.error(err);
        } finally {
            setPropertyIsLoading(false);
        }
    }

    const handleDeleteFloorplan = async () => {
        setPropertyIsLoading(true);

        try {
            const response = await deleteFloorplan(property._id.toString());

            if (response && response.status === 200) {
                await getProperty();
            }
        } catch (error) {
            console.error(error);
        } finally {
            setPropertyIsLoading(false);
        }
    }

    const handleUpdateFloorplan = async (floorplan: File) => {
        setPropertyIsLoading(true);
        let floorplanResponse;
        
        const floorplanData = new FormData();
        floorplanData.append('image', floorplan);

        try {
            const uploadResponse = await uploadFloorplan(floorplanData);

            if (uploadResponse && uploadResponse.status === 200) {
                const configObject = {
                    key: uploadResponse.data.key,
                    name: uploadResponse.data.name,
                    url: uploadResponse.data.url
                }
                
                if (property.floorplan && property.floorplan.url) {
                    floorplanResponse = await changeFloorplan(property._id.toString(), configObject);
                } else {
                    floorplanResponse = await updateFloorplan(property._id.toString(), configObject);
                }

                if (floorplanResponse && floorplanResponse.status === 200) {
                    await getProperty();
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            setPropertyIsLoading(false);
        }
    }

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        getProperty();
    }, []);

    if (!property || propertyIsLoading || !currentUser) {
        return <Loader />
    }

    return (
        <Fragment>
            <ReactModal
                style={ normalStyles }
                isOpen={ deleteModalIsOpen }
                onClose={ () => setDeleteModalStatus(false) }
            >       
                <div className={ classes.delete }>
                    <div className={ classes.delete__container }>
                        <div className={ classes.delete__image }>
                            <img src="/images/exclamation.png" alt="Exclamation" />
                        </div>
                        <div className={ classes.delete__content }>
                            <p className={ classes.delete__heading }>Delete Property</p>
                            <p className={ classes.delete__text }>Are you sure you want to delete property { property.name }? </p>
                        </div>
                        <div className={ classes.delete__actions }>
                            <Button mode="slate-grey" onClick={ () => setDeleteModalStatus(false) }>Cancel</Button>
                            <Button mode="danger" onClick={ handleDeleteProperty } isLoading={ isLoading }>Delete</Button>
                        </div>
                    </div>
                </div>
            </ReactModal>

            <div className={ classes.property }>
                <div className={ classes.breadcrumbs }>
                    <Link to="/dashboard/properties/list" className={ classes.breadcrumbs__link }>Listings</Link>
                    <p className={ classes.breadcrumbs__bar }>&gt;</p>
                    <p className={ classes.breadcrumbs__current }> { property._id } </p>
                </div>
                <div className={classes.property__header}>
                    <div className={classes['property__header--title']}>
                        <h1 className={ classes.property__heading }> { property.name } </h1>
                    </div>
                    <div className={classes['property__header--lastUpdated']}>
                        <p>Created: {formatDate(property.createdAt, 'LL')}</p>
                        { (property.updatedBy && property.updatedBy.length > 0) && (
                            <p>Last updated: { formatDate(property.updatedAt, 'LL') } - { formatDate(property.updatedAt, 'LT') } by { property.updatedBy[0].name } </p>
                        ) }
                    </div>
                </div>
                <div className={classes.property__actionsbar}>
                    <div className={classes['property__actionsbar--buttonsContainer']}>
                        { Object.values(tabs).map((item: {name: string; value: string}, index: number) => (
                            <div 
                                key={ index }
                                className={ classNames(classes.property__item, { [classes['active']]: activeTab === item.value }) } 
                                onClick={() => handleTabClick(item.value)}
                            >
                                    <p> { item.name } </p>
                            </div>
                        )) }
                    </div>
                    <div className={classes['property__actionsbar--buttonsContainer']}>
                        <Link to="/dashboard/properties/list" className={ classes.property__item }>
                            <FontAwesomeIcon icon={ faArrowLeft }/> 
                            Back
                        </Link>
                        { hasPermission(currentUser.role, items.actions.DELETE_PROPERTY) && (
                            <button className={ classNames(classes.property__item, classes['property__item--delete']) } onClick={ () => setDeleteModalStatus(true) }>Delete Property</button>
                        ) }
                    </div>
                    
                </div>
                <div>
                    {/* ------------------------------ general component ------------------------ */}

                    { activeTab === tabs.general.value && <General property={ property } /> }

                    {/* ------------------------------ edit component ------------------------ */}
                    
                    { activeTab === tabs.edit.value && (
                        <div className={ classes.property__edit }>
                            <div className={ classes.property__reminder }>
                                <p>Reminder: Save Your Changes!</p>
                                <p>If you've made any changes, please hit the <strong>Edit Property</strong> button at the bottom of the page before you leave to ensure your updates are applied. Thank you!</p>
                            </div>
                            <div className={ classes.property__availability }>
                                <div className={ classes.property__toggle }>
                                    <Toggle 
                                        onChange={ handleToggleChange }
                                        name="isActive"
                                        id="isActive"
                                        aria-label="Active"
                                        checked={ property.isActive }
                                    />
                                    <p>Active</p>
                                </div>
                            </div>
                            <CreatePropertyFrom 
                                isLoading={ isLoading } 
                                config={ config } 
                                edit={ true } 
                                initialState={ property } 
                                onSubmitData={ handleEdit }  
                            />
                        </div>
                    ) }

                    { activeTab === tabs.gallery.value && (
                        <Gallery 
                            videos={ property.videos }
                            onUpdateVideos={ handleUpdateVideos }
                            floorplan={ property.floorplan }
                            onSaveFloorplan={ handleUpdateFloorplan }
                            onSaveGallery={ handleSaveGallery }
                            onDeleteFloorplan={ handleDeleteFloorplan }
                            onUpdateOrder={ handleUpdateImagesOrder }
                            gallery={ property.images } 
                            onDelete={ handleDeleteImage }    
                        />
                    ) }

                    { activeTab === tabs.booking.value && (
                        <Booking propertyId={ property._id.toString() } propertyName={ property.name } />
                    ) }

                    { activeTab === tabs.activity.value && (
                        (property.updatedBy && property.updatedBy.length > 0) && (
                            <div className={ classes.property__activity }>
                                { property.updatedBy.map((item: ActivityType) => (
                                    <ActivityCard activity={ item } key={ item._id.toString() } />
                                )) }
                            </div>
                        )
                    ) }

                    { activeTab === tabs.email.value && (
                        <div>
                            <p>Template:</p>
                            <p>{property.address.street}, {property.address.city}, {property.address.zip}</p>
                            <p>{property.numberOfBedrooms} Bedrooms, {property.numberOfBathrooms} Bathrooms</p>
                            <p>Parking: {property.parkingType.value}</p>
                            <p>Pets: {property.petsPolicy.value}</p>
                            <p>Outside space: {property.summary.outside.garden.isAvailable ? 'garden' : ''} {property.summary.outside.balcony.isAvailable ? ', balcony' : ''} {property.summary.outside.patio.isAvailable ? ', patio' : ''}</p>
                            <p>Property link: --------------------------------------------------------------</p>
                            <p>Night Rate: £{property.external.nightlyRate}</p>
                            <p>Exit clean: -------------------------------------------------- to be confirmed</p>
                            <p>Pet fee: £{property.landlord.petFee}</p>
                            <p>Parking fee: £{property.external.parking}</p>
                            <p>Deposit: £{property.external.deposit}</p>
                            <p>VAT – 20% for first 28 days, 4% thereafter</p>
                            <p>Cancellation policy prior to check in and in house: {property.cancellation}</p>
                            <p>Bed configuration: {property.bedrooms.map((bedroom: {name: string; beds: any}) => (
                                <p>{bedroom.name}: {bedroom.beds.map((bed: {type: string}) => (
                                    <span> { bed.type } </span>
                                ))}</p>
                            ))}</p>
                            {property.floor ? <p>Lift access: {property.summary.general.elevator.isAvailable ? 'yes;' : 'no;'} Floor: {property.floor}</p> : 'no'}
                            <p>Housekeeping: {property.housekeeping.value}</p>
                            <p>Laundry Facilities: 
                                {property.summary.laundry.washingMachine.isAvailable ? ' Washing Machine' : ''}
                                {property.summary.laundry.clothesHorse.isAvailable ? ', Clother Horse' : ''}
                                {property.summary.laundry.iron.isAvailable ? ', Iron' : ''}
                                {property.summary.laundry.tumbleDryer.isAvailable ? ', Tumble Dryer' : ''}
                            </p>
                            <p>Check in process: {property.checkInProcess.value}</p>
                            <p>Additional charges: ------------------------------------------ to be confirmed</p>
                        </div>
                    ) }
                
                </div>
            </div>
        </Fragment>
    )
}

export default Property;