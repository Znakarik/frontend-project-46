import _ from "lodash";

function parseDiff(leftJson, rightJson) {

    let stringsArr = [];
    stringsArr.push("{");

    let leftCopy = _.cloneDeep(leftJson);
    let rightCopy = _.cloneDeep(rightJson);

    for (const leftCopyKey in leftCopy) {
        if (isKeyPresentInObject(leftCopyKey, rightCopy)) {
            if (isKeyValuesAreSame(leftCopyKey, leftCopy, rightCopy)) {
                const existingKeyLine = createExistingKeyLine(leftCopyKey, leftCopy[leftCopyKey]);
                stringsArr.push(existingKeyLine);
            } else {
                const deletedValueForKeyLine = createDeletedValueForKeyLine(leftCopyKey, leftCopy[leftCopyKey]);
                stringsArr.push(deletedValueForKeyLine);
                let createdValueForKeyLine = createCreatedValueForKeyLine(leftCopyKey, rightCopy[leftCopyKey]);
                stringsArr.push(createdValueForKeyLine);
            }
        } else {
            // deleted in new version condition
            let deletedValueForKeyLine = createDeletedValueForKeyLine(leftCopyKey, leftCopy[leftCopyKey]);
            stringsArr.push(deletedValueForKeyLine);
        }
    }

    for (const rightCopyKey in rightCopy) {
        if (!isKeyPresentInObject(rightCopyKey, leftCopy)) {
            const newKeyValue = createCreatedValueForKeyLine(rightCopyKey, rightCopy[rightCopyKey]);
            stringsArr.push(newKeyValue);
        }
    }

    // sort in alphabet order
    sortAlphabetically(stringsArr);
    stringsArr.push("}");
    return stringsArr.join("\n");
}

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

function createDeletedValueForKeyLine(key, value) {
    return ` - ${key}: ${value}`;
}

function createCreatedValueForKeyLine(key, value) {
    return ` + ${key}: ${value}`;
}

function createExistingKeyLine(key, value) {
    return `   ${key}: ${value}`;
}

function isKeyValuesAreSame(key, leftObj, rightObj) {
    return leftObj[key] === rightObj[key];
}

export default parseDiff;