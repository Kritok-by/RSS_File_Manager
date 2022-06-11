import {createHash} from 'crypto';
import {createReadStream} from 'fs';
import {EOL} from 'os';
import {getPath} from './moveCommands.js';

export const calculateHash = async (path) => {
    const readStream = createReadStream(getPath(path));
    const hash = createHash('sha256');

    return await new Promise((resolve, reject) => {
        readStream.on('data', (file) => hash.update(file));

        readStream.on('error', (e) => reject(e))
        readStream.on('end', () => {
            console.log("Hash: " + hash.digest('hex'));
            resolve()
        });
    })
};