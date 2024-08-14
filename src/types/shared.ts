export interface Subject {
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    imageUrl: string;
    role: string;
    alias: string;
}

export interface EnhancedSubject extends Subject {
    _id: string;
}

export type IFormInput = {
    name: string;
    description: string;
    address: { 
        street: string; 
        number: string; 
        city: string; 
        zip: string; 
        position?: { 
            type: string; 
            coordinates: number[] 
        }; 
        freeFormAddress?: string; 
    };
    type: string;
    floor: string;
    airbnb: string;
    booking: string;
    summary: { 
        general: { 
            garden: { isAvailable: boolean; value: string; }; 
            desk: { isAvailable: boolean; value: string; }; 
            parking: { isAvailable: boolean; value: string; }; 
            petFriendly: { isAvailable: boolean; value: string; }; 
            tv: { isAvailable: boolean; value: string; }; 
            wifi: { isAvailable: boolean; value: string; }; 
            elevator: { isAvailable: boolean; value: string; }; 
        },
        kitchen: {
            microwave: { isAvailable: boolean; value: string; };
            oven: { isAvailable: boolean; value: string; };
            hob: { isAvailable: boolean; value: string; };
            fridge: { isAvailable: boolean; value: string; };
            freezer: { isAvailable: boolean; value: string; };
            kettle: { isAvailable: boolean; value: string; };
            toaster: { isAvailable: boolean; value: string; };
            dishwasher: { isAvailable: boolean; value: string; };
        },
        laundry: {
            washingMachine: { isAvailable: boolean; value: string; };
            clothesHorse: { isAvailable: boolean; value: string; };
            iron: { isAvailable: boolean; value: string; };
            tumbleDryer: { isAvailable: boolean; value: string; };      
        },
        outside: {
            garden: { isAvailable: boolean; value: string; };
            balcony: { isAvailable: boolean; value: string; };
            patio: { isAvailable: boolean; value: string; };
            bbq: { isAvailable: boolean; value: string; };      
        },
        safety: {
            carbonMonoxideAlarm: { isAvailable: boolean; value: string; };
            smokeAlarm: { isAvailable: boolean; value: string; };
            gasCertificate: { isAvailable: boolean; value: string; };
            eicrRates: { isAvailable: boolean; value: string; };      
        }
    };
    parkingType: { value: string; };
    checkInProcess: { value: string; };
    petsPolicy: { value: string; }
    housekeeping: { value: string; }
    cancellation: string;
    checkIn: string;
    checkOut: string;
    bedrooms: { type: string; name: string; beds: { type: string }[] }[];
    livingRooms: { type: string; name: string; beds: { type: string }[] }[];
    bathrooms: { type: string; value?: string | number; }[];
    sellingPoints: { text: string }[],
    videos: { name: string; url: string; type: string; }[],
    landlord: {
        name: string;
        email: string;
        phone: string;
        nightlyRate: string;
        deposit: string;
        cleaningFee: string;
        parking: string;
        petFee: string;
        other: string;
        margin: string;
    },
    external: {
        nightlyRate: string;
        deposit: string;
        cleaningFee: string;
        parking: string;
        petFee: string;
        other: string;
    }
}

export type ActivityType = {
    name: string;
    _id: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface GuestFormProps {
    name: string;
    phone: string;
    email: string;
    checkIn: string;
    checkOut: string;
    other: string;
}

export interface EnhancedGuestProps extends GuestFormProps {
    _id: string;
    createdBy: {
        fullName: string;
    };
    propertyId: {
        name: string;
        _id: string;
    }
}

export type FiltersDataType = {
    queryString: string;
    maxDistance: string;
    numberOfBedrooms: string;
    numberOfBathrooms: string;
    propertyType: string;
    petFriendly: boolean;
    walkInShower: boolean;
    groundFloor: boolean;
  }