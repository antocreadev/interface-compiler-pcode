import { pcode } from "./TranslatePcode.js";
import Stack from "./Stack.js";
export const interpreter = (pcode :pcode[] ) => {
    const stack  = new Stack();
    const historique : number[][] = []
    let PC = 0;
    while (pcode[PC].op !== "HLT") {
      const operation = pcode[PC].op;
      const argument = pcode[PC].arg;
      switch (operation) {
        case "INT":
          if (argument != undefined){
          stack.int(argument);
          }
          break;
        case "LDA":
          if (argument != undefined){
          stack.lda(argument);
          }
          break;
        case "INN":
          stack.inn();
          break;
        case "LDV":
          stack.ldv();
          break;
        case "ADD":
          stack.add();
          break;

        case "SUB":
          stack.sub();
          break;
        case "MUL":
          stack.mul();
          break;
        case "DIV":
          stack.div();
          break;
        case "NEQ":
          stack.neq();
          break;
        case "GTR":
          stack.gtr();
          break;
        case "LSS":
          stack.lss();
          break;
        case "LEQ":
          stack.leq();
          break;
        case "GEQ":
          stack.geq();
          break;
          
        case "STO":
          stack.sto();
          break;
        case "LDI":
          if(argument != undefined){
          stack.ldi(argument);
          }
          break;
        case "EQL":
          stack.eql();
          break;
        case "PRN":
        stack.prn();
        break;

        case "BZE":
          if (stack.value.pop() === 0 && argument != undefined) {
            PC = argument - 1;
          }
          break;
        case "BRN":
            if (argument != undefined){
              PC = argument - 1;
            }
          break;
      }
      PC++;
      historique.push([...stack.value]);
    }
    return historique
  };


export default interpreter;