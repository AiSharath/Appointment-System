import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { doctorService } from '../services/doctorService'
import FormInput from '../components/FormInput'
import '../styles/forms.css'

// ✅ Must match schema enum values exactly
const SPECIALIZATIONS = [
  'General Practitioner', 'Cardiology', 'Neurology', 'Orthopedics',
  'Pediatrics', 'Oncology', 'Dermatology', 'Radiology',
  'Emergency Medicine', 'Psychiatry', 'Surgery', 'Other',
]

const AVAILABILITY = ['Available', 'Unavailable', 'On Leave']

// ✅ Only fields that exist in the schema
const INITIAL = {
  name:           '',
  specialization: '',
  availability:   'Available',
}

export default function AddDoctor() {
  const navigate = useNavigate()
  const [form, setForm] = useState(INITIAL)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()

    // Validate all required schema fields
    if (!form.name)           return setError('Doctor name is required.')
    if (!form.specialization) return setError('Specialization is required.')
    if (!form.availability)   return setError('Availability is required.')

    setLoading(true)
    setError('')
    try {
      await doctorService.create(form)
      navigate('/doctors')
    } catch (err) {
      setError(err?.response?.data?.error || err?.response?.data?.message || 'Failed to add doctor.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Add Doctor</h1>
          <p className="page-subtitle">Register a new physician</p>
        </div>
        <button className="btn btn-ghost" onClick={() => navigate('/doctors')}>← Back</button>
      </div>

      <form className="form-card" onSubmit={handleSubmit}>
        {error && <div style={errStyle}>{error}</div>}
        <div className="form-grid">
          <FormInput
            label="Full Name" name="name" value={form.name}
            onChange={handleChange} placeholder="Dr. Jane Smith" required
          />
          <FormInput
            label="Specialization" name="specialization" value={form.specialization}
            onChange={handleChange} type="select" options={SPECIALIZATIONS} required
          />
          <FormInput
            label="Availability" name="availability" value={form.availability}
            onChange={handleChange} type="select" options={AVAILABILITY} required
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving…' : 'Add Doctor'}
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => navigate('/doctors')}>
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