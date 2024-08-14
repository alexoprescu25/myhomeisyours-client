import { type FC , useState , useEffect, Fragment } from "react";
import classes from './Bookings.module.scss';

import { fetchGuests } from "service/guest.service";

import { Loader, Pagination, Table, TableHead, TableBody, ReactModal, Button } from "components/shared";
import { FilterDate } from "components/account";
import { GuestCard } from "components/property-details";
import { EnhancedGuestProps } from "types/shared";

import { deleteGuest } from "service/guest.service";

import { useAppDispatch } from "store/hooks";
import { toggleSnackbar } from "store/ui/ui-slice";

import { normalStyles } from "constant";

const Bookings: FC = () => {
    const dispatch = useAppDispatch();

    const [dateIsLoading, setDateIsLoading] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [selectedGuest, setSelectedGuest] = useState<EnhancedGuestProps | null>(null);
    const [deleteModalIsOpen, setDeleteModalStatus] = useState<boolean>(false);

    const [noGuests, setNoGuests] = useState<number | null>(null);
    const [guests, setGuests] = useState<any>(null);
    
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const getBookings = async (from?: string, to?: string) => {
        try {
            const response = await fetchGuests({
                skip: Number((currentPage - 1) * postsPerPage),
                limit: postsPerPage,
                from: from ? from : '',
                to: to ? to : ''
            });

            if (response && response.status === 200) {
                setGuests(response.data.guests);
                setNoGuests(response.data.number);
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }

    const handleFilterActivity = async (data: { from: string; to: string; }) => {
        await getBookings(data.from, data.to);
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
            const response = await deleteGuest(selectedGuest._id, selectedGuest.propertyId.name);

            if (response && response.status === 200) {
                await getBookings();
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

    const hasGuests = () => Boolean(guests && guests.length > 0);

    useEffect(() => {
        getBookings();
    }, [currentPage])

    if (isLoading) {
        return <Loader/>
    }

    return (
        <Fragment> 
            <ReactModal
                style={ normalStyles }
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

            <div className={ classes.bookings }>
                <div className={ classes.bookings__container }>
                    { guests && (
                        <div className={ classes.bookings__filter }>
                            <FilterDate onSubmitData={ handleFilterActivity } isLoading={ dateIsLoading } />
                        </div>
                    ) }
                    { hasGuests() ? (
                        <Fragment>
                            <div className={ classes.bookings__data }>
                                <Table title="Bookings">
                                    <TableHead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Phone</th>
                                            <th>Check In</th>
                                            <th>Check Out</th>
                                            <th>Added By</th>
                                            <th>Property</th>
                                            <th>Actions</th>
                                        </tr>
                                    </TableHead>
                                    <TableBody>
                                        { guests.map((item: EnhancedGuestProps) => (
                                            <GuestCard hasProperty={ true } guest={ item } key={ item._id.toString() } onDelete={ handleDeletePreview } />
                                        )) }
                                    </TableBody>
                                </Table>
                            </div>
                            <div className={ classes.bookings__pagination }>
                                <Pagination
                                    currentPage={ currentPage } 
                                    postsPerPage={ postsPerPage } 
                                    totalPosts={ noGuests ? noGuests : 1 } 
                                    paginate={ paginate } 
                                />
                            </div>
                        </Fragment>
                    ) : (
                        <div className={ classes.bookings__disclaimer }>
                            <h1>No Guests Yet!</h1>
                            <p>It looks like you don't have any bookings at the moment.</p>
                        </div>
                    )}
                </div>
            </div>
        </Fragment>
    )
}

export default Bookings;