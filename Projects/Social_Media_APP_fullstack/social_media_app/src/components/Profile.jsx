// import React from 'react'
import './Profile.css'
import image from '../assets/user-pic.jpg'
import cover_pic from '../assets/cover-pic.jpg'

const Profile = () => {
  return (
    <>
      <div className='ProfileContainer'>
        <div className='CoverPhoto'><img src={cover_pic}></img></div>
        <div className='ProfilePic'><img src={image}></img></div>
        <div className='Name'><p>ADITYA DAVAR</p></div>
        <div className='ProfileDetails'>
          <p>Name</p>
          <p>Age</p>
        </div>
      </div>
    </>
  )
}

export default Profile
