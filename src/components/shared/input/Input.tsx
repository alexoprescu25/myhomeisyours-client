import { ComponentPropsWithoutRef, forwardRef, type FC } from "react";
import classes from './Input.module.scss';

import { UseFormRegister, FieldValues, Path, DeepMap, FieldError, RegisterOptions } from 'react-hook-form';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import * as _ from "lodash";
import classNames from "classnames";

type Input = {
    id: string;
    label: string;
    icon?: string;
    formError?: string;
    required: boolean;
    value: string;
    name: Path<FieldValues>;
    register?: UseFormRegister<FieldValues>;
    errors?: Partial<DeepMap<FieldValues, FieldError>>;
    rules?: RegisterOptions;
} & ComponentPropsWithoutRef<'input'> & Omit<Input, 'name'>;

const Input: FC<Input> = forwardRef<HTMLInputElement, Input>((
    { label, icon, formError, value, rules, errors, name, register, id, required = false, ...props },
    ref
) => {
    const errorMessages = _.get(errors, name);
    const hasError = !!(errors && errorMessages);

    return (
        <div className={ classNames(classes.input, { [classes['input--icon']]: icon }) }>
            <input 
                type={ props.type || 'text' } 
                ref={ ref } 
                id={ name } 
                {...(register && register(name, rules))}
                placeholder={ label } 
                className={ formError ? classes['is-dirty'] : '' } 
                value={ value }
                {...props} 
            />
            { icon && (
                <span className={ classes.input__icon }>
                    <FontAwesomeIcon icon={ icon } />
                </span>
            ) }
            <span className={ classes.input__placeholder }> { label } { required && <sup>*</sup> } </span>
            { formError && (
                <div className={ classes.input__danger }>
                    <p>{ formError }</p>
                </div>
            ) }
            
            { hasError && (
                <div className={ classes.input__danger }>
                    { typeof errorMessages === 'string' ? (
                        <div className={ classes.input__danger }>
                            <p>{ errorMessages }</p>
                        </div>
                    ) : (
                        <div className={ classes.input__danger }>
                            <p>{ errorMessages.message }</p>
                        </div>
                    ) }
                </div>
            ) }
        </div>
    )
})

export default Input;