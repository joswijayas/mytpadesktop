import React, { useState } from 'react'
import {UserAuth} from '../context/AuthContext'
import {useNavigate} from 'react-router-dom'
import { getAuth, updateEmail } from "firebase/auth";
const Account = () => {
  const {user, logout} = UserAuth()
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogout = async ()=>{
      try {
        await logout()
        navigate('/')
        console.log('you logout')
      } catch (e) {
        console.log(e.message)
      }
  }

  const handleUpdateEmail = async (e)=>{
    setError('')
    try {
      const emailUpdated = prompt("Please enter your new email", "johndoe@doe.com")
      const auth = getAuth()
      updateEmail(auth.currentUser, emailUpdated).then(() => {
        console.log("Email succesfully update")
      }).then(()=>{
        window.location.reload()
      })
    } catch (e) {
      setError('Invalid Email')
      console.log(e.message)
    }
  }

  return ( 
    <div className='max-w-[600px] mx-auto my-16 p-4'>
      <h1 className='text-2xl font-bold py-4'>My Profile</h1>
      
      <div>
        <label className="block text-xl font-medium text-gray-700">Name</label>
        <div className="mt-1">
          <p className="text-indigo-600 text-m">{user && user.displayName}</p>

        </div>
      </div>

      <div className='py-3'>
        <label className="block text-xl font-medium text-gray-700">Email</label>
        <div className="mt-1 flex flex-row">
          <p className="text-indigo-600 text-m">{user && user.email}</p>
          <button onClick={handleUpdateEmail} type="button" className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-10">
        Update Email
        </button>
        </div>
      </div>

      <div className='text-red-500 text-lg'>
        {error}
      </div>
      
      <button onClick={handleLogout} type="button" className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 my-10">
        Logout
      </button>
    </div>
  )
}

export default Account