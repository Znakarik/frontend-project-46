import {describe, expect, test} from "@jest/globals";

function compareJSON(oldJSON, newJSON) {
    const result = {};

    function recurse(oldObj, newObj, path) {
        const keys = new Set([...Object.keys(oldObj || {}), ...Object.keys(newObj || {})]);

        Array.from(keys).sort().forEach(key => {
            const oldVal = oldObj ? oldObj[key] : undefined;
            const newVal = newObj ? newObj[key] : undefined;

            if (typeof oldVal === 'object' && oldVal !== null && typeof newVal === 'object' && newVal !== null && !Array.isArray(oldVal) && !Array.isArray(newVal)) {
                recurse(oldVal, newVal, path.concat(key));
            } else {
                if (oldVal !== newVal) {
                    if (oldVal !== undefined) {
                        setNested(result, path.concat(`- ${key}`), oldVal);
                    }
                    if (newVal !== undefined) {
                        setNested(result, path.concat(`+ ${key}`), newVal);
                    }
                } else {
                    setNested(result, path.concat(key), oldVal);
                }
            }
        });
    }

    function setNested(obj, path, value) {
        const lastKey = path.pop();
        const lastObj = path.reduce((o, key) => o[key] = o[key] || {}, obj);
        lastObj[lastKey] = value;
    }

    function formatOutput(obj, indent = 0) {
        const spaces = ' '.repeat(indent);
        let result = '';

        for (const key of Object.keys(obj).sort()) {
            const value = obj[key];
            const cleanKey = key.replace(/^[-+]\s*/, '');

            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                result += `${spaces}${key}:\n${formatOutput(value, indent + 2)}`;
            } else {
                result += `${spaces}${key}: ${value}\n`;
            }
        }

        return result;
    }

    recurse(oldJSON, newJSON, []);
    return formatOutput(result);
}

test.skip("not my", () => {
    const oldJSON = {
        "host": "hexlet.io",
        "timeout": 50,
        "proxy": "123.234.53.22",
        "follow": false
    };

    const newJSON = {
        "timeout": 20,
        "verbose": true,
        "host": "hexlet.io"
    };

    const result = compareJSON(oldJSON, newJSON);

    const expected = "{\n" +
        " - follow: false\n" +
        "   host: hexlet.io\n" +
        " - proxy: 123.234.53.22\n" +
        " - timeout: 50\n" +
        " + timeout: 20\n" +
        " + verbose: true\n" +
        "}";

    expect(result).toEqual(expected);
});

test.skip("§", () => {

    const oldJSON = {
        "host": "hexlet.io",
        "timeout": 50,
        "proxy": "123.234.53.22",
        "follow": false
    };

    console.log(JSON.stringify(oldJSON,
        null, 2));
});