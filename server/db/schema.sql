CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  n_job_apps_goal INT,
  session_id VARCHAR,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE job_applications (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  company_name VARCHAR,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

