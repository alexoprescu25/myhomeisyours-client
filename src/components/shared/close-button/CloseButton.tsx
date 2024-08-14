import { type FC, type CSSProperties } from 'react';
import classes from './CloseButton.module.scss';

export type CloseButtonType = {
    top?: number;
    right?: number;
    onClick?: () => void;
    href?: string;
    light?: boolean;
    style?: CSSProperties | any;
}

const CloseButton: FC<CloseButtonType> = ({ top = 10, right = 10, onClick, href="#root", light = false, style = {} }) => {
    const closeButtonStyle = {
        position: 'absolute',
        top: `${top}px`,
        right: `${right}px`
    }

    const lightVersion = light ? {
        color: 'rgb(255, 255, 255)'
    } : {}

    return (
        <a 
            style={{ ...closeButtonStyle, ...lightVersion, ...style }} 
            className={ classes.button } 
            onClick={ onClick }
            href={ href }
        >
            &#10005;
        </a>
    )
}

export default CloseButton;