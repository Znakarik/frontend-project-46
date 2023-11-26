import {describe, expect, test} from "@jest/globals";
import parser from "../src/parser.js";
import readFileIn from "../src/fileReaded.js";
describe("suite", () => {
    const expectedOutput = readFileIn("__fixtures__/expected.txt");

    test("positive test", () => {
        // given
        const leftFileContent = readFileIn('__fixtures__/left.json');
        const rightFileContent = readFileIn('__fixtures__/right.json');
        const leftJson = JSON.parse(leftFileContent);
        const rightJson = JSON.parse(rightFileContent);

        // when
        let result = parser(leftJson, rightJson);
        // then
        expect(result).toEqual(expectedOutput);
    });
});
