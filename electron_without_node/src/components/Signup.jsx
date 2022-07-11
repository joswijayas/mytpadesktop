import { updateProfile } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'
import React, { useState} from 'react'
import { Link, useNavigate} from 'react-router-dom'
import {UserAuth} from '../context/AuthContext'
import { db } from '../firebase'
import  {addNewUser}  from './Firestore'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [error, setError] = useState('')
    const {createUser} = UserAuth()
    const navigate = useNavigate()
    // console.log(db)
    const handleSubmit = async (e)=>{
        e.preventDefault()
        setError('')
        
        try {
            await createUser(email, password).then((userCredential)=>{
                updateProfile(userCredential.user, {
                    displayName: displayName,
                    uid: userCredential.user.uid,
                    email: userCredential.user.email
                }).then(async ()=>{
                    const collectionRef = collection(db, "users")
                    const payLoad = { displayName: displayName, uid: userCredential.user.uid, email: userCredential.user.email}
                    // console.log(payLoad)
                    const docRef = await addDoc(collectionRef, payLoad)
                    
                    console.log("Document written with ID: ", docRef.id);
                }).then(()=>{
                    navigate(`/Workspace/${userCredential.user.uid}`)
                })
            })
           
        } catch (error) {
            setError(error.message)
            console.log(error.message)
        }
    }

    return (
        <div className = "max-w-[700px] mx-auto my-16 p-4 border p-3 rounded">
            <h1 className="text-center text-3xl font-bold py-10 text-blue-600">
                CHello
            </h1>
            <div>
                <h1 className='text-2xl font-bold py-2'>Sign up for free account</h1>
                <p className='py-2'>
                    Already have an account yet? <Link to = '/' className='underline text-blue-700'>Sign in.</Link>
                </p>
            </div>
            <form onSubmit={handleSubmit}>
            <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium' htmlFor="">Display Name</label>
                    <input onChange={(e) => setDisplayName(e.target.value)} className='border p-3' type="" name="" id=""/>
                </div>
                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium' htmlFor="">Email Address</label>
                    <input onChange={(e) => setEmail(e.target.value)} className='border p-3' type="email" name="" id=""/>
                </div>
                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium' htmlFor="">Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} className='border p-3' type="password" name="" id="" />
                </div>
                <button className="group relative w-full flex justify-center py-3 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sign Up</button>
            </form>
        </div>
  )
}

export default Signup