import { createEntityAdapter, createSlice, configureStore, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

type Block = {
  id: string;
  blockId: string;
  userId: string;
  walletId: string;
  level: number;
  levelLocation: number;
  currentAmount: number;
  blockPropertiesId: string;
  rewardSequence: number;
  nextReward: number;
  status: string;
};

type BlockProperties = {
  blockPropertiesId: string;
  name: string;
  blockSpendSize: number;
  discount: number;
  isDefault: boolean;
  createdBy: string;
  createdByName: string;
  createdDateTime: string;
  lastUpdatedBy: string;
  lastUpdatedByName: string;
  lastUpdatedDateTime: string;
  domainEvents: [];
};

export const getCurrentBlock = createAsyncThunk(
  'blocks/get',

  async (service: any) => {
    const [err, res] = await service();
    if (res) {
      return res.data;
    }
    if (err.response.data.errorCode == 30001) {
      return {
        CurrentAmount: 0
      };
    } else {
      return {};
    }
  }
);

export const getBlocks = createAsyncThunk(
  'blocks/getCurrent',

  async (service: any) => {
    const [err, res] = await service();
    if (res) {
      let copied = Object.assign([], res.data);
      copied.map((block: Block) => {
        block.id = block.blockId;
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
      copied.map((block: Block) => {
        block.id = block.blockPropertiesId;
      });
      return copied;
    }
  }
);

export const getMerchantList = createAsyncThunk(
  'merchants',

  async (service: any) => {
    const [err, res] = await service();
    if (res) {
      let copied = Object.assign([], res.data);
      copied.map((block: Block) => {
        block.id = block.blockPropertiesId;
      });
      return copied;
    }
  }
);

const blocksAdapter = createEntityAdapter<Block>({});
const blockPropertiesAdapter = createEntityAdapter<BlockProperties>({});

export const { selectAll: selectBlocks, selectById: selectBlockById } = blocksAdapter.getSelectors<RootState>(
  (state) => state.blocks.blocks
);

export const { selectAll: selectBlockProperties, selectById: selectBlockPropertiesById } =
  blockPropertiesAdapter.getSelectors<RootState>((state) => state.blocks.blockProperties);

const blocksSlice = createSlice({
  name: 'blocks',
  initialState: {
    currentBlock: {} as Block,
    blocks: blocksAdapter.getInitialState({}),
    blockProperties: blockPropertiesAdapter.getInitialState({}),
    merchantList: {} as any
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
    builder.addCase(getBlocks.fulfilled, (state, action: PayloadAction<Block[]>) => {
      // The type signature on action.payload matches what we passed into the generic for `normalize`, allowing us to access specific properties on `payload.articles` if desired
      blocksAdapter.setAll(state.blocks, action.payload);
    }),
      builder.addCase(getCurrentBlock.fulfilled, (state, action: PayloadAction<Block>) => {
        // The type signature on action.payload matches what we passed into the generic for `normalize`, allowing us to access specific properties on `payload.articles` if desired
        state.currentBlock = action.payload;
      }),
      builder.addCase(getBlockProperties.fulfilled, (state, action: PayloadAction<BlockProperties[]>) => {
        // The type signature on action.payload matches what we passed into the generic for `normalize`, allowing us to access specific properties on `payload.articles` if desired
        blockPropertiesAdapter.setAll(state.blockProperties, action.payload);
      }),
      builder.addCase(getMerchantList.fulfilled, (state, action: PayloadAction<any>) => {
        // The type signature on action.payload matches what we passed into the generic for `normalize`, allowing us to access specific properties on `payload.articles` if desired
        state.merchantList = action.payload;
      });
  }
});

export const store = configureStore({
  reducer: {
    blocks: blocksSlice.reducer
  }
});

type RootState = ReturnType<typeof store.getState>;

// { ids: [], entities: {} }

export const blocksSelectors = blocksAdapter.getSelectors<RootState>((state) => state.blocks.blocks);
export const blockPropertiesSelectors = blockPropertiesAdapter.getSelectors<RootState>(
  (state) => state.blocks.blockProperties
);

export const {} = blocksSlice.actions;

export default blocksSlice.reducer;
