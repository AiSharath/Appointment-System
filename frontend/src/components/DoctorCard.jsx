import React from 'react'

export default function DoctorCard({ doctor, onDelete }) {
  const initials = doctor.name
    ? doctor.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : 'DR'

  const availabilityColor = {
    'Available':   'success',
    'Unavailable': 'danger',
    'On Leave':    'warning',
  }[doctor.availability] || 'neutral'

  return (
    <div style={styles.card}>
      <div style={styles.top}>
        <div style={styles.avatar}>{initials}</div>
        <div style={styles.info}>
          <p style={styles.name}>{doctor.name || '—'}</p>
          {/* ✅ schema field: specialization (not specialty) */}
          <p style={styles.specialization}>{doctor.specialization || '—'}</p>
        </div>
        {/* ✅ schema field: availability */}
        <span className={`badge badge--${availabilityColor}`}>
          {doctor.availability || 'Unknown'}
        </span>
      </div>

      {onDelete && (
        <div style={styles.actions}>
          <button style={styles.btnDelete} onClick={() => onDelete(doctor._id)}>
            Remove
          </button>
        </div>
      )}
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
    gap: 14,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: '50%',
    background: 'var(--accent-light)',
    color: 'var(--accent)',
    fontWeight: 600,
    fontSize: '0.9rem',
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
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  specialization: {
    fontSize: '0.78rem',
    color: 'var(--accent)',
    marginTop: 2,
  },
  actions: {
    display: 'flex',
    gap: 8,
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
  }
}