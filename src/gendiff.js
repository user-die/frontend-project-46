#!/usr/bin/env node
import { program } from "commander";
import { genDiff } from "../index.js";

program
  .name("gendiff")
  .description("Compares two configuration files and shows a difference.")
  .version("1.0.0")
  .option("-f, --format <type>", "output format")
  .arguments("<filepath1> <filepath2>")
  .action((filepath1, filepath2) => {
    const options = program.opts();
    if (options.format === 'plain') {
      console.log(genDiff(filepath1, filepath2, 'plain'));
    } else if (options.format === 'stylish' || options.format === undefined) {
      console.log(genDiff(filepath1, filepath2, 'stylish'));
    } else if (options.format === 'json') {
      console.log(genDiff(filepath1, filepath2, 'json'));
    }
});

program.parse();

export default program;