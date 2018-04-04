import path from 'path';
import yaml from 'js-yaml';
import fs from 'fs';
import genDiff from '../src/genDiff';


test('find changes between json files', () => {
  expect(JSON.stringify(genDiff('__tests__/__fixtures__/js1.json', '__tests__/__fixtures__/js2.json')))
    .toBe((fs.readFileSync(path.join(process.cwd(), '__tests__/__fixtures__/genDiffSolution.txt'), 'utf8')));
});

test('find changes between yaml files', () => {
  expect(yaml.toString(genDiff('__tests__/__fixtures__/yaml1.yml', '__tests__/__fixtures__/yaml2.yml')))
    .toBe(yaml.toString(fs.readFileSync(path.join(process.cwd(), '__tests__/__fixtures__/genDiffSolution.txt'), 'utf8')));
});
