// Import des dépendances
import React, { useRef } from "react";
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

// Composant principal
const TextareaCode = () => {
  // Référence vers l'élément textarea
  const contentTextArea = useRef<HTMLTextAreaElement>(null);

  // Accès au store Redux
  const dispatch = useDispatch();
  const ast = useSelector((state: RootState) => state.ast.value);
  const tableSym = useSelector((state: RootState) => state.tableSym.value);

  // Instance du parser SyntaxAnalysis
  const parser = new SyntaxAnalysis();

  // Gestionnaire d'événement pour le changement de texte
  const handleTextChange = () => {
    if (contentTextArea && contentTextArea.current) {
      const newContent = contentTextArea.current.value;
      dispatch(updateCode(newContent));

      try {
        // Analyse syntaxique
        const newAST = parser.produceAST(newContent);
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
    }
  };

  return (
    <textarea
      className="textarea resize-none"
      placeholder="var a = 10"
      ref={contentTextArea}
      onChange={handleTextChange}
    ></textarea>
  );
};

export default TextareaCode;
