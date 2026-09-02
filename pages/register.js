import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Register() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'SUBSCRIBER'
  })
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)

  const handleRegister = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.password) {
      setToast({ msg: 'Please complete all required fields', type: 'error' })
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setToast({ msg: 'Passwords do not match', type: 'error' })
      return
    }

    if (formData.password.length < 6) {
      setToast({ msg: 'Password must be at least 6 characters', type: 'error' })
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role
        })
      })

      const data = await res.json()

      if (data.success) {
        setToast({ msg: 'Account created successfully! Redirecting...', type: 'success' })
        setTimeout(() => {
          if (['ADMIN', 'EDITOR', 'AUTHOR'].includes(data.user.role)) {
            router.push('/dashboard')
          } else {
            router.push('/')
          }
        }, 1200)
      } else {
        setToast({ msg: data.message || 'Registration failed', type: 'error' })
      }
    } catch (err) {
      setToast({ msg: 'Network error during registration', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Create Account &bull; Hoom Magazine</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        <link rel="stylesheet" href="/assets/css/dashboard.css" />
      </Head>

      <div
        style={{
          minHeight: '100vh',
          backgroundColor: '#0a0f1d',
          backgroundImage: 'radial-gradient(ellipse at 80% 20%, rgba(59, 130, 246, 0.15), transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(99, 102, 241, 0.12), transparent 50%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '30px 16px',
          fontFamily: "'Inter', sans-serif"
        }}
      >
        <div style={{ width: '100%', maxWidth: '460px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <Link href="/" style={{ display: 'inline-block', textDecoration: 'none', marginBottom: '14px' }}>
              <img src="/assets/img/logo/logo-white.webp" alt="Hoom Logo" style={{ height: '36px' }} />
            </Link>
            <h2 style={{ color: '#f8fafc', fontSize: '24px', fontWeight: 700, margin: '0 0 6px 0' }}>
              Create an Account
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>
              Join Hoom Magazine as a reader, writer, or editor
            </p>
          </div>

          {/* Form Card */}
          <div
            style={{
              background: '#0f172a',
              border: '1px solid #1e293b',
              borderRadius: '16px',
              padding: '32px 28px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)'
            }}
          >
            {toast && (
              <div
                style={{
                  background: toast.type === 'error' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                  border: `1px solid ${toast.type === 'error' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`,
                  color: toast.type === 'error' ? '#fca5a5' : '#86efac',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <i className={`fa ${toast.type === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle'}`} />
                {toast.msg}
              </div>
            )}

            <form onSubmit={handleRegister}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    background: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#f8fafc',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    background: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#f8fafc',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                    Password *
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      background: '#1e293b',
                      border: '1px solid #334155',
                      borderRadius: '8px',
                      color: '#f8fafc',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      background: '#1e293b',
                      border: '1px solid #334155',
                      borderRadius: '8px',
                      color: '#f8fafc',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '22px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                  Register As / Intended Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    background: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#f8fafc',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="SUBSCRIBER">Reader / Subscriber</option>
                  <option value="AUTHOR">Author / Contributor</option>
                  <option value="EDITOR">Content Editor</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '13px',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.35)'
                }}
              >
                {loading ? (
                  <>
                    <i className="fa fa-spinner fa-spin" /> Creating Account...
                  </>
                ) : (
                  <>
                    Create Account <i className="fa fa-arrow-right" />
                  </>
                )}
              </button>
            </form>

            <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #1e293b', textAlign: 'center' }}>
              <span style={{ fontSize: '13px', color: '#94a3b8' }}>
                Already have an account?{' '}
                <Link href="/login" style={{ color: '#60a5fa', textDecoration: 'none', fontWeight: 600 }}>
                  Sign in here
                </Link>
              </span>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <Link href="/" style={{ color: '#64748b', fontSize: '13px', textDecoration: 'none' }}>
              <i className="fa fa-long-arrow-left" style={{ marginRight: '6px' }} /> Return to Website Home
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
