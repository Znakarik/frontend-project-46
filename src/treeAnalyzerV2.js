import _ from 'lodash';

const buildTree = (depth, leftTree, rightTree) => {
    const leftKeys = Object.keys(leftTree);
    const rightKeys = Object.keys(rightTree);
    const sortedUniqKeys = _.sortBy(_.union(leftKeys, rightKeys));

    const parseChildren = sortedUniqKeys.map((key) => {
        // 1. если в левом массиве нет ключа, значит ключ был добавлен во втором массиве. Пометить как добавленный
        // 2. если в правом массиве нет ключа, значит ключ был удален из второго массива. Пометить как удаленный
        // 3. если значение по ключу - обьект, то нужно:
        //  3.1. пометить это ключ как обьект
        //  3.2. рекурсивно запустить этот же метод на значение по ключу для правого и левого массива 
        // 4. если значения по ключу одинаковы, то пометить этот ключ как одинаковый 
        // 5. если дошли до этого ифа, то это значит, что значение ключа изменилось 

        // 1
        const isKeyAdded = leftTree[key] === undefined;
        if(isKeyAdded) {
            return {
                type : 'added',
                depth,
                key, 
                value: rightTree[key]
            };
        }


        const isKeyDeleted = rightTree[key] === undefined;
        // 2 
        if(isKeyDeleted) {
            return {
                type : 'removed',
                depth, 
                key, 
                value :  leftTree[key]
            };
        }

        const isNested = leftTree[key] != null && typeof leftTree[key] === 'object' 
            && rightTree[key] != null && typeof rightTree[key] === 'object';
        // 3
        if(isNested) {
                return {
                    type : 'nested',
                    depth,
                    key, 
                    children : buildTree(depth + 1, leftTree[key], rightTree[key])
                };
            }

        // 4. 
        if(leftTree[key] === rightTree[key]) {
            return {
                type: 'noChanges',
                depth,
                key,
                value : leftTree[key]
            }
        }

        return {
            type: 'changed',
            depth,
            key, 
            oldValue: leftTree[key],
            newValue: rightTree[key]
        }
    });
    return parseChildren;
}

function analyzeTree(left, right) {
    let depth = 0;
    return {
        type: 'root',
        depth: depth,
        children: buildTree(depth + 1, left, right)
    };
}

export default analyzeTree;