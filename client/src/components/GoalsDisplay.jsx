import { Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';

const GoalDisplay = ({ user }) => {
  const [communityGoal, setCommunityGoal] = useState(0)
  const [communityCount, setCommunityCount] = useState(0)
  const [userCount, setCount] = useState(0)

  useEffect(() => {
    const fetchCommunityGoal = async () => {
      try {
        const res = await fetch('/api/job-applications/community/goal')
        const data = await res.json()
        setCommunityGoal(data.goal)
      } catch (err) {
        console.log(err)
      }
    }

    fetchCommunityGoal()
  }, [])

  useEffect(() => {
    const fetchCommunityCount = async () => {
      try {
        const res = await fetch('/api/job-applications/community/count')
        const data = await res.json()
        setCommunityCount(data.count)
      } catch (err) {
        console.log(err)
      }
    }

    fetchCommunityCount()
  }, [])

  useEffect(() => {
    const fetchUserJobAppsCount = async () => {
      try {
        const res = await fetch('/api/job-applications/user/count')
        const data = await res.json()
        setCount(data.count)
      } catch (err) {
        console.log(err)
      }
    }

    fetchUserJobAppsCount()
  }, [])

  if (!user) return <Redirect to="/register" />
  return (
    <div>
      <h1>Progress</h1>
      <h2>6.0 Community: {`${communityCount} / ${communityGoal}`}</h2>
      <h3>You: {`${userCount} / ${user.n_job_apps_goal}`}</h3>
    </div>
  )
}

export default GoalDisplay;
