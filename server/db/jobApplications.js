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


module.exports = {
  add,
  getCount,
  getCommunityGoal
}
