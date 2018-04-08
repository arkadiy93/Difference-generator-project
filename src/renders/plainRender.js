import { isObject } from 'lodash';


const strings = {
  updated: (key, value, oldValue) => {
    const newValue = isObject(value) ? 'complex value' : `${value}`;
    const removedValue = isObject(oldValue) ? 'complex value' : `${oldValue}`;
    return `Property '${key}' was updated. From ${removedValue} to ${newValue}\n`;
  },
  deleted: key => `Property '${key}' was removed\n`,
  added: (key, value) => {
    const newValue = isObject(value) ? 'complex value' : `value: ${value}`;
    return `Property '${key}' was added with ${newValue}\n`;
  },
  unchanged: () => '',
};

const plainRender = (ast, pathToKey = '') =>
  ast.reduce((acc, { children = [], ...rest }) => {
    if (rest.type === 'nested') {
      return `${acc}${plainRender(children, `${pathToKey}${rest.key}.`)}`;
    }
    const allPath = `${pathToKey}${rest.key}`;
    const getString = strings[rest.type];
    return `${acc}${getString(allPath, rest.value, rest.oldValue)}`;
  }, '');

export default plainRender;
