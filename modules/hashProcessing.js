import {createHash} from 'crypto';
import {createReadStream} from 'fs';
import {EOL} from 'os';
import {getPath} from './moveCommands.js';

export const calculateHash = async (path) => {
    const readStream = createReadStream(getPath(path));

    return await new Promise((resolve, reject) => {
        readStream.on('data', (file) => {
            const hash = createHash('sha256').update(file).digest('hex');

            console.log(EOL + 'Hash: ' + hash);
            resolve(hash);
        })

        readStream.on('error', (e) => reject(e))
    })
};