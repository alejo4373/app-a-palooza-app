const express = require('express')
const router = express.Router();
const Users = require('../db/users');

router.post('/', async (req, res, next) => {
  const { wss } = req.app.locals
  try {
    const user = await Users.add(req.body)

    // Store user info in the session for use when adding an application
    req.session.user = user

    wss.broadcast({ type: 'NEW_USER_ADDED', payload: { user } })

    res.status(201).json({
      message: "User Added",
      user
    });
  } catch (err) {
    next(err)
  }
});

router.get('/current', (req, res, next) => {
  if (req.session.user) {
    res.json({
      message: "Retrieved current user session",
      user: req.session.user
    })
  } else {
    res.json({
      message: "No current user session",
    })
  }
})
module.exports = router;
