import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from 'redux-persist';

import { uiSlice } from "./ui/ui-slice";
import { settingsSlice } from "./settings/settings-slice";

const persistConfig = {
    key: 'root',
    storage
}

const persistedSettingsReducer = persistReducer(persistConfig, settingsSlice.reducer)

export const store = configureStore({
    reducer: {
        settings: persistedSettingsReducer,
        ui: uiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;