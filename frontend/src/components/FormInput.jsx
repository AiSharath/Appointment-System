import React from 'react'

export default function FormInput({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  required = false,
  error = '',
  options = [],
  fullWidth = false,
}) {
  const cls = `form-group${fullWidth ? ' form-grid--full' : ''}`

  return (
    <div className={cls}>
      <label htmlFor={name}>
        {label} {required && <span style={{ color: 'var(--danger)' }}>*</span>}
      </label>

      {type === 'select' ? (
        <select id={name} name={name} value={value} onChange={onChange} required={required}>
          <option value="">Select {label}</option>
          {options.map(opt => {
            // ✅ handle both { value, label } objects and plain strings
            const optValue = typeof opt === 'object' ? String(opt.value) : String(opt)
            const optLabel = typeof opt === 'object' ? opt.label : opt
            return (
              <option key={optValue} value={optValue}>
                {optLabel}
              </option>
            )
          })}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={3}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
        />
      )}

      {error && <span className="error-msg">{error}</span>}
    </div>
  )
}