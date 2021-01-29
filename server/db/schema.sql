CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  n_job_apps_goal INT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE job_applications (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  company_name VARCHAR,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE session (
  sid VARCHAR,
  sess JSON NOT NULL,
  expire TIMESTAMP(6) NOT NULL
) WITH (OIDS=FALSE);

ALTER TABLE session ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid");

CREATE INDEX "session_expire_idx" on session(expire)
