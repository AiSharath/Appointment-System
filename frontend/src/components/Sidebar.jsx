import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const NAV = [
  {
    label: 'Overview',
    items: [
      { to: '/dashboard', label: 'Dashboard', icon: <GridIcon /> },
    ]
  },
  {
    label: 'Management',
    items: [
      { to: '/doctors',      label: 'Doctors',      icon: <DoctorIcon /> },
      { to: '/patients',     label: 'Patients',     icon: <PatientIcon /> },
      { to: '/appointments', label: 'Appointments', icon: <CalendarIcon /> },
    ]
  }
]

export default function Sidebar() {
  return (
    <aside style={styles.aside}>
      <div style={styles.logo}>
        <div style={styles.logoMark}>M</div>
        <span style={styles.logoText}>MedCore</span>
      </div>

      <nav style={styles.nav}>
        {NAV.map(section => (
          <div key={section.label} style={styles.section}>
            <p style={styles.sectionLabel}>{section.label}</p>
            {section.items.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                style={({ isActive }) => ({
                  ...styles.link,
                  ...(isActive ? styles.linkActive : {})
                })}
              >
                <span style={styles.icon}>{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <div style={styles.footer}>
        <div style={styles.footerAvatar}>AD</div>
        <div>
          <p style={styles.footerName}>Admin</p>
          <p style={styles.footerRole}>System Administrator</p>
        </div>
      </div>
    </aside>
  )
}

const styles = {
  aside: {
    position: 'fixed',
    left: 0,
    top: 0,
    bottom: 0,
    width: 240,
    minHeight: '100vh',
    background: '#111827',
    display: 'flex',
    flexDirection: 'column',
    padding: '0 0 24px',
    zIndex: 200,
    boxShadow: '2px 0 8px rgba(0,0,0,0.15)',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '24px 20px 20px',
    borderBottom: '1px solid rgba(255,255,255,0.07)',
    marginBottom: 16,
  },
  logoMark: {
    width: 32,
    height: 32,
    borderRadius: 8,
    background: '#1B4FDB',
    color: '#fff',
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '1.1rem',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '1.25rem',
    fontWeight: 600,
    color: '#fff',
    letterSpacing: '0.02em',
  },
  nav: {
    flex: 1,
    overflowY: 'auto',
    padding: '0 12px',
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: '0.65rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.3)',
    padding: '0 8px',
    marginBottom: 6,
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '9px 10px',
    borderRadius: 7,
    fontSize: '0.875rem',
    color: 'rgba(255,255,255,0.55)',
    fontWeight: 400,
    transition: 'background 0.15s, color 0.15s',
    marginBottom: 2,
  },
  linkActive: {
    background: 'rgba(27,79,219,0.25)',
    color: '#fff',
    fontWeight: 500,
  },
  icon: {
    width: 18,
    height: 18,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.8,
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '16px 20px 0',
    borderTop: '1px solid rgba(255,255,255,0.07)',
    marginTop: 'auto',
  },
  footerAvatar: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    background: '#1B4FDB',
    color: '#fff',
    fontSize: '0.7rem',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerName: {
    fontSize: '0.825rem',
    fontWeight: 500,
    color: '#fff',
  },
  footerRole: {
    fontSize: '0.72rem',
    color: 'rgba(255,255,255,0.4)',
  }
}

function GridIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  )
}
function DoctorIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  )
}
function PatientIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  )
}
function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  )
}