import _ from "lodash";

// function getDiff(leftJson, rightJson) {
//     const analyzePairOfObjects = (leftObj, rightObj, level) => {
//         const innerTempResultInObj = {};
//         for (const leftCopyKey in leftObj) {
//             if (isKeyPresentInObject(leftCopyKey, rightObj)) {
//                 if (typeof leftObj[leftCopyKey] === 'object' && typeof rightObj[leftCopyKey] === 'object') {
//                     innerTempResultInObj[leftCopyKey] = analyzePairOfObjects(leftObj[leftCopyKey], rightObj[leftCopyKey], level + 1);
//                     innerTempResultInObj[leftCopyKey]["IS_OBJECT"] = true;
//                     innerTempResultInObj[leftCopyKey]["LEVEL"] = level;
//                 } else {
//                     const valueChanged = !isKeyValuesAreSame(leftCopyKey, leftObj, rightObj);
//                     if (valueChanged) {
//                         innerTempResultInObj[leftCopyKey] = {
//                             STATUS: FieldStatus.Changed,
//                             OLD_VALUE: leftObj[leftCopyKey],
//                             NEW_VALUE: rightObj[leftCopyKey],
//                             LEVEL : level
//                         };
//                     } else {
//                         innerTempResultInObj[leftCopyKey] = {
//                             STATUS: FieldStatus.NoChanges,
//                             ORIGIN_VALUE: leftObj[leftCopyKey],
//                             LEVEL : level
//                         };
//                     }
//                 }
//             } else {
//                 // deleted in new version condition
//                 innerTempResultInObj[leftCopyKey] = {
//                     STATUS: FieldStatus.Deleted,
//                     ORIGIN_VALUE: leftObj[leftCopyKey],
//                     LEVEL : level
//                 };
//             }
//         }
//
//         for (const rightCopyKey in rightObj) {
//             if (!isKeyPresentInObject(rightCopyKey, leftObj)) {
//                 innerTempResultInObj[rightCopyKey] = {STATUS : FieldStatus.Added, value : rightObj[rightCopyKey]};
//             }
//         }
//
//         return innerTempResultInObj;
//     }
//
//
//     let leftCopy = _.cloneDeep(leftJson);
//     let rightCopy = _.cloneDeep(rightJson);
//
//     const tempResultInObj = {};
//
//     for (const leftCopyKey in leftCopy) {
//         let level = 1;
//         if (isKeyPresentInObject(leftCopyKey, rightCopy)) {
//             if (typeof leftCopy[leftCopyKey] === 'object') {
//                 tempResultInObj[leftCopyKey] = analyzePairOfObjects(leftCopy[leftCopyKey], rightCopy[leftCopyKey], level + 1);
//                 tempResultInObj[leftCopyKey]["IS_OBJECT"] = true;
//                 tempResultInObj[leftCopyKey]["LEVEL"] = level + 1;
//             } else {
//                 const valueChanged = !isKeyValuesAreSame(leftCopyKey, leftCopy, rightCopy);
//                 if (valueChanged) {
//                     tempResultInObj[leftCopyKey] = {
//                         STATUS: FieldStatus.Changed,
//                         OLD_VALUE: leftCopy[leftCopyKey],
//                         NEW_VALUE: rightCopy[leftCopyKey],
//                         LEVEL : level
//                     };
//                 } else {
//                     tempResultInObj[leftCopyKey] = {
//                         STATUS: FieldStatus.NoChanges,
//                         ORIGIN_VALUE: leftCopy[leftCopyKey],
//                         LEVEL : level
//                     };
//                 }
//             }
//         } else {
//             // deleted in new version condition
//             tempResultInObj[leftCopyKey] = {
//                 STATUS: FieldStatus.Deleted,
//                 ORIGIN_VALUE: leftCopy[leftCopyKey],
//                 LEVEL : level
//             };
//         }
//     }
//
//     for (const rightCopyKey in rightCopy) {
//         if (!isKeyPresentInObject(rightCopyKey, leftCopy)) {
//             tempResultInObj[rightCopyKey] = {STATUS : FieldStatus.Added, VALUE : rightCopy[rightCopyKey]};
//         }
//     }
//
//     const stringifyResult = (objToStringify) => {
//         console.log("tempResultInObj = \n" + JSON.stringify(objToStringify, null, 2));
//         const joined = Object.keys(objToStringify)
//             .filter(key => key !== "OLD_VALUE" || key !== "NEW_VALUE" || key !== "VALUE" || key !== "ORIGIN_VALUE" || key !== "LEVEL" || key !== "IS_OBJECT")
//             .map(key => {
//             const createLine = (key, obj) => {
//                 switch (obj["STATUS"]) {
//                     case FieldStatus.NoChanges :
//                         return createExistingKeyLine(key, obj["ORIGIN_VALUE"], obj["LEVEL"]);
//                     case FieldStatus.Added :
//                         return createCreatedValueForKeyLine(key, obj["VALUE"], obj["LEVEL"]);
//                     case FieldStatus.Changed :
//                         const oldValueForKeyLine = createDeletedValueForKeyLine(key, obj["OLD_VALUE"], obj["level"]);
//                         let newValueForKeyLine = createCreatedValueForKeyLine(key, obj["NEW_VALUE"], obj["level"]);
//                         return oldValueForKeyLine + "\n" + newValueForKeyLine;
//                     case FieldStatus.Deleted :
//                         return createDeletedValueForKeyLine(key, obj["ORIGIN_VALUE"], obj["level"]);
//                 }
//             };
//
//             const tempResultInObjElement = objToStringify[key];
//
//             if (tempResultInObjElement["IS_OBJECT"] === true) {
//                 return stringifyResult(tempResultInObjElement);
//             } else {
//                 return createLine(key, tempResultInObjElement);
//             }
//         });
//         return joined;
//     }
//
//     const joined = stringifyResult(tempResultInObj);
//
//         // switch (tempResultInObjElement.status) {
//         //     case FieldStatus.NoChanges :
//         //         return createExistingKeyLine(key, tempResultInObjElement["ORIGIN_VALUE"], tempResultInObjElement["level"]);
//         //     case FieldStatus.Added :
//         //         return createCreatedValueForKeyLine(key, tempResultInObjElement["VALUE"], tempResultInObjElement["level"]);
//         //     case FieldStatus.Changed :
//         //         const oldValueForKeyLine = createDeletedValueForKeyLine(key, tempResultInObjElement["OLD_VALUE"], tempResultInObjElement["level"]);
//         //         let newValueForKeyLine = createCreatedValueForKeyLine(key, tempResultInObjElement["NEW_VALUE"], tempResultInObjElement["level"]);
//         //         return oldValueForKeyLine + "\n" + newValueForKeyLine;
//         //     case FieldStatus.Deleted :
//         //         return createDeletedValueForKeyLine(key, tempResultInObjElement["ORIGIN_VALUE"], tempResultInObjElement["level"]);
//         // }
//     // console.log("joined = \n" + joined);
//     // sort in alphabet order
//     // sortAlphabetically(joined);
//     joined.unshift("{");
//     joined.push("}");
//     return joined.flat().join("\n");
// }

