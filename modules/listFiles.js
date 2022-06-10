import { readdir } from 'fs/promises';
import { EOL } from 'os';

export const list = async (dirname) => {
  const uri = env.dirname;
  try {
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
    console.log(ls);
  } catch (e){
    console.log(e.message);
  }
};