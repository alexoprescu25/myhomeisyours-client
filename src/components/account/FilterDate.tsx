import { type FC } from "react";
import classes from './FilterDate.module.scss';

import { useForm, SubmitHandler } from "react-hook-form";

import { Input, Button } from "components/shared";

const initialState = {
    from: '',
    to: ''
}

type FormProps = {
    from: string;
    to: string;
}

const FilterDate: FC<{ onSubmitData: (data: FormProps) => void; isLoading: boolean; }> = ({ onSubmitData, isLoading }) => {
    const {
        register,
        handleSubmit
    } = useForm<FormProps>({ defaultValues: initialState });

    const onSubmit: SubmitHandler<FormProps> = async (data) => {
        onSubmitData(data);
    }

    return (
        <div className={ classes.filter }>
            <div className={ classes.filter__container }>
                <form onSubmit={ handleSubmit(onSubmit) }>
                    <Input type="date" label="From" name="from" register={ register } required={ true } />
                    <Input type="date" label="To" name="to" register={ register } required={ true } />
                    <Button mode="main" isLoading={ isLoading }>Filter</Button>
                </form>
            </div>
        </div>
    )
}

export default FilterDate;