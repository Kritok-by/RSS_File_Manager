import { Transform } from "stream";
import { env, chdir, cwd } from 'process';
import { EOL } from 'os';
import { compress, decompress } from './modules/archiveProcessing.js';
import { up, cd } from './commands.js';
import { list } from './modules/listFiles.js';
import osInfo from './modules/osInfo.js';
import { calculateHash } from './modules/hashProcessing.js';
import { cat, add, rn, cp, mv } from './modules/filesProcessing.js';

const commandProcess = new Transform({
  async transform(chunk, encoding, callback) {
    const [command, ...args] = chunk.toString().replace(EOL, '').split(' ');
    try {
      switch (command) {
        case '.exit':
          process.exit();
        case 'up':
          up();
          break;
        case 'cd':
          env.dirname = await cd(...args);
          break;
        case 'ls':
          await list();
          break;
        case 'os':
          args.forEach(i => {
            osInfo(i);
          })
          break;
        case 'cat':
          await cat(...args);
          break;
        case 'add':
          add(...args);
          break;
        case 'rn':
          await rn(...args);
          break;
        case 'cp':
          await cp(...args);
          break;
        case 'mv':
          await mv(...args);
          break;
        case 'rm':
          break;
        case 'hash':
          await calculateHash(...args);
          break;
        case 'compress':
          await compress(...args);
          break;
        case 'decompress':
          await decompress(...args);
          break;
        default:
          throw `Unsupported command: ${command}`;
      }
    } catch (e) {
      console.log(e);
    }
    console.log(`${EOL}You are currently in ${cwd()} :`)
    callback();
  },
})

export default commandProcess;