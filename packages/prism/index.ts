import Prism from 'prismjs';
import {
  ArithmeticIdentifier,
  BudgetFunction,
  Connector,
  FormulaGrammar,
  FunctionName,
  Separator,
  Variable,
  WhiteSpace,
} from './config';
import { getTokenText, getTokenType } from './prism';
import { findPrevTokenIndex } from './utils';

export const isExpression = (text: string) => {
  return text[0] === '=';
};

class ExpressionParse {
  text: string = '';
  index: number = -1;
  get tokens() {
    let tokens = Prism.tokenize(this.text, FormulaGrammar) as Prism.Token[];
    return tokens.filter((item) => item.type !== WhiteSpace);
  }
  get prevTokenIndex() {
    return findPrevTokenIndex(this.tokens, this.index);
  }
  get functionIdentifierIndex() {
    const stack = [];
    for (let i = 0; i <= this.prevTokenIndex; i++) {
      const token = this.tokens[i];
      if (this.tokens[i - 1]?.alias === FunctionName) {
        stack.push(i - 1);
      }
      if (token.content === ')') {
        stack.pop();
      }
    }
    return stack.pop();
  }
  get functionMainElement() {
    return this.tokens[this.functionIdentifierIndex + 1];
  }
  get functionName() {
    return this.tokens[this.functionIdentifierIndex]?.type ?? '';
  }
  get allowElementAssociation() {
    const prevTokenType = this.tokens[this.prevTokenIndex].type;
    if (prevTokenType === BudgetFunction) {
      return true;
    }
    if (prevTokenType === Separator && this.isInCondition) {
      return true;
    }
    return false;
  }

  get CurrentElement() {
    const prevTokenType = this.tokens[this.prevTokenIndex].type;
    if (prevTokenType === Connector) {
      return this.tokens[this.prevTokenIndex - 1];
    }
  }
  get ElementAttribute() {
    if (this.isInCondition) {
      if (this.tokens[this.prevTokenIndex].type === ArithmeticIdentifier) {
        const token = this.tokens[this.prevTokenIndex - 1];
        if (token.type === Variable) {
          return token;
        }
      }
    }
    return '';
  }
  /**
   * 判断当前处于Q函数的条件里。前提：已确定处于Q函数里。
   */
  get isInCondition() {
    const stack = [];
    for (let i = 0; i <= this.prevTokenIndex; i++) {
      const token = this.tokens[i];
      if (token.type === Separator) {
        if (token.content === '[') {
          stack.push(stack);
        }
        if (token.content === ']') {
          stack.pop();
        }
      }
    }
    return !!stack.length;
  }

  update = (text: string, index?: number) => {
    this.text = text;
    this.index = index;
  };
}

export default new ExpressionParse();
