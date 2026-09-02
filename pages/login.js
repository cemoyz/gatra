import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 4000)
  }

  const handleLogin = async (e) => {
    if (e) e.preventDefault()
    if (!email || !password) {
      showToast('Mohon masukkan email dan kata sandi', 'error')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()

      if (data.success) {
        showToast(`Selamat datang kembali, ${data.user?.name}!`, 'success')
        setTimeout(() => {
          if (['ADMIN', 'EDITOR', 'AUTHOR'].includes(data.user?.role)) {
            router.push('/dashboard')
          } else {
            router.push('/')
          }
        }, 800)
      } else {
        showToast(data.message || 'Email atau kata sandi tidak valid', 'error')
      }
    } catch (err) {
      showToast('Terjadi kesalahan koneksi saat login', 'error')
    } finally {
      setLoading(false)
    }
  }

  const quickFill = (role) => {
    if (role === 'admin') {
      setEmail('admin@hoom.com')
      setPassword('admin123')
    } else if (role === 'editor') {
      setEmail('editor@hoom.com')
      setPassword('editor123')
    } else if (role === 'author') {
      setEmail('author@hoom.com')
      setPassword('author123')
    }
  }

  return (
    <>
      <Head>
        <title>Login &bull; Hoom Magazine Portal</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        <link rel="stylesheet" href="/assets/css/dashboard.css" />
      </Head>

      <div
        style={{
          minHeight: '100vh',
          width: '100%',
          backgroundColor: '#f8fafc',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px 16px',
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          boxSizing: 'border-box'
        }}
      >
        {/* Toast Notification */}
        {toast && (
          <div
            style={{
              position: 'fixed',
              top: '24px',
              right: '24px',
              zIndex: 9999,
              padding: '12px 18px',
              borderRadius: '10px',
              background: toast.type === 'error' ? '#ef4444' : '#10b981',
              color: '#ffffff',
              fontSize: '13.5px',
              fontWeight: 600,
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              animation: 'dashFadeSlideUp 0.3s ease forwards'
            }}
          >
            <i className={`fa ${toast.type === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle'}`}></i>
            <span>{toast.msg}</span>
          </div>
        )}

        <div style={{ width: '100%', maxWidth: '420px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Brand Logo Header matching main-files basic login */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: '#090d16',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
              }}
            >
              <i className="fa fa-newspaper-o"></i>
            </div>
            <span style={{ fontSize: '18px', fontWeight: 800, color: '#090d16', letterSpacing: '-0.3px' }}>
              Hoom Magazine
            </span>
          </div>

          {/* Main Login Card matching main-files LoginForm */}
          <div
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '14px',
              boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.02)',
              overflow: 'hidden'
            }}
          >
            {/* Card Header */}
            <div style={{ padding: '24px 24px 16px', textAlign: 'center' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#090d16', margin: '0 0 6px', letterSpacing: '-0.3px' }}>
                Selamat Datang Kembali
              </h2>
              <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                Masuk ke akun redaksi dan dashboard portal Anda
              </p>
            </div>

            {/* Card Content & Form */}
            <div style={{ padding: '0 24px 24px' }}>
              
              {/* Quick Demo Role Fillers matching social buttons layout in main-files */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.6px', textAlign: 'center', marginBottom: '2px' }}>
                  Pilih Akun Demo Cepat
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => quickFill('admin')}
                    style={{
                      height: '34px',
                      borderRadius: '8px',
                      background: '#f1f5f9',
                      border: '1px solid #e2e8f0',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#090d16',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px',
                      transition: 'all 0.15s'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#090d16' }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e2e8f0' }}
                  >
                    <i className="fa fa-shield" style={{ color: '#da0105', fontSize: '11px' }}></i>
                    Admin
                  </button>
                  <button
                    type="button"
                    onClick={() => quickFill('editor')}
                    style={{
                      height: '34px',
                      borderRadius: '8px',
                      background: '#f1f5f9',
                      border: '1px solid #e2e8f0',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#090d16',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px',
                      transition: 'all 0.15s'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#090d16' }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e2e8f0' }}
                  >
                    <i className="fa fa-pencil" style={{ color: '#3b82f6', fontSize: '11px' }}></i>
                    Editor
                  </button>
                  <button
                    type="button"
                    onClick={() => quickFill('author')}
                    style={{
                      height: '34px',
                      borderRadius: '8px',
                      background: '#f1f5f9',
                      border: '1px solid #e2e8f0',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#090d16',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px',
                      transition: 'all 0.15s'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#090d16' }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e2e8f0' }}
                  >
                    <i className="fa fa-user-circle" style={{ color: '#10b981', fontSize: '11px' }}></i>
                    Penulis
                  </button>
                </div>
              </div>

              {/* Divider matching main-files */}
              <div
                style={{
                  position: 'relative',
                  textAlign: 'center',
                  margin: '18px 0',
                  fontSize: '12px',
                  color: '#94a3b8'
                }}
              >
                <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: '#e2e8f0', zIndex: 0 }} />
                <span style={{ position: 'relative', background: '#ffffff', padding: '0 10px', zIndex: 1 }}>
                  Atau masuk dengan email
                </span>
              </div>

              {/* Form Fields */}
              <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Email Input */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="email" style={{ fontSize: '13px', fontWeight: 600, color: '#090d16' }}>
                    Alamat Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="nama@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      height: '38px',
                      padding: '0 12px',
                      background: '#ffffff',
                      border: '1px solid #cbd5e1',
                      borderRadius: '8px',
                      fontSize: '13.5px',
                      color: '#090d16',
                      boxSizing: 'border-box',
                      outline: 'none',
                      transition: 'border-color 0.15s ease, box-shadow 0.15s ease'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#090d16'
                      e.currentTarget.style.boxShadow = '0 0 0 2px rgba(9, 13, 22, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = '#cbd5e1'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  />
                </div>

                {/* Password Input */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <label htmlFor="password" style={{ fontSize: '13px', fontWeight: 600, color: '#090d16' }}>
                      Kata Sandi
                    </label>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        showToast('Silakan hubungi administrator untuk mereset kata sandi Anda.', 'error')
                      }}
                      style={{ fontSize: '12px', color: '#64748b', textDecoration: 'none' }}
                      onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline' }}
                      onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none' }}
                    >
                      Lupa kata sandi?
                    </a>
                  </div>

                  <div style={{ position: 'relative', width: '100%' }}>
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      style={{
                        width: '100%',
                        height: '38px',
                        padding: '0 38px 0 12px',
                        background: '#ffffff',
                        border: '1px solid #cbd5e1',
                        borderRadius: '8px',
                        fontSize: '13.5px',
                        color: '#090d16',
                        boxSizing: 'border-box',
                        outline: 'none',
                        transition: 'border-color 0.15s ease, box-shadow 0.15s ease'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#090d16'
                        e.currentTarget.style.boxShadow = '0 0 0 2px rgba(9, 13, 22, 0.1)'
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#cbd5e1'
                        e.currentTarget.style.boxShadow = 'none'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: '#64748b',
                        cursor: 'pointer',
                        padding: '4px',
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                      title={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                    >
                      <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                  </div>
                </div>

                {/* Submit Button matching main-files */}
                <button
                  type="submit"
                  disabled={loading}
                  className="dash-btn dash-btn-primary"
                  style={{
                    width: '100%',
                    height: '38px',
                    borderRadius: '8px',
                    marginTop: '4px',
                    fontSize: '13.5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    color: '#ffffff',
                    background: '#090d16',
                    borderColor: '#090d16'
                  }}
                >
                  {loading ? (
                    <>
                      <i className="fa fa-spinner fa-spin"></i>
                      <span>Memproses Masuk...</span>
                    </>
                  ) : (
                    <>
                      <span>Masuk ke Dashboard</span>
                      <i className="fa fa-arrow-right"></i>
                    </>
                  )}
                </button>
              </form>

              {/* Bottom Sign up text */}
              <div style={{ textAlign: 'center', fontSize: '12.5px', color: '#64748b', marginTop: '18px' }}>
                Ingin kembali ke beranda portal?{' '}
                <Link href="/" style={{ color: '#090d16', fontWeight: 600, textDecoration: 'underline' }}>
                  Buka Portal Berita
                </Link>
              </div>
            </div>
          </div>

          {/* Footer Terms & Privacy Policy matching main-files */}
          <div style={{ textAlign: 'center', fontSize: '11.5px', color: '#94a3b8', lineHeight: 1.5 }}>
            Dengan mengklik masuk, Anda menyetujui <a href="#" style={{ color: '#64748b', textDecoration: 'underline' }}>Ketentuan Layanan</a>{' '}
            dan <a href="#" style={{ color: '#64748b', textDecoration: 'underline' }}>Kebijakan Privasi</a> portal Hoom.
          </div>

        </div>
      </div>
    </>
  )
}
