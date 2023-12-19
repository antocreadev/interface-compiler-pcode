class Stack {
  static counter = 0;
  public value: number[];
  private SP: number;
  constructor() {
    this.value = [];
    this.SP = this.value.length;
    Stack.counter += 1;
  }

  binaryOperation = (operator: (a: number, b: number) => number) => {
    const b = this.value.pop();
    const a = this.value.pop();
    if (a != undefined && b != undefined) {
      this.value.push(operator(a, b));
    } else {
      console.error("Error: not enough arguments for binary operation");
      process.exit(1);
    }
  };

  compareOperation = (comparator: (a: number, b: number) => boolean) => {
    const b = this.value.pop();
    const a = this.value.pop();
    if (a != undefined && b != undefined) {
      const result = comparator(a, b) ? 1 : 0;
      this.value.push(result);
    } else {
      console.error("Error: not enough arguments for binary operation");
      process.exit(1);
    }
  };

  add = () => {
    this.binaryOperation((a, b) => a + b);
  };

  sub = () => {
    this.binaryOperation((a, b) => a - b);
  };

  mul = () => {
    this.binaryOperation((a, b) => a * b);
  };

  div = () => {
    this.binaryOperation((a, b) => a / b);
  };

  eql = () => {
    this.compareOperation((a, b) => a === b);
  };

  neq = () => {
    this.compareOperation((a, b) => a !== b);
  };

  gtr = () => {
    this.compareOperation((a, b) => a > b);
  };

  lss = () => {
    this.compareOperation((a, b) => a < b);
  };

  leq = () => {
    this.compareOperation((a, b) => a <= b);
  };

  geq = () => {
    this.compareOperation((a, b) => a >= b);
  };

  prn = () => {
    return this.value.pop()
  };

  inn = () => {
    const input = parseInt(prompt("Enter a value") || "0");
    const address = this.value.pop();
    if (address != undefined) {
      this.value[address] = input;
    } else {
      console.error("Error: not enough arguments for inn operation");
      process.exit(1);
    }
  };

  int = (c: number) => {
    for (let index = 0; index < c; index++) {
      this.value.push(0);
    }
  };

  ldi = (v: number) => {
    this.value.push(v);
  };

  lda = (a: number) => {
    this.value.push(a);
  };

  ldv = () => {
    const address = this.value.pop();
    if (address != undefined) {
      const value = this.value[address];
      this.value.push(value);
    } else {
      console.error("Error: not enough arguments for ldv operation");
      process.exit(1);
    }
  };

  sto = () => {
    const value = this.value.pop();
    const address = this.value.pop();
    if (address != undefined && value != undefined) {
      this.value[address] = value;
    } else {
      console.error("Error: not enough arguments for sto operation");
      process.exit(1);
    }
  };
}

export default Stack;
