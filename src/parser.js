import readFileIn from "./fileReader.js";
import yaml from 'js-yaml';
import getDiff from "./diffAnalizer.js";

function parseDiff(leftFilePath, rightFilePath) {
    const leftFileContent = readFileIn(leftFilePath);
    const rightFileContent = readFileIn(rightFilePath);

    if (leftFilePath.endsWith(".json")) {
        return getDiff(JSON.parse(leftFileContent), JSON.parse(rightFileContent));
    } else if (leftFilePath.endsWith(".yaml")) {
        return getDiff(yaml.load(leftFileContent), yaml.load(rightFileContent));
    }
}

export default parseDiff;