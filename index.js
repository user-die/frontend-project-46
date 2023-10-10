import { parseFiles } from "./src/parseFiles.js";
import { jsonDiff } from "./src/formaters/json.js";
import stylish from "./src/formaters/stylish.js";
import plain from "./src/formaters/plain.js";

export function genDiff(file1, file2, format) {
  const f1 = parseFiles(file1);
  const f2 = parseFiles(file2);
  switch(format) {
    case 'stylish':
      return stylish(f1, f2);
    case 'json':
      return jsonDiff(f1, f2);
    case 'plain':
      return plain(f1, f2);
    default:
      return stylish(f1, f2);
  }
}
