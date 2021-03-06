import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import { useEffect, useState } from 'react'
import GoalsDisplay from './components/GoalsDisplay'
import RegistrationForm from './components/RegistrationForm';

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users/current`)
        const data = await res.json()
        setUser(data.user)
      } catch (err) {
        window.alert(err)
      }
      setLoading(false)
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
        <Route exact path="/">{
          !user
            ? <Redirect to="/register" />
            : <GoalsDisplay user={user} />
        }
        </Route>
        <Route path="/register">
          <RegistrationForm user={user} setUser={setUser} />
        </Route>
        <Route path="/community">
          <GoalsDisplay />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
