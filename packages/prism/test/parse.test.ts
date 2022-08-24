import expressionParse from '..';
import { BudgetFunction, NormalFunction } from '../config';
import _ from 'lodash';

describe('test findFunctionIn', () => {
  const getTest = _.curry((string: string, index: number) => {
    expressionParse.update(string, index);
    return expressionParse;
  });
  describe('simple', () => {
    const simpleTest = getTest('=q(板[楼层===2]');
    describe('test findFunctionIn', () => {
      const testFindFunctionIn = (index) => {
        return expect(simpleTest(index).functionName);
      };
      test('0', () => {
        testFindFunctionIn(0).toBe('');
      });
      test('1', () => {
        testFindFunctionIn(1).toBe('');
      });
      test('2', () => {
        testFindFunctionIn(2).toBe('');
      });
      test('3', () => {
        testFindFunctionIn(3).toBe(BudgetFunction);
      });
      test('11', () => {
        testFindFunctionIn(11).toBe(BudgetFunction);
      });
      test('12', () => {
        testFindFunctionIn(12).toBe(BudgetFunction);
      });
    });
    describe('test isInCondition', () => {
      const testisInCondition = (index) => {
        return expect(simpleTest(index).isInCondition);
      };
      test('3', () => {
        testisInCondition(1).toBeFalsy();
      });
      test('2', () => {
        testisInCondition(2).toBeFalsy();
      });
      test('5', () => {
        testisInCondition(5).toBeTruthy();
      });
      test('11', () => {
        testisInCondition(11).toBeTruthy();
      });
      test('12', () => {
        testisInCondition(12).toBeFalsy();
      });
    });
  });

  describe('nest', () => {
    const nestTest = getTest('=q(板[sum(1+1)===2].楼层)+sum(1,2)');
    describe('test findFunctionIn', () => {
      const testFindFunctionIn = (index) => {
        return expect(nestTest(index).functionName);
      };
      test('0', () => {
        testFindFunctionIn(0).toBe('');
      });
      test('1', () => {
        testFindFunctionIn(1).toBe('');
      });
      test('2', () => {
        testFindFunctionIn(2).toBe('');
      });
      test('3', () => {
        testFindFunctionIn(3).toBe(BudgetFunction);
      });
      test('9', () => {
        testFindFunctionIn(9).toBe(NormalFunction);
      });
      test('3', () => {
        testFindFunctionIn(3).toBe(BudgetFunction);
      });
      test('29', () => {
        testFindFunctionIn(29).toBe(NormalFunction);
      });
    });
  });
});
