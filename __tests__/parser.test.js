import {describe, expect, test} from "@jest/globals";
import parser from "../src/parser.js";
import readFileIn from "../src/fileReader.js";

describe("suite", () => {
    const expectedOutput = readFileIn("__fixtures__/expected.txt");

    test.skip("positive test (json)", () => {
        // when
        const result = parser('__fixtures__/left.json', '__fixtures__/right.json');
        // then
        expect(result).toEqual(expectedOutput);
    });

    test.skip("positive (yaml)", () => {
        // when
        const result = parser('__fixtures__/left.yaml', '__fixtures__/right.yaml');
        // then
        expect(result).toEqual(expectedOutput);
    });

    test.skip("recursive (json)", () => {
        const expectedResult = readFileIn('__fixtures__/recursive/expected.txt');

        const result = parser(
            '__fixtures__/recursive/left.json',
            '__fixtures__/recursive/right.json'
        );
        console.log('result =>\n' + result);
        expect(result).toEqual(expectedResult);
    });

    test.skip("recursive (json, my own data)", () => {
        const expectedResult = readFileIn('__fixtures__/recursive/my/expected.txt');

        const result = parser(
            '__fixtures__/recursive/my/left.json',
            '__fixtures__/recursive/my/right.json'
        );
        console.log('result =>\n' + result);
        expect(result).toEqual(expectedResult);
    });
});

test.skip("", () => {
    const arr = ['follow', 'host', 'proxy', 'timeout', 'verbose', 'aaaaaa'];
    console.log(arr.sort((left, right) => {
        if (left > right) {
            return 1;
        } else if (right > left) {
            return -1;
        } else {
            return 0;
        }
    }));
})