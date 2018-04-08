import { get, keys } from 'lodash';

const objectToString = (value, emptySpace) => {
  if (value.length === 0) {
    return '';
  }
  const key = keys(value);
  return `${' '.repeat(emptySpace)}${key}: ${value[key]}`;
};

const stringify = {
  object: (sign, key, value, emptySpace) =>
    `${' '.repeat(emptySpace)}${sign} ${key}: {\n${objectToString(value, emptySpace + 6)}\n${' '.repeat(emptySpace + 2)}}`,
  otherType: (sign, key, value, emptySpace) =>
    `${' '.repeat(emptySpace)}${sign} ${key}: ${value}`,
};

const parserTypes = {
  added: (key, oldValue, value, emptySpace) => {
    const type = typeof (value);
    const getString = (get(stringify, type, stringify.otherType));
    return getString('+', key, value, emptySpace);
  },
  deleted: (key, oldValue, value, emptySpace) => {
    const type = typeof (oldValue);
    const getString = (get(stringify, type, stringify.otherType));
    return getString('-', key, oldValue, emptySpace);
  },
  same: (key, oldValue, value, emptySpace) => {
    const type = typeof (value);
    const getString = (get(stringify, type, stringify.otherType));
    return getString(' ', key, value, emptySpace);
  },
  updated: (key, oldValue, value, emptySpace) => {
    const type1 = typeof (oldValue);
    const type2 = typeof (value);

    const getString1 = (get(stringify, type1, stringify.otherType));
    const getString2 = (get(stringify, type2, stringify.otherType));
    return `${getString1('-', key, oldValue, emptySpace)}\n${getString2('+', key, value, emptySpace)}`;
  },
};

const addToString = (type, key, oldValue, value, emptySpace) => {
  const parserType = parserTypes[type];
  return parserType(key, oldValue, value, emptySpace);
};


const renderAst = (ast) => {
  const renderProcess = (astData, emptySpace) => {
    const str = astData.reduce((acc, el) => {
      const {
        type,
        key,
        oldValue = '',
        value = '',
        children = [],
      } = el;
      if (children.length > 0) {
        return `${acc}\n${' '.repeat(emptySpace + 2)}${key}: {${renderProcess(children, emptySpace + 4)}\n${' '.repeat(emptySpace + 2)}}`;
      }
      return `${acc}\n${addToString(type, key, oldValue, value, emptySpace)}`;
    }, '');
    return str;
  };
  return `{${renderProcess(ast, 2)}\n}`;
};

export default renderAst;
