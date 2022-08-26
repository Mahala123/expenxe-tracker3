import React,{useRef} from 'react'
import{useHistory} from 'react-router-dom'

function ForgetPassword() {
  const inputEmail=useRef()
  const history=useHistory()
  const enterEmail=(event)=>{
    event.preventDefault()
   const email=inputEmail.current.value
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAIpFpXqTkA-YkLV506rGbmUDu1_nJmw5I',
    {
        method: 'POST',
        body:JSON.stringify({
            requestType:"PASSWORD_RESET",
            email:email,
          }),
          headers:{
            'Content-Type': 'application/json'
          }

// 
    })
    .then(res=>{
        if(res.ok)
        {
          console.log(res.ok)
            alert('link sent to the entered email');
            history.replace('/');
           return res.json()
         }
          }).then(data=>
            {
              console.log(data)
            }).catch(err=>{
              alert(err.message)
            })

  }
  return (
    <div className='signupBody1'>
    <h2>Entered Your Registered Email</h2>
    <form onClick={enterEmail} >
    <input type="email" placeholder='Email'ref={inputEmail} required />
    <button type='submit' className='signupBtn1' >SEND EMAIL</button>
    </form>  
    </div>
  )
}

export default ForgetPassword
