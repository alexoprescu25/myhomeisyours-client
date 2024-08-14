import { type FC } from "react";
import { Link } from "react-router-dom";
import classes from './GuestCard.module.scss';

import { Acronim } from "components/shared";

import { formatDate } from "utils";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { EnhancedGuestProps } from "types/shared";

const GuestCard: FC<{ guest: EnhancedGuestProps; onDelete: (id: EnhancedGuestProps) => void; hasProperty?: boolean; }> = ({ guest, onDelete, hasProperty = false }) => {
    const hasPropertyDetails = () => Boolean(
        guest.propertyId &&
        guest.propertyId._id &&
        guest.propertyId.name
    )
    
    return (
        <tr>
            <td>
                <span className={ classes.guest__header }>
                    <Acronim name={ guest.name } />
                    <span className={ classes.guest__info }>
                        <p className={ classes.guest__name }> { guest.name } </p>
                        <a href={ `mailto:${guest.email}` } className={ classes.guest__email }> { guest.email } </a>
                    </span>
                </span>
            </td>
            <td>
                <a href={ `tel:${guest.phone}` } className={ classes.guest__phone }> { guest.phone } </a>
            </td>
            <td> { formatDate(guest.checkIn, 'LL') } </td>
            <td> { formatDate(guest.checkOut, 'LL') } </td>
            <td> { guest.createdBy.fullName } </td>
            { hasProperty && (
                <td>
                    { hasPropertyDetails() ? (
                        <Link className={ classes.guest__link } to={ `/dashboard/properties/list/${guest.propertyId._id.toString()}` }> { guest.propertyId.name } </Link>
                    ) : (
                        <p>N/A</p>
                    ) }
                </td>
            ) }
            <td>
                <button className={ classes.guest__delete } onClick={ () => onDelete(guest) }>
                    <FontAwesomeIcon icon={ faTrash } />
                </button>
            </td>
        </tr>
    )
}

export default GuestCard;