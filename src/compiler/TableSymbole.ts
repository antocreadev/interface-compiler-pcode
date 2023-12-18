import { Stmt, VariableDeclaration, DoWhileLoop } from "./ast";

export default class TableSymbole {
  private declarations: string[];
  private declarationsSet: Set<string>;
  private astBody: Array<Stmt>;

  constructor(astBody: Array<Stmt>) {
    this.astBody = astBody;
    this.declarations = [];
    this.declarationsSet = new Set();
  }

  private isVariableDeclaration = (stmt: Stmt): stmt is VariableDeclaration =>
    stmt.kind === "VariableDeclaration";

  private isDoWhileLoop = (stmt: Stmt): stmt is DoWhileLoop =>
    stmt.kind === "DoWhileLoop";

  public generateTableSymbole(astBody: Array<Stmt>): string[] {
    this.astBody = astBody;
    for (const element of this.astBody) {
      if (this.isVariableDeclaration(element)) {
        const symbol = element.identifier.symbol;
        if (!this.declarationsSet.has(symbol)) {
          this.declarations.push(symbol);
          this.declarationsSet.add(symbol);
        }
      } else if (this.isDoWhileLoop(element)) {
        const declarationsInLoop = this.generateTableSymbole(element.body);
        for (const declaration of declarationsInLoop) {
          if (!this.declarationsSet.has(declaration)) {
            this.declarations.push(declaration);
            this.declarationsSet.add(declaration);
          }
        }
      }
    }
    return this.declarations;
  }
}
