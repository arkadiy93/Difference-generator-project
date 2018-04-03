import fs from 'fs';
import path from 'path';
import genDiff from '../src/genDiff';


test('find changes between json files', () => {
  expect(JSON.stringify(genDiff('__tests__/__fixtures__/js1.json', '__tests__/__fixtures__/js2.json')))
    .toBe((fs.readFileSync(path.join(process.cwd(), '__tests__/__fixtures__/genDiffSolution.txt'), 'utf8')));
});
