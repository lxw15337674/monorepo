import { isInBrackets } from '..';

test('isInBrackets', () => {
  expect(isInBrackets(0, '1+2')).toBe(false);
  expect(isInBrackets(1, '1+2')).toBe(false);
});
