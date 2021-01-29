const express = require('express')
const router = express.Router();
const Users = require('../db/users');

router.post('/', async (req, res, next) => {
  const { wss } = req.app.locals
  try {
    const user = await Users.add(req.body)

    // Add user id and name to the session for use when adding an application
    req.session.userId = user.id
    req.session.userName = user.name

    wss.broadcast({ type: 'NEW_USER_ADDED', payload: user })

    res.status(201).json({
      message: "User Added",
      user
    });
  } catch (err) {
    next(err)
  }
});

router.get('/current', (req, res, next) => {
  if (req.session.userId) {
    res.json({
      message: "Retrieved current user session",
      user: {
        id: req.session.userId,
        name: req.session.userName
      }
    })
  } else {
    res.json({
      message: "No current user session",
    })
  }
})
module.exports = router;
