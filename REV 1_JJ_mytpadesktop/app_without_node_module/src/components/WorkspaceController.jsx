import { collection, onSnapshot, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'

export const WorkspaceController = (id) => {

    const [workspace, setWorkspace] = useState([])

    const getCurrentWorkspace = (userId)=>{
      let workspaceArr = []
      
      const queryState = query(collection(db, 'workspaces'), where('member', 'array-contains', userId))
      onSnapshot(queryState, (e)=>{
        workspaceArr = [];  
        e.forEach(item =>{
          workspaceArr.push({...item.data(), workspaceId:item.id})
          // console.log(workspaceArr)
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
    }, [])

//   return (
//     <div>WorkspaceController</div>
//   )
}