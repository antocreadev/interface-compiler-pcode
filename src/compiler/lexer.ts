// --- Constants ---
export enum TokenType {
    Number,
    Identifier,
    Var,
    BinaryOperator,
    AssignmentOperator,
    ConditionalOperator,
    OpenParen,
    CloseParen,
    OpenBrace,
    CloseBrace,
    Read,
    Write,
    While,
    Do,
    If,
    EOF,
}

export interface Token {
    value: string;
    type: TokenType;
}

const KEYWORDS: Record<string, TokenType> = {
    "var": TokenType.Var,
    "read": TokenType.Read,
    "write": TokenType.Write,
    "while": TokenType.While,
    "do": TokenType.Do,
    "if": TokenType.If
};

// --- Functions ---
const token = (value = "", type: TokenType): Token => {
    return { value, type };
};

const isAlpha = (src: string) => {
    return src.toUpperCase() != src.toLowerCase();
};

const isInt = (str: string) => {
    const c = str.charCodeAt(0);
    const bounds = ["0".charCodeAt(0), "9".charCodeAt(0)];
    return c >= bounds[0] && c <= bounds[1];
};

const isSkippable = (str: string) => {
    return str == " " || str == "\n" || str == "\t";
};

// --- Main ---
export const tokenize = (sourceCode: string): Token[] => {
    const tokens = new Array<Token>();
    const src = sourceCode.split("");
    while (src.length > 0) {
        if (src[0] == "(") {
            tokens.push(token(src.shift(), TokenType.OpenParen));
        } else if (src[0] == ")") {
            tokens.push(token(src.shift(), TokenType.CloseParen));
        } else if (src[0] == "{") {
            tokens.push(token(src.shift(), TokenType.OpenBrace));
        } else if (src[0] == "}") {
            tokens.push(token(src.shift(), TokenType.CloseBrace));
        } else if (src[0] == "+" || src[0] == "-" || src[0] == "*" || src[0] == "/") {
            tokens.push(token(src.shift(), TokenType.BinaryOperator));
        } else if (src[0] == "=") {
            // Check for "=="
            if (src[1] == "=") {
                tokens.push(token("==", TokenType.ConditionalOperator));
                src.shift(); 
                src.shift(); 
            } else {
                tokens.push(token(src.shift(), TokenType.AssignmentOperator));
            }
        } else if (src[0] == "!") {
            // Check for "!="
            if (src[1] == "=") {
                tokens.push(token("!=", TokenType.ConditionalOperator));
                src.shift(); 
                src.shift(); 
            } else {
                throw new Error("Unexpected character after '!': " + src[1]);
            }
        } else if (src[0] == "<") {
            // Check for "<=" or "<"
            if (src[1] == "=") {
                tokens.push(token("<=", TokenType.ConditionalOperator));
                src.shift(); 
                src.shift(); 
            } else {
                tokens.push(token(src.shift(), TokenType.ConditionalOperator));
            }
        } else if (src[0] == ">") {
            if (src[1] == "=") {
                tokens.push(token(">=", TokenType.ConditionalOperator));
                src.shift();
                src.shift();

            } else {
                tokens.push(token(src.shift(), TokenType.ConditionalOperator));
            }
        } else {
            if (isInt(src[0])) {
                let num = "";
                // concat while dest is int
                while (src.length > 0 && isInt(src[0])) {
                    num += src.shift();
                }
                tokens.push(token(num, TokenType.Number));
            } else if (isAlpha(src[0])) {
                let ident = "";
                // concat while dest is alphanumeric
                while (src.length > 0 && isAlpha(src[0])) {
                    ident += src.shift();
                }
                const reserved = KEYWORDS[ident];
                if (reserved) {
                    tokens.push(token(ident, reserved));
                } else {
                    tokens.push(token(ident, TokenType.Identifier));
                }
            } else if (isSkippable(src[0])) {
                src.shift();
            } else {
                throw new Error(`Unrecognized character found in source: " ${src[0]} " is not a valid token (ASCII: ${src[0].charCodeAt(0)})`)
            }
        }
    }
    tokens.push(token("", TokenType.EOF));
    return tokens;
};
