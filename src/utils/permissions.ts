export const items = {
    navigation: {
        HOME: 'HOME',
        ACCOUNTS: 'ACCOUNTS',
        PROPERTIES: 'PROPERTIES',
        BOOKINGS: 'BOOKINGS'
    },
    actions: {
        ACCOUNT_DATA: 'ACCOUNT_DATA',
        DELETE_PROPERTY: 'DELETE_PROPERTY'
    }
}

export const roles = {
    USER: 'user',
    MODERATOR: 'moderator',
    ADMIN: 'admin',
    MASTERADMIN: 'masteradmin'
}

const mapping = new Map();

mapping.set(items.navigation.HOME, [roles.USER, roles.MODERATOR, roles.ADMIN, roles.MASTERADMIN]);
mapping.set(items.navigation.PROPERTIES, [roles.USER, roles.MODERATOR, roles.ADMIN, roles.MASTERADMIN]);
mapping.set(items.navigation.BOOKINGS, [roles.USER, roles.MODERATOR, roles.ADMIN, roles.MASTERADMIN]);
mapping.set(items.navigation.ACCOUNTS, [roles.MASTERADMIN]);

mapping.set(items.actions.DELETE_PROPERTY, [roles.MASTERADMIN]);
mapping.set(items.actions.ACCOUNT_DATA, [roles.MASTERADMIN]);

export const hasPermission = (file: string, action: string) => {
    if (!file) {
        return false;
    }

    if (mapping.has(action)) {
        return mapping.get(action).includes(file);
    }

    return false;
}