import { isString } from 'lodash';
import Prism from 'prismjs';

export const getTokenText = (token: string | Prism.Token): string => {
    if (isString(token)) {
        return token;
    } else {
        if (Array.isArray(token?.content)) {
            return token?.content.reduce<string>((prev, cur) => {
                return prev + getTokenText(cur);
            }, '');
        }
        return token?.content as string;
    }
};

export const getTokenType = (token: string | Prism.Token) => {
    if (isString(token)) {
        return '';
    } else {
        return token?.type as string;
    }
};

export const getToken = (
    tokens: (string | Prism.Token)[],
    paths: number[]
): string | Prism.Token => {
    let _tokens = [...tokens];
    let token: string | Prism.Token = '';
    for (let index of paths) {
        token = _tokens[index];
        if (isString(token)) {
            return token;
        }
        if (!Array.isArray(token.content)) {
            return token;
        }
        _tokens = token.content;
    }
    return token;
};
