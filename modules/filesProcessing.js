import { createReadStream, createWriteStream } from 'fs';
import { rename, copyFile, unlink } from 'fs/promises';
import { basename } from 'path';
import { join } from 'path';
import { getPath } from '../commands.js';

export const cat = (path) => {
  try {
    return new Promise((resolve, reject) => {
      const readStream = createReadStream(getPath(path));
      readStream.on('data',(chunk)=> {
        console.log(chunk.toString());
        resolve();
      })
      readStream.on('error', (e) => reject(e));
    })
  } catch (e) {
    console.log(e.message);
  }
}

export const add = (path) => {
  try {
    const fileName = basename(path);

    createWriteStream(getPath(path));

    console.log(`File ${fileName} created!`);
  } catch (e) {
    console.log(e.message);
  }
}

export const rn = async (path, newName) => {
  try {
    if (!path) {
      throw new Error('Enter path to file');
    }

    if (!newName) {
      throw new Error('Enter new file name');
    }
    const fileName = basename(path);
    let newPath = path.replace(fileName, newName);
    newPath = getPath(newPath);

    await rename(getPath(path), newPath);
    console.log(`File ${fileName} renamed to ${newName}`);

  } catch (e) {
    console.log(e.message);
  }
}

export const cp = async (currPath, newPath) => {
  try {
    if (!currPath) {
      throw new Error('Enter path to file');
    }
    if (!newPath) {
      throw new Error('Enter path to new file');
    }
    const filename = basename(currPath);

    const newFile = join(newPath, filename);

    await copyFile(getPath(currPath), getPath(newFile));

    console.log(`File ${filename} copied!`);
  } catch (e) {
    console.log(e.message);
  }
}

export const mv = async (currPath, newPath) => {
  try {
    if (!currPath) {
      throw new Error('Enter path to file');
    }
    if (!newPath) {
      throw new Error('Enter path to new file');
    }
    const filename = basename(currPath);

    const newFile = join(newPath, filename);

    await copyFile(getPath(currPath), getPath(newFile));
    await unlink(getPath(currPath));

    console.log(`File ${filename} moved to ${getPath(newPath)}`);
  } catch (e) {
    console.log(e.message);
  }
}

export const rm = (path) => {
  try {
    if (!path) {
      throw new Error('Enter path to file');
    }

    await unlink(getPath(currPath));

    console.log(`File ${filename} removed!`);
  } catch (e) {
    console.log(e.message);
  }
}