#!/usr/bin/env node
import program from 'commander';
import genDiff from '../';

export default (path1, path2) => genDiff(path1, path2);

program
  .version('0.0.1')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format');

program
  .action((firstConfig, secondConfig) => {
    console.log(genDiff(firstConfig, secondConfig));
  });

program.parse(process.argv);
