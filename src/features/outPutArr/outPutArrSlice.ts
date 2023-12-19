import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface outPutArrState {
  value: number[] | null;
}

const initialState: outPutArrState = {
  value: null,
};

export const outPutArrSlice = createSlice({
  name: 'outPutArr',
  initialState,
  reducers: {
    updateOutPutArr: (state, action: PayloadAction<number[]>) => {
      state.value = action.payload;
    },
  },
});

export const { updateOutPutArr } = outPutArrSlice.actions;

export default outPutArrSlice.reducer;