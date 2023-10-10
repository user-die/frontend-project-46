import { genDiff } from "../index.js";

const output1 = genDiff('__fixtures__/file3.yml', '__fixtures__/file4.yml');
const output2 = genDiff('__fixtures__/file3.json', '__fixtures__/file4.json');
const output3 = genDiff('__fixtures__/file3.json', '__fixtures__/file4.json', "json");

test("test 1. Json", () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toBe(
    "{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}"
  );
});

test('test 2. Json', () => {
  expect(genDiff('__fixtures__/file3.json', '__fixtures__/file4.json')).toBe(output2);
});

test('test 1. Yml', () => {
  expect(genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml')).toBe(
    "{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}"
  );
});

test('test 2. Yml', () => {
  expect(genDiff('__fixtures__/file3.yml', '__fixtures__/file4.yml')).toBe(output1);
});

test('test plain', () => {
  expect(genDiff('__fixtures__/file3.json', '__fixtures__/file4.json', 'plain')).toBe("Property 'common.follow' was added with value: false\nProperty 'common.setting2' was removed\nProperty 'common.setting3' was updated. From true to null\nProperty 'common.setting4' was added with value: 'blah blah'\nProperty 'common.setting5' was added with value: [complex value]\nProperty 'common.setting6.doge.wow' was updated. From '' to 'so much'\nProperty 'common.setting6.ops' was added with value: 'vops'\nProperty 'group1.baz' was updated. From 'bas' to 'bars'\nProperty 'group1.nest' was updated. From [complex value] to 'str'\nProperty 'group2' was removed\nProperty 'group3' was added with value: [complex value]");
});

test('test stylish', () => {
  expect(genDiff('__fixtures__/file3.json', '__fixtures__/file4.json', 'stylish')).toBe(output2);
});

test('test json', () => {
  expect(genDiff('__fixtures__/file3.json', '__fixtures__/file4.json', 'json')).toBe(output3);
});



