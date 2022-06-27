import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
const Signin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const {signIn} = UserAuth()
  
  const handleSubmit = async (e)=>{
      e.preventDefault()
      setError('')
      try {
        await signIn(email, password).then((e)=>{
          navigate(`/Workspace/${e.user.uid}`)
        })
        
      } catch (e) {
        setError("Authenticaton Failed!")
        console.log(e.message)
      }
  }

  return (
    <div className = "max-w-[700px] mx-auto my-16 p-4 border p-3 rounded">
        <h1 className="text-center text-3xl font-bold py-10 text-blue-600">
          CHello
        </h1>
        <div>
            <h1 className='text-2xl font-bold py-2'>Sign in to your account</h1>
            <p className='py-2'>
                Don't have an account yet? <Link to = '/signup' className='underline text-blue-700'>Sign Up.</Link>
            </p>
        </div>
        <form onSubmit={handleSubmit}>
            
            <div className='text-red-500 text-lg'>
              {error}
            </div>

            <div className='flex flex-col py-2'>
                <label className='py-2 font-medium' htmlFor="">Email Address</label>
                <input onChange={(e)=> setEmail(e.target.value)} className='border p-3' type="email" name="" id=""/>
            </div>
            <div className='flex flex-col py-2'>
                <label className='py-2 font-medium'htmlFor="">Password</label>
                <input onChange={(e)=> setPassword(e.target.value)} className='border p-3' type="password" name="" id="" />
            </div>
            <button className="group relative w-full flex justify-center py-3 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Sign In
            </button>
        </form>
    </div>
  )
}

export default Signin