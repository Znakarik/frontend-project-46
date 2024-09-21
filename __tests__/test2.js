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

const oldJSON = {
    "common": {
        "setting1": "Value 1",
        "setting2": 200,
        "setting3": true,
        "setting6": {
            "key": "value",
            "doge": {
                "wow": ""
            }
        }
    },
    "group1": {
        "baz": "bas",
        "foo": "bar",
        "nest": {
            "key": "value"
        }
    },
    "group2": {
        "abc": 12345,
        "deep": {
            "id": 45
        }
    }
};

const newJSON = {
    "common": {
        "follow": false,
        "setting1": "Value 1",
        "setting3": null,
        "setting4": "blah blah",
        "setting5": {
            "key5": "value5"
        },
        "setting6": {
            "key": "value",
            "ops": "vops",
            "doge": {
                "wow": "so much"
            }
        }
    },
    "group1": {
        "foo": "bar",
        "baz": "bars",
        "nest": "str"
    },
    "group3": {
        "deep": {
            "id": {
                "number": 45
            }
        },
        "fee": 100500
    }
};


// console.log(compareJSON(oldJSON, newJSON));

test.skip("", ()=> {
    console.log(compareJSON(oldJSON, newJSON));
})