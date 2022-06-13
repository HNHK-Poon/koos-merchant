import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    email: string;
    password: string;
    contact: string;
    userId: string;
    permissions: [];
}

interface Payload {
  key:'email' | 'password' | 'contact' | 'userId' | 'permissions',
  value: any
}

const initialState: AuthState = {
    email: '',
    password: '',
    contact: '',
    userId: '',
    permissions: []
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        editAuth: (state, action:PayloadAction<Payload>) => {
            state[action.payload.key] = action.payload.value;
        },
    },
});

// Action creators are generated for each case reducer function
export const { editAuth } = authSlice.actions;

export default authSlice.reducer;
