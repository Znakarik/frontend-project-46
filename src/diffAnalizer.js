import _ from "lodash";

function getDiff(leftJson, rightJson) {
    let leftCopy = _.cloneDeep(leftJson);
    let rightCopy = _.cloneDeep(rightJson);

    const tempResultInObj = {};

    for (const leftCopyKey in leftCopy) {
        if (isKeyPresentInObject(leftCopyKey, rightCopy)) {
            const valueChanged = !isKeyValuesAreSame(leftCopyKey, leftCopy, rightCopy);
            if (!valueChanged) {
                tempResultInObj[leftCopyKey] = { status : FieldStatus.NoChanges, originValue : leftCopy[leftCopyKey]};
            } else {
                tempResultInObj[leftCopyKey] = { status : FieldStatus.Changed, oldValue : leftCopy[leftCopyKey], newValue : rightCopy[leftCopyKey]};
            }
        } else {
            // deleted in new version condition
            tempResultInObj[leftCopyKey] = {status: FieldStatus.Deleted, originValue: leftCopy[leftCopyKey]};
        }
    }

    for (const rightCopyKey in rightCopy) {
        if (!isKeyPresentInObject(rightCopyKey, leftCopy)) {
            tempResultInObj[rightCopyKey] = {status : FieldStatus.Added, value : rightCopy[rightCopyKey]};
        }
    }

    // console.log("tempResultInObj = \n" + JSON.stringify(tempResultInObj, null, 2));
    const joined = Object.keys(tempResultInObj).map(key => {
        const tempResultInObjElement = tempResultInObj[key];
        switch (tempResultInObjElement.status) {
            case FieldStatus.NoChanges :
                return createExistingKeyLine(key, tempResultInObjElement["originValue"]);
            case FieldStatus.Added :
                return createCreatedValueForKeyLine(key, tempResultInObjElement["value"]);
            case FieldStatus.Changed :
                const oldValueForKeyLine = createDeletedValueForKeyLine(key, tempResultInObjElement["oldValue"]);
                let newValueForKeyLine = createCreatedValueForKeyLine(key, tempResultInObjElement["newValue"]);
                return oldValueForKeyLine + "\n" + newValueForKeyLine;
            case FieldStatus.Deleted :
                return createDeletedValueForKeyLine(key, tempResultInObjElement["originValue"])
        }
    });
    // console.log("joined = \n" + joined);
    // sort in alphabet order
    sortAlphabetically(joined);
    joined.unshift("{");
    joined.push("}");
    return joined.join("\n");
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

const FieldStatus = {
    Changed : "Changed",
    Deleted : "Deleted",
    Added : "Added",
    NoChanges : "NoChanges",
}

export default getDiff;