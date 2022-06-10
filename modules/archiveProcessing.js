import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { getPath } from '../commands.js';

export const compress = async (fileName, zipName) => {
  try {
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
        console.log('Done compressing!')
        resolve();
      });
      stream.on('error', (e) => reject(e))
    })
  } catch {
    console.log(e.message);
  }

}

export const decompress = async (zipName, fileName) => {
  try {
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
        console.log('Done decompressing!');
        resolve();
      });
      stream.on('error', (e) => reject(e))
    })
  } catch {
    console.log(e.message);
  }
}
