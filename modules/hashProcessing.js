import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import { getPath } from '../commands.js';

export const calculateHash = async (path) => {
  try {
    const readStream = createReadStream(getPath(path));

    return await new Promise((resolve, reject) => {
      readStream.on('data', (file) => {
      const hash = createHash('sha256').update(file).digest('hex');
        console.log('Hash: ' + hash);
        resolve(hash);

      })
      readStream.on('error', (e) => reject(e))
    })
  } catch (e) {
    console.log(e.message);
  }
};