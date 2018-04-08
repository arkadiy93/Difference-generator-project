import { has, union, keys } from 'lodash';
import path from 'path';
import fs from 'fs';
import getParser from './parsers';
import getRender from './renders';


const parseToAst = (config1, config2) => {
  const allKeys = union(keys(config1), keys(config2));
  return allKeys.map((el) => {
    if (typeof (config1[el]) === 'object' && typeof (config2[el]) === 'object') {
      return { type: 'nested', key: el, children: parseToAst(config1[el], config2[el]) };
    } else if (!has(config1, el)) {
      return { type: 'added', key: el, value: config2[el] };
    } else if (!has(config2, el)) {
      return { type: 'deleted', key: el, oldValue: config1[el] };
    } else if (config2[el] === config1[el]) {
      return {
        type: 'unchanged', key: el, oldValue: config1[el], value: config2[el],
      };
    }
    return {
      type: 'updated', key: el, oldValue: config1[el], value: config2[el],
    };
  });
};


const genDiff = (file1, file2, format = 'json') => {
  const fileType = path.extname(file1);
  const parser = getParser(fileType);

  const data1 = fs.readFileSync(file1).toString();
  const data2 = fs.readFileSync(file2).toString();

  const config1 = parser(data1);
  const config2 = parser(data2);

  const configAst = parseToAst(config1, config2);
  return getRender(format)(configAst);
};

export default genDiff;
