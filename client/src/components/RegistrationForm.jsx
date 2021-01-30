import { Redirect } from 'react-router-dom'
import { Form, Button, Input } from 'semantic-ui-react';

const RegistrationForm = ({ user }) => {
  if (user) return <Redirect to='/' />
  return (
    <div>
      <h2>Welcome to Own Your Pursuit App-A-Palooza 🎉</h2>
      <p>App-A-Palooza is an event where you apply to as many jobs in the set amount of time.</p>
      <p>This app will let you set a personal goal for how many Job Applications you want to send today. Make sure to set a realistic goal since you only have on an a half hours. </p>
      <p>Your goal will be part of 6.0 Own Your Pursuit Community Goal. Every time you submit an application you will closer to your goal but also it will count towards the community goal and the bar will go up. Your personal goal will never be revealed.</p>
      <Form size="huge">
        <Form.Field>
          <label>Name:</label>
          <Input placeholder="Jane Doe" />
        </Form.Field>
        <Form.Field size="massive" >
          <label># of Job Applications Goal:</label>
          <Input
            iconPosition="left"
            icon="flag checkered"
            type="number"
            min="1"
            placeholder="1"
          />
        </Form.Field>
        <Button primary size="huge" fluid>Own Your Pursuit</Button>
      </Form>
    </div>
  )
}

export default RegistrationForm
