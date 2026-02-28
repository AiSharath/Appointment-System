import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { doctorService } from '../services/doctorService'
import { patientService } from '../services/patientService'
import { appointmentService } from '../services/appointmentService'
import AppointmentCard from '../components/AppointmentCard.jsx'
import '../styles/dashboard.css'

export default function Dashboard() {
  const navigate = useNavigate()
  const [stats, setStats] = useState({ doctors: 0, patients: 0, appointments: 0, today: 0 })
  const [recent, setRecent] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      doctorService.getAll().catch(() => []),
      patientService.getAll().catch(() => []),
      appointmentService.getAll().catch(() => []),
    ]).then(([doctors, patients, appointments]) => {
      const today = new Date().toDateString()
      const todayAppts = appointments.filter(a =>
        a.date && new Date(a.date).toDateString() === today
      )
      setStats({
        doctors: doctors.length,
        patients: patients.length,
        appointments: appointments.length,
        today: todayAppts.length,
      })
      setRecent(appointments.slice(0, 6))
    }).finally(() => setLoading(false))
  }, [])

  const STAT_CARDS = [
    { label: 'Total Doctors',       value: stats.doctors,      change: '+3 this month',  icon: <DoctorIcon />,  color: 'blue' },
    { label: 'Total Patients',      value: stats.patients,     change: '+12 this month', icon: <PatientIcon />, color: 'green' },
    { label: 'Appointments Today',  value: stats.today,        change: 'Scheduled',       icon: <TodayIcon />,   color: 'amber' },
    { label: 'Total Appointments',  value: stats.appointments, change: 'All time',        icon: <CalIcon />,     color: 'red' },
  ]

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Good morning, Admin</h1>
          <p className="page-subtitle">Here's what's happening at your facility today.</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/appointments/add')}>
          + New Appointment
        </button>
      </div>

      {loading ? (
        <div className="loading-wrap"><div className="spinner" /></div>
      ) : (
        <>
          <div className="cards-grid cards-grid--4">
            {STAT_CARDS.map(card => (
              <div className="stat-card" key={card.label}>
                <div className="stat-card__top">
                  <span className="stat-card__label">{card.label}</span>
                  <div className={`stat-card__icon stat-card__icon--${card.color}`}>
                    {card.icon}
                  </div>
                </div>
                <div className="stat-card__value">{card.value}</div>
                <div className="stat-card__change">{card.change}</div>
              </div>
            ))}
          </div>

          <div className="dashboard-grid-2">
            <div className="dashboard-section">
              <div className="dashboard-section__header">
                <span className="dashboard-section__title">Recent Appointments</span>
                <button className="btn btn-ghost" style={{ fontSize: '0.78rem', padding: '5px 12px' }}
                  onClick={() => navigate('/appointments')}>
                  View All
                </button>
              </div>
              <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {recent.length === 0 ? (
                  <div className="empty-state"><p>No appointments yet.</p></div>
                ) : (
                  recent.map((a, i) => <AppointmentCard key={a._id || i} appointment={a} />)
                )}
              </div>
            </div>

            <div className="dashboard-section">
              <div className="dashboard-section__header">
                <span className="dashboard-section__title">Quick Actions</span>
              </div>
              <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { label: 'Add New Doctor',      to: '/doctors/add',      color: 'var(--accent)' },
                  { label: 'Register Patient',    to: '/patients/add',     color: 'var(--success)' },
                  { label: 'Schedule Appointment',to: '/appointments/add', color: 'var(--warning)' },
                  { label: 'View All Patients',   to: '/patients',         color: 'var(--text-secondary)' },
                ].map(action => (
                  <button
                    key={action.to}
                    onClick={() => navigate(action.to)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'var(--bg-subtle)',
                      border: '1px solid var(--border)',
                      borderLeft: `3px solid ${action.color}`,
                      borderRadius: 'var(--radius-sm)',
                      textAlign: 'left',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: 'var(--text-primary)',
                      cursor: 'pointer',
                      transition: 'background 0.15s',
                    }}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function DoctorIcon()  { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> }
function PatientIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> }
function TodayIcon()   { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> }
function CalIcon()     { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> }