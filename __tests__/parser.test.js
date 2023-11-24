import {describe, expect, test} from "@jest/globals";
import parser from "../src/parser.js";
import readFileIn from "../src/fileReaded.js";
describe("suite", () => {
    const expectedOutput = "{\n" +
        " - follow: false\n" +
        "   host: hexlet.io\n" +
        " - proxy: 123.234.53.22\n" +
        " - timeout: 50\n" +
        " + timeout: 20\n" +
        " + verbose: true\n" +
        "}";


    test("positive test", () => {
        // given
        const leftFileContent = readFileIn('file1.json');
        const rightFileContent = readFileIn('file2.json');
        const leftJson = JSON.parse(leftFileContent);
        const rightJson = JSON.parse(rightFileContent);

        // when
        let result = parser(leftJson, rightJson);
        // then
        expect(result).toEqual(expectedOutput);
    });
});
