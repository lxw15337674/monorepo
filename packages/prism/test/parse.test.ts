import { isInBrackets, getSplitIndex, splitWithSeparate } from '..';

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
