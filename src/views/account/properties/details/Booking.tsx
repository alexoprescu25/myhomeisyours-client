import { type FC, Fragment, useState, useEffect } from "react";
import classes from './Booking.module.scss';

import { GuestCard } from "components/property-details";
import { ReactModal, Button, Input, Loader, Table, TableHead, TableBody } from "components/shared";

import { useForm, SubmitHandler } from "react-hook-form";

import { GuestFormProps, EnhancedGuestProps } from "types/shared";

import { createGuest, fetchFutureGuests, fetchPastGuests, deleteGuest } from "service/guest.service";

import { useAppDispatch } from "store/hooks";
import { toggleSnackbar } from "store/ui/ui-slice";

const initialState = {
    name: '',
    phone: '',
    email: '',
    checkIn: '',
    checkOut: '',
    other: ''
}

const Booking: FC<{ propertyId: string; propertyName: string; }> = ({ propertyId, propertyName }) => {
    const [futureGuests, setFutureGuests] = useState<EnhancedGuestProps[] | null>(null);
    const [pastGuests, setPastGuests] = useState<EnhancedGuestProps[] | null>(null);
    const [selectedGuest, setSelectedGuest] = useState<EnhancedGuestProps | null>(null);
    const [deleteModalIsOpen, setDeleteModalStatus] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const { 
        register,
        handleSubmit, 
        formState: { errors } 
    } = useForm<GuestFormProps>({ defaultValues: initialState });

    const getGuests = async () => {
        try {
            const response = await fetchFutureGuests(propertyId);
            const pastGuestsResponse = await fetchPastGuests(propertyId);
            
            if (response && response.status === 200) {
                setFutureGuests(response.data.guests);
            }

            if (pastGuestsResponse && pastGuestsResponse.status === 200) {
                setPastGuests(pastGuestsResponse.data.guests);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const onSubmit: SubmitHandler<GuestFormProps> = async (data) => {
        setIsLoading(true);

        try {
            const response = await createGuest(data, propertyId, propertyName);

            if (response && response.status === 201) {
                await getGuests();
                setIsOpen(false);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleDeletePreview = (guest: EnhancedGuestProps) => {
        if (guest) setSelectedGuest(guest);
        setDeleteModalStatus(true);
    }

    const handleClose = () => {
        setSelectedGuest(null);
        setDeleteModalStatus(false);
    }

    const handleDelete = async () => {
        if (!selectedGuest) return;
        setIsLoading(true);

        try {
            const response = await deleteGuest(selectedGuest._id, propertyName);

            if (response && response.status === 200) {
                await getGuests();
                setDeleteModalStatus(false);

                dispatch(toggleSnackbar({
                    type: 'success',
                    text: response.data.message
                }))
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const hasFutureGuests = () => Boolean(futureGuests && futureGuests.length > 0);
    const hasPastGuests = () => Boolean(pastGuests && pastGuests.length > 0);

    useEffect(() => {
        getGuests();
    }, [])

    if (!futureGuests && !pastGuests) {
        return <Loader />
    }
    
    return (
        <Fragment>
            <ReactModal isOpen={ isOpen } onClose={ () => setIsOpen(false) }>
                <div className={ classes.booking__form }>
                    <form onSubmit={ handleSubmit(onSubmit) }>
                        <Input label="Guest Name" name="name" register={ register } rules={{ required: 'Guest name is required' }} errors={ errors } required={ true } />
                        <Input label="Guest Email" name="email" register={ register } rules={{ required: 'Guest email is required' }} errors={ errors } required={ true } />
                        <Input label="Guest Phone" name="phone" register={ register } rules={{ required: 'Guest phone is required' }} errors={ errors } required={ true } />
                        <Input label="Supplier" name="supplier" register={ register } />
                        <Input label="Unique Identifier" name="identifier" register={ register } />
                        <Input type="date" label="Check In" name="checkIn" register={ register } rules={{ required: 'Check in date is required' }} errors={ errors } required={ true } />
                        <Input type="date" label="Check Out" name="checkOut" register={ register } rules={{ required: 'Check out date is required' }} errors={ errors } required={ true } />
                        <Button type="submit" mode="main" isLoading={ isLoading }>Create Guest</Button>
                    </form>
                </div>
            </ReactModal>

            <ReactModal
                isOpen={ deleteModalIsOpen }
                onClose={ handleClose }
            >       
                <div className={ classes.delete }>
                    <div className={ classes.delete__container }>
                        <div className={ classes.delete__image }>
                            <img src="/images/exclamation.png" alt="Exclamation" />
                        </div>
                        <div className={ classes.delete__content }>
                            <p className={ classes.delete__heading }>Delete Guest</p>
                            <p className={ classes.delete__text }>Are you sure you want to delete guest { selectedGuest && selectedGuest.name } </p>
                        </div>
                        <div className={ classes.delete__actions }>
                            <Button mode="slate-grey" onClick={ handleClose }>Cancel</Button>
                            <Button mode="danger" onClick={ handleDelete } isLoading={ isLoading }>Delete</Button>
                        </div>
                    </div>
                </div>
            </ReactModal>

            <div className={ classes.booking }>
                <div className={ classes.booking__container }>
                    { hasFutureGuests() ? (
                        <div className={ classes.booking__data }>
                            <Table title="Future Guests" onClick={ () => setIsOpen(true) }>
                                <TableHead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Phone</th>
                                        <th>Check In</th>
                                        <th>Check Out</th>
                                        <th>Added By</th>
                                        <th>Actions</th>
                                    </tr>
                                </TableHead>
                                <TableBody>
                                    { futureGuests && futureGuests.map((item: EnhancedGuestProps) => (
                                        <GuestCard guest={ item } key={ item._id.toString() } onDelete={ handleDeletePreview } />
                                    )) }
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        <div className={ classes.booking__disclaimer }>
                            <h1>No Guests Yet!</h1>
                            <p>It looks like you don't have any bookings for your property at the moment.</p>
                            <p>If someone makes a reservation, please add their information by clicking the "Create" button below.</p>
                            <Button mode="main" onClick={ () => setIsOpen(true) }>Create</Button>
                        </div>
                    ) }

                    { hasPastGuests() && (
                        <div className={ classes.booking__data }>
                            <Table title="Past Guests">
                                <TableHead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Phone</th>
                                        <th>Check In</th>
                                        <th>Check Out</th>
                                        <th>Added By</th>
                                        <th>Actions</th>
                                    </tr>
                                </TableHead>
                                <TableBody>
                                    { pastGuests && pastGuests.map((item: EnhancedGuestProps) => (
                                        <GuestCard guest={ item } key={ item._id.toString() } onDelete={ handleDeletePreview } />
                                    )) }
                                </TableBody>
                            </Table>
                        </div>
                    ) }
                </div>
            </div>
        </Fragment>
    )
}

export default Booking;