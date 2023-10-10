import { buildDiff } from "../buildDiff.js";

const makeIndent = (f) => {
  const file = f.split("\n");
  return file
    .map((str) => {
      if (str !== file[0]) {
        return `    ${str}`;
      }
      return str;
    })
    .join("\n");
};

const convert = (file) => {
  const newFile = JSON.stringify(file, null, 4);
  const unquoted = newFile.replaceAll('"', "");
  const result = makeIndent(unquoted);
  return result.replaceAll(",", "").trim();
};

export default (f1, f2) => {
  const innerTree = buildDiff(f1, f2);
  const iter = (tree) =>
    tree.map((node) => {
        switch (node.status) {
          case "deleted":
            return `  - ${node.key}: ${convert(node.value)}`;
          case "added":
            return `  + ${node.key}: ${convert(node.value)}`;
          case "unchanged":
            return `    ${node.key}: ${convert(node.value)}`;
          case "changed":
            return `  - ${node.key}: ${convert(node.value)}\n  + ${
              node.key
            }: ${convert(node.value2)}`;
          case "nested":
            return `    ${node.key}: {\n    ${makeIndent(
              iter(node.children)
            )}\n    }`;
          default:
            throw new Error();
        }
      })
      .join("\n");
  return `{\n${iter(innerTree)}\n}`;
};
