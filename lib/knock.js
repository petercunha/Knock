const Queue = require('bull')
const logger = require('./logger')
const PortscanWorker = require('./jobs/portscan')
const AttackWorker = require('./jobs/attack')

// Queue configuration
const QueueConfig = {
	redis: {
		port: process.env.REDIS_POST,
		host: process.env.REDIS_HOST,
		password: process.env.REDIS_PASSWORD
	}
}

// Create the job queues
const portscanQueue = new Queue('portscan', QueueConfig)
const attackQueue = new Queue('attack', QueueConfig)

async function init() {
	// Clean up old jobs
	// await cleanUp()

	// Assign workers
	portscanQueue.process(4, PortscanWorker)
	attackQueue.process(16, AttackWorker)

	// Initialize jobs
	startWorkers()
}

// Starts the worker job
function startWorkers() {
	logger.succeed(`Spinning up...`)

	logger.succeed(`Starting portscans...`)
	portscanWorkerLogic()

	logger.succeed(`Starting attacker module...`)
	attackWorkerLogic()
}

function portscanWorkerLogic() {
	for (let i = 0; i < 4; i++) {
		portscanQueue.add({ hosts: 50 })
	}

	portscanQueue.on('completed', function(job, result) {
		// logger.succeed(`finished portscan job #${job.id}`)

		if (result.hosts.length > 0) {
			result.hosts.map(ip => {
				attackQueue.add('', { host: ip, timeout: 10 }, { timeout: 90 * 1000 })
			})
		}
		portscanQueue.count().then(jobCount => {
			if (jobCount < 15) {
				let quota = 15 - jobCount
				for (let i = 0; i < quota; i++) {
					portscanQueue.add('', { hosts: 50 })
				}
			}
		})
		job.remove()
	})

	portscanQueue.on('failed', function(job, err) {
		console.log(err)
		job.remove()
	})
}

function attackWorkerLogic() {
	attackQueue.on('completed', function(job, result) {
		// logger.succeed(`finished attack job #${job.id}`)

		const credentials = result.data
		if (credentials.length != 0) {
			logger.green(`CRACKED: ${credentials}`)
		} else {
			logger.gray(`No password found for ${job.data.host}`)
		}

		job.remove()
	})

	attackQueue.on('failed', function(job, err) {
		// logger.succeed(`finished attack job, no results #${job.id}`)
		job.remove()
	})
}

function cleanUp() {
	return Promise.all([attackQueue.clean(100), portscanQueue.clean(100)])
}

module.exports = { init }
