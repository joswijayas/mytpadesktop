import React, { useState } from 'react'
import {UserAuth} from '../context/AuthContext'
import {useNavigate} from 'react-router-dom'
import { getAuth, updateEmail, updateProfile } from "firebase/auth";
import { getSpaceUntilMaxLength } from '@testing-library/user-event/dist/utils';
import { storage } from "../firebase"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
const Account = () => {
  const {user, logout} = UserAuth()
  const [error, setError] = useState('')

  const navigate = useNavigate()
  const {signIn} = UserAuth()
  const currAuth = getAuth()
  const userc = currAuth.currentUser
  const handleLogout = async ()=>{
      try {
        await logout()
        navigate('/')
        console.log('you logout')
      } catch (e) {
        console.log(e.message)
      }
  }

  let newEmailInput = ''
  const handleNewEmail = (e)=>{
    newEmailInput = e.target.value
    // console.log(newEmailInput)
  }

  const [updateNewEmail, setUpdateEmail] = useState(false)

  const SettingEmail = ()=>{
    if(updateNewEmail == true){
      return (
        <div className="h-full w-full bg-white/70 fixed top-0 left-0  flex justify-center items-center">
          {/* <form onSubmit={handleUpdateEmail}> */}
          
          <div>
          <div className='text-red-500 text-lg'>
            {error}
          </div>
            <label htmlFor="email" className="block text-sm font-medium text-indigo-700">
              Email address
            </label>         
            <input onChange={e=>handleNewEmail(e)} className='border-2 border-indigo-700 p-3 my-5' type="email" name="" id=""/>
            <button onClick={handleUpdateEmail} type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Update Email
            </button>
            <button onClick={e=>setUpdateEmail(!updateNewEmail)} type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 my-5">
              Close
              {/* {setError('')} */}
            </button>
      {/* </form> */}
           </div>
        </div>
      )
    }
    setError('')
  }
  const handleUpdateEmail = async (e)=>{
    console.log(newEmailInput)
    setError('')
    try {
    
      const auth = getAuth()
      updateEmail(auth.currentUser, newEmailInput).catch((e)=>{
        console.log('dcjiodjciwdjciojdwiojdwciojdwiojdwcioodwciowdciowjc')
        setError('Invalid Email')
        console.log(e.message)

      })

      // try {
      //   await signIn(email, password).then((e)=>{
      //     navigate(`/Workspace/${e.user.uid}`)
      //   })
        
      // } catch (e) {
      //   setError("Authenticaton Failed!")
      //   console.log(e.message)
      // }

    } catch (e) {
      console.log('dcjiodjciwdjciojdwiojdwciojdwiojdwcioodwciowdciowjc')
      setError('Invalid Email')
      console.log(e.message)
    }
  }

  let newDisplayName = ''
  const handleNewDisplayName = (e)=>{
    newDisplayName = e.target.value
    // console.log(newEmailInput)
  }

  const [updateDisplayName, setUpdateDisplayName] = useState(false)

  const SettingDisplayName = ()=>{
    if(updateDisplayName == true){
      return (
        <div className="h-full w-full bg-white/70 fixed top-0 left-0  flex justify-center items-center">
          {/* <form onSubmit={handleUpdateEmail}> */}
          
          <div>
          <div className='text-red-500 text-lg'>
            {error}
          </div>
            <label htmlFor="email" className="block text-sm font-medium text-indigo-700">
              Display Name
            </label>         
            <input onChange={e=>handleNewDisplayName(e)} className='border-2 border-indigo-700 p-3 my-5' type="email" name="" id=""/>
            <button onClick={handleUpdateDisplayName} type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Update Display  Name
            </button>
            <button onClick={e=>setUpdateDisplayName(!updateDisplayName)} type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 my-5">
              Close
              {/* {setError('')} */}
            </button>
      {/* </form> */}
           </div>
        </div>
      )
    }
    setError('')
  }

  const handleUpdateDisplayName = async()=>{
    updateProfile(userc, {
      displayName: newDisplayName
    }).then(()=>{
      console.log('display Name updated')      
    }).catch((e)=>{
      setError('Invalid Display Name')
      console.log(e.message)
    })
  }

  const [image, setImage] = useState(null)
  const [url, setUrl] = useState('')
  const handleImageChange = (e)=>{
    if(e.target.files[0]){
      setImage(e.target.files[0])
    }
  }

  const handleChangeImage = ()=>{
    const imageRef = ref(storage, "image");
    console.log(imageRef)
    uploadBytes(imageRef, image).then(()=>{
      getDownloadURL(imageRef).then((url)=>{
        setUrl(url)
        console.log(url)
      }).catch((e)=>{
        console.log(e.message)
      })
      setImage(null)
    }).catch((e)=>{
      console.log(e.message)
    })
  }

  return ( 
    
    <div className='max-w-[600px] mx-auto my-16 p-4 border-2 border-indigo-500 rounded-md'>
      <SettingEmail></SettingEmail>
      <SettingDisplayName></SettingDisplayName>
      <button onClick={()=>{navigate(`/Workspace/${userc.uid}`)}} type="button" className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
  
        {/* <svg class="h-5 w-5" xmlns="http://www.w3.org/100/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
        </svg> */}
        Back
      </button>
      <h1 className='text-2xl font-bold py-4'>My Profile</h1>
      <div className='items-center'>
        <img className="mx-auto h-20 w-20 rounded-full lg:w-24 lg:h-24" src="https://picsum.photos/200" alt=""></img>
        <input type="file" className="mt-5 mu-5 inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 items-center"/>
        <button type="button" className="ml-10 inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 items-center">
              Update Photo Profile
        </button>
      </div>
      <div className='my-10'>
        <label className="block text-xl font-medium text-gray-700">Name</label>
        <div className="mt-1 flex flex-row">
          <p className="text-indigo-600 text-m">{user && user.displayName}</p>
          <button onClick={e=>setUpdateDisplayName(!updateDisplayName)} type="button" className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-10">
            Update Name
          </button>
        </div>
      </div>

      <div className='py-3'>
        <label className="block text-xl font-medium text-gray-700">Email</label>
        <div className="mt-1 flex flex-row">
          <p className="text-indigo-600 text-m">{user && user.email}</p>
          <button onClick={e=>setUpdateEmail(!updateNewEmail)} type="button" className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-10">
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