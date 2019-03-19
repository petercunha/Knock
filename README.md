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
- Network Worm
  - Cross-platform, portable binary version of this software.
  - After hacking into vulnerable service, drop the binary and start it.
  - Cracking speed grows linearly with each machine hacked.
  - Potentially centralized C&C through Tor (?)
- Web UI for monitoring cracking jobs and progress
- Shodan API integration
- Support for VNC, RDP, FTP, and others.

## Pull Requests Welcome!
Pull requests are welcome and encouraged! Feel free to fork, hack, and contribute to the project.

#### Notice
##### :warning: This software is under active development, features are subject to change in future versions.
