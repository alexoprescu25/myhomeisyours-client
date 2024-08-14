const logError = () => {
    console.warn(
        'Your browser does not allow using local storage. Some settings will not be persisted between sessions.'
    );
};

export const getItem = (key: string) => {
    try {
        return localStorage.getItem(key);
    } catch (error) {
        logError();
        return null;
    }
}

export const setItem = (key: string, item: string) => {
    try {
        localStorage.setItem(key, item);
    } catch (error) {
        logError();
    }
}

export const removeItem = (key: string) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        logError();
    }
}