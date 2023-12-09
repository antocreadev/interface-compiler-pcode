"use client";
// import Components
import TextareaCode from "@/app/components/TextareaCode";

// import redux toolkit
import type { RootState } from '@/store'
import { useSelector } from 'react-redux'

// import components
import Ast from "./components/Ast";
import Error from "./components/Error";
import TableSym from "./components/TableSym";

export default function Home() {
  // redux toolkit
  const code = useSelector((state: RootState) => state.code.value)
  const error = useSelector((state: RootState) => state.error.value)
  return (
    <main>
    <TextareaCode></TextareaCode>
    <pre>{code}</pre>
    <Ast></Ast>
    <Error></Error>
    <TableSym></TableSym>


    </main>
  );
}
