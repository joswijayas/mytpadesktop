import React from 'react'
import db from '../firebase'
import { addDoc, collection, doc, setDoc } from "firebase/firestore"; 

const Firestore = () => {
  return (
    <div>Firestore</div>
  )
}
// const addNewUser = async (userId, displayName)=>{
//     try {
//         const docRef = await setDoc(doc(db, "users", userId), {
//             displayName: displayName
//         });
      
//         console.log("Document written with ID: ", docRef.id);
//       } catch (e) {
//         console.error("Error adding document: ", e);
//       } 
// }
    
// export async function addNewUser (userId, displayName){
//     try {
//         const collectionRef = collection(db, "users")
//         const payLoad = { displayName: displayName, uid: userId}
//         console.log(payLoad)
//         const docRef = await addDoc(collectionRef, payLoad)
//         console.log("Document written with ID: ", docRef.id);
//     } catch (e) {
//        console.error(e);
//     } 
// }