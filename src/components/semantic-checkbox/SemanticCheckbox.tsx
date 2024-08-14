import { type FormEvent, type FC, forwardRef } from 'react';
import classNames from 'classnames';
import classes from './SemanticCheckbox.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Checkbox = {
    checked: boolean;
    onChange?: (e: FormEvent<HTMLInputElement>) => void;
    label: string;
    id: string;
    icon?: any;
}

const SemanticCheckbox: FC<Checkbox> = forwardRef<HTMLInputElement, Checkbox>((
    { checked, icon, onChange, label, id },
    ref
) => {
    const checkboxClass = classNames(classes['checkbox-input'], {
        [classes.checked]: checked
    })
    return (
        <div className={ checkboxClass }>
            <label>
                <input 
                    type='checkbox'
                    id={ id }
                    checked={ checked }
                    onChange={ onChange }
                    ref={ ref }
                />
                <span>
                    { icon && (
                        typeof icon === 'object' ? (
                            icon.type === 'image' ? (
                                <img src={ icon.path } alt="Icon" />
                            ) : (
                                <FontAwesomeIcon icon={ icon.path } />
                            )
                        ) : (
                            <FontAwesomeIcon icon={ icon } />
                        )
                    ) }
                    { label }
                </span>
            </label>
        </div>
    )
})

export default SemanticCheckbox;