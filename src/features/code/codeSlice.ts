import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CodeState {
  value: string
}

const initialState: CodeState = {
  value: "",
}

export const codeSlice = createSlice({
  name: 'code',
  initialState,
  reducers: {
    updateCode : (state, action: PayloadAction<string>) => {
        state.value = action.payload
        }
  },
})

// Action creators are generated for each case reducer function
export const { updateCode, } = codeSlice.actions

export default codeSlice.reducer