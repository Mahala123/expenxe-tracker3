import React from 'react'
import'./CompleteProfile.css'

function CompleteProfile() {
  return (
    <React.Fragment>
    <div className="heading1">
          Winners never quits,quitters Never wins
          <div className="heading2">your profile is 64% completed,complete your profile</div>
        </div>
        <div>
        <div >
          <div className="profileform">
            <form >
              <label  htmlFor="fullname">
                FULLNAME
              </label>
              <input
                type="fullname"
                placeholder="Fullname"
                // ref={inputfullnameref}
                // value={userData?.displayName}
                required
              /><br/>
              <label  htmlFor="url">
                ImageUrl
              </label>
              <input
                type="url"
                placeholder="url"
                // ref={imageurlref}
                // value={userData?.photoUrl}
                required
              /><br/>
              <button type="submit">SUBMIT</button>
            </form>
          </div>
        </div>
      </div>
      </React.Fragment>
  )
}

export default CompleteProfile;
