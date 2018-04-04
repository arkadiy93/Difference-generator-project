import { _ as lodash } from 'lodash';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parseFile = (fileConfig) => {
  const parsers = [
    {
      type: '.yml',
      parser: file => yaml.safeLoad(file),
    },
    {
      type: '.json',
      parser: file => JSON.parse(file),
    },
  ];

  const fileType = path.extname(fileConfig);
  const { parser } = (lodash.find(parsers, ({ type }) => type === fileType));
  return parser(fs.readFileSync(path.join(process.cwd(), fileConfig)));
};


const genDiff = (firstConfig, secondConfig) => {
  const obj1 = parseFile(firstConfig);
  const obj2 = parseFile(secondConfig);

  const firstConfigCheck = {
    true: (acc, key, predicate) =>
      (predicate ? [...acc, `\n    ${key}: ${obj1[key]}`] : [...acc, `\n  + ${key}: ${obj2[key]}`, `\n  - ${key}: ${obj1[key]}`]),
    false: (acc, key) => [...acc, `\n  - ${key}: ${obj1[key]}`],
  };

  const secondConfigCheck = {
    true: (acc, key) => [...acc, `\n  + ${key}: ${obj2[key]}`],
    false: acc => acc,

  };

  const firstObjCheck = Object.keys(obj1).reduce((acc, key) => {
    const predicate = lodash.has(obj2, key);
    return firstConfigCheck[predicate](acc, key, obj1[key] === obj2[key]);
  }, []);

  const secondObjCheck = Object.keys(obj2).reduce((acc, key) => {
    const predicate = !lodash.has(obj1, key);
    return secondConfigCheck[predicate](acc, key);
  }, firstObjCheck);

  const stringOfArray = secondObjCheck.join('');
  return `{${stringOfArray}\n}`;
};

export default genDiff;
