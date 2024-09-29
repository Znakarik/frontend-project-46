import {describe, expect, test} from "@jest/globals";
import readFileIn from "../src/fileReader.js";
import makeStylishDiff from "../src/jsonFormatterV2.js";

describe("suite", () => {

    test("positive test (json)", () => {
        const testJsonObject = JSON.parse(readFileIn("__fixtures__/treeAnalyzer/expectedAnalyzedTree.json"));
        // when
        const result = makeStylishDiff(testJsonObject);
        const expectedResult = readFileIn("__fixtures__/expected.txt");
        // then
        expect(result).toEqual(expectedResult);
    });

    test("positive test (json with nested keys)", () => {
        const testJsonObject = JSON.parse(readFileIn("__fixtures__/treeAnalyzer/expectedAnalysedRequirsiveTree.json"));
        // when
        const result = makeStylishDiff(testJsonObject);
        const expectedResult = readFileIn("__fixtures__/recursive/expected.txt");
        console.log("expectedResult = \n" + expectedResult);
        console.log("result = \n" + result);
        // then
        expect(result).toEqual(expectedResult);
    });
});
