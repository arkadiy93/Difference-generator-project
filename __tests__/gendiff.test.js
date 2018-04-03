import genDiff from '../src/bin/gendiff';

test('find changes between json files', () => {
  expect(genDiff('__tests__/__fixtures__/js1.json', '__tests__/__fixtures__/js2.json'))
    .toEqual({
      host: 'hexlet.io',
      '+ timeout': 20,
      '- timeout': 50,
      '- proxy': '123.234.53.22',
      '+ verbose': true,
    });
});
