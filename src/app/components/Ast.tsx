"use client";
// import redux toolkit
import type { RootState } from "@/store";
import { useSelector } from "react-redux";
import CodeEditor from "./CodeEditor";

export default function Ast() {
  // redux toolkit
  const ast = useSelector((state: RootState) => state.ast.value);
  return (
      <CodeEditor readonly={true} initialValue={ast == null ? "" : JSON.stringify(ast, null, 4)} ></CodeEditor>
  );
}