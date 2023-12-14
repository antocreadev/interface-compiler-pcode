"use client";
// import hook react
import { useRef } from "react";

// import redux toolkit
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { updateCode } from "@/features/code/codeSlice";
import { updateAst } from "@/features/ast/astSlice";
import { updateError } from "@/features/error/errorSlice";

// import compiler tools
import SyntaxAnalysis from "@/compiler/SyntaxAnalysis";
import TableSymbole from "@/compiler/TableSymbole";
import { updateTableSym } from "@/features/tableSym/tableSymSlice";

const TextareaCode = () => {
  // ref react
  const contentTextArea = useRef<HTMLTextAreaElement>(null);

  // redux toolkit
  const dispatch = useDispatch();
  const ast = useSelector((state: RootState) => state.ast.value);

  // tool of compiler
  const parser = new SyntaxAnalysis();

  return (
    <textarea
      className="textarea resize-none"
      placeholder="var a = 10"
      ref={contentTextArea}
      onChange={() => {
        if (contentTextArea && contentTextArea.current) {
          const newContent = contentTextArea.current.value;
          dispatch(updateCode(newContent));
          try {
            const newAST = parser.produceAST(newContent);
            dispatch(updateAst(newAST));
            if (ast && ast.body) {
              const newTableSym = new TableSymbole(ast.body);
              dispatch(
                updateTableSym(newTableSym.generateTableSymbole(ast.body))
              );
            }
            dispatch(updateError(""));
          } catch (error) {
            if (error instanceof Error) {
              dispatch(updateError(error.message));
            }
          }
        }
      }}
    ></textarea>
  );
};
export default TextareaCode;
