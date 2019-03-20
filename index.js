// Software Version
const version = 0.2

// Initialize
const chalk = require('chalk')

// Banner
console.log(`
_  ___   _  ___   ____ _  __
| |/ / \\ | |/ _ \\ / ___| |/ /
| ' /|  \\| | | | | |   | ' /
| . \\| |\\  | |_| | |___| . \\
|_|\\_\\_| \\_|\\___/ \\____|_|\\_'

${chalk.dim(`Knock v${version}`)}
${chalk.dim('Hack the internet!')}
${chalk.dim('Project by https://github.com/petercunha/knock')}
`)

require('dotenv').config()
require('./lib/knock').init()
