import { has, union, keys } from 'lodash';

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

export default toString;
