import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type StatusProps = 'success' | 'error' | 'info' | null;

type UiProps = {
    snackbar: {
        text: string | null; 
        type: StatusProps
    };
}

const initialState: UiProps = {
    snackbar: {
        text: null,
        type: null
    }
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState: initialState,
    reducers: {
        toggleSnackbar: (state, action: PayloadAction<{ text: string | null; type: StatusProps }>) => {
            state.snackbar = {
                text: action.payload.text,
                type: action.payload.type
            };
        }
    }
})

export const { toggleSnackbar } = uiSlice.actions;