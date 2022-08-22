import React from 'react'
import'./WelcomePage.css'
import{NavLink} from 'react-router-dom'

function WelcomePage() {
  return (
    <div className='comProfile'>
      <h3>WELLCOME TO EXPENXE TRACKER</h3>
      <div className='comProfile'>YOUR profile is incomplete <NavLink to='/CompleteProfile'>complete Now</NavLink></div>
    </div>
  )
}

export default WelcomePage
