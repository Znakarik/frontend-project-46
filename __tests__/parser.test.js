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
});
