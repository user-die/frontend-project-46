#!/usr/bin/env node
import { program } from "commander";
import { genDiff } from "../index.js";

const format = {
  plain: (filepath1, filepath2) =>
    console.log(genDiff(filepath1, filepath2, "plain")),

  stylish: (filepath1, filepath2) =>
    console.log(genDiff(filepath1, filepath2, "stylish")),

  json: (filepath1, filepath2) =>
    console.log(genDiff(filepath1, filepath2, "json")),

  undefined: (filepath1, filepath2) =>
    console.log(genDiff(filepath1, filepath2, "stylish")),
};

program
  .name("gendiff")
  .description("Compares two configuration files and shows a difference.")
  .version("1.0.0")
  .option("-f, --format <type>", "output format")
  .arguments("<filepath1> <filepath2>")
  .action((filepath1, filepath2) => {
    const options = program.opts();
    format[options.format](filepath1, filepath2);
  });

program.parse();

export default program;
