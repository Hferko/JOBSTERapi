const Job = require('../models/JobModel')
const { StatusCodes } = require('http-status-codes')
const { NotFoundError, BadRequestError, } = require('../errors')
const mongoose = require('mongoose')
const moment = require('moment')

const getAllJobs = async (req, res) => {
  const { search, status, jobType, sort } = req.query;

  const queryObject = {
    createdBy: req.user.userID,
  }

  if (search) {
    queryObject.position = { $regex: search, $options: 'i' }
  }
  if (status && status !== 'összes') {
    queryObject.status = status;
  }
  if (jobType && jobType !== 'összes') {
    queryObject.jobType = jobType;
  }
  let result = Job.find(queryObject);

  if (sort === 'legújabb elöl') {
    result = result.sort('-createdAt')
  }
  if (sort === 'legrégebbi elöl') {
    result = result.sort('createdAt')
  }
  if (sort === 'a-z') {
    result = result.sort('position')
  }
  if (sort === 'z-a') {
    result = result.sort('-position')
  }

  // PAGINATION
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 6;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const jobs = await result
  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);

  res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages })
}

const getJob = async (req, res) => {
  const { user: { userID }, params: { id: jobId } } = req

  const job = await Job.findOne({
    _id: jobId,
    createdBy: userID
  })

  if (!job) {
    throw new NotFoundError(`Nem található állás ezzel az _id-vel: ${jobId}`)
  }
  res.status(StatusCodes.OK).json({ job })
}

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userID
  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({ job })
}

const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userID },
    params: { id: jobId } } = req

  if (company === '' || position === '') {
    throw new BadRequestError('Nem lehet üres sem Company sem a Position érték')
  }

  const job = await Job.findOneAndUpdate({
    _id: jobId,
    createdBy: userID
  }, req.body, { new: true, runValidators: true })

  if (!job) {
    throw new NotFoundError(`Nem található állás ezzel az _id-vel: ${jobId}`)
  }
  res.status(StatusCodes.OK).json({ job })
}

const deleteJob = async (req, res) => {
  const { user: { userID }, params: { id: jobId } } = req

  const job = await Job.findOneAndDelete({
    _id: jobId,
    createdBy: userID
  })

  if (!job) {
    throw new NotFoundError(`Nem található állás ezzel az _id-vel: ${jobId}`)
  }
  res.status(StatusCodes.OK).send(`A ${job.position} állás törölve`)
}

const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userID) } },
    { $group: { _id: '$status', count: { $sum: 1 } } }
  ])

  stats = stats.reduce((accumulator, currentValue) => {
    const { _id: title, count } = currentValue;
    accumulator[title] = count;
    return accumulator;
  }, {});

  const defaultStats = {
    pending: stats['függőben'] || 0,
    declined: stats['elutasítva'] || 0,
    interview: stats.interview || 0,
  }
  console.log(defaultStats);

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userID) } },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 }
      }
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 }
  ])

  monthlyApplications = monthlyApplications.map((item) => {
    const { _id: { year, month }, count } = item;
    const date = moment().year(year).month(month - 1).format("Y MMM");
    return { date, count }
  }).reverse();
  
  console.log(monthlyApplications);

  res.status(StatusCodes.OK).json({ defaultStats: defaultStats, monthlyApplications: monthlyApplications })
}


module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  showStats,
}
