const express = require('express')
const router = express.Router();
const testUser = require('../middleware/testUser');

const { 
  getAllJobs, 
  getJob, 
  createJob, 
  updateJob, 
  deleteJob,
  showStats} = require('../controllers/jobsController')

router.get('/', getAllJobs)
router.post('/', testUser, createJob)

router.get('/stats', showStats)

router.get('/:id', getJob)
router.patch('/:id', testUser, updateJob)
router.delete('/:id', testUser, deleteJob)

module.exports = router