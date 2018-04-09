import { get, keys, flatten } from 'lodash';

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
  nested: (key, oldValue, value, emptySpace, fun, children) =>
    `${' '.repeat(emptySpace + 2)}${key}: {\n${fun(children, emptySpace + 4)}\n${' '.repeat(emptySpace + 2)}}`,
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
  unchanged: (key, oldValue, value, emptySpace) => {
    const type = typeof (value);
    const getString = (get(stringify, type, stringify.otherType));
    return getString(' ', key, value, emptySpace);
  },
  updated: (key, oldValue, value, emptySpace) => {
    const type1 = typeof (oldValue);
    const type2 = typeof (value);

    const getString1 = (get(stringify, type1, stringify.otherType));
    const getString2 = (get(stringify, type2, stringify.otherType));
    return [`${getString1('-', key, oldValue, emptySpace)}`, `${getString2('+', key, value, emptySpace)}`].join('\n');
  },
};

const addToString = (node, emptySpace, fun) => {
  const parserType = parserTypes[node.type];
  return parserType(node.key, node.oldValue, node.value, emptySpace, fun, node.children);
};


const render = (ast, emptySpace = 2) => {
  const astArray = ast.map(node =>
    [addToString(node, emptySpace, render)]);
  return flatten(astArray).join('\n');
};

export default ast => `{\n${render(ast)}\n}`;
