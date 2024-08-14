import { type FC } from "react";
import classes from './FieldArray.module.scss';

import { 
    FieldValues, 
    useFieldArray, 
    UseFormRegister,
    UseFormSetValue,
    UseFormGetValues,
    Control,
} from "react-hook-form";

import { Title, Input } from "components/shared";

import NestedArray from "./nestedFieldArray";

let renderCount = 0;

type FieldProps = {
    register: UseFormRegister<FieldValues>;
    setValue: UseFormSetValue<FieldValues>;
    getValues: UseFormGetValues<FieldValues>;
    control: Control<FieldValues>;
    name: string; value: string; single: string;
}

const FieldArray: FC<FieldProps> = ({ control, register, name, value, single }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: value
  });

  renderCount++;

  return (
    <>
      <div className={ classes.field__header }> 
        <Title> { name } </Title>
        <button 
            className={ classes.field__rounded }
            type="button"
            onClick={() => {
                append({ type: single, name: `${name} ${fields.length + 1}`, beds: [{ type: "single" }] });
            }}
        >
            +
        </button>
      </div>
      <ul className={ classes.field }>
        {fields.map((item, index) => {
          return (
            <li key={item.id} className={ classes.field__section }>
              <p>{ name } {index + 1}</p>
              <div className={ classes.field__item }>
                <Input label={ name } {...register(`${value}.${index}.name`)} value={ `${name} ${index + 1}` } />

                <div className={ classes.field__actions }>
                    <button 
                        className={ classes.field__rounded }
                        type="button"
                        onClick={() => {
                            append({ type: single, name: `${name} ${fields.length + 1}`, beds: [{ type: "single" }] });
                        }}
                    >
                        +
                    </button>
                    <button className={ classes.field__rounded } type="button" onClick={() => { if (value !== 'livingRooms' && index === 0) return; remove(index) }}>
                        -
                    </button>
                </div>
              </div>
              
              <NestedArray 
                name={ name }
                value={ value }
                single={ single }
                nestIndex={index} 
                {...{ control, register }} 
              />
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default FieldArray;