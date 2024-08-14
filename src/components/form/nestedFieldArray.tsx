import { type FC } from "react";
import classes from './NestedArray.module.scss';

import { 
    useFieldArray,
    Control,
    FieldValues,
    UseFormRegister,
    Controller
} from "react-hook-form";

import { Button, Select } from "components/shared";

const bedConfigurationArray = [
    { name: 'Single', value: 'single' },
    { name: 'Double', value: 'double' },
    { name: 'King', value: 'king' },
    { name: 'Sofa Bed', value: 'sofa' },
    { name: 'Cots', value: 'cots' },
    { name: 'Twins Single', value: 'twins' }
]

type NestedFieldArrayProps = {
    nestIndex: number;
    control: Control<FieldValues>
    register: UseFormRegister<FieldValues>;
    name: string; value: string; single: string;
}

const NestedArray: FC<NestedFieldArrayProps> = ({ nestIndex, control, name, value, single }) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `${value}.${nestIndex}.beds`
  });

  return (
    <div className={ classes.field }>
      {fields.map((item, k) => {
        return (
          <div key={item.id} style={{ marginLeft: 20 }}>
            <p className={ classes.field__label }>Bed { k + 1 } </p>
            <div className={ classes.field__item }>
                <Controller  control={ control } name={ `${value}.${nestIndex}.beds.${k}.type` } render={({ field }) => {
                    return (
                        <Select
                            {...field}
                            optionsArray={ bedConfigurationArray }
                        />
                    )
                }} />

                <div className={ classes.field__actions }>
                    <button
                        className={ classes.field__rounded }
                        type="button"
                        onClick={() =>
                        append({
                            type: "single"
                        })
                        }
                    >
                        +
                    </button>
                    <button className={ classes.field__rounded } type="button" onClick={() => { if (k === 0) return; remove(k); } }>
                        -
                    </button>
                </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};


export default NestedArray;