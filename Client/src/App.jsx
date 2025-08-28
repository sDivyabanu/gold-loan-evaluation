import { useState } from 'react'
import React from 'react'
import NotFound from './Screens/Error.jsx'
import AdminLogin from './Screens/Admin/AdminLogin.jsx'
import  Landing  from './Screens/Landing.jsx'
import Dashboard from './Screens/Dashboard.jsx'
import Notifications from './Screens/Notifications.jsx'
import Appointment from './Screens/Appointment.jsx'
import Register from './Screens/Register.jsx'
import Login from './Screens/Login.jsx'
import AdminGold from './Screens/Admin/AdminGold.jsx'
import AdminPanel from './Screens/Admin/Admin.jsx'
import AdminLoans from './Screens/Admin/AdminLoans.jsx'
import UserGold from './Screens/UserGold.jsx'
import Loans from './Screens/Admin/Loans.jsx'
import Loan from './Screens/Loan.jsx'
import AdminAppointment from './Screens/Admin/AdminAppointment.jsx'
import ProtectedRoute from './Screens/Protector/Protector.jsx'
import ProfilePage from './Screens/Profile.jsx'
import AdminRoute from './Screens/Protector/AdminProtector.jsx'

import { BrowserRouter as Router, Routes,Route } from "react-router-dom";


function App(){
  
  return (
    
    
    <Router>
      <Routes >
        <Route path="/Login" element={<Login></Login>} ></Route>
        <Route path="/Register" element={<Register></Register>} ></Route>
      
        {/* Protected Routes */}
        <Route path="/" element={
          
            <Landing />
          
        } />
        <Route path="/Dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/Book" element={
          <ProtectedRoute>
            <Appointment />
          </ProtectedRoute>
        } />
        <Route path="/Notifications" element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        } />
        <Route path="/Loan" element={
          <ProtectedRoute>
            <Loan />
          </ProtectedRoute>
        } />
        <Route path="/GoldEvaluation" element={
          <ProtectedRoute>
            <UserGold />
          </ProtectedRoute>
        } />
        <Route path="/Profile" element={
          <ProtectedRoute>
            <ProfilePage/>
          </ProtectedRoute>
        } />
      
        <Route path="/Admin/Login" element={<AdminLogin></AdminLogin>} />
        <Route path="/Admin/Upload" element={<AdminRoute><AdminPanel></AdminPanel></AdminRoute>}  />
        <Route path="/Admin/GoldEvaluation" element={<AdminRoute><AdminGold></AdminGold></AdminRoute>}  />
        <Route path="/Admin/Appointment" element={<AdminRoute><AdminAppointment></AdminAppointment></AdminRoute>} />
        <Route path="/Admin/loan" element={<AdminRoute><AdminLoans></AdminLoans></AdminRoute>}  />
        <Route path="/Admin/loan/:id" element={<AdminRoute><Loans></Loans></AdminRoute>} />
        <Route path="*" element={<NotFound></NotFound>} />

      </Routes>
    </Router>    
      
    

  )
}

export default App
