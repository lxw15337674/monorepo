import Prism, { FormulaGrammar } from './test2';

export const IdentifierReg = /\+|\-|\*|\//;
export const FunctionReg = /(sum|concatenate|q|floor|ceil)(.*\)|[^\)]*)/gi;

export const BracketsReg = /\(|\)/;

const pairsMap = new Map([['(', ')']]);
const inverseParisMap = new Map([[')', '(']]);

// 当前字符是否括号包裹
export const isInBrackets = (index: number, text: string) => {
  let i = 0;
  const stack = [];
  for (let i = 0; i < index; i++) {
    const char = text[i];
    if (pairsMap.get(char)) {
      stack.push(char);
    }
    const inverseChar = inverseParisMap.get(char);
    if (inverseChar) {
      if (stack.pop() !== inverseChar) {
        return false;
      }
    }
  }
  if (stack.length === 0) {
    return false;
  }
  for (i = index + 1; i < text.length; i++) {
    const char = text[i];
    if (pairsMap.get(char)) {
      stack.push(char);
    }
    const inverseChar = inverseParisMap.get(char);
    if (inverseChar) {
      if (stack.pop() !== inverseChar) {
        return false;
      }
    }
  }
  return true;
};

export const getSplitIndex = (text: string) => {
  const list = [];
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (IdentifierReg.test(char) && !isInBrackets(i, text)) {
      list.push(i);
    }
  }
  return list;
};

// 根据没有括号包裹的运算符进行分隔:
export const splitWithSeparate = (text: string) => {
  const indexList = getSplitIndex(text);
  if (indexList.length === 0) {
    return [text];
  }
  const resList = [];
  let left = 0;
  let right = -1;
  for (let index of indexList) {
    right = index;
    resList.push(text.slice(left, right));
    resList.push(text[index]);
    left = right;
  }
  resList.push(text.slice(left + 1));
  return resList;
};

// const map = new Map<string, string>();

export const parse = (text: string) => {
  const textList = splitWithSeparate(text);
  for (let text of textList) {
    const token = Prism.tokenize(text, FormulaGrammar);
    console.log(token);
  }
};

parse('=CONCATENATE(C1, (C2+C3/C4*C5-C6), C7,C8,C9)');
