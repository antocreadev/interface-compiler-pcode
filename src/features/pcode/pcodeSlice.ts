import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { pcode } from '@/compiler/TranslatePcode';
export interface pcodeState {
  value: pcode[] | null;
}

const initialState: pcodeState = {
  value: null,
};

export const pcodeSlice = createSlice({
  name: 'pcode',
  initialState,
  reducers: {
    updatePcode : (state, action: PayloadAction<pcode[]>) => {
      state.value = action.payload;
    },
  },
});

export const { updatePcode } = pcodeSlice.actions;

export default pcodeSlice.reducer;