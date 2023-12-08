"use client";
// import redux toolkit
import type { RootState } from "@/store";
import { useSelector } from "react-redux";

export default function Ast() {
  // redux toolkit
  const ast = useSelector((state: RootState) => state.ast.value);

  return (
    <div>
      <pre>{ast == null ? "" : JSON.stringify(ast, null, 2)}</pre>
    </div>
  );
}
