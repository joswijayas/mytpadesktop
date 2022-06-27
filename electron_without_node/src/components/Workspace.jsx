import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import NavigationBar from './NavigationBar'
import { Switch } from '@headlessui/react'
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, query, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import {UserAuth} from '../context/AuthContext'
import { getAuth } from 'firebase/auth'
import isWindows from 'cross-env/src/is-windows'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Workspace = () => {

  const {id} = useParams('')
  const [workspacename, setWorkspaceName] = useState('')
  const [workspacedesc, setWorkspaceDesc] = useState('')
  const [memberList, setMemberList] = useState([])
  const [workspaces, setWorkspaces] = useState([])
  const [enabled, setEnabled] = useState(false)
  
  const navigate = useNavigate()

  const currAuth = getAuth()
  const user = currAuth.currentUser
  
  const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
      if(user != null){
        console.log(user.displayName)   
        console.log(user.uid)
        console.log(user.email)
      }
      let workspaceUser = [user.uid]
      setMemberList(workspaceUser)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(()=>{
    if(memberList.length == 1){
      try {
          const docRef = addDoc(collection(db, 'workspaces'), {
            title: workspacename,
            desc: workspacedesc,
            type: enabled,
            adminId: user.uid,
            member: memberList
          }).then((e)=>{
          addWorkspaceMember(e.id)
        }).catch (console.error()) 
      } catch(e){
        console.log(e.mess)
      }
    }
  }, [memberList])

  const array = Array(memberList)
  
  const addWorkspaceMember = ((workspaceId)=>{
    console.log(memberList)
    let i = 0
    array.forEach(async memberList => {
      const userRef = doc(db, 'users', memberList[i])
      await updateDoc(userRef, {
        workspaces:arrayUnion(workspaceId)
      })
      i++
    });
  })

  // const getAllWorkspace = async()=>{
  //   let workspaceArray = []
  //   let exe = await getDocs(query(collection(db, 'workspaces')))
  //   exe.forEach((e)=>{
  //     workspaceArray.push(e)
  //     setWorkspaces(workspaceArray)
  //   })
  // }

  // function getWorkspace(){
  //   const quer = query(collection, "users", user.uid)
  // }

  const goAccount = async(e)=>{
      try {
        navigate(`/Account/${id}`)
        console.log(id)
      } catch (error) {
        console.log(error.message)
      }
  }


  return (
    // <NavigationBar id = {id}>
    //   <div>Workspace</div>
    // </NavigationBar>
    <div className="h-screen flex overflow-hidden bg-gray-100">
    {/* <div class="fixed inset-0 flex z-40 md:hidden" role="dialog" aria-modal="true"> */}
      
      {/* <div class="fixed inset-0 bg-gray-600 bg-opacity-75" aria-hidden="true"></div> */}
  
     
      {/* <div class="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white-700">
       
        <div class="absolute top-0 right-0 -mr-12 pt-2">
          <button type="button" class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <span class="sr-only">Close sidebar</span>
            <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
  
        <div class="flex-shrink-0 flex items-center px-4">
          <img class="h-8 w-auto" src="/img/logos/workflow-logo-indigo-300-mark-white-text.svg" alt="Workflow"></img>
        </div>
        <div class="mt-5 flex-1 h-0 overflow-y-auto">
          <nav class="px-2 space-y-1">
            <a href="#" class="bg-indigo-800 text-white group flex items-center px-2 py-2 text-base font-medium rounded-md">
              <svg class="mr-4 h-6 w-6 text-indigo-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Dashboard
            </a>
  
            <a href="#" class="text-indigo-100 hover:bg-indigo-600 group flex items-center px-2 py-2 text-base font-medium rounded-md">
              <svg class="mr-4 h-6 w-6 text-indigo-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Team
            </a>
  
            <a href="#" class="text-indigo-100 hover:bg-indigo-600 group flex items-center px-2 py-2 text-base font-medium rounded-md">
              <svg class="mr-4 h-6 w-6 text-indigo-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              Projects
            </a>
  
            <a href="#" class="text-indigo-100 hover:bg-indigo-600 group flex items-center px-2 py-2 text-base font-medium rounded-md">
              <svg class="mr-4 h-6 w-6 text-indigo-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Calendar
            </a>
  
            <a href="#" class="text-indigo-100 hover:bg-indigo-600 group flex items-center px-2 py-2 text-base font-medium rounded-md">
              <svg class="mr-4 h-6 w-6 text-indigo-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              Documents
            </a>
  
            <a href="#" class="text-indigo-100 hover:bg-indigo-600 group flex items-center px-2 py-2 text-base font-medium rounded-md">
              <svg class="mr-4 h-6 w-6 text-indigo-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Reports
            </a>
          </nav>
        </div>
      </div> */}
  
      {/* <div class="flex-shrink-0 w-14" aria-hidden="true">
      </div> */}
    {/* </div> */}
  
    <div className="hidden bg-white-700 md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        {/* <!-- Sidebar component, swap this element with another sidebar if you like --> */}
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
                <h1 className="text-center text-3xl font-bold py-1 text-blue-600">
                        CHello
                </h1>
          </div>
          <div className="mt-5 flex-1 flex flex-col">
            <nav className="flex-1 px-2 space-y-3">
              {/* <!-- Current: "bg-indigo-800 text-white", Default: "text-indigo-100 hover:bg-indigo-600" --> */}
              <a href="" className="bg-indigo-500 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                {/* <!-- Heroicon name: outline/home --> */}
                <svg className="mr-3 h-6 w-6 text-white-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Dashboard
              </a>
              <a href="" className="bg-indigo-500 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                {/* <!-- Heroicon name: outline/home --> */}
                <svg className="mr-3 h-6 w-6 text-white-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Workspace
              </a>
            </nav>
            
          </div>
          
        </div>
      </div>
    </div>
    <div className="flex flex-col w-0 flex-1 overflow-hidden">
      <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
        <button type="button" className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden">
          <span className="sr-only">Open sidebar</span>
          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        </button>
        <div className="flex-1 px-4 flex justify-between">
          <div className="flex-1 flex">
            <form className="w-full flex md:ml-0" action="#" method="GET">
              <label htmlFor="search_field" className="sr-only">Search</label>
              <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input id="search_field" className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm" placeholder="Search" type="search" name="search"></input>
              </div>
            </form>
          </div>
          <div className="ml-4 flex items-center md:ml-6">
            <button className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span className="sr-only">View notifications</span>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
  
            <div className="ml-3 relative">
              <div>
                <button onClick={goAccount} type="button" className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                  <span className="sr-only">Open user menu</span>
                  <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=nkXPoOrIl0&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""></img>
                </button>
              </div>
  
            </div>

            

          </div>
        </div>
        
      </div>
  
    <main className="flex-1 relative overflow-y-auto focus:outline-none bg-cream max-w-xs ml-5">
        
        {/* <form onSubmit={handleSubmit}> */}
            
            <div className='flex flex-col py-2'>
                <label className='py-2 font-medium'htmlFor="">Workspace Name</label>
                <input onChange={(e)=> setWorkspaceName(e.target.value)} className='border p-3 rounded' type="" name="" id="" />
            </div>


            <div className='flex flex-col py-2 '>
                <label className='py-2 font-medium'htmlFor="">Workspace Description</label>
                <textarea onChange={(e)=> setWorkspaceDesc(e.target.value)} className='border p-3 rounded min-h-40 max-h-40 max-w-prose' type="" name="" id="" />
            </div>

            <Switch.Group as="div" className="flex items-center">
                <Switch.Label as="span" className="">
                  <span className="text-sm font-medium text-gray-900"> Public </span>
                  
                </Switch.Label>
                <Switch
                  checked={enabled}
                  onChange={setEnabled}
                  className={classNames(
                    enabled ? 'bg-indigo-600' : 'bg-gray-200',
                    'relative inline-flex flex-shrink-0 h-6 w-11 ml-3 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  )}
                >
                  <span className="sr-only">Use setting</span>
                  <span
                    aria-hidden="true"
                    className={classNames(
                      enabled ? 'translate-x-5' : 'translate-x-0',
                      'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                    )}
                  />
                </Switch>
                <Switch.Label as="span" className="ml-3">
                  <span className="text-sm font-medium text-gray-900"> Private </span>
                  
                </Switch.Label>
            </Switch.Group>


            <button className="group relative w-full flex justify-center py-3 my-5 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={handleSubmit}>
              Add Workspace
            </button>
        {/* </form> */}
    </main>

    </div>
  </div>
  )
}

export default Workspace