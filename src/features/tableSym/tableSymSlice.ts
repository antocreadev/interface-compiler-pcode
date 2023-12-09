import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Stmt } from '@/compiler/ast';
export interface tableSymState {
  value: string[] | null;
}

const initialState: tableSymState = {
  value: null,
};

export const tableSymSlice = createSlice({
  name: 'tableSym',
  initialState,
  reducers: {
    updateTableSym: (state, action: PayloadAction<string[]>) => {
      state.value = action.payload;
    },
  },
});

export const { updateTableSym } = tableSymSlice.actions;

export default tableSymSlice.reducer;