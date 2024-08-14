import { lazy, type FC } from "react";

const View: FC = lazy(() => import('views/account/View'));
const Accounts: FC = lazy(() => import('views/account/accounts/Accounts'));
const AccountDetails: FC = lazy(() => import('views/account/accounts/AccountDetails'));

const Listings: FC = lazy(() => import('views/account/properties/list/Listings'));
const Property: FC = lazy(() => import('views/account/properties/details/Property'));
const CreateProperty: FC = lazy(() => import('views/account/properties/create/CreateProperty'));
const CreatedPropertyScreen: FC<{ property: any; onChangeStep: () => void }> = lazy(() => import('views/account/properties/create/CreatedPropertyScreen'));
const EditProperty: FC = lazy(() => import('views/account/properties/edit/EditProperty'));

const Bookings: FC = lazy(() => import('views/account/bookings/Bookings'));

export default {
    home: { index: true, exact: true, component: View, path: '' },
    accounts: { index: false, component: Accounts, path: 'accounts' },
    accountDetails: { index: false, component: AccountDetails, path: 'accounts/:accountId' },
    listings: { index: false, component: Listings, path: 'properties/list' },
    property: { index: false, component: Property, path: 'properties/list/:propertyId' },
    createProperty: { index: false, component: CreateProperty, path: 'properties/create' },
    createdPropertyScreen: { index: false, component: CreatedPropertyScreen, path: 'properties/success' },
    editProperty: { index: false, component: EditProperty, path: 'properties/edit/:propertyId' },
    bookings: { index: false, component: Bookings, path: 'bookings' },
}