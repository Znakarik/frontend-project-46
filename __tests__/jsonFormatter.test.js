import {describe, expect, test} from "@jest/globals";
import readFileIn from "../src/fileReader.js";
import format from "../src/jsonFormatter.js";

describe("suite", () => {

    test("positive test (json)", () => {
        const testJsonObject = JSON.parse(readFileIn("__fixtures__/treeAnalyzer/expectedAnalyzedTree.json"));
        // when
        const result = format(testJsonObject);
        const expectedResult = readFileIn("__fixtures__/expected.txt");
        // console.log("expectedResult = \n" + expectedResult);
        // console.log("result = \n" + result);
        // then
        expect(result).toEqual(expectedResult);
    });

    test("positive test (json with nested keys)", () => {
        const testJsonObject = JSON.parse(readFileIn("__fixtures__/treeAnalyzer/expectedAnalysedRequirsiveTree.json"));
        // when
        const result = format(testJsonObject);
        const expectedResult = readFileIn("__fixtures__/recursive/expected.txt");
        console.log("expectedResult = \n" + expectedResult);
        console.log("result = \n" + result);
        // then
        expect(result).toEqual(expectedResult);
    });
});
