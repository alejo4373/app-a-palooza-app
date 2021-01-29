const router = require('express').Router()
const JobApplications = require('../db/jobApplications')

router.post('/', async (req, res, next) => {
  const { wss } = req.app.locals
  const { userId, userName } = req.session
  try {
    const application = await JobApplications.add({
      ...req.body,
      user_id: userId
    })
    wss.broadcast({
      type: 'NEW_APPLICATION_ADDED',
      payload: { ...application, userName }
    })
    res.status(201).json({
      message: "New application added",
      application: { ...application, userName }
    })
  } catch (err) {
    next(err)
  }

})

router.get('/count', async (req, res, next) => {
  try {
    const count = await JobApplications.getCount()
    res.json({
      message: "Retrieved count of all job applications",
      count
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router;
