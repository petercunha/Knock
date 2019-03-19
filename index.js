const VERSION = 0.1;
const chalk = require('chalk')
require('dotenv').config()
require('./lib/knock').init()

console.log(`
_  ___   _  ___   ____ _  __
| |/ / \\ | |/ _ \\ / ___| |/ /
| ' /|  \\| | | | | |   | ' /
| . \\| |\\  | |_| | |___| . \\
|_|\\_\\_| \\_|\\___/ \\____|_|\\_'

${chalk.dim('Knock v' + VERSION)}
${chalk.dim('Hack the internet!')}
${chalk.dim('Project by https://github.com/petercunha/knock')}
`)