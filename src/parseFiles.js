import { readFileSync } from "node:fs";
import yaml from "yaml";

export function parseFiles(file) {
  const extension = file.split(".")[1];
  if (extension === "json") {
    return JSON.parse(readFileSync(file, "utf-8"));
  }
  return yaml.parse(readFileSync(file, "utf-8"));
}
