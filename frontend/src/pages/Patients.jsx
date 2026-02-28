import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { patientService } from '../services/patientService'
import PatientCard from '../components/PatientCard'

export default function Patients() {
  const navigate = useNavigate()
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  const load = () => {
    setLoading(true)
    patientService.getAll()
      .then(setPatients)
      .catch(() => setPatients([]))
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this patient?')) return
    await patientService.delete(id).catch(() => {})
    load()
  }

  const filtered = patients.filter(p => {
    const matchSearch = !search || p.name?.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filter === 'All' || p.status === filter
    return matchSearch && matchStatus
  })

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Patients</h1>
          <p className="page-subtitle">{patients.length} registered patients</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/patients/add')}>
          + Add Patient
        </button>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search patients…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ ...searchStyle, flex: 1, minWidth: 200 }}
        />
        {['All', 'Active', 'Critical', 'Discharged'].map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            style={{
              padding: '8px 16px',
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
          <p>No patients match your search.</p>
        </div>
      ) : (
        <div className="cards-grid cards-grid--3">
          {filtered.map(p => (
            <PatientCard key={p._id || p.id} patient={p} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  )
}

const searchStyle = {
  padding: '9px 14px',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius-sm)',
  fontSize: '0.875rem',
  fontFamily: 'var(--font-sans)',
  background: 'var(--bg-surface)',
  outline: 'none',
  color: 'var(--text-primary)',
}