import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { appointmentService } from '../services/appointmentService'
import { doctorService } from '../services/doctorService'
import { patientService } from '../services/patientService'
import FormInput from '../components/FormInput'
import '../styles/forms.css'

const TIME_SLOTS = [
  '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM',
  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM', '05:00 PM',
]

const TYPES = ['Consultation', 'Follow-up', 'Checkup', 'Emergency', 'Surgery', 'Lab Test', 'Imaging']

// ✅ field names match schema exactly
const INITIAL = {
  patient_id:       '',
  doctor_id:        '',
  appointment_date: '',
  time_slot:        '',
  type:             'Consultation',
  notes:            '',
}

export default function AddAppointment() {
  const navigate = useNavigate()
  const [form, setForm] = useState(INITIAL)
  const [doctors, setDoctors] = useState([])
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // ✅ send _id as value so MongoDB gets ObjectId reference
    doctorService.getAll()
      .then(d => setDoctors(d.map(doc => ({ value: doc._id, label: doc.name }))))
      .catch(() => {})
    patientService.getAll()
      .then(p => setPatients(p.map(pt => ({ value: pt._id, label: pt.name }))))
      .catch(() => {})
  }, [])

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.patient_id)       return setError('Patient is required.')
    if (!form.doctor_id)        return setError('Doctor is required.')
    if (!form.appointment_date) return setError('Appointment date is required.')
    if (!form.time_slot)        return setError('Time slot is required.')

    setLoading(true)
    setError('')
    try {
      await appointmentService.create(form)
      navigate('/appointments')
    } catch (err) {
      setError(err?.response?.data?.error || err?.response?.data?.message || 'Failed to schedule appointment.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Schedule Appointment</h1>
          <p className="page-subtitle">Book a new appointment</p>
        </div>
        <button className="btn btn-ghost" onClick={() => navigate('/appointments')}>← Back</button>
      </div>

      <form className="form-card" onSubmit={handleSubmit}>
        {error && <div style={errStyle}>{error}</div>}
        <div className="form-grid">
          <FormInput
            label="Patient" name="patient_id" value={form.patient_id}
            onChange={handleChange} type="select" options={patients} required
          />
          <FormInput
            label="Doctor" name="doctor_id" value={form.doctor_id}
            onChange={handleChange} type="select" options={doctors} required
          />
          <FormInput
            label="Appointment Date" name="appointment_date" value={form.appointment_date}
            onChange={handleChange} type="date" required
          />
          <FormInput
            label="Time Slot" name="time_slot" value={form.time_slot}
            onChange={handleChange} type="select" options={TIME_SLOTS} required
          />
          <FormInput
            label="Appointment Type" name="type" value={form.type}
            onChange={handleChange} type="select" options={TYPES}
          />
          <FormInput
            label="Notes" name="notes" value={form.notes}
            onChange={handleChange} type="textarea" placeholder="Reason for visit…" fullWidth
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Scheduling…' : 'Schedule Appointment'}
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => navigate('/appointments')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

const errStyle = {
  padding: '10px 14px',
  background: 'var(--danger-light)',
  border: '1px solid #f5c2bf',
  borderRadius: 'var(--radius-sm)',
  color: 'var(--danger)',
  fontSize: '0.85rem',
  marginBottom: 16,
}