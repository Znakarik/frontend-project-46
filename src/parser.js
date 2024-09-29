import readFileIn from "./fileReader.js";
import yaml from 'js-yaml';
import analyzeTree from "../src/treeAnalyzerV2.js";
import makeStylishDiff from "./jsonFormatterV2.js";

function parseDiff(leftFilePath, rightFilePath) {
    const leftFileContent = readFileIn(leftFilePath);
    const rightFileContent = readFileIn(rightFilePath);

    const isJsonFile = leftFilePath.endsWith(".json");
    const leftParsedTree = isJsonFile
        ? JSON.parse(leftFileContent)
        : yaml.load(leftFileContent);

    const rightParsedTree = isJsonFile
        ? JSON.parse(rightFileContent)
        : yaml.load(rightFileContent);

    const analyzedTree = analyzeTree(leftParsedTree, rightParsedTree);

    return makeStylishDiff(analyzedTree);
}

export default parseDiff;