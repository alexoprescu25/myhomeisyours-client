import { type FC } from "react";
import classes from './AddressCard.module.scss';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

type AddressCardProps = {
    address: any;
    isActive?: boolean;
    onSelect: (address: any) => void;
}

const AddressCard: FC<AddressCardProps> = ({ address, isActive, onSelect }) => {
   const parseClassName = () => {
    if (!address.matchConfidence.score) return;

    const percentage = Number((address.matchConfidence.score * 100).toFixed(0));

    if (!percentage) return;

    if (percentage >= 0 && percentage <= 25) {
        return 'danger';
    } else if (percentage > 25 && percentage <= 50) {
        return 'warning';
    } else if (percentage > 50 && percentage <= 75) {
        return 'info'
    } else if (percentage > 75) {
        return 'success';
    }

   }  

    return (
        <div onClick={ () => { onSelect(address); } } className={ classNames(classes.address, { [classes['address--active']]: isActive }) }>
            <div className={ classes.address__container }>
                <div className={ classes.address__string }>
                    <div className={ classes.address__address }>
                        <FontAwesomeIcon icon={ faLocationDot } />
                        <p> { address.address.freeformAddress } </p>
                    </div>
                    <p className={ classes.address__confidence }> 
                        Match Confidence: <span className={ classes[`address__percentage--${parseClassName()}`] }> { (address.matchConfidence.score * 100).toFixed(2) }% </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AddressCard;