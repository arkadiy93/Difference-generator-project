import { isObject } from 'lodash';


const strings = {
  updated: (key, { value, oldValue }) => {
    const newValue = isObject(value) ? 'complex value' : `${value}`;
    const removedValue = isObject(oldValue) ? 'complex value' : `${oldValue}`;
    return `Property '${key}' was updated. From ${removedValue} to ${newValue}`;
  },
  deleted: key => `Property '${key}' was removed`,
  added: (key, { value }) => {
    const newValue = isObject(value) ? 'complex value' : `value: ${value}`;
    return `Property '${key}' was added with ${newValue}`;
  },
  nested: (path, node, renderFunction) => `${renderFunction(node.children, `${path}.`)}`,
};

const filterUnchanged = ast => ast.filter(node => !(node.type === 'unchanged'));

const plainRender = (ast, pathToKey = '') =>
  filterUnchanged(ast).map((node) => {
    const allPath = `${pathToKey}${node.key}`;
    const getString = strings[node.type];
    return [getString(allPath, node, plainRender)];
  }).join('\n');

export default plainRender;
