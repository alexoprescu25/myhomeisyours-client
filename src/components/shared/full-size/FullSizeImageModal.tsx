import { Fragment, type FC, type ReactNode } from "react";
import classes from './FullSizeImageModal.module.scss';

import Modal from 'react-modal';

export const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      zIndex: '9',
      padding: 0
    },
};

Modal.setAppElement('#root');

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const FullSizeImageModal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
    return (
        <Fragment>
            { isOpen && (
                <button onClick={ () => onClose() } className={ classes.close }>
                    &#10005;
                </button>
            ) }
            <Modal
                isOpen={ isOpen }
                style={ customStyles }
                overlayClassName="react-modal-image-overlay"
            >
                <Fragment>
                    { children }
                </Fragment>
            </Modal>
        </Fragment>
    )
}

export default FullSizeImageModal;