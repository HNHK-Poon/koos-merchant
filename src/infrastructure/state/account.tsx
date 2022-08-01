import {
    AnyAction,
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';

export const getAccount = createAsyncThunk(
    'account/getAccount',
    async (service: any, { getState, dispatch }) => {
        const [err, res] = await service();
        if (res) {
            console.log('getAccount', res);
            return res.data;
        }
    }
);

// const conferencesAdapter = createEntityAdapter();

// export const {
//     selectAll: selectConferences,
//     selectById: selectConferenceById,
// } = conferencesAdapter.getSelectors((state) => state.conferences);

interface AccountState {
    MerchantId: string;
    Address: string;
    ShopName: string;
    ShopCategory: string;
    SubCategories: string[];
    Country: string;
    CommissionRate: number;
    PhoneNumber: string;
    WebsiteUrl: string;
    GoogleMapUrl: string;
    Description: string;
    Longitude: string;
    Latitude: string;
    BlockPropertiesId: string;
}


const accountSlice = createSlice({
    name: 'account',
    initialState: {
        MerchantId: '',
        ShopName: ''
    },
    reducers: {},
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(
            getAccount.fulfilled,
            (state, action: PayloadAction<any>) => {
                console.log('action', action);
                // The type signature on action.payload matches what we passed into the generic for `normalize`, allowing us to access specific properties on `payload.articles` if desired
                state.MerchantId = action.payload.MerchantId;
                state.ShopName = action.payload.ShopName;
            }
        );
    },
});

// export const { updateConference, updateConferences } = accountSlice.actions;
export const selectAccount = (state: any) => state.account;

export default accountSlice.reducer;
