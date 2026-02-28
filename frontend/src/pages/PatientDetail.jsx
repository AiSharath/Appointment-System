import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { patientService } from '../services/patientService'

export default function PatientDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [patient, setPatient] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    patientService.getById(id)
      .then(setPatient)
      .catch(() => navigate('/patients'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="loading-wrap"><div className="spinner" /></div>
  if (!patient) return <div className="empty-state"><p>Patient not found.</p></div>

  const fields = [
    { label: 'Full Name',        value: patient.name },
    { label: 'Age',              value: patient.age },
    { label: 'Gender',           value: patient.gender },
    { label: 'Blood Type',       value: patient.blood_type },
    { label: 'Email',            value: patient.email },
    { label: 'Phone',            value: patient.phone },
    { label: 'Status',           value: patient.status },
    { label: 'Assigned Doctor',  value: patient.assigned_doctor },
    { label: 'Address',          value: patient.address || '—' },
    { label: 'Registered On',    value: new Date(patient.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) },
  ]

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">{patient.name}</h1>
          <p className="page-subtitle">Patient Record</p>
        </div>
        <button className="btn btn-ghost" onClick={() => navigate('/patients')}>← Back</button>
      </div>

      <div style={styles.card}>
        <div style={styles.avatarRow}>
          <div style={styles.avatar}>
            {patient.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
          </div>
          <div>
            <p style={styles.name}>{patient.name}</p>
            <span className={`badge badge--${
              patient.status === 'Active' ? 'success' :
              patient.status === 'Critical' ? 'danger' :
              patient.status === 'Outpatient' ? 'warning' : 'neutral'
            }`}>{patient.status}</span>
          </div>
        </div>

        <div style={styles.grid}>
          {fields.map(f => (
            <div key={f.label} style={styles.field}>
              <span style={styles.fieldLabel}>{f.label}</span>
              <span style={styles.fieldValue}>{f.value || '—'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const styles = {
  card: {
    background: 'var(--bg-surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: '32px',
    boxShadow: 'var(--shadow-sm)',
    maxWidth: 700,
  },
  avatarRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    marginBottom: 28,
    paddingBottom: 24,
    borderBottom: '1px solid var(--border)',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: '50%',
    background: 'var(--success-light)',
    color: 'var(--success)',
    fontWeight: 700,
    fontSize: '1.1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontWeight: 600,
    fontSize: '1.1rem',
    color: 'var(--text-primary)',
    marginBottom: 6,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px 32px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  fieldLabel: {
    fontSize: '0.72rem',
    fontWeight: 500,
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  fieldValue: {
    fontSize: '0.9rem',
    color: 'var(--text-primary)',
    fontWeight: 500,
  },
}