"use client";
// import hook react
import { useRef, useState } from "react";

// import compiler
import SyntaxAnalysis from "@/compiler/SyntaxAnalysis";

// import Components
import TextareaCode from "@/app/components/textareaCode";

// import redux toolkit
import type { RootState } from '@/store'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '@/features/counter/counterSlice'

export default function Home() {

  // ref react
  const contentTextArea = useRef<HTMLTextAreaElement>(null);

  // state react
  const [content, setContent] = useState<string>("");
  const [ast, setAST] = useState<any>(null);
  const [error, setError] = useState<string>("");

  // redux toolkit
  const count = useSelector((state: RootState) => state.counter.value)
  const code = useSelector((state: RootState) => state.code.value)
  const dispatch = useDispatch()

  return (
    <main>
      
    <TextareaCode></TextareaCode>
    <p>{code}</p>



{/* <textarea
  onChange={() => {
    if (contentTextArea && contentTextArea.current) {
      const newContent = contentTextArea.current.value;
      try {
        const parser = new SyntaxAnalysis();
        const newAST = parser.produceAST(newContent);
        setAST(newAST);
        setError("");
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
      setContent(newContent);
    }
  }}
  ref={contentTextArea}
></textarea> */}

      {/* <p>{content}</p>
      <pre>{JSON.stringify(ast, null, 2)}</pre>
      <p>Erreur : {error}</p> */}


      {/* <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div> */}
    </main>
  );
}
