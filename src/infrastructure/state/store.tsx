import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import transactionsReducer from './transaction';
import assetReducer from './asset';
import blockReducer from './block';
import accountReducer from './account';
import walletTransactionReducer from './walletTransaction';

export const store = configureStore({
    reducer: { auth: authReducer, transactions: transactionsReducer, asset: assetReducer, blocks: blockReducer, account: accountReducer, walletTransactions: walletTransactionReducer },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
