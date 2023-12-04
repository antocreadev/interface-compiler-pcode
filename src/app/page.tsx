"use client";
import { useRef, useState } from "react";
import SyntaxAnalysis from "@/compiler/SyntaxAnalysis";

export default function Home() {
  // ref
  const contentTextArea = useRef<HTMLTextAreaElement>(null);

  // state
  const [content, setContent] = useState<string>("");
  const [ast, setAST] = useState<any>(null);
  const [error, setError] = useState<string>("");

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
    </main>
  );
}
