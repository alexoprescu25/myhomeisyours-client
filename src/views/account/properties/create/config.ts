type Feature = { name: string, label: string};
// Helper functions
const createFeature = (category: string, name: string, label: string) => ({
    name,
    value: `summary.${category}.${name}.isAvailable`,
    label,
    rules: {},
    icon: { type: 'image', path: `${ICON_BASE_PATH}/${name}.png` }
});

const createFeatureGroup = (category: string, features: Feature[]) =>
    features.map(({ name, label }) => createFeature(category, name, label));

// Constants
const ICON_BASE_PATH = '/images/icons';

const generalData: Feature[] = [
    // { name: 'desk', label: 'Desk' },
    { name: 'workspace', label: 'Workspace' },
    { name: 'parking', label: 'Parking' },
    { name: 'petFriendly', label: 'Pet Friendly' },
    { name: 'tv', label: 'TV' },
    { name: 'wifi', label: 'Wi-Fi' },
    { name: 'ventilation', label: 'Ventilation' },
    { name: 'elevator', label: 'Lift' }
];

const kitchenData: Feature[] = [
    { name: 'microwave', label: 'Microwave' },
    { name: 'oven', label: 'Oven' },
    { name: 'hob', label: 'Hob' },
    { name: 'fridge', label: 'Fridge' },
    { name: 'freezer', label: 'Freezer' },
    { name: 'kettle', label: 'Kettle' },
    { name: 'toaster', label: 'Toaster' },
    { name: 'dishwasher', label: 'Dishwasher' }
];

const laundryData: Feature[] = [
    { name: 'washingMachine', label: 'Washing Machine' },
    { name: 'clothesHorse', label: 'Clothes Horse' },
    { name: 'iron', label: 'Iron' },
    { name: 'tumbleDryer', label: 'Tumble Dryer' }
];

const outsideData: Feature[] = [
    { name: 'garden', label: 'Garden' },
    { name: 'balcony', label: 'Balcony' },
    { name: 'patio', label: 'Patio' },
    { name: 'bbq', label: 'Barbecue' }
];

const safetyData: Feature[] = [
    { name: 'carbonMonoxideAlarm', label: 'Carbon Monoxide Alarm' },
    { name: 'smokeAlarm', label: 'Smoke Alarm' },
    { name: 'gasCertificate', label: 'Gas Certificate' },
    { name: 'eicrRates', label: 'EICR Rates' }
];

export const config = {
    summary: {
        general: createFeatureGroup('general', generalData),
        kitchen: createFeatureGroup('kitchen', kitchenData),
        laundry: createFeatureGroup('laundry', laundryData),
        outside: createFeatureGroup('outside', outsideData),
        safety: createFeatureGroup('safety', safetyData)
    },
    propertyTypeArray: [
        { name: 'House', value: 'house' },
        { name: 'Bungalow', value: 'bungalow' },
        { name: 'Maisonette', value: 'maisonette' },
        { name: 'Apartment', value: 'apartment' }
    ],
    parkingArray: [
        { name: 'On-Site Free', value: 'on-site-free' },
        { name: 'On-Site Chargeable', value: 'on-site-chargeable' },
        { name: 'Off-Site Free', value: 'off-site-free' },
        { name: 'Off-Site Chargeable', value: 'off-site-chargeable' }
    ],
    checkInOptions: [
        { name: 'Meet & Greet', value: 'meet-and-greet' },
        { name: 'Key Box', value: 'key-box' }
    ],
    petsPolicyOptions: [
        { name: 'Yes - Free Of Charge', value: 'free' },
        { name: 'Yes - Chargeable', value: 'chargeable' },
        { name: 'No', value: 'no' }
    ],
    bedConfigurationArray: [
        { name: 'Single', value: 'single' },
        { name: 'Double', value: 'double' },
        { name: 'King', value: 'king' },
        { name: 'Sofa Bed', value: 'sofa' },
        { name: 'Cots', value: 'cots' },
        { name: 'Twins Single', value: 'twins' }
    ],
    bathroomConfigurationArray: [
        { name: 'WC', value: 'wc' },
        { name: 'Walk In Shower', value: 'walk-in-shower' },
        { name: 'Wet Room', value: 'wet-room' },
        { name: 'Bath', value: 'bath' },
        { name: 'Bath + Shower In Bath', value: 'bath-plus-shower' }
    ],
    bathroomValueConfig: [
        { name: '0.5', value: '0.5' },
        { name: '1', value: '1' }
    ],
    houseKeepingArray: [
        { name: 'Daily - Included', value: 'daily-included' },
        { name: 'Daily - Extra Charge', value: 'daily-extra-charge' },
        { name: 'Weekly - Included', value: 'weekly-included' },
        { name: 'Weekly - Extra Charge', value: 'weekly-extra-charge' },
        { name: 'Fortnightly - Included', value: 'fortnightly-included' },
        { name: 'Fortnightly - Extra Charge', value: 'fortnightly-extra-charge' },
        { name: 'Upon Request - Included', value: 'upon-request-included' },
        { name: 'Upon Request - Extra Charge', value: 'upon-request-extra-charge' }
    ],
    statusConfigArray: [
        { name: 'Live', value: 'live' },
        { name: 'Rejected', value: 'rejected' },
        { name: 'Booked', value: 'booked' }
    ],
    videoConfigArray: [
        { name: 'Vimeo', value: 'vimeo' },
        { name: 'YouTube', value: 'youtube' }
    ]
};

