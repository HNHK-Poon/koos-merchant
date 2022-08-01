import {
    AnyAction,
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';

export const getWalletBalance = createAsyncThunk(
    'asset/getWalletBalance',
    async (service: any, { getState, dispatch }) => {
        console.log('getWalletBalance');
        const [err, res] = await service()

        if(res) {
            return res.data
        }
    }
);

// const conferencesAdapter = createEntityAdapter();

// export const {
//     selectAll: selectConferences,
//     selectById: selectConferenceById,
// } = conferencesAdapter.getSelectors((state) => state.conferences);

interface AssetState {
    WalletId: string;
    Amount: number;
}

const initialState: AssetState = {
    WalletId: '',
    Amount: 0,
};

const assetSlice = createSlice({
    name: 'asset',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(
            getWalletBalance.fulfilled,
            (state, action: PayloadAction<any>) => {
                console.log('action', action);
                // The type signature on action.payload matches what we passed into the generic for `normalize`, allowing us to access specific properties on `payload.articles` if desired
                state.Amount = action.payload.Amount;
                state.WalletId = action.payload.WalletId;
            }
        );
    },
});

// export const { updateConference, updateConferences } = assetSlice.actions;
export const selectAsset = (state: any) => state.asset;

export default assetSlice.reducer;
