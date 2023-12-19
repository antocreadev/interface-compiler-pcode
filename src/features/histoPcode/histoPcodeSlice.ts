import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface histoPcodeState {
  value: number[][] | null;
}

const initialState: histoPcodeState = {
  value: null,
};

export const histoPcodeSlice = createSlice({
  name: 'histoPcode',
  initialState,
  reducers: {
    updateHistoPcode: (state, action: PayloadAction<number[][]>) => {
      state.value = action.payload;
    },
  },
});

export const { updateHistoPcode } = histoPcodeSlice.actions;
export default histoPcodeSlice.reducer;