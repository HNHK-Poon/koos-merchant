import {
    createEntityAdapter,
    createSlice,
    configureStore,
    createAsyncThunk,
    PayloadAction,
} from '@reduxjs/toolkit';

type Transaction = {
    id: string;
    UserId: string;
    WalletId: string;
    WalletTransactionId: string;
    TransactionType: number;
    Amount: number;
    FromWalletId: string;
    ToWalletId: string;
    FromType: number;
    ToType: number;
    ActionBankInfo: string;
    CreatedBy: string;
    CreatedByName: string;
    CreatedDateTime: string;
    DomainEvents: [];
    LastUpdatedBy: string;
    LastUpdatedByName: string;
    LastUpdatedDateTime: string;
    Status: number;
};

export const getWalletTransactions = createAsyncThunk(
    'walletTransactions/get',

    async (service: any) => {
        console.log("get wallet transactions");
        const [err, res] = await service();
        if (res) {
            let copied = Object.assign([], res.data);
            console.log("copied", res.data)
            copied.map((transaction: Transaction) => {
                transaction.id = transaction.WalletTransactionId;
            });
            console.log("copied", copied)
            delete copied.TransactionId;
            return copied;
        }
    }
);

const walletTransacationsAdapter = createEntityAdapter<Transaction>({});

export const {
    selectAll: selectWalletTransactions,
    selectById: selectWalletTransactionById,
} = walletTransacationsAdapter.getSelectors<RootState>(
    (state) => state.walletTransactions
);

const walletTransacationsSlice = createSlice({
    name: 'walletTransactions',
    initialState: walletTransacationsAdapter.getInitialState(),
    reducers: {
        // Can pass adapter functions directly as case reducers.  Because we're passing this
        // as a value, `createSlice` will auto-generate the `bookAdded` action type / creator
        transactionAdded: walletTransacationsAdapter.addOne,
        transactionssReceived(state, action) {
            // Or, call them as "mutating" helpers in a case reducer
            walletTransacationsAdapter.setAll(state, action.payload.books);
        },
        transactionUpdate: walletTransacationsAdapter.updateOne,
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(
            getWalletTransactions.fulfilled,
            (state, action: PayloadAction<Transaction[]>) => {
                // The type signature on action.payload matches what we passed into the generic for `normalize`, allowing us to access specific properties on `payload.articles` if desired
                console.log('action', action);
                walletTransacationsAdapter.setAll(state, action.payload);
            }
        );
    },
});

export const store = configureStore({
    reducer: {
        walletTransactions: walletTransacationsSlice.reducer,
    },
});

type RootState = ReturnType<typeof store.getState>;

console.log(store.getState().walletTransactions);
// { ids: [], entities: {} }

// Can create a set of memoized selectors based on the location of this entity state
export const walletTransactionsSelectors =
    walletTransacationsAdapter.getSelectors<RootState>(
        (state) => state.walletTransactions
    );


export const { transactionAdded, transactionssReceived, transactionUpdate } =
    walletTransacationsSlice.actions;

export default walletTransacationsSlice.reducer;
