
function format(tree) {
    let result = "{\n";

    const workingTree = tree.depth === 0 ? tree.children : tree;

    const keys = workingTree.map(element => {
        return element.key;
    });

    console.log("keys = " + keys);

    function innerFormat(depth, innerTree, key) {
        console.log("input key = " + key);

        if(typeof innerTree[key] === 'object') {
            return innerFormat(innerTree[key].depth, innerTree[key], key);
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

    const formattedKeys = keys.map(key => {
        const elementByKey = workingTree[key] === undefined 
        ? workingTree.filter(element => element.key === key)[0]
        : workingTree[key];

        console.log("key = " + key);
        console.log("elementByKey = " + JSON.stringify(elementByKey));
        return innerFormat(elementByKey.depth, elementByKey, key);
    }).join("\n");

    result += formattedKeys;
    result += "\n}";
    // console.log("result = \n" + result);
    return result;
}

export default format;