import {Transform} from "stream";
import {cwd} from 'process';
import {EOL} from 'os';
import {compress, decompress} from './modules/archiveProcessing.js';
import {cd, up} from './modules/moveCommands.js';
import {list} from './modules/listFiles.js';
import osInfo from './modules/osInfo.js';
import {calculateHash} from './modules/hashProcessing.js';
import {add, cat, cp, mv, rm, rn} from './modules/filesProcessing.js';

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
                    await cd(...args);
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
                    await add(...args);
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
                    await rm(...args);
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
                    throw new Error(`Unsupported command: ${command}`);
            }
        } catch (e) {
            console.log(EOL + e.message);
        }

        console.log(`${EOL}You are currently in ${cwd()} :`)
        callback();
    },
})

export default commandProcess;