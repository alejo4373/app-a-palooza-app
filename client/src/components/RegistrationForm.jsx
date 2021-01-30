import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Button, Input } from 'semantic-ui-react';

const RegistrationForm = ({ user, setUser }) => {
  const [name, setName] = useState('')
  const [goal, setGoal] = useState('1')

  const registerUser = async () => {
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, n_job_apps_goal: goal })
      })
      const data = await res.json()
      setUser(data.user)
    } catch (err) {
      console.error(err)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    registerUser()
    setName('')
    setGoal('')
  }

  if (user) return <Redirect to='/' />
  return (
    <div>
      <h2>Welcome to Own Your Pursuit App-A-Palooza 🎉</h2>
      <p>App-A-Palooza is an event where you apply to as many jobs in the set amount of time.</p>
      <p>This app will let you set a personal goal for how many Job Applications you want to send today. Make sure to set a realistic goal since you only have on an a half hours. </p>
      <p>Your goal will be part of 6.0 Own Your Pursuit Community Goal. Every time you submit an application you will closer to your goal but also it will count towards the community goal and the bar will go up. Your personal goal will never be revealed.</p>
      <Form size="huge" onSubmit={handleSubmit}>
        <Form.Field>
          <label>Name:</label>
          <Input
            placeholder="Jane Doe"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Job Applications Goal:</label>
          <Input
            iconPosition="left"
            icon="flag checkered"
            required
            type="number"
            min="1"
            placeholder="#"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
        </Form.Field>
        <Button primary>Own Your Pursuit</Button>
      </Form>
    </div>
  )
}

export default RegistrationForm
