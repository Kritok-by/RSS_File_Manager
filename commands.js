import { lstat } from 'fs/promises';
import { chdir, cwd } from 'process';
import { isAbsolute, join } from 'path';

export const up = () => {
  if (cwd().length<=1) {
    throw 'You are in root derectory!';
  }

  chdir('../')
}

export const cd = async (path) => {
  if (!path) {
    return Promise.reject('Please write path uri!');
  }
  const prevPath = cwd();

  try {
    chdir(path);
    await lstat(cwd());
  } catch (e) {
    chdir(prevPath);
    return Promise.reject(`cd: no such directory: ${path}`);
  }
}

export const getPath = (path) => {
  return isAbsolute(path) ? path : join(cwd(),path);
}