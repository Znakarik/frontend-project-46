import {describe, expect, test} from "@jest/globals";
import parser from "../src/parser.js";
import readFileIn from "../src/fileReaded.js";
describe("suite", () => {
    test("positive test", () => {
        // given
        const leftFileContent = readFileIn('file1.json');
        const rightFileContent = readFileIn('file2.json');
        const leftJson = JSON.parse(leftFileContent);
        const rightJson = JSON.parse(rightFileContent);

        // when
        let result = parser(leftJson, rightJson);
        // then
        console.log(result);
    });
});
