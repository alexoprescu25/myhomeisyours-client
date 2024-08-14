import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type SettingsState = {
    theme: {
        type: string;
        custom: boolean;
    };
    language: string;
}

const initialState: SettingsState = {
    theme: {
        type: 'light',
        custom: false
    },
    language: 'en'
}

export const settingsSlice = createSlice({
    name: 'settings',
    initialState: initialState,
    reducers: {
        toggleTheme: (state, action: PayloadAction<string>) => {
            state.theme = {
                type: action.payload,
                custom: true
            };
        },
        toggleLanguage: (state, action: PayloadAction<string>) => {
            state.language = action.payload;
        }
    }
})

export const { toggleTheme, toggleLanguage } = settingsSlice.actions;