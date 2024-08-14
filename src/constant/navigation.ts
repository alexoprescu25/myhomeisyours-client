import { items } from "utils/permissions"
import { faHome, faUserGroup, faCity, faCalendarDays, faPenToSquare } from "@fortawesome/free-solid-svg-icons"

export const myAccountNavItems = {
    home: {
        name: 'Home',
        path: '/dashboard',
        icon: faHome,
        end: true,
        permissions: items.navigation.HOME
    },
    accounts: {
        name: 'Accounts',
        path: '/dashboard/accounts',
        icon: faUserGroup,
        end: false,
        permissions: items.navigation.ACCOUNTS
    },
    create: {
        name: 'Create Property',
        path: '/dashboard/properties/create',
        icon: faPenToSquare,
        end: false,
        permissions: items.navigation.PROPERTIES
    },
    listings: {
        name: 'Listings',
        path: '/dashboard/properties/list',
        icon: faCity,
        end: false,
        permissions: items.navigation.PROPERTIES
    },
    bookings: {
        name: 'Bookings',
        path: '/dashboard/bookings',
        icon: faCalendarDays,
        end: false,
        permissions: items.navigation.BOOKINGS
    }
}