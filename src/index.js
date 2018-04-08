import { has, union, keys } from 'lodash';
import path from 'path';
import fs from 'fs';
import getParser from './parsers';
import { chooseRender } from './renders';


const parseToAst = (config1, config2) => {
  const allKeys = union(keys(config1), keys(config2));
  return allKeys.reduce((acc, el) => {
    if (typeof (config1[el]) === 'object' && typeof (config2[el]) === 'object') {
      return [...acc, { type: 'withChildren', key: el, children: parseToAst(config1[el], config2[el]) }];
    } else if (!has(config1, el)) {
      return [...acc, {
        type: 'added', key: el, value: config2[el],
      }];
    } else if (!has(config2, el)) {
      return [...acc, {
        type: 'deleted', key: el, oldValue: config1[el],
      }];
    } else if (config2[el] === config1[el]) {
      return [...acc, {
        type: 'same', key: el, oldValue: config1[el], value: config2[el],
      }];
    }
    return [...acc, {
      type: 'updated', key: el, oldValue: config1[el], value: config2[el],
    }];
  }, []);
};


const genDiff = (firstConfig, secondConfig, format = 'tree') => {
  const fileType = path.extname(firstConfig);
  const parser = getParser(fileType);

  const firstFilePath = path.join(process.cwd(), firstConfig);
  const secondFilePath = path.join(process.cwd(), secondConfig);

  const data1 = fs.readFileSync(firstFilePath, 'utf-8');
  const data2 = fs.readFileSync(secondFilePath, 'utf-8');

  const config1 = parser(data1);
  const config2 = parser(data2);

  const configAst = parseToAst(config1, config2);
  const render = chooseRender[format];
  return render(configAst);
};

export default genDiff;
