import { readFileSync } from "node:fs";
import yaml from "yaml";

const parse = {
  yml: (file) => yaml.parse(readFileSync(file, "utf-8")),
  json: (file) => JSON.parse(readFileSync(file, "utf-8")),
};

export function parseFiles(file) {
  const type = file.split(".")[1];
  return parse[type](file);
}
