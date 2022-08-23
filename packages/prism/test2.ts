import Prism, { Grammar, GrammarValue } from 'prismjs';

export const BudgetFunction = 'budgetFunction';
export const MainStructure = 'mainStructure';
export const Structure = 'Structure';
export const ConditionLogical = 'conditionLogical';
export const BudgetFunctionContent = 'budgetFunctionContent';
export const Condition = 'condition';
export const ConditionStructureAttr = 'conditionStructureAttr';
export const Attribute = 'attribute';
export const Bracket = 'bracket';
export const RecursiveCondition = 'recursiveCondition';
export const IdentifierReg =
  /\+|\&|\-|\=|\&|>|\,|<|>=|=|<=|!=|\*|\/|%|\^|\[|\]|\(|\.|\s/gi;
export const StringReg = /"\S*"/g;
export const BracketReg = /\[|\]|\(|\)/g;
export const FunctionReg = /(sum|concatenate|q|floor|ceil)(.*\)|[^\)]*)/gi;
export const RecursiveConditionReg = /\([^(\)]*/gi;
export const AttributeFunctionNameReg = /(sum|count)(?=\()/gi;
export const NormalFunctionReg = /(sum|concatenate|floor|ceil)\(.*/gi;
export const NormalFunctionNameReg = /^(sum|concatenate|floor|ceil)/gi;
export const BudgetFunctionReg = /^q\(.*/gi;
export const BudgetFunctionSymbolReg = /^q/gi;
export const ConditionLogicalSymbol = /(and|or)/gi;
export const BudgetFunctionContentReg = /(?<=q\().*/gi;
export const MainStructureReg = /^[^.\[\(\)]+/i;
export const ConditionReg = /\[.*\]/gi;
export const ConditionStructureReg = /[\u4e00-\u9fa5a-zA-Z]+(?=\.)/gi;
export const ConditionStructureAttrReg = /\S+\.\S*/gi;
export const AttributeReg = /(?<=\()\S+(?=\))|[^(\)]+/gi;
export const textReg = /[\u4e00-\u9fa5a-zA-Z]+/gi;
export const Identifier = 'identifier';
// 单元格
export const CELL_REGEX = /(\[(.+)\])*?[$]?[A-Z]+[$]?[0-9]+(?!\()/g;
// 列
export const COL_REGEX = /(\[(.+)\])*?[$]?[A-Z]+(?!\()/g;
export const EXPRESSION_COL_REGEX = /coords_[0-9]+_[0-9]+(?!_[0-9]+)/g;
export const EXPRESSION_CELL_REGEX = /coords_[0-9]+_[0-9]+_[0-9]+/g;
export const FunctionName = 'FunctionName';
export const Col = 'col';
export const Cell = 'cell';
export const Variable = 'variable';
export const NormalFunction = 'NormalFunction';

let budgetConditionRule: Prism.Grammar = {
  [ConditionLogical]: {
    pattern: ConditionLogicalSymbol,
  },
  [ConditionStructureAttr]: {
    pattern: ConditionStructureAttrReg,
    inside: {
      [Identifier]: { pattern: IdentifierReg },
      [Structure]: {
        pattern: ConditionStructureReg,
        alias: Variable,
        greedy: true,
      },
      [Attribute]: {
        pattern: /(?<=\.)[\u4e00-\u9fa5a-zA-Z]+/gi,
        alias: Variable,
        greedy: true,
      },
    },
  },
  [Identifier]: { pattern: IdentifierReg },
  [Attribute]: {
    pattern: textReg,
    alias: Variable,
  },
};

const RecursiveConditionRule: GrammarValue = {
  // pattern: RecursiveConditionReg,
  pattern: /(?<=\()(.+?)(?=\))/,
  inside: budgetConditionRule,
  greedy: true,
};

// 支持条件嵌套
budgetConditionRule = { RecursiveConditionRule, ...budgetConditionRule };

export const budgetFunctionGrammar: GrammarValue = {
  pattern: BudgetFunctionReg,
  inside: {
    [FunctionName]: {
      pattern: BudgetFunctionSymbolReg,
      alias: FunctionName,
    },
    [BudgetFunctionContent]: {
      pattern: BudgetFunctionContentReg,
      inside: {
        [Cell]: {
          pattern: CELL_REGEX,
          alias: Variable,
        },
        [MainStructure]: {
          pattern: MainStructureReg,
          alias: [MainStructure, Variable],
        },
        [Condition]: {
          pattern: ConditionReg,
          inside: budgetConditionRule,
        },
        [Identifier]: /\./,
        [Attribute]: {
          pattern: /.+/,
          inside: {
            [FunctionName]: {
              pattern: AttributeFunctionNameReg,
              alias: FunctionName,
            },
            [Identifier]: { pattern: IdentifierReg },
            [Variable]: {
              pattern: AttributeReg,
              alias: Variable,
            },
          },
          alias: Variable,
        },
      },
      greedy: true,
    },
    [Cell]: {
      pattern: CELL_REGEX,
      alias: Variable,
      greedy: true,
    },
    [Identifier]: IdentifierReg,
  },
};

export const normalFunctionGrammar: GrammarValue = {
  pattern: NormalFunctionReg,
  inside: {
    [FunctionName]: { pattern: NormalFunctionNameReg, alias: FunctionName },
    item: {
      pattern: /(?<=\().*/gi,
      inside: {
        [Identifier]: { pattern: IdentifierReg },
        [Cell]: {
          pattern: CELL_REGEX,
          alias: Variable,
        },
        [Col]: {
          pattern: COL_REGEX,
          alias: Variable,
        },
      },
    },
  },
};

export const functionGrammar: GrammarValue = {
  pattern: FunctionReg,
  inside: {
    [BudgetFunction]: budgetFunctionGrammar,
    [NormalFunction]: normalFunctionGrammar,
  },
  greedy: true,
};

// @ts-ignore
// 支持函数嵌套
normalFunctionGrammar.inside.item.inside.subfunction = {
  ...functionGrammar,
  greed: true,
};

export const FormulaGrammar: Grammar = {
  formula: {
    pattern: /^=.*/,
    inside: {
      [Cell]: {
        pattern: CELL_REGEX,
        alias: Variable,
      },
      [Col]: {
        pattern: COL_REGEX,
        alias: Variable,
      },
      string: {
        pattern: StringReg,
        greedy: true,
      },
      identifier: {
        pattern: IdentifierReg,
      },
      function: functionGrammar,
    },
  },
};
export default Prism;
