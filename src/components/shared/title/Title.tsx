import { type ReactNode, type FC } from "react";
import classes from './Title.module.scss';

const Title: FC<{children: ReactNode; image?: string}> = ({ children, image }) => {
    return (
        <div className={ classes.component }>
            { image && <img className={ classes.component__image } src={ `/images/${image}.png` } alt={ image } /> }
            <h1 className={ classes.component__title }>
                { children }
            </h1>
        </div>
    )
}

export default Title;