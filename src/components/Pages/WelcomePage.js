import React  from 'react'
import'./WelcomePage.css'
import{NavLink} from 'react-router-dom'
// import AuthContext from '../Store/Store'
import LogOutHandler from './LogOutHandler'
import ExpenseForm from './ExpenseForm'
import {useSelector} from "react-redux"

function WelcomePage() {
  // 
  const token=useSelector(state=>state.auth.idToken)
  const verifyEmail=()=>{
   fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAIpFpXqTkA-YkLV506rGbmUDu1_nJmw5I",
   {
    method: 'POST',
        body:JSON.stringify({
           
        idToken:token,
        requestType:'VERIFY_EMAIL',
          }),
          headers:{
            'Content-Type': 'application/json' 
       }
   }).then(res=>{
    if(res.ok)
    {
        alert('email is varified');
    }
    else{
        alert('aunthentication failed');
    }
   })
  }
  return (
  <div className='comProfile'>
  <h3>WELLCOME TO EXPENXE TRACKER</h3>
  <LogOutHandler/>
  <div className='comProfile'>YOUR profile is incomplete <NavLink to='/CompleteProfile'>complete Now</NavLink></div>
    <button onClick={verifyEmail}>VERIFY YOUR EMAIL</button>
    <ExpenseForm/>
    </div>
  
  )
}

export default WelcomePage
