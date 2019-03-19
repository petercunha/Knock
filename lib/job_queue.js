const Queue = require('bull')
const chalk = require('chalk')
const PortscanWorker = require('./jobs/portscan')
const AttackWorker = require('./jobs/attack')

// Queue configuration
const QueueConfig = {
  redis: {
    port: process.env.REDIS_POST,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD
  }
};

// Create the job queues
const portscanQueue = new Queue('portscan', QueueConfig);
const attackQueue = new Queue('attack', QueueConfig);

async function init() {
  // Clean up queues
  await portscanQueue.empty();
  await attackQueue.empty();

  // Assign workers
  portscanQueue.process(4, PortscanWorker)
  attackQueue.process(7, AttackWorker)

  // Initialize jobs
  startWorkers()
}

// Starts the worker job
function startWorkers() {
  portscanQueue.add({hosts: 300})
  portscanQueue.add({hosts: 300})
  portscanQueue.add({hosts: 300})
  portscanQueue.add({hosts: 300})

  portscanQueue.on('completed', function(job, result) {
    // console.log(chalk.gray(`finished portscan job #`, job.id));

    attackQueue.add({file: result.file, timeout: 300})
    attackQueue.count().then(attackJobCount => {
      if (attackJobCount < 5) {
        portscanQueue.add({hosts: 300})
      }
    })

    job.remove();
  });

  attackQueue.on('completed', function(job, result) {
    // console.log(chalk.gray(`finished attack job #`, job.id));
    console.log(chalk.green(result.data));

    if (attackQueue.count() < 5) {
      portscanQueue.add({hosts: 300})
    }

    fs.unlink(job.data.file, (err) => {
      if (err) throw err;
    });

    job.remove();
  });
}

module.exports = {init}