import { type FC , useState , useEffect, Fragment } from "react";
import classes from './Listings.module.scss';

import { handleMap } from "service/map.service";
import { fetchListings, findNearbyLocations } from "service/property.service";

import { Button, Loader, Pagination, ReactModal } from "components/shared";
import { PropertyCard, SearchBar, AddressCard } from "components/properties";

import { waitFor, haversineDistance } from "utils";

import { FiltersDataType } from "types/shared";

const Listings: FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [noProperties, setNoProperties] = useState<number | null>(null);
    const [properties, setProperties] = useState<any>(null);

    const [selectedFilters, setFilters] = useState<FiltersDataType | null>(null);
    const [selectedAddress, setSelectedAddress] = useState<any>(null);
    const [results, setResults] = useState<any>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const getProperties = async () => {
        try {
            const response = await fetchListings({
                skip: Number((currentPage - 1) * postsPerPage),
                limit: postsPerPage
            });

            if (response && response.status === 200) {
                setProperties(response.data.listings);
                setNoProperties(response.data.number);
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }

    const findCloseLocations = async () => {
        if (!selectedFilters) return;
        setIsLoading(true);

        try {
            const response = await findNearbyLocations([
                selectedAddress.position.lon,
                selectedAddress.position.lat
            ], selectedFilters);

           if (response && response.status === 200) {
            
            if (response.data.properties) {
                setProperties(response.data.properties);
                setNoProperties(response.data.properties.length);

                await waitFor(200);
                setIsOpen(false);
            }
           }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleSearch = async (filters: FiltersDataType) => {
        setIsLoading(true);
        setFilters(filters);

        try {
            const response = await handleMap(filters.queryString);

            if (response && response.status === 200) {
                setResults(response.data.results);

                await waitFor(100);
                setIsOpen(true);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleClearSearch = async () => {
        setSelectedAddress(null);
        await getProperties();
    }

    const hasResults = () => results && results.length > 0;

    useEffect(() => {
        getProperties();
    }, [currentPage])

    if (isLoading) {
        return <Loader/>
    }

    return (
        <Fragment>
            <ReactModal
                isOpen={ isOpen }
                onClose={ () => { setIsOpen(false) } }
            >
                <div className={ classes.results }>
                    <div className={ classes.results__container }>
                        <div className={ classes.results__header }>
                            <p>We found several matches for your address. Please select the correct one.</p>
                        </div>
                        <div className={ classes.results__address }>
                            { hasResults() && results.map((item: any) => (
                                <AddressCard 
                                    key={ item.id } 
                                    address={ item } 
                                    onSelect={ (address) => setSelectedAddress(address) } 
                                    isActive={ selectedAddress && selectedAddress.id === item.id }    
                                />
                            )) }
                        </div>
                        <div className={ classes.results__btn }>
                            <Button mode="main" onClick={ findCloseLocations }>Find Nearby Locations</Button>
                        </div>
                    </div>
                </div>
            </ReactModal>   

            <div className={ classes.listings }>
                <SearchBar onSave={ handleSearch } isLoading={ isLoading } onClear={ handleClearSearch } />
                <div className={ classes.listings__container }>
                    { (properties && properties.length === 0) && (
                        <p>No nearby locations were found. Please try again with a different search or adjust your search criteria.</p>
                    ) }
                    
                    { (properties && properties.length > 0) && properties.map((item:any) => (
                        <Fragment key={ item._id.toString() }>
                            { selectedAddress && (
                                <p className={ classes.listings__distance }>
                                    <span>Distance:</span>
                                    <span>
                                        { haversineDistance(
                                            { lat: selectedAddress.position.lat, lon: selectedAddress.position.lon }, 
                                            { lat: item.address.position.coordinates[1], lon: item.address.position.coordinates[0] }
                                        ) }
                                    </span>
                                    <span>miles</span>
                                </p>
                            ) }
                            <PropertyCard item={ item} />
                        </Fragment>
                    )) }
                </div>
                <Pagination
                    currentPage={ currentPage } 
                    postsPerPage={ postsPerPage } 
                    totalPosts={ noProperties ? noProperties : 1 } 
                    paginate={ paginate } 
                />
            </div>
        </Fragment>
    )
}

export default Listings;