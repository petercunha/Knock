const util = require('util');
const chalk = require('chalk')
const path = require('path');
const exec = util.promisify(require('child_process').exec);

async function scan(job, done) {
  const dir = path.dirname(require.main.filename)
  const file = path.join(dir, 'lib', 'jobs', 'portscans', job.id + '.scan')
  const ports = [22, 23].join(',')

  const cmd =
      `nmap -oX ${file} -Pn -T4 --open -p ${ports} -iR ${job.data.hosts}`;

  try {
    const {stdout, stderr} = await exec(cmd);
    done(null, {file: file, result: stdout})
  } catch (error) {
    console.log('An error occured running nmap:\n', error);
    throw new Error('cant run nmap:', error);
  }
}

function work(job, done) {
  console.log(chalk.gray('working portscan job #', job.id));
  scan(job, done);
}

module.exports = work