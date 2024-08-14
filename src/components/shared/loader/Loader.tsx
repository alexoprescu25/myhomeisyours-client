import { type FC } from "react";
import classes from './Loader.module.scss';

const Loader: FC = () => {
    return (
        <div className={ classes['cw-loading-wrap'] }>
            <div className={ classes['cw-loading'] }>
                <div></div>
            </div>
            <p className={ classes['cw-loading-text'] }>Loading...</p>
        </div>
    )
}

export default Loader;