import React from 'react'
// import AuthContext from '../Store/Store';
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { authsliceactions } from '../Store/Store'

function LogOutHandler() {
  //  const authCtx= useContext(AuthContext)
  const dispatch=useDispatch()
   const history=useHistory()
    const LogOutHandler=()=>{
        // 
        dispatch(authsliceactions.deletetokenId())
      history.replace('/')
    }
  return (
    <div>
      <button onClick={LogOutHandler}>Logout</button>
    </div>
  )
}

export default LogOutHandler;
