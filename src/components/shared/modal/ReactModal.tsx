import { Fragment, type FC, type ReactNode } from "react";

import Modal from 'react-modal';
import { customStyles } from "constant";

import {
    CloseButton
} from 'components/shared';

Modal.setAppElement('#root');

type ModalProps = {
    isOpen: boolean;
    style?: object;
    onClose: () => void;
    children: ReactNode;
}

const ReactModal: FC<ModalProps> = ({ isOpen, onClose, children, style = customStyles }) => {
    return (
        <Modal
            isOpen={ isOpen }
            style={ style }
            overlayClassName="react-modal-overlay"
        >
            <CloseButton onClick={ () => onClose() } />
            <Fragment>
                { children }
            </Fragment>
        </Modal>
    )
}

export default ReactModal;