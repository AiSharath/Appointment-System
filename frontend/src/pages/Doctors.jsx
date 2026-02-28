import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { doctorService } from '../services/doctorService'
import DoctorCard from '../components/DoctorCard'

export default function Doctors() {
  const navigate = useNavigate()
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  const load = () => {
    setLoading(true)
    doctorService.getAll()
      .then(setDoctors)
      .catch(() => setDoctors([]))
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this doctor?')) return
    await doctorService.delete(id).catch(() => {})
    load()
  }

  const filtered = doctors.filter(d =>
    !search || d.name?.toLowerCase().includes(search.toLowerCase()) ||
    d.specialty?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Doctors</h1>
          <p className="page-subtitle">{doctors.length} registered physicians</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/doctors/add')}>
          + Add Doctor
        </button>
      </div>

      <div style={{ marginBottom: 24 }}>
        <input
          type="text"
          placeholder="Search by name or specialty…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={searchStyle}
        />
      </div>

      {loading ? (
        <div className="loading-wrap"><div className="spinner" /></div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <p>No doctors found. Add one to get started.</p>
        </div>
      ) : (
        <div className="cards-grid cards-grid--3">
          {filtered.map(d => (
            <DoctorCard key={d._id || d.id} doctor={d} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  )
}

const searchStyle = {
  width: '100%',
  maxWidth: 360,
  padding: '9px 14px',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius-sm)',
  fontSize: '0.875rem',
  fontFamily: 'var(--font-sans)',
  background: 'var(--bg-surface)',
  outline: 'none',
  color: 'var(--text-primary)',
}