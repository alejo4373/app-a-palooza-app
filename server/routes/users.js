const express = require('express')
const router = express.Router();
const Users = require('../db/users');

router.post('/', async (req, res, next) => {
  const { wss } = req.app.locals
  try {
    const user = await Users.add(req.body)
    wss.broadcast({ type: 'NEW_USER_ADDED', payload: user })
    res.status(201).json({
      message: "User Added",
      user
    });
  } catch (err) {
    next(err)
  }
});

module.exports = router;
