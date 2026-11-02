import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

export default function LoginPage({ initialSettings = {} }) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)
  const [siteSettings, setSiteSettings] = useState(initialSettings)

  useEffect(() => {
    // If user is already logged in, automatically redirect to dashboard
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.user) {
          window.location.href = '/dashboard'
        }
      })
      .catch(() => {})

    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.settings) {
          try { sessionStorage.setItem('dash_site_settings', JSON.stringify(data.settings)) } catch (e) {}
          setSiteSettings(prev => ({ ...prev, ...data.settings }))
        }
      })
      .catch(() => {})
  }, [])

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
        if (data.token) {
          try {
            localStorage.setItem('hoom_token', data.token)
            sessionStorage.setItem('hoom_token', data.token)
            sessionStorage.setItem('dash_user', JSON.stringify(data.user))
            // Set auth token cookie for middleware protection
            document.cookie = `hoom_auth_token=${data.token}; path=/; max-age=86400; SameSite=Lax;`
          } catch (e) {}
        }
        showToast(`Selamat datang kembali, ${data.user?.name}! Mengalihkan ke dashboard...`, 'success')
        setTimeout(() => {
          window.location.href = '/dashboard'
        }, 200)
      } else {
        showToast(data.message || 'Email atau kata sandi tidak valid', 'error')
      }
    } catch (err) {
      showToast('Terjadi kesalahan koneksi saat login', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Login &bull; {siteSettings.site_title || 'Dua Narasi'}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
          
          {/* Brand Logo Header matching settings */}
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
              {siteSettings.site_title || 'Dua Narasi'}
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

export async function getServerSideProps() {
  try {
    const prisma = (await import('@/lib/prisma')).default
    const settingsList = await prisma.setting.findMany()
    const settings = {}
    settingsList.forEach(s => {
      settings[s.key] = s.value
    })

    return {
      props: {
        initialSettings: settings
      }
    }
  } catch (error) {
    return {
      props: {
        initialSettings: { site_title: 'duanarasi.com' }
      }
    }
  }
}
