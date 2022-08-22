//import logo from './logo.svg';
import './App.css';
import { useContext } from 'react';
import SignUp from './components/signUp/SignUp';
import{Route,Switch} from 'react-router-dom'
import WelcomePage from './components/Pages/WelcomePage';
import AuthContext from './components/Store/Store';
import CompleteProfile from './components/Pages/CompleteProfile';
 


function App() {
  const authCtx=useContext(AuthContext)
  const isLogIn=authCtx.isLogIn
  return (
    <div className="App">
    <Switch>
    {isLogIn && <Route path='/welcome'exact>
      <WelcomePage/>
    </Route>}
    <Route path='/completeProfile'>
      <CompleteProfile/>
    </Route>
  {!isLogIn && <Route path="/">
    <SignUp/>
    </Route> }
    
    </Switch> 
    </div>
  );
}

export default App;
