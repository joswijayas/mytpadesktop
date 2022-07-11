import React from "react";
import { Routes, Route } from "react-router-dom";
import Signin from './components/Signin';
import Signup from "./components/Signup";
import Account from "./components/Account";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PageNotFound from "./components/PageNotFound";
import Workspace from "./components/Workspace";
import { WorkspaceProvider } from "./context/WorkspaceContext";
import WorkspaceDetail from "./components/WorkspaceDetail";

function App() {
  return (
    <div>
      <AuthContextProvider>
        {/* <WorkspaceProvider> */}
        <Routes>
          <Route path = '/' element = {<Signin />}/>
          <Route path = '/signup' element = {<Signup />}/>
          <Route path = '/account/:id' element = {<ProtectedRoute><Account /></ProtectedRoute>}/> 
          <Route path = '/Workspace/:id' element = {<ProtectedRoute><Workspace /></ProtectedRoute>}/> 
          <Route path = '/WorkspaceDetail/:wid' element = {<ProtectedRoute><WorkspaceDetail/></ProtectedRoute>}/>
          <Route component={PageNotFound}/>
          {/* <Route path = '/Workspace/*' element = {<ProtectedRoute><Signin/></ProtectedRoute>}/>  */}
        </Routes>
        {/* </WorkspaceProvider> */}
      </AuthContextProvider>
      
    </div>
  );
}

export default App;