function getDiff(oldJson, newJson) {

    let cloneDeepOldJson = _.cloneDeep(oldJson);
    let cloneDeepNewJson = _.cloneDeep(newJson);

    function parse(oldJson, newJson, result = {}) {
        let uniqueKeys = Object.keys(oldJson);
        uniqueKeys.push(...Object.keys(newJson));
        uniqueKeys = new Set(uniqueKeys);

        uniqueKeys.forEach(key => {
            const oldElement = oldJson[key];
            const newElement = newJson[key];
            if (oldElement !== newElement) {
                if (newElement === undefined) {
                    // element deleted
                    result[` - ${key}`] = oldElement;
                    result = order(result);
                } else if (oldElement === undefined) {
                    // element added
                    result[` + ${key}`] = newElement;
                    result = order(result);
                } else if ((typeof oldElement === 'object' && oldElement != null)
                    || (typeof  newElement === 'object' && newElement != null)) {
                    result[key] = parse(oldElement, newElement, result);
                } else {
                    // element changed
                    result[` - ${key}`] = oldElement;
                    result[` + ${key}`] = newElement;
                    result = order(result);
                }
            } else {
                result[`   ${key}`] = oldElement;
                result = order(result);
            }
        });
        return result;
    }

    function order(unordered) {
        return Object.keys(unordered)
            .map(key => key.slice(key.lastIndexOf(" ") + 1))
            .sort()
            .reduce(
            (obj, key) => {
                const foundKey = Object.keys(unordered).filter(keyInUnordered => keyInUnordered.includes(key));
                if (foundKey.length === 2) { // when element changed
                    obj[foundKey[0]] = unordered[foundKey[0]];
                    obj[foundKey[1]] = unordered[foundKey[1]];
                    return obj;
                }
                obj[foundKey] = unordered[foundKey];
                return obj;
            },
            {}
        );
    }

    let entries = Object.entries(parse(cloneDeepOldJson, cloneDeepNewJson));
    entries = entries.map(([key, val], number) => {
        return `${key}: ${val}`;
    });
    entries.unshift("{");
    entries.push("}");
    return entries.join("\n");
}

