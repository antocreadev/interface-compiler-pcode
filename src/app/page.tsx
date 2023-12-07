"use client";
// import Components
import TextareaCode from "@/app/components/TextareaCode";

// import redux toolkit
import type { RootState } from '@/store'
import { useSelector } from 'react-redux'
import Ast from "./components/Ast";

export default function Home() {
  // redux toolkit
  const code = useSelector((state: RootState) => state.code.value)

  return (
    <main>
    <TextareaCode></TextareaCode>
    <pre>{code}</pre>
    <Ast></Ast>
    </main>
  );
}
