# Knock
Scan the entire internet for SSH and Telnet ports. Then automatically hack them.


## Installation
- Install the following:
  - `redis`, `nmap`, `ncrack`, and `node`
- Start the Redis service, edit the `.env` file to point to it
- Then run:
  ```bash
  git clone https://github.com/petercunha/knock.git
  cd knock
  npm i
  npm start
  ```

## Roadmap
- Worm features (after gaining access to one system, install and start the tool on it, increasing the spreading speed!)
- Shodan API integration
- Support for VNC, RDP, FTP, and others.

### Warning
##### :warning: This software is under active development
I will try to Dockerize this project at some point. For now we just gotta deal with the installation part :grin:
