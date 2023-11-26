#!/usr/bin/env node

import {program} from 'commander';
import readFileIn from "./src/fileReaded.js";
import parseDiff from "./src/parser.js";

program
    .version('0.1.0')
    .usage('gendiff [options] <filepath1> <filepath2>')
    // .description('Compares two configuration files and shows a difference.')
    .option('-f, --format <type>', 'output format')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .action((filepath1, filepath2) => {
        const leftFileContent = readFileIn(filepath1);
        const rightFileContent = readFileIn(filepath2);

        const leftJson = JSON.parse(leftFileContent);
        const rightJson = JSON.parse(rightFileContent);

        const result = parseDiff(leftJson, rightJson);

        console.log(result);
    });

program.parse();

