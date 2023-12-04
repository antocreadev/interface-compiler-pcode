import {
    BinaryExpr,
    Expr,
    Identifier,
    NumericLiteral,
    Program,
    Stmt,
    VariableDeclaration,
    Assignment, 
    DoWhileLoop,
    NativeFunctionCall,
    ValueIdentifierInAssignment
  } from "./ast";
  
  import { Token, tokenize, TokenType } from "./lexer";
  
export default class Parser {
    private tokens: Token[] = [];
  
    private not_eof(): boolean {
      return this.tokens[0].type != TokenType.EOF;
    }
    private isIdentifier(token: Token) {
      return token.type === TokenType.Identifier;
    }
  
    private available_token() {
      return this.tokens[0] as Token;
    }
  
    private previous_token() {
      return this.tokens.shift() as Token;
    }
  
    private previous_token_with_type(type: TokenType, err: any) {
      const prev = this.tokens.shift() as Token;
      if (!prev || prev.type != type) {
        throw new Error(`Parser Error:\n ${err} ${prev} - Expecting: ${type}`);
      }
      return prev;
    }
  
    public produceAST(sourceCode: string): Program {
      this.tokens = tokenize(sourceCode);
      const program: Program = {
        kind: "Program",
        body: [],
      };
  
      while (this.not_eof()) {
        program.body.push(this.parse_stmt());
      }
  
      return program;
    }
  
    private parse_stmt(): Stmt {
      if (this.available_token().value === "var") {
        return this.parse_variable_declaration();
      } else if (this.available_token().type === TokenType.Identifier) {
      
        if (this.isIdentifier(this.available_token())) {
        const identifier = this.previous_token() as unknown as ValueIdentifierInAssignment;
        
    
        if (this.available_token().value === "=") {
          return this.parse_assignment(identifier);
        }
      }
      } else if (this.available_token().value === "do") {
        return this.parse_do_while_loop();
      }
      else if (this.available_token().value === "write") {
        return this.parse_write();
      }
  
    
      return this.parse_expr();
    }
    
    
    private parse_do_while_loop(): DoWhileLoop {
      this.previous_token_with_type(
        TokenType.Do,
        "Expecting 'do' keyword to start do-while loop."
      );
    
      this.previous_token_with_type(
        TokenType.OpenBrace,
        "Expecting '{' after 'do' keyword in do-while loop."
      );
    
      const body: Stmt[] = [];
      while (this.available_token().value !== "}") {
        body.push(this.parse_stmt());
      }
    
      this.previous_token_with_type(
        TokenType.CloseBrace,
        "Expecting '}' after do-while loop body."
      );
    
      this.previous_token_with_type(
        TokenType.While,
        "Expecting 'while' keyword after do-while loop body."
      );
    
      const condition = this.parse_expr();
    
      return {
        kind: "DoWhileLoop",
        body,
        condition,
      };
    }

    
    private parse_write(): NativeFunctionCall {
      this.previous_token_with_type(
        TokenType.Write,
        "Expecting 'write' keyword."
      );
  
      this.previous_token_with_type(
        TokenType.OpenParen,
        "Expecting '(' after 'write' keyword."
      );
  
      const args: Expr[] = [];
      while (this.available_token().value !== ")") {
        args.push(this.parse_expr());
        
        if (this.available_token().value !== ")") {
          // Expecting ',' after each argument except the last one
          this.previous_token_with_type(
            TokenType.BinaryOperator,
            "Expecting ',' between args in 'write' function."
          );
        }
      }
  
      this.previous_token_with_type(
        TokenType.CloseParen,
        "Expecting ')' after 'write' function args."
      );
  
      return {
        kind: "NativeFunctionCall",
        functionName: "write",
        arguments :args,
      };
    }
  
    

    private parse_variable_declaration(): VariableDeclaration {
      this.previous_token_with_type(
        TokenType.Var,
        "Expecting 'var' keyword for variable declaration."
      );

      
    
      const identifier = this.parse_primary_expr() as Identifier;
    
      let initializer: Expr | null = null;
      if (this.available_token().value === "=") {
        this.previous_token(); // Consume '='
        initializer = this.parse_expr();
      }
    
      return {
        kind: "VariableDeclaration",
        identifier,
        initializer,
      };
    }
    
    private parse_assignment(identifier: ValueIdentifierInAssignment): Assignment {
      this.previous_token_with_type(
        TokenType.AssignmentOperator,
        "Expecting '=' for variable assignment."
      );
    
      const value = this.parse_expr();

      return {
        kind: "Assignment",
        identifier,
        value,
      };
    }
    
  
    private parse_expr(): Expr {
      return this.parse_additive_expr();
    }
  
    private parse_additive_expr(): Expr {
      let left = this.parse_multiplicitave_expr();
  
      while (this.available_token().value == "+" || this.available_token().value == "-") {
        const operator = this.previous_token().value;
        const right = this.parse_multiplicitave_expr();
        left = {
          kind: "BinaryExpr",
          left,
          right,
          operator,
        } as BinaryExpr;
      }
  
      return left;
    }
  
    private parse_multiplicitave_expr(): Expr {
      let left = this.parse_conditional_expr();
  
      while (
        this.available_token().value == "/" || this.available_token().value == "*" || this.available_token().value == "%"
      ) {
        const operator = this.previous_token().value;
        const right = this.parse_conditional_expr();
        left = {
          kind: "BinaryExpr",
          left,
          right,
          operator,
        } as BinaryExpr;
      }
  
      return left;
    }

    private parse_conditional_expr(): Expr {
      let left = this.parse_primary_expr();
  
      while (
        this.available_token().value == "==" || this.available_token().value == "!=" || this.available_token().value == "<" || this.available_token().value == ">" || this.available_token().value == "<=" || this.available_token().value == ">="
      ) {
        const operator = this.previous_token().value;
        const right = this.parse_primary_expr();
        left = {
          kind: "BinaryExpr",
          left,
          right,
          operator,
        } as BinaryExpr;
      }
  
      return left;
    }
  
    private parse_primary_expr(): Expr {
      const tk = this.available_token().type;
      switch (tk) {
        case TokenType.Identifier:
          return { kind: "Identifier", symbol: this.previous_token().value } as Identifier;
        case TokenType.Number:
          return {
            kind: "NumericLiteral",
            value: parseFloat(this.previous_token().value),
          } as NumericLiteral;
  
        case TokenType.OpenParen: {
          this.previous_token(); 
          const value = this.parse_expr();
          this.previous_token_with_type(
            TokenType.CloseParen,
            "Unexpected token found inside parenthesised expression. Expected closing parenthesis.",
          ); // closing paren
          return value;
        }
        case TokenType.Read: {
          this.previous_token();
          this.previous_token_with_type(
            TokenType.OpenParen,
            "Expecting '(' after 'Read' keyword.",
          );
          this.previous_token_with_type(
            TokenType.CloseParen,
            "Expecting ')' after 'Read' keyword.",
          );
          return{
            kind: "NativeFunctionCall",
            functionName: "read",
            arguments: [],
          } as NativeFunctionCall;
          
        }
        default:
          throw new Error("Unexpected token found during parsing!" + this.available_token().value);
      }
    }
  }
  