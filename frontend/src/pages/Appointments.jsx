import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { appointmentService } from '../services/appointmentService'
import AppointmentCard from '../components/AppointmentCard'

export default function Appointments() {
  const navigate = useNavigate()
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')

  const load = () => {
    setLoading(true)
    appointmentService.getAll()
      .then(setAppointments)
      .catch(() => setAppointments([]))
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Cancel this appointment?')) return
    await appointmentService.delete(id).catch(() => {})
    load()
  }

  const handleStatusChange = async (id, status) => {
    await appointmentService.update(id, { status }).catch(() => {})
    load()
  }

  const filtered = appointments.filter(a =>
    filter === 'All' || a.status === filter
  )

  const STATUSES = ['All', 'Scheduled', 'In Progress', 'Completed', 'Cancelled']

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Appointments</h1>
          <p className="page-subtitle">{appointments.length} total appointments</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/appointments/add')}>
          + Schedule
        </button>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {STATUSES.map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            style={{
              padding: '7px 14px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border)',
              fontSize: '0.8rem',
              fontWeight: 500,
              cursor: 'pointer',
              fontFamily: 'var(--font-sans)',
              background: filter === s ? 'var(--accent)' : 'var(--bg-surface)',
              color: filter === s ? '#fff' : 'var(--text-secondary)',
              transition: 'all 0.15s',
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="loading-wrap"><div className="spinner" /></div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <p>No appointments found.</p>
        </div>
      ) : (
        <div className="cards-grid cards-grid--3">
          {filtered.map(a => (
            <AppointmentCard
              key={a._id || a.id}
              appointment={a}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}
    </div>
  )
}