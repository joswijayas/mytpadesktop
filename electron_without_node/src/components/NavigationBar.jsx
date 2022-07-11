import { getAuth } from 'firebase/auth'
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase'

const currAuth = getAuth()
const user = currAuth.currentUser

export const refreshContext = createContext()

const NavigationBar = (id) => {
  let count = 0
  const navigate = useNavigate()
  const [workspace, setWorkspace] = useState([])

  const getCurrentWorkspace = (userId)=>{
    let workspaceArr = []
    
    const queryState = query(collection(db, 'workspaces'), where('member', 'array-contains', userId))
    onSnapshot(queryState, (e)=>{
      workspaceArr = [];  
      e.forEach(item =>{
        workspaceArr.push({...item.data(), workspaceId:item.id})
        console.log(workspaceArr)
        setWorkspace(workspaceArr)
      })
    })
  }

  const [refresh, setRefresh] = useState(false)
  useEffect(()=>{
    try {
      getCurrentWorkspace(id)
    } catch (error) {
      console.log(error.message)
    }
  }, [workspace])

  const goAccount = async(e)=>{
    try {
      navigate(`/Account/${id}`)
      console.log(id)
    } catch (error) {
      console.log(error.message)
    }
}

  
  return (

  <refreshContext.Provider value={[refresh, setRefresh]}>
        <div className="h-screen flex overflow-hidden bg-gray-100">
    
  
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
              
              {workspace.map((item)=>(
              
                <a key={count++} href="#" className="bg-indigo-500 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                {/* <!-- Heroicon name: outline/home --> */}
                <svg className="mr-3 h-6 w-6 text-white-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                  {item.title}
                  <br></br>
                  {item.workspaceId}
                </a>
              ))}
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
  
    

    </div>
  </div>
  </refreshContext.Provider>
  
  )
}

export default NavigationBar