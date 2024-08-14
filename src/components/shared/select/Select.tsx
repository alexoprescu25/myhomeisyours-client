import { FormEvent, forwardRef, type ComponentPropsWithoutRef, type FC } from 'react';
import classes from './Select.module.scss';

import { Path, DeepMap, FieldValues, FieldError } from 'react-hook-form';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import * as _ from "lodash";

type SelectProps = {
    onChange: (param: FormEvent<HTMLSelectElement>) => void;
    optionsArray: { name: string; value: string; }[];
    hiddenLabel?: boolean;
    name: Path<FieldValues>;
    errors?: Partial<DeepMap<FieldValues, FieldError>>;
    required?: boolean;
    showPlaceholder?: boolean;
} & ComponentPropsWithoutRef<'select'>;

const Select: FC<SelectProps> = forwardRef<HTMLSelectElement, SelectProps>((
    { onChange, value, optionsArray, defaultValue, name, errors, id, required = false, hiddenLabel = false, showPlaceholder = false },
    ref
) => {
    const errorMessages = _.get(errors, name);
    const hasError = !!(errors && errorMessages);

    return (
        <div className={ classes['select-box'] }>
            { showPlaceholder && <span className={ classes['select-box__placeholder'] }> { defaultValue } </span> }
            <select ref={ ref } onChange={ onChange } value={ value } id={ id } className={ value ? classes['active'] : '' }>
                <option defaultChecked hidden className={ classes['default'] }> 
                    { `${defaultValue} ${required ? '*' : ''}` } 
                </option>
                { optionsArray.map((item, index) => (
                    <option 
                        value={ item.value } 
                        key={ index }
                    > 
                        { item.name } 
                    </option>
                )) }
            </select>

            <div className={ classes['select-box__arrow'] }>
                <FontAwesomeIcon icon={ faChevronDown } />
            </div>
            
            { hasError && (
                <div className={ classes['select-box__danger'] }>
                    { typeof errorMessages === 'string' ? (
                        <div className={ classes['select-box__danger'] }>
                            <p>{ errorMessages }</p>
                        </div>
                    ) : (
                        <div className={ classes['select-box__danger'] }>
                            <p>{ errorMessages.message }</p>
                        </div>
                    ) }
                </div>
            ) }
        </div>
    )
})

export default Select;