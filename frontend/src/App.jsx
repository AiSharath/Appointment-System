import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Doctors from './pages/Doctors'
import Patients from './pages/Patients'
import PatientDetail from './pages/PatientDetail'
import Appointments from './pages/Appointments'
import AddDoctor from './pages/AddDoctor'
import AddPatient from './pages/AddPatient'
import AddAppointment from './pages/AddAppointment'
import './App.css'

export default function App() {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-main">
        <Navbar />
        <div className="app-content">
          <Routes>
            <Route path="/"                    element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard"           element={<Dashboard />} />
            <Route path="/doctors"             element={<Doctors />} />
            <Route path="/doctors/add"         element={<AddDoctor />} />
            <Route path="/patients"            element={<Patients />} />
            <Route path="/patients/add"        element={<AddPatient />} />
            <Route path="/patients/:id"        element={<PatientDetail />} />
            <Route path="/appointments"        element={<Appointments />} />
            <Route path="/appointments/add"    element={<AddAppointment />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}