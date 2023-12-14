import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Program } from "@/compiler/ast";
export interface astState {
  value: Program | null;
}

const initialState: astState = {
  value: null,
};

export const astSlice = createSlice({
  name: "ast",
  initialState,
  reducers: {
    updateAst: (state, action: PayloadAction<Program>) => {
      state.value = action.payload;
    },
  },
});

export const { updateAst } = astSlice.actions;

export default astSlice.reducer;
