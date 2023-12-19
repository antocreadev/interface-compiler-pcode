"use client";
// import redux toolkit
import type { RootState } from "@/store";
import { useSelector } from "react-redux";
import CodeEditor from "./CodeEditor";

export default function HistoPcode() {
  // redux toolkit
  const histoPcode = useSelector((state: RootState) => state.histPcode.value);
  return (
      <CodeEditor readonly={true} initialValue={histoPcode == null ? "" : JSON.stringify(histoPcode, null, 4)} ></CodeEditor>
  );
}