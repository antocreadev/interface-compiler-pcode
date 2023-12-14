import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface errorState {
  value: string;
}

const initialState: errorState = {
  value: "",
};

export const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    updateError: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { updateError } = errorSlice.actions;

export default errorSlice.reducer;
