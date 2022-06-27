import React from "react";
import { Routes, Route } from "react-router-dom";
import Signin from './components/Signin';
import Signup from "./components/Signup";
import Account from "./components/Account";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PageNotFound from "./components/PageNotFound";
import Workspace from "./components/Workspace";

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Routes>
          <Route path = '/' element = {<Signin />}/>
          <Route path = '/signup' element = {<Signup />}/>
          <Route path = '/account/:id' element = {<ProtectedRoute><Account /></ProtectedRoute>}/> 
          <Route path= '/Workspace/:id' element = {<ProtectedRoute><Workspace /></ProtectedRoute>}/> 
          <Route component={PageNotFound}/>
          {/* <Route path = '/Workspace/*' element = {<ProtectedRoute><Signin/></ProtectedRoute>}/>  */}
          
        </Routes>
      </AuthContextProvider>
      
    </div>
  );
}

export default App;