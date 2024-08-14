import { type FC } from "react";
import classes from './Spinner.module.scss';

const Spinner: FC = () => {
    return <span className={ classes.loader }></span>
}

export default Spinner;