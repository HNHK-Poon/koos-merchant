import {
    createEntityAdapter,
    createSlice,
    configureStore,
    createAsyncThunk,
    PayloadAction,
} from '@reduxjs/toolkit';

type Block = {
    id: string;
    BlockId: string;
    UserId: string;
    WalletId: string;
    Level: number;
    LevelLocation: number;
    CurrentAmount: number;
    BlockPropertiesId: string;
    RewardSequence: number;
    NextReward: number;
    Status: string;
};

type BlockProperties = {
    BlockPropertiesId: string;
    Name: string;
    BlockSpendSize: number,
    Discount: number,
    IsDefault: boolean,
    CreatedBy: string;
    CreatedByName: string;
    CreatedDateTime: string;
    LastUpdatedBy: string;
    LastUpdatedByName: string;
    LastUpdatedDateTime: string;
    DomainEvents: []
};

export const getCurrentBlock = createAsyncThunk(
    'blocks/get',

    async (service: any) => {
        const [err, res] = await service();
        if (res) {
            return res.data;
        }
    }
);

export const getBlocks = createAsyncThunk(
    'blocks/getCurrent',

    async (service: any) => {
        const [err, res] = await service();
        if (res) {
            let copied = Object.assign([], res.data);
            console.log('res', res, copied);
            copied.map((block: Block) => {
                block.id = block.BlockId;
            });
            return copied;
        }
    }
);

export const getBlockProperties = createAsyncThunk(
    'blocks/getBlockProperties',

    async (service: any) => {
        const [err, res] = await service();
        if (res) {
            let copied = Object.assign([], res.data);
            console.log('res', res, copied);
            copied.map((block: Block) => {
                block.id = block.BlockPropertiesId;
            });
            return copied;
        }
    }
);


const blocksAdapter = createEntityAdapter<Block>({});
const blockPropertiesAdapter = createEntityAdapter<BlockProperties>({});

export const { selectAll: selectBlocks, selectById: selectBlockById } =
    blocksAdapter.getSelectors<RootState>((state) => state.blocks.blocks);

export const { selectAll: selectBlockProperties, selectById: selectBlockPropertiesById } =
    blockPropertiesAdapter.getSelectors<RootState>((state) => state.blocks.blockProperties);

const blocksSlice = createSlice({
    name: 'blocks',
    initialState: {
        currentBlock: {} as Block,
        blocks: blocksAdapter.getInitialState({}),
        blockProperties: blockPropertiesAdapter.getInitialState({}),
    },
    reducers: {
        // Can pass adapter functions directly as case reducers.  Because we're passing this
        // as a value, `createSlice` will auto-generate the `bookAdded` action type / creator
        // transactionAdded: blocksAdapter.addOne,
        // transactionssReceived(state, action) {
        //     blocksAdapter.setAll(state, action.payload.books);
        // },
        // transactionUpdate: blocksAdapter.updateOne,
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(
            getBlocks.fulfilled,
            (state, action: PayloadAction<Block[]>) => {
                // The type signature on action.payload matches what we passed into the generic for `normalize`, allowing us to access specific properties on `payload.articles` if desired
                console.log('action', action);
                blocksAdapter.setAll(state.blocks, action.payload);
            }
        ),
        builder.addCase(
            getCurrentBlock.fulfilled,
            (state, action: PayloadAction<Block>) => {
                // The type signature on action.payload matches what we passed into the generic for `normalize`, allowing us to access specific properties on `payload.articles` if desired
                console.log('action', action);
                state.currentBlock = action.payload;
            }
        ),
        builder.addCase(
            getBlockProperties.fulfilled,
            (state, action: PayloadAction<BlockProperties[]>) => {
                // The type signature on action.payload matches what we passed into the generic for `normalize`, allowing us to access specific properties on `payload.articles` if desired
                console.log('action', action);
                blockPropertiesAdapter.setAll(state.blockProperties, action.payload);
            }
        )
    },
});

export const store = configureStore({
    reducer: {
        blocks: blocksSlice.reducer,
    },
});

type RootState = ReturnType<typeof store.getState>;

// { ids: [], entities: {} }

export const blocksSelectors = blocksAdapter.getSelectors<RootState>(
    (state) => state.blocks.blocks
);
export const blockPropertiesSelectors = blockPropertiesAdapter.getSelectors<RootState>(
    (state) => state.blocks.blockProperties
);

export const {} = blocksSlice.actions;

export default blocksSlice.reducer;
