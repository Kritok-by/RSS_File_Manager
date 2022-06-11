import {createReadStream, createWriteStream} from 'fs';
import {rename, unlink} from 'fs/promises';
import {EOL} from 'os';
import {basename, join} from 'path';
import {getPath} from './moveCommands.js';

export const cat = (path) => new Promise((resolve, reject) => {
    const readStream = createReadStream(getPath(path));

    readStream.on('data', (chunk) => {
        console.log(EOL + chunk.toString());
        resolve();
    })

    readStream.on('error', (e) => reject(e));
})

export const add = (path) => new Promise((resolve, reject) => {
    const fileName = basename(path);
    const writeStream = createWriteStream(getPath(path));

    writeStream.on('error', (e) => reject(e));

    writeStream.on('finish', () => {
        console.log(EOL + `File ${fileName} created!`);
        resolve();
    });

    writeStream.close();
})

export const rn = async (path, newName) => {
    if (!path) throw new Error('Invalid input: enter path to file');
    if (!newName) throw new Error('Invalid input: enter new file name');


    const fileName = basename(path);

    let newPath = path.replace(fileName, newName);
    newPath = getPath(newPath);

    await rename(getPath(path), newPath);

    console.log(EOL + `File ${fileName} renamed to ${newName}`);
}

export const cp = async (currPath, newPath) => new Promise((resolve, reject) => {
    if (!currPath) throw new Error('Invalid input: enter path to file');
    if (!newPath) throw new Error('Invalid input: enter path to new file');


    const filename = basename(currPath);
    const newFile = join(newPath, filename);

    const readStream = createReadStream(getPath(currPath));
    const writeStream = createWriteStream(getPath(newFile));

    const copy = readStream.pipe(writeStream);

    copy.on('finish', () => {
        console.log(EOL + `File ${filename} copied!`);
        resolve();
    })

    copy.on('error', (e) => reject(e));
})

export const mv = async (currPath, newPath) => {
    if (!currPath) throw new Error('Invalid input: enter path to file');
    if (!newPath) throw new Error('Invalid input: enter path to new file');

    const filename = basename(currPath);

    await cp(currPath, newPath);

    await unlink(getPath(currPath));

    console.log(EOL + `File ${filename} moved to ${getPath(newPath)}`);
}

export const rm = async (path) => {
    const filename = basename(currPath);

    await unlink(getPath(path));

    console.log(EOL + `File ${filename} removed!`);
}