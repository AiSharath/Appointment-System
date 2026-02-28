import React from 'react'

const STATUS_MAP = {
  Scheduled:     'neutral',
  Completed:     'success',
  Cancelled:     'danger',
  'In Progress': 'warning',
}

export default function AppointmentCard({ appointment, onDelete, onStatusChange }) {
  // ✅ use schema field names: appointment_date, time_slot, patient_id, doctor_id
  const date = appointment.appointment_date
    ? new Date(appointment.appointment_date).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric'
      })
    : '—'

  const day = appointment.appointment_date
    ? new Date(appointment.appointment_date).getDate()
    : '--'

  const month = appointment.appointment_date
    ? new Date(appointment.appointment_date).toLocaleString('en-US', { month: 'short' })
    : '---'

  // populated fields come back as objects, unpopulated as plain IDs
  const patientName = appointment.patient_id?.name || 'Patient'
  const doctorName  = appointment.doctor_id?.name  || '—'
  const status      = appointment.status || 'Scheduled'
  const badgeColor  = STATUS_MAP[status] || 'neutral'

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div style={styles.dateBox}>
          <span style={styles.dateDay}>{day}</span>
          <span style={styles.dateMonth}>{month}</span>
        </div>
        <div style={styles.headerInfo}>
          <p style={styles.patient}>{patientName}</p>
          <p style={styles.doctor}>Dr. {doctorName}</p>
          {/* ✅ schema field: time_slot */}
          <p style={styles.time}>{appointment.time_slot || '—'}</p>
        </div>
        <span className={`badge badge--${badgeColor}`}>{status}</span>
      </div>

      {appointment.notes && (
        <p style={styles.notes}>{appointment.notes}</p>
      )}

      <div style={styles.actions}>
        {onStatusChange && (
          <select
            value={status}
            onChange={e => onStatusChange(appointment._id, e.target.value)}
            style={styles.select}
          >
            {Object.keys(STATUS_MAP).map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        )}
        {onDelete && (
          <button style={styles.btnDelete} onClick={() => onDelete(appointment._id)}>
            Cancel
          </button>
        )}
      </div>
    </div>
  )
}

const styles = {
  card: {
    background: 'var(--bg-surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-md)',
    padding: '18px 20px',
    boxShadow: 'var(--shadow-sm)',
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
  },
  header: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 14,
  },
  dateBox: {
    width: 44,
    height: 44,
    background: 'var(--accent-light)',
    borderRadius: 'var(--radius-sm)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  dateDay: {
    fontSize: '1.1rem',
    fontWeight: 700,
    color: 'var(--accent)',
    lineHeight: 1,
  },
  dateMonth: {
    fontSize: '0.6rem',
    color: 'var(--accent)',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  headerInfo: { flex: 1, minWidth: 0 },
  patient: {
    fontWeight: 600,
    fontSize: '0.875rem',
    color: 'var(--text-primary)',
  },
  doctor: {
    fontSize: '0.78rem',
    color: 'var(--text-secondary)',
    marginTop: 2,
  },
  time: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
    marginTop: 2,
  },
  notes: {
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
    background: 'var(--bg-subtle)',
    borderRadius: 'var(--radius-sm)',
    padding: '8px 12px',
    borderLeft: '3px solid var(--border-strong)',
  },
  actions: {
    display: 'flex',
    gap: 8,
    alignItems: 'center',
  },
  select: {
    flex: 1,
    padding: '6px 10px',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--border)',
    fontSize: '0.8rem',
    color: 'var(--text-primary)',
    background: 'var(--bg-surface)',
    cursor: 'pointer',
    fontFamily: 'var(--font-sans)',
  },
  btnDelete: {
    padding: '6px 14px',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--danger-light)',
    background: 'var(--danger-light)',
    fontSize: '0.8rem',
    fontWeight: 500,
    color: 'var(--danger)',
    cursor: 'pointer',
  }
}