import React, { useContext } from 'react'
import AuthContext from '../Store/Store';
import {useHistory} from 'react-router-dom'

function LogOutHandler() {
   const authCtx= useContext(AuthContext)
   const history=useHistory()
    const LogOutHandler=()=>{
        authCtx.logout()
      history.replace('/')
    }
  return (
    <div>
      <button onClick={LogOutHandler}>Logout</button>
    </div>
  )
}

export default LogOutHandler;
