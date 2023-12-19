"use client";
// import Components
import TextareaCode from "@/app/components/TextareaCode";

// import redux toolkit
import type { RootState } from "@/store";
import { useSelector } from "react-redux";

// import components
import Ast from "./components/Ast";
import Error from "./components/Error";
import TableSym from "./components/TableSym";
import Pcode from "./components/Pcode";
import Interpreter from "./components/Interpreter";

export default function Home() {
  // redux toolkit
  const code = useSelector((state: RootState) => state.code.value);
  return (
    <main className="w-screen h-screen">
      <div className="w-1/2 h-1/2">
        <TextareaCode></TextareaCode>
      </div>
      <Interpreter></Interpreter>
      <pre>{code}</pre>
      <Ast></Ast>
      <Error></Error>
      <TableSym></TableSym>
      <Pcode></Pcode>
    </main>
  );
}
