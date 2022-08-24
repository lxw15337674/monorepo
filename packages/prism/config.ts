import Prism, { Grammar, GrammarValue } from 'prismjs';

const MainStructure = 'mainStructure';
const Structure = 'Structure';
const ConditionLogical = 'conditionLogical';
const BudgetFunctionContent = 'budgetFunctionContent';
const Condition = 'condition';
const ConditionStructureAttr = 'conditionStructureAttr';
const Attribute = 'attribute';
const Bracket = 'bracket';
const RecursiveCondition = 'recursiveCondition';

const BracketReg = /\[|\]|\(|\)/g;
const FunctionReg = /(sum|concatenate|q|floor|ceil)\(/gi;
const RecursiveConditionReg = /\([^(\)]*/gi;
const AttributeFunctionNameReg = /(sum|count)(?=\()/gi;
// const NormalFunctionReg = /(sum|concatenate|floor|ceil)\(.*/gi;
const NormalFunctionNameReg = /^(sum|concatenate|floor|ceil)/gi;
const BudgetFunctionSymbolReg = /^q/gi;
const ConditionLogicalSymbol = /(and|or)/gi;
const BudgetFunctionContentReg = /(?<=q\().*/gi;
const MainStructureReg = /^[^.\[\(\)]+/i;
const ConditionReg = /\[.*\]/gi;
const ConditionStructureReg = /[\u4e00-\u9fa5a-zA-Z]+(?=\.)/gi;
const ConditionStructureAttrReg = /\S+\.\S*/gi;
const AttributeReg = /(?<=\()\S+(?=\))|[^(\)]+/gi;
const textReg = /[\u4e00-\u9fa5a-zA-Z]+/gi;
const Identifier = 'identifier';
// 单元格
const CELL_REGEX = /(\[(.+)\])*?[$]?[A-Z]+[$]?[0-9]+(?!\()/g;
// 列
const COL_REGEX = /(\[(.+)\])*?[$]?[A-Z]+(?!\()/g;
const EXPRESSION_COL_REGEX = /coords_[0-9]+_[0-9]+(?!_[0-9]+)/g;
const EXPRESSION_CELL_REGEX = /coords_[0-9]+_[0-9]+_[0-9]+/g;

export const NormalFunction = 'NormalFunction';
export const Element = 'element'; // 构件
export const BudgetFunctionReg = /q(?=\()/gi;
export const NormalFunctionReg = /(sum|concatenate|floor|ceil)(?=\()/gi;
const IdentifierReg = /\&|\,|\/|%|\^|\[|\]|\(|\)/gi;
const StringReg = /"\S*"/g;

const String = 'string';
export const Separator = 'Separator';
export const FunctionName = 'FunctionName';
const Col = 'col';
const Cell = 'cell';
export const Variable = 'variable';
export const BudgetFunction = 'budgetFunction';
export const ConnectorReg = /\./;
export const Connector = 'Connector';
export const ArithmeticIdentifier = 'ArithmeticIdentifier';
export const ArithmeticIdentifierReg = /\+|\-|>|<|>=|=|<=|!=/;
export const WhiteSpace = 'WhiteSpace';
export const WhiteSpaceReg = /\s/;

export const FormulaGrammar: Grammar = {
  string: {
    pattern: StringReg,
    alias: String,
  },

  [BudgetFunction]: {
    pattern: BudgetFunctionReg,
    alias: FunctionName,
  },
  [NormalFunction]: {
    pattern: NormalFunctionReg,
    alias: FunctionName,
  },
  [Connector]: {
    pattern: ConnectorReg,
    alias: Separator,
    greedy: true,
  },
  [WhiteSpace]: {
    pattern: WhiteSpaceReg,
    greedy: true,
  },
  [Separator]: {
    pattern: IdentifierReg,
    alias: Separator,
    greedy: true,
  },
  [ArithmeticIdentifier]: {
    pattern: ArithmeticIdentifierReg,
    alias: Separator,
    greedy: true,
  },
  [Cell]: {
    pattern: CELL_REGEX,
    alias: Cell,
  },
  [Col]: {
    pattern: COL_REGEX,
    alias: Cell,
  },
  [Variable]: {
    pattern: /.*/,
    alias: Variable,
  },
};
export default Prism;
