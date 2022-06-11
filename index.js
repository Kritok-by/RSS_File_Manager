import {argv, chdir, cwd, env, exit} from 'process';
import commandProcess from './commandsProcessing.js';
import {EOL, homedir} from 'os';


try {
    env.username = argv.find(i => i.includes('--username')).split('=')[1];
    if (!env.username) {
        throw null;
    }
} catch (e) {
    console.log('Please enter your username before use file manager!' + EOL);
    exit();
}

chdir(homedir());


console.log(EOL + `Welcome to the File Manager, ${env.username}!` + EOL);
console.log(`You are currently in ${cwd()} :`);


process.stdin.pipe(commandProcess).pipe(process.stdout);

const exitEvents = ['exit', 'close', 'SIGINT', 'SIGUSR1', 'SIGUSR2'];

exitEvents.forEach((i) => {
    process.on(i, (err) => {
        if (i === 'SIGINT') {
            exit();
        }

        console.log(`${EOL}Thank you for using File Manager, ${env.username}!`);
    })
})
