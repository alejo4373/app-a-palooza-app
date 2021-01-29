const db = require('./')

const add = (application) => {
  return db.one(`
      INSERT INTO job_applications(user_id, company_name)
        VALUES ($/user_id/, $/company_name/)
        RETURNING *
    `, application)
}

module.exports = {
  add
}
