import fs from 'fs';
import path from 'path';
import genDiff from '../src/';

test('find changes between json files', () => {
  const expected = fs.readFileSync(path.join(__dirname, '__fixtures__/genDiffSolution.txt'), 'utf8');
  expect(genDiff('__tests__/__fixtures__/js1.json', '__tests__/__fixtures__/js2.json'))
    .toBe(expected);
});

test('find changes between yaml files', () => {
  const expected = fs.readFileSync(path.join(__dirname, '__fixtures__/genDiffSolution.txt'), 'utf8');
  expect((genDiff('__tests__/__fixtures__/yaml1.yml', '__tests__/__fixtures__/yaml2.yml')))
    .toBe(expected);
});

test('find changes between ini files', () => {
  const expected = fs.readFileSync(path.join(__dirname, '__fixtures__/genDiffSolution.txt'), 'utf8');
  expect((genDiff('__tests__/__fixtures__/ini1.ini', '__tests__/__fixtures__/ini2.ini')))
    .toBe(expected);
});
