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
  // const isPremiums=useSelector(state=>state.exp.isPremium)
  const expenses=useSelector(state=>state.exp.expenses)
 let totalExpense=0
 if (expenses) {
  totalExpense = Object.keys(expenses).reduce((p, key) => {
    return p + Number(expenses[key].cost);
  }, 0);
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
  <LogOutHandler/>
  <div className='comProfile'>YOUR profile is incomplete <NavLink to='/CompleteProfile'>complete Now</NavLink></div>
    <button onClick={verifyEmail}>VERIFY YOUR EMAIL</button>
    {totalExpense > 10000 && (
          <button>
            Activate Premium
          </button>
        )}
    <ExpenseForm/>
    
   <button onClick={csvDownload}>
    DOWNLOAD CSV
   </button>
    </div>
  
  )
}

export default WelcomePage
