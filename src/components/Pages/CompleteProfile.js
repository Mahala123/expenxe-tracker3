import React, { useRef, useState } from 'react'
import { Redirect } from 'react-router-dom';
// import AuthContext from '../Store/Store';
import { useSelector } from 'react-redux';
import'./CompleteProfile.css'

function CompleteProfile() {
//  const AuthCtx= useContext(AuthContext)
 const token=useSelector(state=>state.auth.idToken)
  const[userData,setUserData]=useState()

  const inputfullnameref=useRef()
  const imageurlref=useRef()
  const submitHandler=(event)=>
  {
    event.preventDefault()
    const fullname=inputfullnameref.current.value;
    const imageUrl=imageurlref.current.value;
    fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAIpFpXqTkA-YkLV506rGbmUDu1_nJmw5I",
    {
      method: "POST",
      body: JSON.stringify({
        idToken:token,
        displayName:fullname,
        photoUrl: imageUrl,
        returnSecureToken: true,
      }),
      headers:
      {
        "Content-Type": "application/json",
      }
    }).then(res=>{
        return res.json()
    }).catch(err=>
      {
        alert(err.message)
      }
      )
    // }).then(data=>{
    //   // console.log(data)
    // })
  }

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAIpFpXqTkA-YkLV506rGbmUDu1_nJmw5I",
      {
        method: "POST",
        body: JSON.stringify({
          idToken:token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      return res.json()
      .then((data) => {
      console.log(setUserData(data.users[0])) 
         inputfullnameref.current.value = data.users[0].displayName;
         imageurlref.current.value = data.users[0].photoUrl;
         console.log(inputfullnameref.current.value)
         console.log(imageurlref.current.value)
      });
});  
  const[close,setClose]=useState(false)
  const closeHandler=()=>{
    setClose(true)
  }
  return (
    <React.Fragment>
    {close && <Redirect to='/welcome'></Redirect>}
    <div className="heading1">
          Winners never quits,quitters Never wins
          <div className="heading2">your profile is 64% completed,complete your profile</div>
        </div>
        <div>
        <div >
          <div className="profileform">
            <form onClick={submitHandler}>
              <label  htmlFor="fullname">
                FULLNAME
              </label>
              <input
                type="fullname"
                placeholder="Fullname"
                 ref={inputfullnameref}
                value={userData?.displayName}
                required
              /><br/>
              <label  htmlFor="url">
                ImageUrl
              </label>
              <input
                type="url"
                placeholder="url"
                 ref={imageurlref}
                 value={userData?.photoUrl}
                required
              /><br/>
              <button type="submit">SUBMIT</button>
            </form>
            <button type="submit" onClick={closeHandler}>close</button>
          </div>
        </div>
      </div>
      </React.Fragment>
  )
}

export default CompleteProfile;
