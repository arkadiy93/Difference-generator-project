import { has, union, keys } from 'lodash';
import path from 'path';
import fs from 'fs';
import getParser from './parsers';

const toString = (config1, config2) => {
  const allConfigKeys = union(keys(config1), keys(config2));
  const dataInString = allConfigKeys.reduce((acc, el) => {
    if (!has(config1, el)) {
      return `${acc}\n  + ${el}: ${config2[el]}`;
    } else if (!has(config2, el)) {
      return `${acc}\n  - ${el}: ${config1[el]}`;
    } else if (config1[el] === config2[el]) {
      return `${acc}\n    ${el}: ${config1[el]}`;
    }
    return `${acc}\n  + ${el}: ${config2[el]}\n  - ${el}: ${config1[el]}`;
  }, '{');
  return `${dataInString}\n}`;
};

const genDiff = (firstConfig, secondConfig) => {
  const fileType = path.extname(firstConfig);
  const parser = getParser(fileType);

  const firstFilePath = path.join(process.cwd(), firstConfig);
  const secondFilePath = path.join(process.cwd(), secondConfig);

  const data1 = fs.readFileSync(firstFilePath, 'utf-8');
  const data2 = fs.readFileSync(secondFilePath, 'utf-8');
  const config1 = parser(data1);
  const config2 = parser(data2);
  return toString(config1, config2);
};

export default genDiff;
