import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CodeState {
  value: string;
}

const initialState: CodeState = {
  value: `var a = 0\nvar b = 0\ndo{\n  a = read()\n  b = b +a\n}\nwhile(a!=0)\nwrite(b)`,
};

export const codeSlice = createSlice({
  name: "code",
  initialState,
  reducers: {
    updateCode: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateCode } = codeSlice.actions;

export default codeSlice.reducer;
