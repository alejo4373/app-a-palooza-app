const db = require('./')

const add = (user) => {
  return db.one(`
      INSERT INTO users(name, n_job_apps_goal)
        VALUES ($/name/, $/n_job_apps_goal/)
        RETURNING *
    `, user)
}

module.exports = {
  add
}