export const initialState = {
    type: '',
    floor: '',
    livePropertyLink: '',
    address: {
        number: '', street: '', city: '', zip: ''
    },
    summary: {
        general: {
            // desk: { isAvailable: true, value: 'desk' },
            parking: { isAvailable: true, value: 'parking' },
            petFriendly: { isAvailable: true, value: 'petFriendly' },
            tv: { isAvailable: true, value: 'tv' },
            wifi: { isAvailable: true, value: 'wifi' },
            ventilation: { isAvailable: false, value: 'ventilation' },
            workspace: { isAvailable: true, value: 'workspace' },
            elevator: { isAvailable: false, value: 'elevator' }
        },
        kitchen: {
            microwave: { isAvailable: true, value: 'microwave' },
            oven: { isAvailable: true, value: 'oven' },
            hob: { isAvailable: true, value: 'hob' },
            fridge: { isAvailable: true, value: 'fridge' },
            freezer: { isAvailable: true, value: 'freezer' },
            kettle: { isAvailable: true, value: 'kettle' },
            toaster: { isAvailable: true, value: 'toaster' },
            dishwasher: { isAvailable: true, value: 'dishwasher' }
        },
        laundry: {
            washingMachine: { isAvailable: true, value: 'washingMachine' },
            clothesHorse: { isAvailable: true, value: 'clothesHorse' },
            iron: { isAvailable: true, value: 'iron' },
            tumbleDryer: { isAvailable: false, value: 'tumbleDryer' }
        },
        outside: {
            garden: { isAvailable: true, value: 'garden' },
            balcony: { isAvailable: true, value: 'balcony' },
            patio: { isAvailable: true, value: 'patio' },
            bbq: { isAvailable: true, value: 'bbq' }
        },
        safety: {
            carbonMonoxideAlarm: { isAvailable: true, value: 'carbonMonoxideAlarm' },
            smokeAlarm: { isAvailable: true, value: 'smokeAlarm' },
            gasCertificate: { isAvailable: true, value: 'gasCertificate' },
            eicrRates: { isAvailable: true, value: 'eicrRates' },
        }
    },
    parkingType: { value: 'off-site-chargeable' },
    checkInProcess: { value: 'key-box' },
    petsPolicy: { value: 'chargeable' },
    housekeeping: { value: 'upon-request-extra-charge' },
    cancellation: 'Non refundable',
    checkIn: '16:00',
    checkOut: '10:00',
    bedrooms: [{ type: 'bedroom', name: 'Bedroom', beds: [{ type: 'single' }] }],
    livingRooms: [],
    bathrooms: [{ type: 'wc', value: 0.5 }],
    videos: [],
    sellingPoints: [
        { text: 'All bills included. No extra charges' },
        { text: 'Guests have exclusive usage of the property' }
    ],
    landlord: {
        name: '',
        email: '',
        phone: '',
        nightlyRate: '',
        deposit: '',
        cleaningFee: '',
        parking: '',
        petFee: '',
        other: '',
        margin: '10'
    },
    external: {
        nightlyRate: '',
        deposit: '',
        cleaningFee: '',
        parking: '',
        petFee: '',
        other: ''
    }
};