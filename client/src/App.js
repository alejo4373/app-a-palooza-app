import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { API_URL } from './CONSTANTS'
import { Switch, Route, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import GoalsDisplay from './components/GoalsDisplay'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_URL}/users/current`)
        const data = await res.json()
        setUser(data.user)
        setLoading(false)
      } catch (err) {
        console.error(err)
      }
    }

    fetchUser()
  }, [])

  if (loading) return <h3>Loading...</h3>

  return (
    <div className="App">
      <nav>
        <Link to="/">Home</Link>{" "}
        <Link to="/community">Community</Link>{" "}
        <Link to="/register">Register</Link>
      </nav>
      <Switch>
        <Route exact path="/">
          <GoalsDisplay user={user} />
        </Route>
        <Route path="/register">
          <h1>Register</h1>
        </Route>
        <Route path="/community">
          <h1>community</h1>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
