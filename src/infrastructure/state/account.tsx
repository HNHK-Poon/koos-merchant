import {
	AnyAction,
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
	PayloadAction,
} from "@reduxjs/toolkit";

export const getAccount = createAsyncThunk(
	"account/getAccount",
	async (service: any, { getState, dispatch }) => {
		const [err, res] = await service();
		if (res) {
			console.log("getAccount", res);
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
	merchantId: string;
	address: string;
	shopName: string;
	shopCategory: string;
	subCategories: string[];
	country: string;
	commissionRate: number;
	phoneNumber: string;
	websiteUrl: string;
	googleMapUrl: string;
	description: string;
	longitude: string;
	latitude: string;
	blockPropertiesId: string;
}

const accountSlice = createSlice({
	name: "account",
	initialState: {
		merchantId: "",
		shopName: "",
	},
	reducers: {},
	extraReducers: (builder) => {
		// Add reducers for additional action types here, and handle loading state as needed
		builder.addCase(
			getAccount.fulfilled,
			(state, action: PayloadAction<any>) => {
				console.log("action", action);
				// The type signature on action.payload matches what we passed into the generic for `normalize`, allowing us to access specific properties on `payload.articles` if desired
				state.merchantId = action.payload.merchantId;
				state.shopName = action.payload.shopName;
			}
		);
	},
});

// export const { updateConference, updateConferences } = accountSlice.actions;
export const selectAccount = (state: any) => state.account;

export default accountSlice.reducer;
