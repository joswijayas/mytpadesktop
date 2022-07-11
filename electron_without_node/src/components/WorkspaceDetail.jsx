import { getAuth } from 'firebase/auth'
import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { db } from '../firebase'
import { refreshContext } from './NavigationBar'
import { Switch } from '@headlessui/react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const WorkspaceDetail = () => {
    const [memberList, setMemberList] = useState([])
    // const [memberName, setMemberName] = useState([])
    // const [memberEmail, setMemberEmail] = useState([])

    const currUser = getAuth()
    const user = currUser.currentUser
    try {
        console.log(user)
    } catch (error) {
        
    }
    const {wid} = useParams('')
    console.log(wid)
    const [refresh, setRefresh] = useState(false)
    const navigate = useNavigate()
    const [boardname, setBoardName] = useState('')
    const [boarddesc, setBoardDesc] = useState('')
    const [boardVisibility, setBoardVis] = useState('Public')
    
    const[workspaceTitle, setWorkspaceTitle] = useState('')
    const[workspaceDesc, setWorkspaceDesc] = useState('')

    let [board, setBoard] = useState([])

    const getCurrentBoard = (workspaceId)=>{
      let boardArr = []
      
      const queryState = query(collection(db, 'boards'), where('workspaceId', '==', workspaceId))
      onSnapshot(queryState, (e)=>{
        boardArr = [];  
        e.forEach(item =>{
          boardArr.push({...item.data(), boardId:item.id})
          console.log(boardArr)
          setBoard(boardArr)
        })
      })
    }

    useEffect(()=>{
      try {
        getCurrentBoard(wid)
      } catch (error) {
        console.log(error.message)
      }
    }, [])

    const goAccount = async(e)=>{
        try {
          navigate(`/Account/${user.uid}`)
          console.log(user.uid)
        } catch (error) {
          console.log(error.message)
        }
    }

   
    // setWorkspace(getCurrentWorkspace(id))
    // workspace = getCurrentWorkspace(id)
   
    const createNewBoard = ()=>{
      const docRef = collection(db, 'boards')
      try {
        addDoc(docRef, {
          boardTitle: boardname,
          boardDesc: boarddesc,
          boardVisibility: boardVisibility,
          boardMember: [user.uid],
          boardAdmin: [user.uid],
          workspaceId: wid,
          boardStatus: true
        })
      } catch (error) {
        
      }
    }

    const [viewMember, setViewMember] = useState(false)

    const getMember = async(wid)=>{
        const querys = query(doc(db, "workspaces", wid))
        let memberId = []
        let memberName = []
        let memberEmail = []

        memberId = await (await getDoc(querys)).data().member
        let workspaceTitle = await(await getDoc(querys)).data().title
        let workspaceDesc = await(await getDoc(querys)).data().desc
        setWorkspaceTitle(workspaceTitle)
        console.log(workspaceTitle)
        setWorkspaceDesc(workspaceDesc)
        console.log(workspaceDesc)
        console.log(memberId)

        for(let i = 0; i < memberId.length; i++){
            console.log('masuk')
            const query2 = query(collection(db, "users"), where('uid', "==", memberId[i]))
     
            onSnapshot(query2, (e)=>{
            
                e.forEach(item =>{
                    memberName.push({...item.data()})
                    console.log(memberName)
                    
                    setMemberList(memberName)
                })
            })
            // memberEmail.push()
        }
        
   }

    useEffect(()=>{
        try {
        getMember(wid)
        } catch (error) {
        console.log(error.message)
        }
    }, [])

    const deleteWorkspace=async()=>{
      await deleteDoc(doc(db, "workspaces", wid))
      navigate(`/Workspace/${user.uid}`)
    }

    const [viewDelCon, setDelCon] = useState(false)
    const ViewDeleteConfirm = ()=>{
      if(viewDelCon == true){
        return (
          <div className="bg-red-700 shadow sm:rounded-lg mt-20 mr-5">
            <div className="px-4 py-5 sm:p-6 bg-red-300 h-content rounded">
              <h3 className="bg-white-700 text-lg leading-6 font-medium text-gray-900">Delete your workspace</h3>
              <div className="bg-white-700 mt-2 max-w-xl text-sm text-gray-500">
                <p>Once you delete your workspace, you will lose all data associated with it.</p>
              </div>
              <div className="mt-5 bg-white-700">
                <button onClick={deleteWorkspace}
                  type="button"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
                >
                  Delete Workspace
                </button>
                <button onClick={(e)=>setDelCon(!viewDelCon)}
                  type="button"
                  className="ml-5 inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-white-700 bg-indigo-300 hover:bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )
      }
    }

    const ViewWorkspaceMember = ()=>{
        if(viewMember == true){
            // console.log('jajajaa')
        return (
            <div className="h-full w-full bg-white/70 fixed top-0 left-0  flex justify-center items-center">
            
            <div class="flex flex-col">
                <button onClick={(e)=>setViewMember(!viewMember)} type="button" class="w-14 inline-flex items-center px-3.5 py-2 border border-transparent text-sm leading-4 font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Back
                </button>
                <br></br>
                <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Title
                            </th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Role
                            </th>
                            <th scope="col" class="relative px-6 py-3">
                                <span class="sr-only">Edit</span>
                            </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            {memberList.map((item)=>(
                                <tr>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                    <div class="ml-4">
                                        <div class="text-sm font-medium text-gray-900">
                                            {item.displayName}
                                        </div>
                                        <div class="text-sm text-gray-500">
                                            {item.email}
                                        </div>
                                    </div>
                                    </div>
                                </td>
                                {/* <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">Regional Paradigm Technician</div>
                                    <div class="text-sm text-gray-500">Optimization</div>
                                </td> */}
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Active
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    Member
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                                </td>
                                </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        )
        }
  }

  return (
    <refreshContext.Provider value={[refresh, setRefresh]}>
      {/* <WorkspaceProvider setWorkspace={setWorkspace} workspace={workspace}></WorkspaceProvider> */}
    {/* {console.log('update')} */}

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
              <Link to = {`/Workspace/${user.uid}`} className='h-10 bg-indigo-500 text-white group flex items-center text-sm font-medium rounded-md'>
              <a className="bg-indigo-500 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                {/* <!-- Heroicon name: outline/home --> */}
                <svg className="mr-3 h-6 w-6 text-white-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Workspace
              </a>
              </Link>

              <button onClick={(e)=>setViewMember(!viewMember)} className="h-10 w-full bg-indigo-500 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                {/* <!-- Heroicon name: outline/home --> */}
                <svg className="mr-3 h-6 w-6 text-white-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                View Member
              </button>

              <button className="h-10 w-full bg-indigo-500 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                {/* <!-- Heroicon name: outline/home --> */}
                <svg className="mr-3 h-6 w-6 text-white-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                Invite Member
              </button>

              {/* <h2 class="inline text-xl font-extrabold tracking-tight text-indigo-600 sm:block sm:text-xl">
                Your Board
              </h2> */}
              
             {/*{workspace.map((item)=>(
               // <Link to = {`/WorkspaceDetail/${item.workspaceId}`} className='h-10 bg-indigo-500 text-white group flex items-center text-sm font-medium rounded-md'>
                //<a key={count++} className="bg-indigo-500 text-white group flex items-center text-sm font-medium rounded-md">
                //{/* <!-- Heroicon name: outline/home --> */}
              {/* //  <svg className="ml-2 mr-3 h-6 w-6 text-white-32" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                //  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
               // </svg>
                //  {item.title}
                //</a>
                //</Link>
              //))} */}
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
        <ViewWorkspaceMember></ViewWorkspaceMember>
        <ViewDeleteConfirm></ViewDeleteConfirm>
      </div>
  
    <main className="flex-1 relative overflow-y-auto focus:outline-none bg-cream max-w- ml-5">
        
        {/* <form onSubmit={handleSubmit}> */}
            <div className='flex flex-row relative'>
              <h3 className="mt-5 text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-5xl">
                <span className="block xl:inline">{workspaceTitle}</span><br></br>
                <span className="block text-indigo-600 xl:inline">{workspaceDesc}</span>
              </h3>
                <button onClick={(e)=>setDelCon(!viewDelCon)}
                  type="button"
                  className="absolute right-5 mt-7 h-10 inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
                >
              Delete Workspace
            </button>
            </div>
            
            
            <div className='flex max-w-md flex-col py-2'>
                <label className='py-2 font-medium'htmlFor="">Board Name</label>
                <input onChange={(e)=> setBoardName(e.target.value)} className='border p-3 rounded' type="" name="" id="" />
            </div>


            <div className='flex flex-col py-2 max-w-md'>
                <label className='py-2 font-medium'htmlFor="">Board Description</label>
                <textarea onChange={(e)=> setBoardDesc(e.target.value)} className='border p-3 rounded min-h-40 max-h-40 max-w-prose' type="" name="" id="" />
            </div>

            <label for="location" className="mt-4 block font-medium text-black-700 max-w-md">Board Visibility</label>
            <select onChange={(e)=>setBoardVis(e.target.value)} id="location" name="location" className="max-w-md mt-2 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" defaultValue="Public">
                <option>Workspace Visible</option>
                <option>Public</option>
                <option>Board Visible</option>
            </select>
              {console.log(boardVisibility+'ahhahaha')}
            <button className="max-w-md group relative w-full flex justify-center py-3 my-5 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={createNewBoard}>
              Add Board
            </button>
            <div className="mt-5">
          
            </div>
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            
            {board.map((item)=>(
              <a href='' className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
              <div className="flex-1 flex flex-col p-8">
                <h3  className="mt-6 text-indigo-700 text-sm font-medium">Board</h3>
                <h3 className="mt-6 text-gray-900 text-sm font-medium">{item.boardTitle}</h3>
                <dl className="mt-1 flex-grow flex flex-col justify-between">
                  <dt className="sr-only">Title</dt>
                  <dd className="text-gray-500 text-sm">{item.boardDesc}</dd>
                  <dt className="sr-only">Role</dt>
                  <dd className="mt-3">
                    <span className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">{item.boardVisibility}</span>
                  </dd>
                </dl>
              </div>
            </a>
            ))}
            
          </ul>
        {/* </form> */}
    </main>

    </div>
  </div>
  </refreshContext.Provider>
  )
}

export default WorkspaceDetail