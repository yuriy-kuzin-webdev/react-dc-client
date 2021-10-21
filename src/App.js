import Signup from "./components/Signup";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Content from "./components/Content";
import Login from "./components/Login";
import Account from "./components/Account";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";
import NavBar from './components/NavBar'
import Dentists from "./components/Dentists";
import Clinics from "./components/Clinics";
import Appointment from "./components/Appointment";
import Appointments from "./components/Appointments";
import Footer from "./components/Footer";


function App() {
  return (
    <Router>
      <AuthProvider>
        <NavBar></NavBar>
        <Switch>
          <Route exact path='/' component={Content}/>
          <Route path='/dentists' component={Dentists}/>
          <Route path='/clinics' component={Clinics}/>
          <Route path="/appointment" component={Appointment}/>
          <Route path='/signup' component={Signup}/>
          <Route path='/login' component={Login}/>
          <Route path='/forgot-password' component={ForgotPassword}/>
          <PrivateRoute path='/account' component={Account}/>
          <PrivateRoute path='/appointments' component={Appointments}/>
        </Switch>
        <Footer/>
      </AuthProvider>
    </Router>
  );
}

export default App;
