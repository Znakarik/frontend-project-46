
function format(tree) {
    let result = "{\n";

    const workingTree = tree.depth === 0 ? tree.children : tree;


    function getKeysFromObject(treeInsideGetKeysFromObject) {
        // if(treeInsideGetKeysFromObject.type === 'nested') {
        //     getKeysFromObject(treeInsideGetKeysFromObject.children);
        // }
        const getKeysFromObjectResult = treeInsideGetKeysFromObject.map(element => {
            // console.log("inside getKeysFromObject . key = " + element.key);
            return element.key;
        });
        console.log("getKeysFromObjectResult = " + getKeysFromObjectResult);
        return getKeysFromObjectResult;
    }

    const keys = getKeysFromObject(workingTree);

    console.log("keys = " + keys);

    function formatByKeys(keysInsideFormatByKeys, workingTreeInsideFormatByKeys) {
        console.log("keysInsideFormatByKeys = " + keysInsideFormatByKeys);
        console.log("inside workingTreeInsideFormatByKeys = " + JSON.stringify(workingTreeInsideFormatByKeys));
        // workingTreeInsideFormatByKeys = workingTreeInsideFormatByKeys.type === 'nested' 
        //     ?  workingTreeInsideFormatByKeys.children
        //     : workingTreeInsideFormatByKeys;
        if(workingTreeInsideFormatByKeys.type === 'nested') {
            return innerFormat(workingTreeInsideFormatByKeys.depth, workingTreeInsideFormatByKeys.children, workingTreeInsideFormatByKeys.key);
        }
        return keysInsideFormatByKeys.map(key => {
            const elementByKey = workingTreeInsideFormatByKeys[key] === undefined 
            ? workingTreeInsideFormatByKeys.filter(element => element.key === key)[0]
            : workingTreeInsideFormatByKeys[key];
            return innerFormat(elementByKey.depth, elementByKey, key);
        }).join("\n");   
    }

    function innerFormat(depth, innerTree, key) {
        console.log("input key = " + key);

        if(innerTree.type === 'nested') {
            console.log("got requirsive = " + JSON.stringify(innerTree));
            // return formatByKeys(getKeysFromObject(innerTree.children), innerTree);
            return formatByKeys(getKeysFromObject(innerTree.children), innerTree.children);
            // return innerFormat(innerTree.depth, innerTree.children, key);
        }

        let stringBeforeField = "    ".repeat(depth);
        stringBeforeField = stringBeforeField.substring(stringBeforeField.length - 2);

        if(innerTree.type === 'added') {
            stringBeforeField += "+ ";
        } else if(innerTree.type === 'changed') {
            return `${stringBeforeField}- ${key}: ${innerTree.oldValue}\n${stringBeforeField}+ ${key}: ${innerTree.newValue}`;
        } else if(innerTree.type === 'removed') {
            stringBeforeField += "- ";
        } else {
            stringBeforeField += "  ";
        }

        console.log("innerTree = " + JSON.stringify(innerTree));

        return `${stringBeforeField}${key}: ${innerTree.value}`
    }

    const formattedKeys = formatByKeys(keys, workingTree);
    result += formattedKeys;
    result += "\n}";
    // console.log("result = \n" + result);
    return result;
}

export default format;
