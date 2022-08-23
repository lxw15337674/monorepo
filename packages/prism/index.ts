export const IdentifierReg = /=|\&|>|\,|<|>=|=|<=|!=|\*|\+|\-/;
export const FunctionReg = /(sum|concatenate|q|floor|ceil)(.*\)|[^\)]*)/gi;

// 当前字符是否括号包裹
export const isInBrackets = (index: number, text: string) => {
  let left = index - 1;
  let right = index + 1;
  while (left > 0 && right < text.length) {
    if (text[left] === ')' || text[right] === '(') {
      return false;
    }
    left--;
    right++;
  }
  return true;
};

console.log(isInBrackets(0, '1+2'));

// 根据没有括号包裹的运算符进行分隔:
export const splitWithSeparate = (text: string) => {
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (IdentifierReg.test(char)) {
      console.log(IdentifierReg.test(char));
    }
  }
};

// const map = new Map<string, string>();

export const parse = (text: string) => {
  // 是否存在没有括号包裹的分隔符:
  const textList = text.split(IdentifierReg);
  console.log(textList);
};
splitWithSeparate('1+(3+4-(1-2))');
// parse('CONCATENATE(C1, (C2+C3/C4*C5-C6), C7,C8,C9)');
