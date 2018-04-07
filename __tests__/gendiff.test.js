import fs from 'fs';
import path from 'path';
import genDiff from '../src/';

test('find changes between flat json files', () => {
  const expected = fs.readFileSync(path.join(__dirname, '__fixtures__/flat/genDiffSolution.txt'), 'utf8');
  expect(genDiff('__tests__/__fixtures__/flat/js1.json', '__tests__/__fixtures__/flat/js2.json'))
    .toBe(expected);
});

test('find changes between flat yaml files', () => {
  const expected = fs.readFileSync(path.join(__dirname, '__fixtures__/flat/genDiffSolution.txt'), 'utf8');
  expect((genDiff('__tests__/__fixtures__/flat/yaml1.yml', '__tests__/__fixtures__/flat/yaml2.yml')))
    .toBe(expected);
});

test('find changes between flat ini files', () => {
  const expected = fs.readFileSync(path.join(__dirname, '__fixtures__/flat/genDiffSolution.txt'), 'utf8');
  expect((genDiff('__tests__/__fixtures__/flat/ini1.ini', '__tests__/__fixtures__/flat/ini2.ini')))
    .toBe(expected);
});

test('find changes between deep json files', () => {
  const expected = fs.readFileSync(path.join(__dirname, '__fixtures__/deep/genDiffSolution.txt'), 'utf8');
  expect(genDiff('__tests__/__fixtures__/deep/js1.json', '__tests__/__fixtures__/deep/js2.json'))
    .toBe(expected);
});

test('find changes between deep yaml files', () => {
  const expected = fs.readFileSync(path.join(__dirname, '__fixtures__/deep/genDiffSolution.txt'), 'utf8');
  expect((genDiff('__tests__/__fixtures__/deep/yaml1.yml', '__tests__/__fixtures__/deep/yaml2.yml')))
    .toBe(expected);
});

test('find changes between deep ini files', () => {
  const expected = fs.readFileSync(path.join(__dirname, '__fixtures__/deep/genDiffSolution.txt'), 'utf8');
  expect((genDiff('__tests__/__fixtures__/deep/ini1.ini', '__tests__/__fixtures__/deep/ini2.ini')))
    .toBe(expected);
});
