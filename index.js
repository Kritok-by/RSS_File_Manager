import { dirname } from 'path';
import { env, argv, chdir, cwd } from 'process';
import commandProcess from './commandsProcessing.js';
import { fileURLToPath } from 'url';
import { access } from 'fs/promises';
import { EOL, homedir } from 'os';

const __filename = fileURLToPath(import.meta.url);
process.__dirname = dirname(__filename);

try {
  env.username = argv.find(i => i.includes('--username')).split('=')[1];
  if (!env.username) {
    throw null;
  }
} catch (e){
  throw 'Please enter your username before use file manager!'+EOL;
}

chdir(homedir());

try {
  await access(cwd());
} catch (e) {
  throw 'ERROR: This user does not exist on your computer';
}
console.log()
console.log(EOL + `Welcome to the File Manager, ${env.username}!`);
console.log(`You are currently in ${cwd()} :`);


process.stdin.pipe(commandProcess).pipe(process.stdout);

const exitEvents = ['exit', 'close', 'SIGINT', 'SIGUSR1', 'SIGUSR2'];

exitEvents.forEach((i) => {
  process.on(i, (err) => {
    if (i==='SIGINT') {
      process.exit();
    }
    console.log(`${EOL}Thank you for using File Manager, ${env.username}!`);
  })
})
