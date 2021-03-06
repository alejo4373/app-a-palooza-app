import { useState, useEffect } from 'react';
import { Form, Input, Button, Progress, Message, Container, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'

const WS_PROTOCOL = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
const SOCKET_ADDRESS = `${WS_PROTOCOL}//${window.location.host}/my-websockets`
let socket;

const GoalDisplay = ({ user }) => {
  const [communityGoal, setCommunityGoal] = useState(0)
  const [communityCount, setCommunityCount] = useState(0)
  const [userCount, setCount] = useState(0)
  const [companyName, setCompanyName] = useState('')
  const progressPercentage = (communityCount / communityGoal) * 100
  const { addToast } = useToasts()
  const { width, height } = useWindowSize()
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

  useEffect(() => {
    const socketListeners = {
      message: (e) => {
        const { type, payload } = JSON.parse(e.data)

        switch (type) {
          case "NEW_APPLICATION_ADDED":
            if (user && payload.user.id === user.id) {
              setCount(count => parseInt(count) + 1)
            }
            setCommunityCount(count => parseInt(count) + 1)
            const message = `${payload.user.name} just sent an application 🎉`
            addToast(message, {
              appearance: 'success',
              autoDismiss: true
            })
            break;
          case "NEW_USER_ADDED":
            setCommunityGoal(goal => parseInt(goal) + payload.user.n_job_apps_goal)
            break;
          default:
            console.log("socket message:", JSON.stringify(e))
        }
      },

      error: (e) => {
        window.alert('WebSocket error: Please refresh the page', JSON.stringify(e))
        console.log('WebSocket error', e)
      },

      open: (e) => {
        console.log('WebSocket connection established', e)
      },

      close: (e) => {
        console.log('WebSocket connection closed', e)
      }
    }
    socket = new WebSocket(SOCKET_ADDRESS)
    socket.addEventListener('message', socketListeners.message)
    socket.addEventListener('error', socketListeners.error)
    socket.addEventListener('open', socketListeners.open)
    socket.addEventListener('close', socketListeners.close)

    return () => socket.close()
  }, [])

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

  return (
    <div>
      {progressPercentage >= 100
        ? <Confetti width={width} height={height} />
        : null
      }
      <h2>Community Goal: {`${communityCount} / ${communityGoal}`}</h2>
      <div className="progress-bar-container">
        <Progress
          percent={progressPercentage.toFixed(1)}
          indicating
          progress
          size='big'
        />
      </div>
      {
        user ? (
          <>
            <h2>Your Goal: {`${userCount} / ${user.n_job_apps_goal}`}</h2>
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
          </>
        ) : (
            <Container>
              <Message icon>
                <Icon name="trophy" />
                <Message.Content>
                  <Message.Header> Fellows </Message.Header>
                  To participate and contribute to the goal go to <Link to="/register" L>register</Link>, or <Link to="/">home</Link> if you already did.
                </Message.Content>
              </Message>
            </Container>
          )
      }
    </div>
  )
}

export default GoalDisplay;
