const logger = require('../logger')
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function attack(job, done) {
  const dir = path.dirname(require.main.filename)
  const userfile = path.join(dir, 'lists', 'user.txt')
  const passfile = path.join(dir, 'lists', 'pass.txt')

  const cmd = `ncrack -f -iX ${job.data.file} -U ${userfile} -P ${
      passfile} -T4 -g to=${job.data.timeout}s`;

  try {
    const {stdout, stderr} = await exec(cmd);
    done(null, {data: stdout})
  } catch (error) {
    done(error, null)
  }
}

function work(job, done) {
  logger.load(`working attack job #${job.id}`);
  attack(job, done);
}

module.exports = work