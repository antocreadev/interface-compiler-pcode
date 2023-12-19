"use client";
import type { RootState } from "@/store";
import { useSelector } from "react-redux";
import CodeEditor from "./CodeEditor";

export default function Pcode() {
  // redux toolkit
  const pcode = useSelector((state: RootState) => state.pcode.value);
  
  return (
      <CodeEditor readonly={true} initialValue={pcode == null ? "" : JSON.stringify(pcode, null, 4)} ></CodeEditor>
  );
}
