const ora = require('ora')
const chalk = require('chalk')

const load = str => ora(str).info()
const succeed = str => ora(str).succeed()
const warn = str => ora(str).warn()
const info = str => ora(str).info()
const fail = str => ora(str).fail()
const green = str => console.log(chalk.green(str))
const gray = str => console.log(chalk.gray(str))

module.exports = {
	load,
	succeed,
	warn,
	info,
	fail,
	green
}
