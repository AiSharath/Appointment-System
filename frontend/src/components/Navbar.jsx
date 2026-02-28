import React from 'react'
import { useLocation } from 'react-router-dom'
import '../styles/navbar.css'

const TITLES = {
  '/dashboard':       'Dashboard',
  '/doctors':         'Doctors',
  '/doctors/add':     'Doctors / Add New',
  '/patients':        'Patients',
  '/patients/add':    'Patients / Add New',
  '/appointments':    'Appointments',
  '/appointments/add':'Appointments / Add New',
}

export default function Navbar() {
  const location = useLocation()
  const title = TITLES[location.pathname] || 'MedCore'

  const now = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
  })

  return (
    <header className="navbar">
      <div className="navbar__left">
        <span className="navbar__breadcrumb">{title}</span>
      </div>
      <div className="navbar__right">
        <span className="navbar__date">{now}</span>
        <button className="navbar__notif">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          <span className="navbar__notif-dot" />
        </button>
        <div className="navbar__avatar">AD</div>
      </div>
    </header>
  )
}