import Signup from "./components/Signup";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Content from "./components/Content";
import Login from "./components/Login";
import Account from "./components/Account";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";
import NavBar from './components/NavBar'


function App() {
  return (
    <Router>
      <AuthProvider>
        <NavBar></NavBar>
        <Switch>
          <Route exact path='/' component={Content}/>
          <Route path='/signup' component={Signup}/>
          <Route path='/login' component={Login}/>
          <Route path='/forgot-password' component={ForgotPassword}/>
          <PrivateRoute path='/account' component={Account}/>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
