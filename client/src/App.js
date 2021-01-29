import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { Switch, Route, Link } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/">Home</Link>{" "}
        <Link to="/community">Community</Link>{" "}
        <Link to="/register">Register</Link>
      </nav>
      <Switch>
        <Route exact path="/">
          <h1>Home</h1>
        </Route>
        <Route path="/community">
          <h1>community</h1>
        </Route>
        <Route path="/register">
          <h1>Register</h1>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
