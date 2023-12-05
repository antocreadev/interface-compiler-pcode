"use client";
import { useRef, useState } from "react";
import SyntaxAnalysis from "@/compiler/SyntaxAnalysis";

import type { RootState } from '@/store'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '@/features/counter/counterSlice'

export default function Home() {
  // ref
  const contentTextArea = useRef<HTMLTextAreaElement>(null);

  // state
  const [content, setContent] = useState<string>("");
  const [ast, setAST] = useState<any>(null);
  const [error, setError] = useState<string>("");

  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <main>
<textarea
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
></textarea>

      <p>{content}</p>
      <pre>{JSON.stringify(ast, null, 2)}</pre>
      <p>Erreur : {error}</p>


      <div>
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
    </div>
    </main>
  );
}
