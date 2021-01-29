const db = require('./')

const add = (user) => {
  return db.one(`
      INSERT INTO users(name, n_job_apps_goal, session_id)
        VALUES ($/name/, $/n_job_apps_goal/, $/session_id/)
        RETURNING *
    `, user)
}

module.exports = {
  add
}
