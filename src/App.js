//import logo from './logo.svg';
import './App.css';
// import { useContext } from 'react';
import SignUp from './components/signUp/SignUp';
import{Route,Switch} from 'react-router-dom'
import WelcomePage from './components/Pages/WelcomePage';
// import AuthContext from './components/Store/Store';
import CompleteProfile from './components/Pages/CompleteProfile';
import ForgetPassword from './components/Pages/ForgetPassword';
import { useSelector } from 'react-redux';
 


function App() {
  const isLogIn=useSelector(state=>state.auth.idToken)
  
  return (
    <div className="App">
    <Switch>
    {isLogIn && <Route path='/welcome'exact>
      <WelcomePage/>
    </Route>}
    <Route path='/completeProfile'>
      <CompleteProfile/>
    </Route>
    <Route path='/password' exact>
      <ForgetPassword/>
    </Route>
  {!isLogIn && <Route path="/">
    <SignUp/>
    </Route> }
    </Switch> 
    </div>
  );
}

export default App;
