import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "@/features/counter/counterSlice";
import codeReducer from "@/features/code/codeSlice";
import astReducer from "@/features/ast/astSlice";
import errorReducer from "@/features/error/errorSlice";
import tableSymReducer from "@/features/tableSym/tableSymSlice";
import pcodeReducer from "@/features/pcode/pcodeSlice";
import histPcodeReducer from "@/features/histoPcode/histoPcodeSlice";
import outPutArrReducer from "@/features/outPutArr/outPutArrSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    code: codeReducer,
    ast: astReducer,
    error: errorReducer,
    tableSym: tableSymReducer,
    pcode: pcodeReducer,
    histPcode: histPcodeReducer,
    outPutArr: outPutArrReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
