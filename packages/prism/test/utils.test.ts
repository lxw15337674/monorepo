import Prism from 'prismjs';
import { FormulaGrammar } from '../config';
import {
  isInBrackets,
  getSplitIndex,
  splitWithSeparate,
  findPrevTokenIndex,
} from '../utils';

test('isInBrackets', () => {
  expect(isInBrackets(0, '1+2')).toBe(false);
  expect(isInBrackets(1, '1+2')).toBe(false);
  expect(isInBrackets(1, '(1+2)')).toBe(true);
  expect(isInBrackets(1, '1+2')).toBe(false);
  expect(isInBrackets(2, '(1+2+(3+2))')).toBe(true);
  expect(isInBrackets(2, '1+2+(3+2))')).toBe(false);
  expect(isInBrackets(5, '1+2+(3+2)')).toBe(true);
  expect(isInBrackets(5, '1+2+(3+2))')).toBe(false);
});

test('getSplitIndex success', () => {
  expect(getSplitIndex('1+1+2')).toEqual([1, 3]);
  expect(getSplitIndex('(1+1)+2')).toEqual([5]);
  expect(getSplitIndex('((1+1)+2)')).toEqual([]);
});

test('splitWithSeparate', () => {
  expect(splitWithSeparate('123+1')).toEqual(['123', '+', '1']);
  expect(splitWithSeparate('(1+1)+2')).toEqual(['(1+1)', '+', '2']);
  expect(splitWithSeparate('1+(3+4-(1-2))')).toEqual(['1', '+', '(3+4-(1-2))']);
  expect(splitWithSeparate('11')).toEqual(['11']);
});

describe('test findPrevToken', () => {
  it('simple', () => {
    const tokens = Prism.tokenize(
      '=q(板[楼层===2]',
      FormulaGrammar,
    ) as Prism.Token[];
    expect(findPrevTokenIndex(tokens, 0)).toBe(-1);
    expect(findPrevTokenIndex(tokens, 1)).toBe(0);
    expect(findPrevTokenIndex(tokens, 2)).toBe(1);
    expect(findPrevTokenIndex(tokens, 6)).toBe(5);
    expect(findPrevTokenIndex(tokens, 100)).toBe(10);
  });
});
