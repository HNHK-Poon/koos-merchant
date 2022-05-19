import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    email: string;
    password: string;
    contact: string;
}

interface Payload {
  key:'email' | 'password' | 'contact',
  value: any
}

const initialState: AuthState = {
    email: '',
    password: '',
    contact: '',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        editAuth: (state, action:PayloadAction<Payload>) => {
            state[action.payload.key] += action.payload.value;
        },
    },
});

// Action creators are generated for each case reducer function
export const { editAuth } = authSlice.actions;

export default authSlice.reducer;
