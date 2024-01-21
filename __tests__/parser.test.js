import {describe, expect, test} from "@jest/globals";
import parser from "../src/parser.js";
import readFileIn from "../src/fileReader.js";

describe("suite", () => {
    const expectedOutput = readFileIn("__fixtures__/expected.txt");

    test("positive test (json)", () => {
        // when
        const result = parser('__fixtures__/left.json', '__fixtures__/right.json');
        // then
        expect(result).toEqual(expectedOutput);
    });

    test("positive (yaml)", () => {
        // when
        const result = parser('__fixtures__/left.yaml', '__fixtures__/right.yaml');
        // then
        expect(result).toEqual(expectedOutput);
    });

    test("recursive (json)", () => {
        const expectedResult = readFileIn('__fixtures__/recursive/expected.txt');

        const result = parser(
            '__fixtures__/recursive/left.json',
            '__fixtures__/recursive/right.json'
        );
        console.log('result =>\n' + result);
        expect(result).toEqual(expectedOutput);
    });
});
