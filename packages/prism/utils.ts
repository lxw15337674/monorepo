import { getToken, getTokenType } from './prism';
import Prism, { FormulaGrammar } from './config';

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

// 根据光标位置，判断前面的token位置
export const findPrevTokenIndex = (tokens: Prism.Token[], index: number) => {
  if (index === 0) {
    return -1;
  }
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    index -= token.length;
    if (index <= 0) {
      return i;
    }
  }
  return tokens.length - 1;
};
