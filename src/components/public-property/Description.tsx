import { type FC } from "react";
import classes from './Description.module.scss';

import { ReactModal } from "components/shared";

import parse from 'html-react-parser';

type DescriptionProps = {
    isOpen: boolean;
    onClose: () => void;
    description: string;
}

const Description: FC<DescriptionProps> = ({ isOpen, onClose, description }) => {
    return (
        <ReactModal
            isOpen={ isOpen }
            onClose={ () => onClose() }
        >   
            <div className={ classes.description }>
                <div className={ classes.description__container }>
                    { parse(description) }
                </div>
            </div>
        </ReactModal>
    )
} 

export default Description;