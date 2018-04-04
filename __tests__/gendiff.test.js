import fs from 'fs';
import path from 'path';
import genDiff from '../src/';

test('find changes between json files', () => {
  expect((genDiff('__tests__/__fixtures__/js1.json', '__tests__/__fixtures__/js2.json')))
    .toBe((fs.readFileSync(path.join(__dirname, '__fixtures__/genDiffSolution.txt'), 'utf8')));
});
