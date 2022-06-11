import { readdir } from 'fs/promises';
import { EOL } from 'os';
import { cwd } from 'process';
import { getPath } from './moveCommands.js';

export const list = async (dirname = '') => {
  const uri = dirname ? getPath(dirname) : cwd();

  let list = await readdir(uri);

  list.sort((a, b) => {
    if (a.split('.').length > 1) {
      return 1;
    }
    if (b.split('.').length > 1) {
      return -1;
    }
    return 0
  })

  const ls = list.map(i => i.split('.').length === 1 ? "/" + i : i).join(EOL);

  if (!ls) {
    throw new Error('This directory is empty');
  }

  console.log(EOL+ls);
};