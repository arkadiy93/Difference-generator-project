import { _ as lodash } from 'lodash';

const getDiff = (firstConfig, secondConfig) => {
  const firstConfigCheck = {
    true: (acc, key, predicate) => (predicate ? ({ ...acc, [key]: firstConfig[key] }) : { ...acc, [`+ ${key}`]: secondConfig[key], [`- ${key}`]: firstConfig[key] }),
    false: (acc, key) => ({ ...acc, [`- ${key}`]: firstConfig[key] }),
  };
  const secondConfigCheck = {
    true: (acc, key) => ({ ...acc, [`+ ${key}`]: secondConfig[key] }),
    false: acc => acc,
  };

  const differences = Object.keys(firstConfig).reduce((acc, key) => {
    const predicate = lodash.has(secondConfig, key);
    return firstConfigCheck[predicate](acc, key, firstConfig[key] === secondConfig[key]);
  }, {});

  return Object.keys(secondConfig).reduce((acc, key) => {
    const predicate = !lodash.has(firstConfig, key);
    return secondConfigCheck[predicate](acc, key);
  }, differences);
};

export default getDiff;