// function compareJSON(oldJSON, newJSON) {
//     const result = {};
//
//     function recurse(oldObj, newObj, path = []) {
//         const keys = new Set([...Object.keys(oldObj || {}), ...Object.keys(newObj || {})]);
//
//         Array.from(keys).sort().forEach(key => {
//             const oldVal = oldObj ? oldObj[key] : undefined;
//             const newVal = newObj ? newObj[key] : undefined;
//
//             if (typeof oldVal === 'object' && oldVal !== null && typeof newVal === 'object' && newVal !== null && !Array.isArray(oldVal) && !Array.isArray(newVal)) {
//                 const nestedResult = {};
//                 recurse(oldVal, newVal, nestedResult);
//                 if (Object.keys(nestedResult).length > 0) {
//                     setNested(result, path.concat(key), nestedResult);
//                 }
//             } else {
//                 if (oldVal !== newVal) {
//                     if (oldVal !== undefined && newVal !== undefined) {
//                         setNested(result, path.concat(`- ${key}`), oldVal);
//                         setNested(result, path.concat(`+ ${key}`), newVal);
//                     } else if (oldVal !== undefined) {
//                         setNested(result, path.concat(`- ${key}`), oldVal);
//                     } else if (newVal !== undefined) {
//                         setNested(result, path.concat(`+ ${key}`), newVal);
//                     }
//                 } else {
//                     setNested(result, path.concat(key), oldVal);
//                 }
//             }
//         });
//     }
//
//     function setNested(obj, path, value) {
//         const lastKey = path.pop();
//         const lastObj = path.reduce((o, key) => o[key] = o[key] || {}, obj);
//         lastObj[lastKey] = value;
//     }
//
//     function formatOutput(obj, indent = 2) {
//         const spaces = ' '.repeat(indent);
//         let result = '{\n';
//
//         let keys = Object.keys(obj);
//         sortAlphabetically(keys);
//         for (const key of keys) {
//             const value = obj[key];
//             const cleanKey = key.replace(/^[-+]\s*/, '');
//             const prefix = key.startsWith('- ') ? '-' : key.startsWith('+ ') ? '+' : ' ';
//
//             if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
//                 result += `${spaces}${prefix} ${cleanKey}: ${formatOutput(value, indent + 2)}\n`;
//             } else {
//                 const formattedValue = typeof value === 'object' ? JSON.stringify(value, null, 2).replace(/"/g, '') : value;
//                 result += `${spaces}${prefix} ${cleanKey}: ${formattedValue}\n`;
//             }
//         }
//
//         result += ' '.repeat(indent - 2) + '}';
//         return result;
//     }
//
//     recurse(oldJSON, newJSON, []);
//     return formatOutput(result, 2);
// }

































function sortAlphabetically(strArray) {
    function customAlphabeticSort(left, right) {
        if (left.slice(2, left.indexOf(":")) > right.slice(2, right.indexOf(":"))) {
            return 1;
        } else if (right.slice(2, right.indexOf(":")) > left.slice(2, left.indexOf(":"))) {
            return -1;
        }
        return 0;
    }

    strArray.sort(customAlphabeticSort);
}

function isKeyPresentInObject(key, right) {
    return Object.hasOwn(right, key);
}

function createDeletedValueForKeyLine(key, value, level = 0) {
    if (typeof value === 'object' && Object.keys(value).length > 1) {
        let arr = [];
        const res = JSON.stringify(value, null, 2).replaceAll("\"", "").split("\n");
        arr.push(`${createSpacesAndFlagString(level, '-')}${key}: {`)
        res.forEach(v => {
            arr.push(`${createSpacesForLevel(level + 1)}${v}`);
        });
        // arr.push(`${createClosingNodeTagString(level)}`);
        return arr;
    }
    return `${createSpacesAndFlagString(level, '-')}${key}: ${value}`;
}

function createCreatedValueForKeyLine(key, value, level = 0) {
    return `${createSpacesAndFlagString(level, '+')}${key}: ${value}`;
}

function createExistingKeyLine(key, value, level = 0) {
    return `${createSpacesForLevel(level)}${key}: ${value}`;
}

function isKeyValuesAreSame(key, leftObj, rightObj) {
    return leftObj[key] === rightObj[key];
}

function createSpacesForLevel(level) {
    let spacesAmountForLevel = getSpacesAmountForLevel(level);
    return ' '.repeat(spacesAmountForLevel);
}

function createSpacesAndFlagString(level, flag) {
    let spacesForLevel = createSpacesForLevel(level);
    const left = spacesForLevel.substring(0, spacesForLevel.length - 2);
    return left + flag + ' ';
}

function getSpacesAmountForLevel(level) {
    if (level === 0) {
        return 4;
    }

    return level * 4;
}

const FieldStatus = {
    Changed : "Changed",
    Deleted : "Deleted",
    Added : "Added",
    NoChanges : "NoChanges",
}

export default getDiff;