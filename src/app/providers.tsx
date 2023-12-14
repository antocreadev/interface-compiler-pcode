// https://stackoverflow.com/questions/77400272/setting-up-redux-toolkit-with-next-js-14-0-1
"use client";
import { Provider } from "react-redux";
import { store } from "@/store";

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
