import { _ as lodash } from 'lodash';
import fs from 'fs';
import path from 'path';

const genDiff = (firstConfig, secondConfig) => {
  const obj1 = JSON.parse(fs.readFileSync(path.join(process.cwd(), firstConfig)));
  const obj2 = JSON.parse(fs.readFileSync(path.join(process.cwd(), secondConfig)));
  const firstConfigCheck = {
    true: (acc, key, predicate) =>
      (predicate ? [...acc, `\n    ${key}: ${obj1[key]}`] : [...acc, `\n  + ${key}: ${obj2[key]}`, `\n  - ${key}: ${obj1[key]}`]),
    false: (acc, key) => [...acc, `\n  - ${key}: ${obj1[key]}`],
  };
  const secondConfigCheck = {
    true: (acc, key) => [...acc, `\n  + ${key}: ${obj2[key]}`],
    false: acc => acc,
  };
  const firstObjChecked = Object.keys(obj1).reduce((acc, key) => {
    const predicate = lodash.has(obj2, key);
    return firstConfigCheck[predicate](acc, key, obj1[key] === obj2[key]);
  }, []);

  const secondObjChecked = Object.keys(obj2).reduce((acc, key) => {
    const predicate = !lodash.has(obj1, key);
    return secondConfigCheck[predicate](acc, key);
  }, firstObjChecked);
  const stringOfArray = secondObjChecked.join('');
  return `{${stringOfArray}\n}`;
};

export default genDiff;
