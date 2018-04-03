#!/usr/bin/env node
import program from 'commander';
import fs from 'fs';
import path from 'path';
import getDiff from '../';

export default (path1, path2) => {
  const obj1 = JSON.parse(fs.readFileSync(path.join(process.cwd(), path1)));
  const obj2 = JSON.parse(fs.readFileSync(path.join(process.cwd(), path2)));
  return (getDiff(obj1, obj2));
};

program
  .version('0.0.1')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format');

program
  .command('*')
  .action((firstConfig, secondConfig) => {
    const obj1 = JSON.parse(fs.readFileSync(path.join(__dirname, firstConfig)));
    const obj2 = JSON.parse(fs.readFileSync(path.join(__dirname, secondConfig)));
    console.log(getDiff(obj1, obj2));
  });

program.parse(process.argv);
