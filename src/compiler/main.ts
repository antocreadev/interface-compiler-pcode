import SyntaxAnalysis from "./SyntaxAnalysis.js";
import TableSymbole from "./TableSymbole.js";
import TranslatePcode from "./TranslatePcode.js";
import interpreter from "./interpreter.js";

// const input = Deno.readTextFile("./testsPcode/originalTest.anto");

// const parser = new SyntaxAnalysis();
// const ast = parser.produceAST(await input);

// const tablesym = new TableSymbole(ast.body);

// const translatePcode = new TranslatePcode(tablesym.generateTableSymbole(ast.body), ast.body);
// translatePcode.generate_pcode(ast.body);
// const pcode = translatePcode.get_pcode();

// interpreter(pcode);
