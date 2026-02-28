import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { patientService } from '../services/patientService'
import { doctorService } from '../services/doctorService'
import FormInput from '../components/FormInput'
import '../styles/forms.css'

const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
const GENDERS     = ['Male', 'Female', 'Other']
const STATUSES    = ['Active', 'Critical', 'Discharged', 'Outpatient']

const INITIAL = {
  name:            '',
  age:             '',
  gender:          '',
  blood_type:      '',
  email:           '',
  phone:           '',
  status:          '',
  assigned_doctor: '',
  address:         '',
}

export default function AddPatient() {
  const navigate = useNavigate()
  const [form, setForm] = useState(INITIAL)
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    doctorService.getAll()
      // ✅ value is a plain string (doctor name), not an ObjectId
      .then(d => setDoctors(d.map(doc => ({ value: doc.name, label: doc.name }))))
      .catch(() => {})
  }, [])

  // ✅ single handleChange works for ALL inputs including selects
  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.name)            return setError('Name is required.')
    if (!form.age)             return setError('Age is required.')
    if (!form.gender)          return setError('Gender is required.')
    if (!form.blood_type)      return setError('Blood type is required.')
    if (!form.email)           return setError('Email is required.')
    if (!form.phone)           return setError('Phone is required.')
    if (!form.status)          return setError('Status is required.')
    if (!form.assigned_doctor) return setError('Assigned doctor is required.')

    setLoading(true)
    setError('')
    try {
      await patientService.create({
        ...form,
        age: Number(form.age),  // schema expects Number
        // ✅ phone stays as String — do NOT convert to Number
      })
      navigate('/patients')
    } catch (err) {
      setError(err?.response?.data?.error || err?.response?.data?.message || 'Failed to add patient.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Add Patient</h1>
          <p className="page-subtitle">Register a new patient record</p>
        </div>
        <button className="btn btn-ghost" onClick={() => navigate('/patients')}>← Back</button>
      </div>

      <form className="form-card" onSubmit={handleSubmit}>
        {error && <div style={errStyle}>{error}</div>}
        <div className="form-grid">
          <FormInput
            label="Full Name" name="name" value={form.name}
            onChange={handleChange} placeholder="John Doe" required
          />
          <FormInput
            label="Age" name="age" value={form.age}
            onChange={handleChange} type="number" placeholder="35" required
          />
          <FormInput
            label="Gender" name="gender" value={form.gender}
            onChange={handleChange} type="select" options={GENDERS} required
          />
          {/* ✅ type="text" not "select" for blood_type so value binding works correctly */}
          <FormInput
            label="Blood Type" name="blood_type" value={form.blood_type}
            onChange={handleChange} type="select" options={BLOOD_TYPES} required
          />
          <FormInput
            label="Email" name="email" value={form.email}
            onChange={handleChange} type="email" placeholder="john@email.com" required
          />
          {/* ✅ phone is type="text" — schema stores as String */}
          <FormInput
            label="Phone" name="phone" value={form.phone}
            onChange={handleChange} type="text" placeholder="9876543210" required
          />
          <FormInput
            label="Status" name="status" value={form.status}
            onChange={handleChange} type="select" options={STATUSES} required
          />
          <FormInput
            label="Assigned Doctor" name="assigned_doctor" value={form.assigned_doctor}
            onChange={handleChange} type="select" options={doctors} required
          />
          <FormInput
            label="Address" name="address" value={form.address}
            onChange={handleChange} placeholder="123 Main St…" fullWidth
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving…' : 'Register Patient'}
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => navigate('/patients')}>
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