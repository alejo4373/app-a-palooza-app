const db = require('./')

const add = (application) => {
  return db.one(`
      INSERT INTO job_applications(user_id, company_name)
        VALUES ($/user_id/, $/company_name/)
        RETURNING *
    `, application)
}

const getCount = () => {
  return db.one(`SELECT count(id) FROM job_applications`)
}

const getCommunityGoal = () => {
  return db.one(`SELECT SUM(n_job_apps_goal) FROM users`)
}

const getUserGoal = (userId) => {
  return db.one(`SELECT n_job_apps_goal FROM users WHERE id = $1`, userId)
}

const getUserCount = (userId) => {
  return db.one(`
    SELECT count(user_id) FROM job_applications WHERE user_id = $1`,
    userId
  )
}

module.exports = {
  add,
  getCount,
  getCommunityGoal,
  getUserGoal,
  getUserCount
}
