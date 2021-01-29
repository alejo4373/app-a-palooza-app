const router = require('express').Router()
const JobApplications = require('../db/jobApplications')

router.post('/', async (req, res, next) => {
  const { wss } = req.app.locals
  try {
    const application = await JobApplications.add(req.body)
    wss.broadcast({ type: 'NEW_APPLICATION_ADDED', payload: application })
    res.status(201).json({
      message: "New application added",
      application
    })
  } catch (err) {
    next(err)
  }

})

module.exports = router;
