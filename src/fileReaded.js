import { readFileSync } from 'fs';
import path from 'path';

function readFileIn(filePath) {
    return readFileSync(path.resolve(filePath), 'utf8');
}

export default readFileIn;