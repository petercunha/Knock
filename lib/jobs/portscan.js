const util = require('util')
const logger = require('../logger')
const exec = util.promisify(require('child_process').exec)

async function scan(job, done) {
	const cmd = `nmap -oG - -Pn -T4 --open -p 22 -iR ${job.data.hosts}`

	try {
		const { stdout, stderr } = await exec(cmd)
		const hosts = stdout
			.split('\n')
			.filter(line => line.includes('/open/'))
			.map(line => line.split(' ')[1])

		done(null, { hosts })
	} catch (error) {
		done(error, null)
	}
}

function work(job, done) {
	// logger.load(`working portscan job #${job.id}`)
	scan(job, done)
}

module.exports = work
