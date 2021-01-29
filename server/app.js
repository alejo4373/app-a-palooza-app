var express = require('express');
var path = require('path');
var logger = require('morgan');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session)
const db = require('./db')
const cors = require('cors')
var jobApplications = require('./routes/jobApplications');
var usersRouter = require('./routes/users');

var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  store: new pgSession({
    pool: db.$pool,
  }),
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 days
  }
}))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/job-applications', jobApplications);
app.use('/api/users', usersRouter);

module.exports = app;
