const router = require('express').Router()
const JobApplications = require('../db/jobApplications')

router.post('/', async (req, res, next) => {
  const { wss } = req.app.locals
  const { user } = req.session
  try {
    const application = await JobApplications.add({
      ...req.body,
      user_id: user.id
    })
    wss.broadcast({
      type: 'NEW_APPLICATION_ADDED',
      payload: { ...application, user }
    })
    res.status(201).json({
      message: "New application added",
      application: { ...application, user }
    })
  } catch (err) {
    next(err)
  }

})

router.get('/community/count', async (req, res, next) => {
  try {
    const data = await JobApplications.getCount()
    res.json({
      message: "Retrieved count of all job applications",
      count: data.count
    })
  } catch (err) {
    next(err)
  }
})

router.get('/community/goal', async (req, res, next) => {
  try {
    const data = await JobApplications.getCommunityGoal()
    res.json({
      message: "Retrieved job applications community goal",
      goal: data.sum
    })
  } catch (err) {
    next(err)
  }
})

router.get('/user/goal', async (req, res, next) => {
  const { user } = req.session
  try {
    const data = await JobApplications.getUserGoal(user.id)
    res.json({
      message: "Retrieved user's job applications goal",
      goal: data.n_job_apps_goal
    })
  } catch (err) {
    next(err)
  }
})

router.get('/user/count', async (req, res, next) => {
  const { user } = req.session
  try {
    const data = await JobApplications.getUserCount(user.id)
    res.json({
      message: "Retrieved user's job applications count",
      count: data.count
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router;
