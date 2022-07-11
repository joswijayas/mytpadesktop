import { getAuth } from "firebase/auth";
import { collection, onSnapshot, onSnapshotsInSync, query, where } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { UserAuth } from "./AuthContext";

const WorkspaceContext = createContext()

// const currAuth = getAuth()
// const user = currAuth.currentUser

export const WorkspaceProvider = (workspaces)=>{
    // let uid = null
    // if(user != null){
    //     uid = user.uid
    //     console.log('aaa')
    //     console.log(uid)
    // }

    // const [workspace, setWorkspace] = useState([])
    
    // const getCurrentWorkspace = (userId)=>{
    //     let workspaceArr = []
    //     // setWorkspace([]) 
    //     const queryState = query(collection(db, 'workspaces'), where('member', 'array-contains', userId))
    //     onSnapshot(queryState, (e)=>{
        
    //     e.forEach(item =>{
    //         workspaceArr.push({...item.data(), workspaceId:item.id})
    //         // console.log(workspace)
    //         // console.log('hahahahhaha')
    //         workspaces.setWorkspace(workspaceArr)
    //     })
    //     })
    //     console.log(workspaces.workspace)
    //     // return workspace
    // }
    let uid = null
    useEffect(()=>{
        try {           
            const currAuth = getAuth()
            const user = currAuth.currentUser
            
            if(user != null){
                uid = user.uid
                console.log('aaa')
                console.log(uid)
            }
        } catch (error) {
            console.log(error.message)
        }
        // const unsubscribe = onSnapshotsInSync(db, (e)=>{
        //     // console.log(currentUser)
        //     // setUser(currentUser)
        //     getCurrentWorkspace(uid)
        // })
        // return ()=>{
        //     unsubscribe()
        // }
        // try {
        //     console.log('heyyyyhooo')
        //     console.log(uid)
        //   getCurrentWorkspace(uid)
        // } catch (error) {
        //   console.log(error.message)
        // }
        // console.log(uid)
        let workspaceArr = []
        // setWorkspace([]) 
        const queryState = query(collection(db, 'workspaces'), where('member', 'array-contains', uid))
        onSnapshot(queryState, (e)=>{
        
        e.forEach(item =>{
            workspaceArr.push({...item.data(), workspaceId:item.id})
            console.log(workspaceArr)
            // console.log('hahahahhaha')
            workspaces.setWorkspace(workspaceArr)
        })
        })
        console.log(workspaces.workspace)
    },[])

    return(
        <WorkspaceContext.Provider value={workspaces.workspace}>
            {/* {children} */}
        </WorkspaceContext.Provider>
    )   
}

export const WorkspaceGet = ()=>{
    return useContext(WorkspaceContext)
}