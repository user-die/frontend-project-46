import { buildDiff } from "../buildDiff.js";

export function jsonDiff(f1, f2) {
  const innerTree = buildDiff(f1, f2);
  const json = (tree) => JSON.stringify(tree);
  return json(innerTree);
};  
