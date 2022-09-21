import React, { useRef }  from 'react'
//import'./WelcomePage.css'
import{NavLink} from 'react-router-dom'
// import AuthContext from '../Store/Store'
import LogOutHandler from './LogOutHandler'
import ExpenseForm from './ExpenseForm'
import {useDispatch, useSelector} from "react-redux"
import { expnseSliceActions} from '../Store/Store'
import classes from './WelcomePage.module.css'

function WelcomePage() {
  // 
  const togle=useRef()
  const dispatch=useDispatch()
  //const theme=useSelector(state=>state.darkTheme)
 // console.log(theme)
  const token=useSelector(state=>state.auth.idToken)
   const isPremiums=useSelector(state=>state.exp.isPremium)
  /// console.log(isPremiums)
  const expenses=useSelector(state=>state.exp.expenses)
 // const verify=useSelector(state=>state.auth.emailVerified)
 let totalExpense=0
 if (expenses) {
  totalExpense = Object.keys(expenses).reduce((p, key) => {
    return p + Number(expenses[key].cost);
  }, 0);
}
const toggleTheme=(event)=>{
  if(event.target.checked){
    dispatch(expnseSliceActions.setDarkTheam(true))
   }
  else{
    dispatch(expnseSliceActions.setDarkTheam(false))
  }

}
const activePremHandler=()=>
{
  dispatch(expnseSliceActions.setPremium(true))
}
const csvDownload=()=>{
  let csv="cost,           category,         description\n";
  Object.keys(expenses).forEach((item) => {
  csv +=`cost:${expenses[item].cost}\tcatagory:${expenses[item].catagory}\tdescription:${expenses[item].description}`
})
const blob=new Blob([csv],{type:'plain/text'}) 
const a=document.createElement("a")
a.href=URL.createObjectURL(blob)
a.download='csv-1.txt'
document.body.appendChild(a)
a.click()
}
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
  {isPremiums &&   <div >
       <label >Toggle Theme</label><br/>
       <label className={classes.switch}>
       <input
      ref={togle}
        type="checkbox"
        onClick={toggleTheme}
       />
       <span className={`${classes.slider} ${classes.round}`}></span>
       </label>
       </div>   }
  <LogOutHandler/>
  <div className='comProfile'>YOUR profile is incomplete <NavLink to='/CompleteProfile'>complete Now</NavLink></div>
    <button onClick={verifyEmail}>VERIFY YOUR EMAIL</button>
    {totalExpense > 10000 && (
          <button onClick={activePremHandler}>
            Activate Premium
          </button>
        )}<br/>
       
    <ExpenseForm/>
    
   <button onClick={csvDownload}>
    DOWNLOAD CSV
   </button>
    </div>
  
  )
}

export default WelcomePage
