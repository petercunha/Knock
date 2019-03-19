const ora = require('ora');
const chalk = require('chalk')

const load = (str) => ora(chalk.gray(str)).info();
const succeed = (str) => ora(chalk.gray(str)).succeed();
const warn = (str) => ora(str).warn();
const info = (str) => ora(chalk.gray(str)).info();
const fail = (str) => ora(str).fail();
const green = (str) => console.log(chalk.green(str))

module.exports = {
  load,
  succeed,
  warn,
  info,
  fail,
  green
}