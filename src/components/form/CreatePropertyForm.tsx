import { type FC, Fragment, useState, useEffect, FormEvent } from "react";
import { useForm, SubmitHandler, Controller, useFieldArray } from "react-hook-form";

import classes from './CreatePropertyForm.module.scss';
import classNames from "classnames";

import { FieldArray } from "components/form";
import { AddressCard } from "components/properties";
import { Input, Select, Button, Component, Title, SemanticCheckbox } from "components/shared";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate, faLocationDot, faSterlingSign, faPercent } from "@fortawesome/free-solid-svg-icons";

import { IFormInput } from "types/shared";

import { handleMap } from "service/map.service";

import DOMPurify from 'dompurify';

import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';

import { useDispatch } from "react-redux";
import { toggleSnackbar } from "store/ui/ui-slice";

type CreatePropertyFormProps = {
    onSubmitData: (data: any) => void;
    config: any;
    initialState: any;
    edit: boolean;
    isLoading?: boolean;
}

const CreatePropertyFrom: FC<CreatePropertyFormProps> = ({ onSubmitData, config, initialState, edit = false, isLoading }) => {
    const [addressIsLoading, setIsLoadingAddress] = useState<boolean>(false);

    const [availableAddresses, setAvailableAddresses] = useState<any>(null);
    const [selectedAddress, setSelectedAddress] = useState<any>(null);

    const [description, setDescription] = useState<string>('');
    const { quill, quillRef } = useQuill({
        modules: {
            toolbar: [
                ['bold', 'italic', 'underline', 'strike'],
                [{ align: [] }],
            
                [{ list: 'ordered'}, { list: 'bullet' }],
                [{ indent: '-1'}, { indent: '+1' }],
            
                [{ size: ['small', false, 'large', 'huge'] }],
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
            
                ['clean'],
            ],
            clipboard: {
                matchVisual: false,
            }
        },
        formats: ["size", "bold", "script"]
    });

    const dispatch = useDispatch();

    const { 
        watch,
        control, 
        register,
        getValues, 
        setValue,
        handleSubmit, 
        formState: { errors } 
    } = useForm<IFormInput>({ defaultValues: initialState });

    const { 
        fields: bathroomFields, 
        append: appendBathroomConfig, 
        remove: removeBathroomConfig 
    } = useFieldArray({ name: "bathrooms", control });

    const appendBathrooom = () => { appendBathroomConfig({ type: "wc", value: 0.5 }) }
    const removeBathroom = (index: number) => { if (index <= 0) return; removeBathroomConfig(index); }
    
    const { 
        fields: sellingPoints, 
        append: appendSellingPointConfig, 
        remove: removeSellingPointConfig 
    } = useFieldArray({ name: "sellingPoints", control });

    const appendSellingPoint = () => { appendSellingPointConfig({ text: '' }) }
    const removeSellingPoint = (index: number) => { removeSellingPointConfig(index); }

    const searchAddress = async () => {
        setIsLoadingAddress(true);
        const addressString = Object.values(getValues('address')).join(", ");

        try {
            const response = await handleMap(addressString);

            if (response && response.status === 200 ) {   
                if (response.data.results.length > 1) {
                    console.log('response.data.results', response.data.results);
                    setAvailableAddresses(response.data.results);
                } else {
                    setSelectedAddress(response.data.results[0])
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoadingAddress(false);
        }
    }

    const handleSearchAgain = () => {
        setValue('address', initialState.address);
        setAvailableAddresses(null);
        setSelectedAddress(null);
    }

    const handleBathroomChange = (value: string, index: number) => {
        const numericValue = value === 'wc' ? 0.5 : 1;
        setValue(`bathrooms.${index}.value`, numericValue);
    }

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        if (!selectedAddress) {
            return dispatch(toggleSnackbar({
                type: 'error',
                text: 'Before you can continue with the form, please press "Search Address" to select your address.'
            }))
        }

        try {
            const copyData = {...data};
            copyData.address.freeFormAddress = selectedAddress.address.freeformAddress;
            copyData.description = DOMPurify.sanitize(description);
            copyData.address.position = {
                type: 'Point',
                coordinates: [selectedAddress.position.lon, selectedAddress.position.lat]
            };

            onSubmitData(copyData);
        } catch (error) {
            console.log(error);
        }
    }

    const calculateExternalCost = (param: string) => {
        const margin = watch('landlord.margin');

        const externalCost = (Number(param) + (Number(margin) / 100) * Number(param)).toFixed(2);

        return externalCost;
    }

    useEffect(() => {
        if (quill) {
          quill.on('text-change', () => {
            setDescription(quill.root.innerHTML); 
          });
        }
      }, [quill]);

    useEffect(() => {
        setValue('external.nightlyRate', calculateExternalCost(watch('landlord.nightlyRate')));
        setValue('external.cleaningFee', watch('landlord.cleaningFee'));
        setValue('external.parking', watch('landlord.parking'));
        setValue('external.deposit', watch('landlord.deposit'));
      }, [
        watch('landlord.margin'), 
        watch('landlord.nightlyRate'),
        watch('landlord.cleaningFee'),
        watch('landlord.parking'),
        watch('landlord.deposit')
    ])

    useEffect(() => {
        if (quill && initialState.description) {
            quill.clipboard.dangerouslyPasteHTML(initialState.description);
        }
    }, [quill])

    useEffect(() => {
        if (initialState.address && initialState.address.position) {
            setSelectedAddress({
                address: {
                    freeformAddress: initialState.address.freeFormAddress
                },
                position: {
                    lat: initialState.address.position.coordinates[1],
                    lon: initialState.address.position.coordinates[0]
                }
            });
        }
    }, [])

    return (
        <Fragment>
            <Component className={ classes.property }>
                <p className={ classes.property__warning }>All fields marked with * are required.</p>
                <form onSubmit={ handleSubmit(onSubmit) }>
                    <Title>Basic Information</Title>
                    <div className={ classNames(classes.property__step, classes.property__basicInformation) }>
                        <Input label="Property Name" name="name" register={ register } rules={{ required: 'Property name is required' }} errors={ errors } required={ true } />
                        <Controller name="type" control={control} rules={{ required: 'Property type is required' }} render={({ field }) => (
                            <Select {...field} optionsArray={ config.propertyTypeArray } errors={ errors } defaultValue='Property Type' required={ true } />
                        )} />
                        { watch('type') === 'apartment' && (
                            <Controller name="floor" control={control} render={({ field }) => (
                                <Input type="number" label="Floor" {...field} />
                            )} />
                        ) }
                    </div>
                    <Title>Description</Title>
                    <div style={{ width: '100%', height: 200, marginBottom: '60px' }}>
                        <div ref={quillRef} />
                    </div>
                    <Title>Address</Title>
                    { selectedAddress ? (
                        <div className={ classes.property__selectedProperty }>
                            <div className={ classes.property__icon }>
                                <FontAwesomeIcon icon={ faLocationDot } />
                            </div>
                            <p> { selectedAddress.address.freeformAddress } </p>
                            <button className={ classes.property__searchAgain } onClick={ handleSearchAgain }>
                                <FontAwesomeIcon icon={ faArrowsRotate } />
                            </button>
                        </div>
                    ) : (
                        <Fragment>
                            <div className={ classNames(classes.property__step, classes.property__address) }>
                                <Controller name="address.number" rules={{ required: 'Number is required' }} control={control} render={({ field }) => (
                                    <Input label="Number" {...field} errors={ errors } required={ true } />
                                )} />
                                <Controller name="address.street" rules={{ required: 'Street is required' }} control={control} render={({ field }) => (
                                    <Input label="Street" {...field} errors={ errors } required={ true } />
                                )} />
                                <Controller name="address.city" rules={{ required: 'City is required' }} control={control} render={({ field }) => (
                                    <Input label="City" {...field} errors={ errors } required={ true } />
                                )} />
                                <Controller name="address.zip" rules={{ required: 'Postal Code is required' }} control={control} render={({ field }) => (
                                    <Input label="Postal Code" {...field} errors={ errors } required={ true } />
                                )} />
                            </div>
                            <div className={ classes.property__search }>
                                <Button type="button" mode="main" onClick={ searchAddress } isLoading={ addressIsLoading }>Search Address</Button>
                            </div>
                            
                            { availableAddresses && (
                                <div className={ classes.property__addresses }>
                                    <div className={ classes.property__disclaimer }>
                                        <p>We found several matches for your address. Please select the correct one.</p>
                                    </div>
                                    <div className={ classes['property__addresses-container'] }>
                                        { availableAddresses.map((item: any) => (
                                            <AddressCard key={ item.id } address={ item } onSelect={ (address) => setSelectedAddress(address) } />
                                        )) }
                                    </div>
                                </div>
                            ) }
                        </Fragment>
                    ) }

                    {/* DROPDOWN */}

                    <div className={ classes.property__dropdown }>
                        <div className={ classes.property__dropdownItem }>
                            <FieldArray
                                name="Bedroom"
                                value="bedrooms"
                                single="bedroom"
                                {...{ control, register, initialState, getValues, setValue, errors }}
                            />
                        </div>
                        <div className={ classes.property__dropdownItem }>
                            <Title>Bathrooms</Title>
                            <div className={ classNames(classes.property__step, classes.property__fields) }>
                                {bathroomFields.map((field, index) => {
                                    return (
                                        <div className={ classes.property__field } key={field.id}>
                                            <section className={ classes.section } key={field.id}>
                                                <p className={ classes.section__heading }>Bathroom { Number(index + 1) } </p>
                                                <div className={ classes.section__container }>
                                                    <Controller control={ control } name={ `bathrooms.${index}.type` } render={({ field }) => {
                                                        return (
                                                            <Select
                                                                {...field}
                                                                optionsArray={ config.bathroomConfigurationArray }
                                                                onChange={ (e: FormEvent<HTMLSelectElement>) => {
                                                                    const { value } = e.target as HTMLSelectElement;

                                                                    field.onChange(value);
                                                                    handleBathroomChange(value, index);
                                                                } }
                                                                className={errors?.bedrooms?.[index]?.type ? "error" : ""}
                                                            />
                                                        )
                                                    }}
                                                    />
                                                    <div className={ classes.section__buttons }>
                                                        <button type="button" onClick={ appendBathrooom }>+</button>
                                                        <button type="button" onClick={ () => removeBathroom(index) }>-</button>
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className={ classes.property__dropdown }>
                        <div className={ classNames(classes.property__dropdownItem, classes.property__livingRoom) }>
                            <FieldArray
                                name="Living Room"
                                value="livingRooms"
                                single="living-room"
                                {...{ control, register, initialState, getValues, setValue, errors }}
                            />
                        </div>
                        <div className={ classes.property__dropdownItem }></div>
                    </div>

                    <Title>Check In - Check Out</Title>
                    <div className={ classNames(classes.property__step, classes.property__basicInformation) }>
                        <Controller name="checkIn" control={control} render={({ field }) => (
                            <Input type="time" label="Check In Time" {...field} />
                        )} />
                        <Controller name="checkOut" control={control} render={({ field }) => (
                            <Input type="time" label="Check Out Time" {...field} />
                        )} />
                    </div>
                    <Title>Utilities</Title>
                    <div className={ classNames(classes.property__step, classes.property__utilities) }>
                        <Controller name="parkingType.value" control={control} render={({ field }) => (
                            <Select {...field} showPlaceholder={ true } optionsArray={ config.parkingArray } errors={ errors } defaultValue='Parking' />
                        )} />
                        <Controller name="checkInProcess.value" control={control} render={({ field }) => (
                            <Select {...field} showPlaceholder={ true } optionsArray={ config.checkInOptions } errors={ errors } defaultValue='Check In Process' />
                        )} />
                    </div>
                    <div className={ classNames(classes.property__step, classes.property__utilities) }>
                        <Controller name="petsPolicy.value" control={control} render={({ field }) => (
                            <Select {...field} showPlaceholder={ true } optionsArray={ config.petsPolicyOptions } errors={ errors } defaultValue='Pets' />
                        )} />
                        <Controller name="housekeeping.value" control={control} render={({ field }) => (
                            <Select {...field} showPlaceholder={ true } optionsArray={ config.houseKeepingArray } errors={ errors } defaultValue='Housekeeping' />
                        )} />
                    </div>
                    <Title>Cancellation Policy</Title>
                    <div className={ classNames(classes.property__step, classes.property__utilities) }>
                        <Controller name="cancellation" rules={{ required: true }}  control={control} render={({ field }) => (
                            <Input required={ true } label="Cancellation Policy" {...field} />
                        )} />
                    </div>
                    <Title image="chain">Live Property Link</Title>
                    <div className={ classNames(classes.property__step, classes.property__basicInformation) }>
                        <Input label="Live External Link" name="livePropertyLink" register={ register } />
                    </div>
                    <Title>Summary</Title>
                    <div className={ classNames(classes.property__step, classes.property__checkboxes) }>
                        { config.summary.general.map((item: any, index: number) => (
                            <Controller name={ item.value } control={ control } key={ index } render={({ field }) => (
                                <SemanticCheckbox id={ item.name } checked={ watch(item.value) } label={ item.label } {...field} icon={ item.icon } />
                            )} />
                        )) }
                    </div>
                    <Title>Kitchen</Title>
                    <div className={ classNames(classes.property__step, classes.property__checkboxes) }>
                        { config.summary.kitchen.map((item: any, index: number) => (
                            <Controller name={ item.value } control={ control } key={ index } render={({ field }) => (
                                <SemanticCheckbox id={ item.name } checked={ watch(item.value) } label={ item.label } {...field} icon={ item.icon } />
                            )} />
                        )) }
                    </div>
                    <Title>Laundry</Title>
                    <div className={ classNames(classes.property__step, classes.property__checkboxes) }>
                        { config.summary.laundry.map((item: any, index: number) => (
                            <Controller name={ item.value } control={ control } key={ index } render={({ field }) => (
                                <SemanticCheckbox id={ item.name } checked={ watch(item.value) } label={ item.label } {...field} icon={ item.icon } />
                            )} />
                        )) }
                    </div>
                    <Title>Outside Space</Title>
                    <div className={ classNames(classes.property__step, classes.property__checkboxes) }>
                        { config.summary.outside.map((item: any, index: number) => (
                            <Controller name={ item.value } control={ control } key={ index } render={({ field }) => (
                                <SemanticCheckbox id={ item.name } checked={ watch(item.value) } label={ item.label } {...field} icon={ item.icon } />
                            )} />
                        )) }
                    </div>
                    <Title>Safety</Title>
                    <div className={ classNames(classes.property__step, classes.property__checkboxes) }>
                        { config.summary.safety.map((item: any, index: number) => (
                            <Controller name={ item.value } control={ control } key={ index } render={({ field }) => (
                                <SemanticCheckbox id={ item.name } checked={ watch(item.value) } label={ item.label } {...field} icon={ item.icon } />
                            )} />
                        )) }
                    </div>

                    <div className={ classes.property__dropdownItem }>
                        <Title>Selling Points</Title>
                        <div className={ classNames(classes.property__step, classes.property__sellingPoints) }>
                            {sellingPoints.map((field, index) => {
                                return (
                                    <div className={ classNames(classes.property__field, classes.property__point) } key={field.id}>
                                        <section className={ classes.section } key={field.id}>
                                            <p className={ classes.section__heading }>Selling Point { Number(index + 1) } </p>
                                            <div className={ classes.section__container }>
                                                <Controller control={ control } name={ `sellingPoints.${index}.text` } render={({ field }) => {
                                                    return <Input {...field} label="Text"/>
                                                }}
                                                />
                                                <div className={ classes.section__buttons }>
                                                    <button type="button" onClick={ appendSellingPoint }>+</button>
                                                    <button type="button" onClick={ () => removeSellingPoint(index) }>-</button>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                );
                            })}
                        </div>
                    </div>



                    <Title>Landlord Cost</Title>
                    <div className={ classNames(classes.property__step, classes.property__landlord) }>
                        <Input label="Landlord Name" name="landlord.name" register={ register } />
                        <Input label="Landlord Email" name="landlord.email" register={ register } />
                    </div>
                    <div className={ classNames(classes.property__step, classes.property__landlord) }>
                    <Input label="Landlord Phone" name="landlord.phone" register={ register } />
                        <Controller name="landlord.nightlyRate" control={control} render={({ field }) => (
                            <Input type="number" step="0.01" icon={ faSterlingSign } label="Nightly Rate" {...field} />
                        )} />
                    </div>
                    <div className={ classNames(classes.property__step, classes.property__landlord) }>
                        <Controller name="landlord.deposit" control={control} render={({ field }) => (
                            <Input type="number" step="0.01" icon={ faSterlingSign } label="Deposit" {...field} />
                        )} />
                        <Controller name="landlord.cleaningFee" control={control} render={({ field }) => (
                            <Input type="number" step="0.01" icon={ faSterlingSign } label="Cleaning Fee" {...field} />
                        )} />
                    </div>
                    <div className={ classNames(classes.property__step, classes.property__landlord) }>
                        <Controller name="landlord.parking" control={control} render={({ field }) => (
                            <Input type="number" step="0.01" icon={ faSterlingSign } label="Parking" {...field} />
                        )} />
                        <Controller name="landlord.petFee" control={control} render={({ field }) => (
                            <Input type="number" step="0.01" icon={ faSterlingSign } label="Pet Fee" {...field} />
                        )} />
                    </div>
                    <div className={ classNames(classes.property__step, classes.property__landlord) }>
                        <Input type="number" step="0.01" label="Other" name="landlord.other" register={ register } />
                        <Input type="number" step="0.01" icon={ faPercent } label="Margin" name="landlord.margin" register={ register } />
                    </div>
                    <Title>Standard Quote Out Costs</Title>
                    <div className={ classNames(classes.property__step, classes.property__landlord) }>
                        <Input type="number" step="0.01" icon={ faSterlingSign } label="Standard MHIY Nightly Rate" name="external.nightlyRate" register={ register } />
                        <Input type="number" step="0.01" icon={ faSterlingSign } label="Deposit" name="external.deposit" register={ register } />
                    </div>
                    <div className={ classNames(classes.property__step, classes.property__landlord) }>
                        <Input type="number" step="0.01" icon={ faSterlingSign } label="Parking" name="external.parking" register={ register } />
                        <Input type="number" step="0.01" icon={ faSterlingSign } label="Cleaning Fee" name="external.cleaningFee" register={ register } />
                    </div>
                    <div className={ classNames(classes.property__step, classes.property__landlord) }>
                        <Input type="number" step="0.01" icon={ faSterlingSign } label="Pet Fee" name="external.petFee" register={ register } />
                        <Input type="number" step="0.01" label="Other" name="external.other" register={ register } />
                    </div>
                    <div className={ classes.property__submit }>
                        <Button type="submit" mode="main" isLoading={ isLoading }>{ edit ? 'Edit' : 'Create'  } Property</Button>
                    </div>
                </form>
            </Component>
        </Fragment>
    )
} 

export default CreatePropertyFrom;