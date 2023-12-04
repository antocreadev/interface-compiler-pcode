import { Stmt, VariableDeclaration, DoWhileLoop } from "./ast.js";

export default class TableSymbole {
    private declarations : string[];
    private astBody : Array<Stmt>;

    constructor(astBody: Array<Stmt>) {
        this.astBody = astBody
        this.declarations = [];
    }

    private isVariableDeclaration = (stmt: Stmt): stmt is VariableDeclaration =>
        stmt.kind === "VariableDeclaration";

    private isDoWhileLoop = (stmt: Stmt): stmt is DoWhileLoop =>
        stmt.kind === "DoWhileLoop";

    public generateTableSymbole(astBody: Array<Stmt>) {
    this.astBody = astBody;
    for (const element of this.astBody) {
        if (this.isVariableDeclaration(element)) {
            this.declarations.push(element.identifier.symbol);
        } else if (this.isDoWhileLoop(element)) {
            this.declarations = this.declarations.concat(this.generateTableSymbole(element.body));
        }
    }
    return this.declarations;
    }
}

