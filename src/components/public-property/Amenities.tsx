import { type FC } from "react";
import classes from './Amenities.module.scss';

import { ReactModal, Title } from "components/shared";

import { categories } from "constant";

import { lArray } from "utils";

type AmenitiesProps = {
    isOpen: boolean;
    onClose: () => void;
    summary: any;
}

type Item = { isAvailable: boolean; value: string; name: string; }

const Amenities: FC<AmenitiesProps> = ({ isOpen, onClose, summary }) => {
    const checkCategory = (category: any) => {
        const categoryArray = category.filter((item: Item) => item.isAvailable);
        return Boolean(categoryArray.length > 0);
    }

    return (
        <ReactModal
            isOpen={ isOpen }
            onClose={ () => { onClose() } }
        >
            <div className={ classes.amenities }>
                <div className={ classes.amenities__container }>
                   
                    { categories.map((item: { name: string; value: string; }) => (
                        checkCategory(lArray(summary[item.value])) && (
                            <div className={ classes.amenities__summary } key={ item.value }>
                                <div className={ classes.amenities__title }>
                                    <Title> { item.name } </Title>
                                </div>
                                <div className={ classes.amenities__items }>
                                    { lArray(summary[item.value]).map((asset: any) => (
                                        asset.isAvailable && (
                                            <div className={ classes.amenities__item } key={ asset.value }>
                                                <img src={ `/images/icons/${asset.value}.png` } alt={ asset.name } />
                                                <p> { asset.name } </p>
                                            </div>
                                        )
                                    )) }
                                </div>
                            </div>
                        )
                    )) }

                </div>
            </div>
        </ReactModal>
    )
}

export default Amenities;