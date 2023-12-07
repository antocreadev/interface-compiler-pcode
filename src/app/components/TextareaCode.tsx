"use client";
// import hook react
import { useRef } from "react"

// import redux toolkit
import { useDispatch } from 'react-redux'
import { updateCode } from '@/features/code/codeSlice'
import SyntaxAnalysis from "@/compiler/SyntaxAnalysis";
import { updateAst } from "@/features/ast/astSlice";

// component
const TextareaCode = () => {

    // ref react
    const contentTextArea = useRef<HTMLTextAreaElement>(null);

    // redux toolkit
    const dispatch = useDispatch()

    // tools compiler
    const parser = new SyntaxAnalysis();
    
  return (
    <textarea className="textarea resize-none" placeholder="var a = 10" ref={contentTextArea} onChange={()=>{
        if (contentTextArea && contentTextArea.current) {
            const newContent = contentTextArea.current.value;
            dispatch(updateCode(newContent))
            try {
              const newAST = parser.produceAST(newContent);
              dispatch(updateAst(newAST))
            } catch (error) {
              if (error instanceof Error) {
                // console.log(error)
              }
        }
    }
    }
    }>
    </textarea>
  )
}
export default TextareaCode
