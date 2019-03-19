require('dotenv').config()
let worker = require('./lib/job_queue')

worker.init()
