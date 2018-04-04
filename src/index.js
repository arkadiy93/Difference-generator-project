import { _ as lodash } from 'lodash';
import path from 'path';
import fs from 'fs';
import getParser from './parsers';


const toString = (config1, config2) => {
  const allElements = { ...config1, ...config2 };
  const dataInString = Object.keys(allElements).reduce((acc, el) => {
    if (lodash.has(config1, el) && lodash.has(config2, el)) {
      if (config1[el] === config2[el]) {
        return `${acc}\n    ${el}: ${config1[el]}`;
      }
      return `${acc}\n  + ${el}: ${config2[el]}\n  - ${el}: ${config1[el]}`;
    }
    if (lodash.has(config1, el)) {
      return `${acc}\n  - ${el}: ${config1[el]}`;
    }
    return `${acc}\n  + ${el}: ${config2[el]}`;
  }, '{');
  return `${dataInString}\n}`;
};

const genDiff = (firstConfig, secondConfig) => {
  const fileType = path.extname(firstConfig);
  const parser = getParser(fileType);

  const firstFilePath = path.join(process.cwd(), firstConfig);
  const secondFilePath = path.join(process.cwd(), secondConfig);

  const data1 = fs.readFileSync(firstFilePath);
  const data2 = fs.readFileSync(secondFilePath);
  const config1 = parser.parse(data1);
  const config2 = parser.parse(data2);
  return toString(config1, config2);
};


export default genDiff;
