import { type FC, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import classes from './SearchBar.module.scss';

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { Input, Select, Button, Checkbox } from "components/shared";

import { useForm, SubmitHandler, Controller } from "react-hook-form";

import { FiltersDataType } from "types/shared";

type SearachBarProps = {
  isLoading: boolean;
  onClear: () => void;
  onSave: (filters: FiltersDataType) => void;
}

const initialState = {
  queryString: '',
  maxDistance: '',
  numberOfBedrooms: '',
  numberOfBathrooms: '',
  propertyType: '',
  petFriendly: false,
  walkInShower: false,
  groundFloor: false
}

const distanceArray = [
  { name: '5 Miles', value: '8000' },
  { name: '10 Miles', value: '16000' },
  { name: '15 Miles', value: '24000' },
  { name: '20 Miles', value: '32000' }
]

const propertyTypeArray = [
  { name: 'House', value: 'house' },
  { name: 'Bungalow', value: 'bungalow' },
  { name: 'Maisonette', value: 'maisonette' },
  { name: 'Apartment', value: 'apartment' }
]

const SearchBar: FC<SearachBarProps> = ({ isLoading, onSave, onClear }) => {
  const {
      watch,
      reset,
      control, 
      register,
      setValue,
      handleSubmit, 
      formState: { errors } 
  } = useForm<FiltersDataType>({ defaultValues: initialState });

    const [searchParams, setSearchParams] = useSearchParams();

    const navigate = useNavigate();
  
    const onSubmitForm: SubmitHandler<FiltersDataType> = async (data) => {
      navigate(`?queryString=${data.queryString}&maxDistance=${data.maxDistance}&propertyType=${data.propertyType}&bedrooms=${data.numberOfBedrooms}&bathrooms=${data.numberOfBathrooms}&petFriendly=${data.petFriendly}&walkInShower=${data.walkInShower}&groundFloor=${data.groundFloor}`)
      onSave(data);
    }

    const clearSearch = () => {
      setSearchParams('');
      reset();
      onClear();
    }

    useEffect(() => {
      const queryString = searchParams.get('queryString');
      const maxDistance = searchParams.get('maxDistance');
      const numberOfBedrooms = searchParams.get('bedrooms');
      const numberOfBathrooms = searchParams.get('bathrooms');
      const propertyType = searchParams.get('propertyType');
      const petFriendly = searchParams.get('petFriendly');
      const walkInShower = searchParams.get('walkInShower');
      const groundFloor = searchParams.get('groundFloor');

      if (queryString) setValue('queryString', queryString);
      if (maxDistance) setValue('maxDistance', maxDistance);
      if (numberOfBedrooms) setValue('numberOfBedrooms', numberOfBedrooms);
      if (numberOfBathrooms) setValue('numberOfBathrooms', numberOfBathrooms);
      if (propertyType) setValue('propertyType', propertyType);

      if (petFriendly && (/true/).test(petFriendly)) { 
        setValue('petFriendly', true);
      } else {
        setValue('petFriendly', false);
      }

      if (walkInShower && (/true/).test(walkInShower)) { 
        setValue('walkInShower', true);
      } else {
        setValue('walkInShower', false);
      }
      
      if (groundFloor && (/true/).test(groundFloor)) { 
        setValue('groundFloor', true);
      } else {
        setValue('groundFloor', false);
      }
    }, [])

    return (
      <div className={classes.search}>
        <div className={ classes.search__header }>
            <p className={ classes.search__heading }>Nearby Search</p>
            <p className={ classes.search__text }>Need to find something nearby? Just enter your address and choose a maximum distance to see the best local options!</p>
        </div>
        <div className={classes.search__container}>
          <form onSubmit={ handleSubmit(onSubmitForm) } className={ classes.search__form }>
            <div className={ classes.search__top }>
              <Input label="Address / Postcode" name="queryString" register={ register } rules={{ required: 'Address is required' }} errors={ errors } icon={ faMagnifyingGlass } required={ true } />
              <div className={ classes.search__distance }>
                <Controller name="maxDistance" control={ control } rules={{ required: 'Distance is required' }} render={({ field }) => (
                    <Select {...field} optionsArray={ distanceArray } errors={ errors } defaultValue='Max Distance' />
                )} />
              </div>
            </div>
            <div className={ classes.search__bottom }>
              <Input type="number" label="Bedrooms" name="numberOfBedrooms" register={ register } />
              <Input type="number" label="Bathrooms" name="numberOfBathrooms" register={ register } />
              <Controller name="propertyType" control={ control } render={({ field }) => (
                  <Select {...field} optionsArray={ propertyTypeArray } defaultValue='Property Type' />
              )} />
            </div>
            <div className={ classes.search__checkboxes }>
              <Controller name="petFriendly" control={ control } render={({ field }) => (
                  <Checkbox id="petFriendly" checked={ watch('petFriendly') } label="Pet Friendly" {...field} />
              )} />
              <Controller name="walkInShower" control={ control } render={({ field }) => (
                  <Checkbox id="walkInShower" checked={ watch('walkInShower') } label="Walk In Shower" {...field} />
              )} />
              <Controller name="groundFloor" control={ control } render={({ field }) => (
                  <Checkbox id="groundFloor" checked={ watch('groundFloor') } label="Ground Floor" {...field} />
              )} />
            </div>
            <div className={ classes.search__buttons }>
              <Button type="submit" mode="main" isLoading={ isLoading }>Search</Button>
              <a href="#" className={ classes.search__clear } onClick={ clearSearch }>Clear Filters</a>
            </div>
          </form>
        </div>
      </div>

    )
}

export default SearchBar;