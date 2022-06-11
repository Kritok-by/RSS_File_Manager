import {createReadStream, createWriteStream} from 'fs';
import {createBrotliCompress, createBrotliDecompress} from 'zlib';
import {EOL} from 'os';
import {getPath} from './moveCommands.js';

export const compress = async (fileName, zipName) => {
    if (!fileName) {
        throw new Error('Enter path to file');
    }

    if (!zipName) {
        throw new Error('Enter path to archive');
    }

    return await new Promise((resolve, reject) => {
        const readStream = createReadStream(getPath(fileName));
        const writeStream = createWriteStream(zipName);

        const brotli = createBrotliCompress();

        const stream = readStream.pipe(brotli).pipe(writeStream);

        stream.on('finish', () => {
            console.log(EOL + 'Done compressing!')
            resolve();
        });
        stream.on('error', (e) => reject(e))
    })
}

export const decompress = async (zipName, fileName) => {
    if (!zipName) {
        throw new Error('Enter path to archive');
    }

    if (!fileName) {
        throw new Error('Enter path to file');
    }

    return await new Promise((resolve, reject) => {
        const readStream = createReadStream(getPath(zipName));
        const writeStream = createWriteStream(fileName);
        const brotli = createBrotliDecompress();
        const stream = readStream.pipe(brotli).pipe(writeStream);

        stream.on('finish', () => {
            console.log(EOL + 'Done decompressing!');
            resolve();
        });

        stream.on('error', (e) => reject(e))
    });
}
