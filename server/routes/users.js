var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  const { wss } = req.app.locals
  wss.broadcast({ type: 'HELLO' })
  res.send('respond with a resource');
});

module.exports = router;
