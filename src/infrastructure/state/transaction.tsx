import {
	createEntityAdapter,
	createSlice,
	configureStore,
	createAsyncThunk,
	PayloadAction,
} from "@reduxjs/toolkit";

type Transaction = {
	id: string;
	amount: number;
	createdBy: string;
	createdByName: string;
	createdDateTime: string;
	domainEvents: [];
	lastUpdatedBy: string;
	lastUpdatedByName: string;
	lastUpdatedDateTime: string;
	merchantId: string;
	paymentType: number;
	productName: string;
	status: number;
	transactionId: string;
	userId: string;
};

export const getTransactions = createAsyncThunk(
	"transactions/get",

	async (service: any) => {
		const [err, res] = await service();
		console.log(res);
		if (res) {
			let copied = Object.assign([], res.data);
			copied.map((transaction: Transaction) => {
				transaction.id = transaction.transactionId;
			});
			copied.id = copied.transactionId; // on object create new key name. Assign old value to this
			delete copied.transactionId;
			return copied;
		}
	}
);
console.log(getTransactions);
const transacationsAdapter = createEntityAdapter<Transaction>({});

export const {
	selectAll: selectTransactions,
	selectById: selectTransactionById,
} = transacationsAdapter.getSelectors<RootState>((state) => state.transactions);

const transacationsSlice = createSlice({
	name: "transacations",
	initialState: transacationsAdapter.getInitialState(),
	reducers: {
		// Can pass adapter functions directly as case reducers.  Because we're passing this
		// as a value, `createSlice` will auto-generate the `bookAdded` action type / creator
		transactionAdded: transacationsAdapter.addOne,
		transactionssReceived(state, action) {
			// Or, call them as "mutating" helpers in a case reducer
			transacationsAdapter.setAll(state, action.payload.books);
		},
		transactionUpdate: transacationsAdapter.updateOne,
	},
	extraReducers: (builder) => {
		// Add reducers for additional action types here, and handle loading state as needed
		builder.addCase(
			getTransactions.fulfilled,
			(state, action: PayloadAction<Transaction[]>) => {
				// The type signature on action.payload matches what we passed into the generic for `normalize`, allowing us to access specific properties on `payload.articles` if desired
				console.log("action", action);
				transacationsAdapter.setAll(state, action.payload);
			}
		);
	},
});

export const store = configureStore({
	reducer: {
		transactions: transacationsSlice.reducer,
	},
});

type RootState = ReturnType<typeof store.getState>;

// { ids: [], entities: {} }

// Can create a set of memoized selectors based on the location of this entity state
export const transactionsSelectors =
	transacationsAdapter.getSelectors<RootState>((state) => state.transactions);

// And then use the selectors to retrieve values
const allBooks = transactionsSelectors.selectAll(store.getState());

export const { transactionAdded, transactionssReceived, transactionUpdate } =
	transacationsSlice.actions;

export default transacationsSlice.reducer;
