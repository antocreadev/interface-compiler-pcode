"use client";
// Import des dépendances
import React, { useCallback, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";

// Import des actions Redux
import { updateCode } from "@/features/code/codeSlice";
import { updateAst } from "@/features/ast/astSlice";
import { updateError } from "@/features/error/errorSlice";
import { updateTableSym } from "@/features/tableSym/tableSymSlice";
import { updatePcode } from "@/features/pcode/pcode";

// Import des outils du compilateur
import SyntaxAnalysis from "@/compiler/SyntaxAnalysis";
import TableSymbole from "@/compiler/TableSymbole";
import TranslatePcode from "@/compiler/TranslatePcode";
import CodeEditor from "./CodeEditor";


// Composant principal
const TextareaCode = () => {

  // Accès au store Redux
  const dispatch = useDispatch();
  const tableSym = useSelector((state: RootState) => state.tableSym.value);
  const code = useSelector((state: RootState) => state.code.value);

  // Instance du parser SyntaxAnalysis
  const parser = useMemo(() => new SyntaxAnalysis(), []);

  // Gestionnaire d'événement pour le changement de texte
  const handleCompilerFunction = useCallback((newcode : string) => {
      try {
        // Analyse syntaxique
        const newAST = parser.produceAST(newcode);
        dispatch(updateAst(newAST));

        if (newAST  && newAST.body) {
          // Génération de la table des symboles
          const newTableSym = new TableSymbole(newAST.body);
          dispatch(updateTableSym(newTableSym.generateTableSymbole(newAST.body)));

          if (tableSym) {
            // Traduction du Pcode
            const translatePcode = new TranslatePcode(tableSym, newAST.body);

            try {
              translatePcode.generate_pcode(newAST.body);
              const pcode = translatePcode.get_pcode();
              dispatch(updatePcode(pcode));
            } catch (error) {
              if (error instanceof Error) {
                dispatch(updateError(error.message));
              }
            }
          }
        }

        // Réinitialisation des erreurs
        dispatch(updateError(""));
      } catch (error) {
        if (error instanceof Error) {
          dispatch(updateError(error.message));
        }
    }
  }, [dispatch, parser, tableSym]);

  const handleCodeEditorChange = useCallback((newCode: string) => {
    dispatch(updateCode(newCode));
    handleCompilerFunction(newCode);
  }, [dispatch, handleCompilerFunction]);
  return (
    <CodeEditor initialValue={code}  onChange={handleCodeEditorChange} />
  );
};
export default TextareaCode;
