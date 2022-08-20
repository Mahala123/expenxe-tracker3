import { useState,useRef } from 'react';
import './SignUp.css'

const AuthForm = () => {
  const emailInputRef=useRef()
  const passwordInpRef=useRef()
  const confirmInpRef=useRef()

  const [isLogin, setIsLogin] = useState(false);
  console.log(setIsLogin)


  // const switchModeHandler = () => {
  //   setIsLogin((prevState) => !prevState);
  // };
  const submitHandler=(event)=>
  {
    event.preventDefault()
    const enteredEmail=emailInputRef.current.value;
    const enteredPassword=passwordInpRef.current.value;
    
    if(enteredPassword!==confirmInpRef.current.value)
    {
       alert("confirm password is not same")
      return;
    }
    if(isLogin)
    {

    }
    else{
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAIpFpXqTkA-YkLV506rGbmUDu1_nJmw5I',
     {
      method:'POST',
      body:JSON.stringify(
        {
          email:enteredEmail,
          password:enteredPassword,
          returnSecureToken:true
        }),
      Headers:{
        'Content-Type':'application/json'
      }
    }).then(res=>{
      if(res.ok)
      {

      }
      else{
        res.json().then(data=>
          {
            console.log(data.error.message)
            alert(data.error.message)
          })
      }
    }
      )
    }
  }

  return (
    <section className='auth'>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className='control'>
        <input type="email" placeholder='Email'ref={emailInputRef} required />       
        <input type="password" placeholder='Password'ref={passwordInpRef}  required  />           
        <input type="password" placeholder='Confirm Password'ref={confirmInpRef} required />
       </div>
       <div className='control'>
          <button>{isLogin ? 'Login' : 'Create Account'}</button><br/>
          <button
            type='button'
            className='toggle'
            // onClick={switchModeHandler}
          >
            {isLogin ? 'SignUp' : 'Have an account?Login'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
