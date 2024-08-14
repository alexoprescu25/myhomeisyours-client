import { type FC } from "react";
import classes from './Snackbar.module.scss';

import classNames from "classnames";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faXmark } from "@fortawesome/free-solid-svg-icons";

import { useAppSelector } from "store/hooks"
import { useAppDispatch } from "store/hooks";
import { toggleSnackbar } from "store/ui/ui-slice";

const Snackbar: FC = () => {
    const snackbar = useAppSelector(state => state.ui.snackbar);
    const className = classNames(classes.snackbar, classes[`snackbar--${snackbar.type}`]);

    const dispatch = useAppDispatch();

    const closeSnackbar = () => {
        dispatch(toggleSnackbar({ text: null, type: null }))
    }

    if (!snackbar.text || ! snackbar.type) {
        return;
    }

    return (
        <div className={ className }>
            <div className={ classes.snackbar__container }>
                <div className={ classes.snackbar__icon }>
                    <FontAwesomeIcon icon={ faMessage } />
                </div>
                <p className={ classes.snackbar__text }> { snackbar.text } </p>
                <button className={ classes.snackbar__button }>
                    <FontAwesomeIcon icon={ faXmark } onClick={ closeSnackbar } />
                </button>
            </div>
        </div>  
    )
}

export default Snackbar;