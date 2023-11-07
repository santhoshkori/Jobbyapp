import {Switch, Route, Redirect} from 'react-router-dom'
import LoginPage from './Components/LoginPage'
import HomePage from './Components/HomePage'
import JobsPage from './Components/JobsPage'
import JobcardDetails from './Components/JobcardDetails'
import ProtectedRoute from './Components/ProctectedRoute'
import NotFoundPage from './Components/NotFoundPage'
import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <ProtectedRoute exact path="/" component={HomePage} />
    <ProtectedRoute exact path="/jobs" component={JobsPage} />
    <ProtectedRoute exact path="/jobs/:id" component={JobcardDetails} />
    <Route exact path="/not-found" component={NotFoundPage} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
