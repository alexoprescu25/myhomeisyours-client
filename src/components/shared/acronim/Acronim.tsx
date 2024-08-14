import { type FC, useEffect, useState } from 'react';
import { nameAcronim } from 'utils';

import classes from './Acronim.module.scss';

type AcronimProps = {
    name: string;
    width?: number;
    color?: string | null;
}

const Acronim: FC<AcronimProps> = ({ name, width = 50, color = null }) => {
    const [randomColor, setRandomColor] = useState<string | null>(null);
    
    const generateRandomNumber = () => {
        return Math.floor(Math.random() * 250);
    }

    const generateRandomColor = () => {
        if (color) return color;
        return `rgb(${generateRandomNumber()}, ${generateRandomNumber()}, ${generateRandomNumber()})`;
    }

    const style = {
        width: `${width}px`,
        height: `${width}px`,
        backgroundColor: `${randomColor}`
    }

    useEffect(() => {
        setRandomColor(generateRandomColor());
    }, [])

    return (
        <div className={ classes.acronim } style={ style }>
            <p> { nameAcronim(name) } </p>
        </div>
    )
}

export default Acronim;