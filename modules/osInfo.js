import { EOL, arch, cpus, homedir, userInfo } from 'os';

const osInfo = (flag) => {
  switch (flag.replace()) {
    case '--EOL':
      console.log(EOL+JSON.stringify(EOL));
      break;
    case '--cpus':
      const processor = cpus();
      console.log(EOL+`${processor.length}x ${processor[0].model}`);
      break;
    case '--homedir':
      console.log(EOL+homedir());
      break;
    case '--username':
      const { username } = userInfo();
      console.log(EOL+username);
      break;
    case '--architecture':
      console.log(EOL+arch());
      break;
    default:
      break;
  }
}

export default osInfo;