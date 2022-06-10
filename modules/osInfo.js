import { EOL, arch, cpus, homedir, userInfo } from 'os';

const osInfo = (flag) => {
  switch (flag.replace()) {
    case '--EOL':
      console.log(JSON.stringify(EOL));
      break;
    case '--cpus':
      const processor = cpus();
      console.log(`${processor.length}x ${processor[0].model}`);
      break;
    case '--homedir':
      console.log(homedir());
      break;
    case '--username':
      const { username } = userInfo();
      console.log(username);
      break;
    case '--architecture':
      console.log(arch());
      break;
    default:
      break;
  }
}

export default osInfo;