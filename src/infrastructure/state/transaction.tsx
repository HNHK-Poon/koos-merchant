import {
    createEntityAdapter,
    createSlice,
    configureStore,
    createAsyncThunk,
    PayloadAction,
} from '@reduxjs/toolkit';

type Transaction = {
    id: string;
    Amount: number;
    CreatedBy: string;
    CreatedByName: string;
    CreatedDateTime: string;
    DomainEvents: [];
    LastUpdatedBy: string;
    LastUpdatedByName: string;
    LastUpdatedDateTime: string;
    MerchantId: string;
    PaymentType: number;
    ProductName: string;
    Status: number;
    TransactionId: string;
    UserId: string;
};

export const getTransactions = createAsyncThunk(
    'transactions/get',

    async (service: any) => {
        const [err, res] = await service();
        if (res) {
            let copied = Object.assign([], res.data);
            console.log('res', res, copied);
            copied.map((transaction: Transaction) => {
                transaction.id = transaction.TransactionId
            })
            copied.id = copied.TransactionId; // on object create new key name. Assign old value to this
            delete copied.TransactionId;
            return copied;
        }
    }
);

const transacationsAdapter = createEntityAdapter<Transaction>({});

export const {
    selectAll: selectTransactions,
    selectById: selectTransactionById,
} = transacationsAdapter.getSelectors<RootState>((state) => state.transactions);

const transacationsSlice = createSlice({
    name: 'transacations',
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
                console.log('action', action);
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

console.log(store.getState().transactions);
// { ids: [], entities: {} }

// Can create a set of memoized selectors based on the location of this entity state
export const transactionsSelectors =
    transacationsAdapter.getSelectors<RootState>((state) => state.transactions);

// And then use the selectors to retrieve values
const allBooks = transactionsSelectors.selectAll(store.getState());

export const { transactionAdded, transactionssReceived, transactionUpdate } =
    transacationsSlice.actions;

export default transacationsSlice.reducer;
