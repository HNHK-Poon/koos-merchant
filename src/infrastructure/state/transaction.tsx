import {
    createEntityAdapter,
    createSlice,
    configureStore,
} from '@reduxjs/toolkit';

type Transaction = {
    id: string;
    name: string;
    amount: number;
    user: string;
    merchant: string;
    time: number;
    status: string;
};

const transacationsAdapter = createEntityAdapter<Transaction>({
    // Assume IDs are stored in a field other than `book.id`
    // selectId: (book) => book.bookId,
    // Keep the "all IDs" array sorted based on book titles
    // sortComparer: (a, b) => a.title.localeCompare(b.title),
});

export const {
    selectAll: selectTransactions,
    selectById: selectTransactionById,
  } = transacationsAdapter.getSelectors<RootState>(state => state.transactions);

const transacationsSlice = createSlice({
    name: 'transacations',
    initialState: transacationsAdapter.getInitialState(),
    reducers: {
        // Can pass adapter functions directly as case reducers.  Because we're passing this
        // as a value, `createSlice` will auto-generate the `bookAdded` action type / creator
        transactionAdded: transacationsAdapter.addOne,
        transactionsReceived(state, action) {
            // Or, call them as "mutating" helpers in a case reducer
            transacationsAdapter.setAll(state, action.payload.books);
        },
        transactionUpdate: transacationsAdapter.updateOne,
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
export const transactionsSelectors = transacationsAdapter.getSelectors<RootState>(
    (state) => state.transactions
);

export const { transactionAdded, transactionsReceived, transactionUpdate } = transacationsSlice.actions;

export default transacationsSlice.reducer;
