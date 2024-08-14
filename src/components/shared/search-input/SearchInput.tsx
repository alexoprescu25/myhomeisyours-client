import { ComponentPropsWithoutRef, type FC } from "react";
import classes from './SearchInput.module.scss';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

type SearchInputProps = {
    value: string;
    id: string;
    label: string;
    formError?: string;
} & ComponentPropsWithoutRef<'input'>;

const SearchInput: FC<SearchInputProps> = ({ label, formError, id, value, ...props }) => {
    return (
        <div className={ classes.input }>
            <div className={ classes.input__icon }>
                <FontAwesomeIcon icon={ faSearch } />
            </div>
            <input type={ props.type || 'text' } id={ id } value={ value } placeholder={ label } className={ formError ? classes['is-dirty'] : '' } {...props} />
            <span className={ classes.input__placeholder }> { label } </span>
            { formError && (
                <div className={ classes.input__danger }>
                    <p>{ formError }</p>
                </div>
            ) }
        </div>
    )
} 

export default SearchInput;