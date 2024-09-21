import {describe, expect, test} from "@jest/globals";
import parser from "../src/parser.js";
import readFileIn from "../src/fileReader.js";
import analyzeTree from "../src/treeAnalyzerV2.js";

describe("suite", () => {

    test("positive test (json)", () => {
        const expectedOutput = JSON.parse(readFileIn("__fixtures__/treeAnalyzer/expectedAnalyzedTree.json"));
        // when
        const leftObj = JSON.parse(readFileIn('__fixtures__/left.json'));
        const rightObj = JSON.parse(readFileIn('__fixtures__/right.json'));
        const result = analyzeTree(leftObj, rightObj);
        const resultAsJsonStr = JSON.stringify(result, null, 2);
        // then
        // console.log("resultAsJsonStr = " + resultAsJsonStr);
        // expect(result).toEqual(expectedOutput);
    });


    test("positive test (json with nested keys)", () => {
        const expectedOutput = JSON.parse(readFileIn("__fixtures__/treeAnalyzer/expectedAnalysedRequirsiveTree.json"));
        // when
        const leftObj = JSON.parse(readFileIn('__fixtures__/recursive/left.json'));
        const rightObj = JSON.parse(readFileIn('__fixtures__/recursive/right.json'));
        const result = analyzeTree(leftObj, rightObj);
        const resultAsJsonStr = JSON.stringify(result, null, 2);
        // then
        // console.log("resultAsJsonStr = " + resultAsJsonStr);
        // expect(result).toEqual(expectedOutput);
    });
});
