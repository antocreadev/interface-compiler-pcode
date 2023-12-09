import { Stmt,Expr,  NumericLiteral, Identifier, BinaryExpr, VariableDeclaration, Assignment, DoWhileLoop, NativeFunctionCall  } from "./ast.js";
export interface pcode {
    op: op_pcode;
    arg: number | null;
}
type op_pcode = "ADD" | "SUB" | "MUL" | "DIV" | "EQL" | "NEQ" | "GTR" | "LSS" | "LEQ" | "GEQ" | "PRN" | "INN" | "INT" | "LDI" | "LDA" | "LDV" | "STO" | "BZE" | "BRN" | "HLT";
export default class TranslatePcode {
    private tablesym: string[];
    private pcode: pcode[];
    private pc: number;
    private astBody: Array<Stmt>;

    constructor(tablesym: string[], astBody: Array<Stmt> ) {
        this.tablesym = tablesym;
        this.pcode = [] 
        this.pc = 0;
        this.astBody = astBody;
    }

    public get_pcode() {
        return this.pcode;
    }

    public get_tablesym() {
        return this.tablesym;
    }

    private add_opr(op: op_pcode, arg: number | null=null) {
        arg = arg ?? null;
        this.pc++;
        this.pcode.push({ op: op, arg: arg });
    }

    private isNumericLiteral = (stmt: Expr): stmt is NumericLiteral =>
    stmt.kind === "NumericLiteral";

    private isIdentifier = (stmt: Expr): stmt is Identifier =>
    stmt.kind === "Identifier";

    private isBinaryExpr = (stmt: Stmt): stmt is BinaryExpr =>
    stmt.kind === "BinaryExpr";

    private isVariableDeclaration = (stmt: Stmt): stmt is VariableDeclaration =>
    stmt.kind === "VariableDeclaration";

    private isAssignment = (stmt: Stmt): stmt is Assignment =>
    stmt.kind === "Assignment";

    private isDoWhileLoop = (stmt: Stmt): stmt is DoWhileLoop =>
    stmt.kind === "DoWhileLoop";

    private isNativeFunctionCall = (stmt: Stmt): stmt is NativeFunctionCall =>
    stmt.kind === "NativeFunctionCall";

    private browseBinaryExpr(stmt: BinaryExpr) : void {


        if (this.isIdentifier(stmt.left)){
            this.add_opr("LDA",this.tablesym.indexOf(stmt.left.symbol))
            this.add_opr("LDV")
        }
        if (this.isIdentifier(stmt.right)){
            this.add_opr("LDA",this.tablesym.indexOf(stmt.right.symbol))
            this.add_opr("LDV")
        }

        if (this.isNumericLiteral(stmt.left)){
            this.add_opr("LDI",stmt.left.value)
        }
        if (this.isNumericLiteral(stmt.right)){
            this.add_opr("LDI",stmt.right.value)
        }

        // reucrsive call
        if (this.isBinaryExpr(stmt.left)) {
            this.browseBinaryExpr(stmt.left)
        }
        if (this.isBinaryExpr(stmt.right)){
            this.browseBinaryExpr(stmt.right)
        }
        if (stmt.operator){
            if (stmt.operator=="+"){
                this.add_opr("ADD")
            }
            else if (stmt.operator=="-"){
                this.add_opr("SUB")
            }
            else if (stmt.operator=="*"){
                this.add_opr("MUL")
            }
            else if (stmt.operator=="/"){
                this.add_opr("DIV")
            }
            else if (stmt.operator=="!="){
                this.add_opr("EQL")
            }
            else if (stmt.operator=="=="){
                this.add_opr("NEQ")
            }

            else if (stmt.operator==">"){
                this.add_opr("LSS")
            }
            else if (stmt.operator=="<"){
                this.add_opr("GTR")
            }

            else if (stmt.operator==">="){
                this.add_opr("LEQ")
            }
            else if (stmt.operator=="<="){
                this.add_opr("GEQ")
            }
            
        }
        else{
            console.error("Error : operator is not correct")
            throw new Error("Error : operator is not correct");
            // Deno.exit(1)
        }
    }

    private translate_variable_value(value: Expr) {
        if (this.isNumericLiteral(value)) {
            this.add_opr("LDI",value.value)
            this.add_opr("STO")
        }
        // -- NativeFunctionCall
        else if (this.isNativeFunctionCall(value)) {
            if (value.functionName == "read"){
                this.add_opr("INN")
            }
            else{
                console.error("Error : function name is not read")
                throw new Error("Error : function name is not read");

                // Deno.exit(1)
            }
        }
        // -- BinaryExpr
        else if (this.isBinaryExpr(value)) {
            this.browseBinaryExpr(value)
            this.add_opr("STO")
        }
        else if (this.isIdentifier(value)) {
            if (this.tablesym.indexOf(value.symbol) === -1) {
                console.error(`Error : variable ${value.symbol} not declared`);
                throw new Error(`Error : variable ${value.symbol} not declared`);

                
            }
            this.add_opr("LDA",this.tablesym.indexOf(value.symbol))
            this.add_opr("LDV")
            this.add_opr("STO")
        }
        
    }

    public browseAst(astBody:Array<Stmt>) : void {
        for (const node of astBody) {
            // - VariableDeclaration
            if (this.isVariableDeclaration(node)) {
                const identifier = node.identifier;
                const initializer = node.initializer;
                // - identifier 
                if (identifier &&this.isIdentifier(identifier) ) {
                    this.add_opr("LDA",this.tablesym.indexOf(identifier.symbol))
                // - initializer
                if(initializer){
                    this.translate_variable_value(initializer)
                }
            }
            else{
                console.error("Error : name of variable is not word")
                throw new Error("Error : name of variable is not word");
                // Deno.exit(1)
            }
            };

            // - Assignment
            if (this.isAssignment(node)){
                const identifier = node.identifier;
                const value = node.value;

                if (identifier) {
                    if (this.tablesym.indexOf(identifier.value) === -1) {
                        console.error(`Error : variable ${identifier.value} not declared`);
                        throw new Error(`Error : variable ${identifier.value} not declared`);

                    } else {
                        this.add_opr("LDA",this.tablesym.indexOf(identifier.value))
                    }
                }
                if (value){
                    this.translate_variable_value(value)
                }
            }

            // - NativeFunctionCall
            if (this.isNativeFunctionCall(node)){
                const functionName = node.functionName;
                const args= node.arguments;
                if (functionName !== "write" || args.length != 1 || !this.isIdentifier(args[0]) || this.tablesym.indexOf(args[0].symbol) === -1){
                    console.error("Error : function name is not write or number of arguments is not 1")
                    throw new Error("Error : function name is not write or number of arguments is not 1");
                }
                else{
                    this.add_opr("LDA",this.tablesym.indexOf(args[0].symbol))
                    this.add_opr("LDV")
                    this.add_opr("PRN")
                }
            }

        if (this.isDoWhileLoop(node)) {
            const pointer_for_bze = this.pc;
            this.browseAst(node.body);
            if (this.isBinaryExpr(node.condition)) {
                this.browseBinaryExpr(node.condition)
            }
            this.add_opr("BZE",pointer_for_bze)
        }
    }
    }

    public generate_pcode(astBody:Array<Stmt>) : void {
        this.add_opr("INT",this.tablesym.length)
        this.browseAst(astBody)
        this.add_opr("HLT")
    }

}