import { Redirect } from 'react-router-dom';

const GoalDisplay = ({ user }) => {
  if (!user) return <Redirect to="/register" />
  return (
    <div>
      <h1>{user.name}</h1>
    </div>
  )
}

export default GoalDisplay;
