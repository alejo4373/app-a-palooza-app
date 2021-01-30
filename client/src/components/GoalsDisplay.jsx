import { Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Form, Input, Button } from 'semantic-ui-react';

const GoalDisplay = ({ user }) => {
  const [communityGoal, setCommunityGoal] = useState(0)
  const [communityCount, setCommunityCount] = useState(0)
  const [userCount, setCount] = useState(0)
  const [companyName, setCompanyName] = useState('')

  const fetchCommunityGoal = async () => {
    try {
      const res = await fetch('/api/job-applications/community/goal')
      const data = await res.json()
      setCommunityGoal(data.goal)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchCommunityCount = async () => {
    try {
      const res = await fetch('/api/job-applications/community/count')
      const data = await res.json()
      setCommunityCount(data.count)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchUserJobAppsCount = async () => {
    try {
      const res = await fetch('/api/job-applications/user/count')
      const data = await res.json()
      setCount(data.count)
    } catch (err) {
      console.log(err)
    }
  }

  const addJobApplication = async () => {
    try {
      const res = await fetch('/api/job-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company_name: companyName })
      })
      await res.json()
    } catch (err) {
      console.error(err)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addJobApplication()
    setCompanyName('')
  }

  useEffect(() => {
    fetchCommunityGoal()
    fetchCommunityCount()
    fetchUserJobAppsCount()
  }, [])

  if (!user) return <Redirect to="/register" />
  return (
    <div>
      <h1>Progress</h1>
      <h2>Community: {`${communityCount} / ${communityGoal}`}</h2>
      <h2>You: {`${userCount} / ${user.n_job_apps_goal}`}</h2>
      <Form size="big" onSubmit={handleSubmit}>
        <Form.Field>
          <label>Company Name:</label>
          <Input
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="ACME"
          />
        </Form.Field>
        <Button size="big" fluid primary>+1 Applied</Button>
      </Form>
    </div>
  )
}

export default GoalDisplay;
