import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function PatientCard({ patient, onDelete }) {
  const navigate = useNavigate()

  const initials = patient.name
    ? patient.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : 'PT'

  const statusColor = {
    'Active':     'success',
    'Critical':   'danger',
    'Discharged': 'neutral',
    'Outpatient': 'warning',
  }[patient.status] || 'neutral'

  return (
    <div style={styles.card}>
      <div style={styles.top}>
        <div style={styles.avatar}>{initials}</div>
        <div style={styles.info}>
          <p style={styles.name}>{patient.name || '—'}</p>
          <p style={styles.sub}>
            {patient.gender || '—'} · Age {patient.age || '—'}
          </p>
        </div>
        <span className={`badge badge--${statusColor}`}>
          {patient.status || 'Unknown'}
        </span>
      </div>

      <div style={styles.details}>
        {/* ✅ correct schema field names */}
        <Detail label="Blood Type" value={patient.blood_type      || '—'} />
        <Detail label="Phone"      value={patient.phone           || '—'} />
        <Detail label="Doctor"     value={patient.assigned_doctor || '—'} />
      </div>

      <div style={styles.actions}>
        <button
          style={styles.btnView}
          onClick={() => navigate(`/patients/${patient._id}`)}
        >
          View
        </button>
        {onDelete && (
          <button
            style={styles.btnDelete}
            onClick={() => onDelete(patient._id)}
          >
            Remove
          </button>
        )}
      </div>
    </div>
  )
}

function Detail({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
      <span style={{ color: 'var(--text-muted)' }}>{label}</span>
      <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{value}</span>
    </div>
  )
}

const styles = {
  card: {
    background: 'var(--bg-surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-md)',
    padding: '20px',
    boxShadow: 'var(--shadow-sm)',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  top: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: '50%',
    background: 'var(--success-light)',
    color: 'var(--success)',
    fontWeight: 600,
    fontSize: '0.85rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  info: { flex: 1, minWidth: 0 },
  name: {
    fontWeight: 600,
    fontSize: '0.9rem',
    color: 'var(--text-primary)',
  },
  sub: {
    fontSize: '0.75rem',
    color: 'var(--text-secondary)',
    marginTop: 2,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    gap: 7,
    padding: '12px 0',
    borderTop: '1px solid var(--border)',
    borderBottom: '1px solid var(--border)',
  },
  actions: {
    display: 'flex',
    gap: 8,
  },
  btnView: {
    flex: 1,
    padding: '7px 0',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--border)',
    background: 'transparent',
    fontSize: '0.8rem',
    fontWeight: 500,
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    fontFamily: 'var(--font-sans)',
  },
  btnDelete: {
    flex: 1,
    padding: '7px 0',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--danger-light)',
    background: 'var(--danger-light)',
    fontSize: '0.8rem',
    fontWeight: 500,
    color: 'var(--danger)',
    cursor: 'pointer',
    fontFamily: 'var(--font-sans)',
  }
}