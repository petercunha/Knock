# Knock
Scan random IP addresses on the Internet for open SSH and Telnet ports. Then automatically hack them by using THC-Hydra. The entire process is automated by Knock, and credentials are printed to console as they are found. 

When tested on a 25/5 Mbps connection, **Knock found an average of 3 server login credentials per hour.**

:warning: *USING THIS PROGRAM IN IT'S CURRENT STATE IS ILLEGAL. I AM NOT RESPONSIBLE FOR USAGE.


## Demo
A demo of running this software. It can take several minutes on a good connection before Knock starts finding accounts.

[![asciicast](https://asciinema.org/a/UCcMXi1wl2Zs3OZYjGigmaxUS.svg)](https://asciinema.org/a/UCcMXi1wl2Zs3OZYjGigmaxUS)

## Installation
- Install the following:
  - `redis`, `nmap`, `hydra`, and `node`
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
