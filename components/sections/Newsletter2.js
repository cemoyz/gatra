
import React, { useState, useEffect } from 'react'
import { getImageUrl } from '@/lib/imageUtils'

export default function Newsletter2({ settings: propSettings }) {
    const [settings, setSettings] = useState(propSettings || {})
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState({ type: null, msg: '' })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (propSettings) {
            setSettings(propSettings)
        } else {
            fetch('/api/settings')
                .then(res => res.json())
                .then(data => {
                    if (data.success && data.settings) {
                        setSettings(data.settings)
                    }
                })
                .catch(console.error)
        }
    }, [propSettings])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!email.trim() || loading) return
        setLoading(true)
        setStatus({ type: null, msg: '' })

        try {
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email.trim(), topics: ['Weekly News'], frequency: 'weekly' })
            })
            const data = await res.json()
            if (data.success) {
                setStatus({ type: 'success', msg: data.message || 'Terima kasih telah berlangganan newsletter Dua Narasi!' })
                setEmail('')
            } else {
                setStatus({ type: 'error', msg: data.message || 'Gagal berlangganan. Silakan coba lagi.' })
            }
        } catch (err) {
            setStatus({ type: 'error', msg: 'Terjadi gangguan koneksi internet.' })
        } finally {
            setLoading(false)
        }
    }

    const title = settings.about_newsletter_title || 'Dapatkan Pembaruan Berita Setiap Minggu'
    const subtitle = settings.about_newsletter_subtitle || 'Berlangganan buletin kabar terbaru dan analisis eksklusif Dua Narasi langsung di email Anda.'
    const logoLight = getImageUrl(settings.logo_header, '/assets/img/logo/logo.webp')
    const logoDark = getImageUrl(settings.logo_header_dark, '/assets/img/logo/logo-white.webp')

    return (
        <div className="ta-newsletter-area pb-100">
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="ta-newsletter-wrapper ta-stroke">
                            <div className="ta-inner-wrapper fix pt-100 pb-100 position-relative">
                                <div className="row">
                                    <div className="col-xl-6 offset-xl-1">
                                        <div className="ta-section-heading">
                                            <img className="hide-on-dark" src={logoLight} alt="logo" style={{ maxHeight: '42px', objectFit: 'contain' }} />
                                            <img className="show-on-dark" src={logoDark} alt="logo" style={{ maxHeight: '42px', objectFit: 'contain' }} />
                                            <h2 className="ta-title mt-40">{title}</h2>
                                            <p>{subtitle}</p>
                                        </div>
                                        <div className="ta-newsletter-form ta-input-field mt-40">
                                            {status.type === 'success' ? (
                                                <div style={{ background: '#dcfce7', border: '1px solid #86efac', padding: '14px 20px', borderRadius: '8px', color: '#166534', fontWeight: 600 }}>
                                                    <i className="fa fa-check-circle" style={{ marginRight: '8px' }} />
                                                    {status.msg}
                                                </div>
                                            ) : (
                                                <form onSubmit={handleSubmit}>
                                                    <div>
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            id="newsletter-email"
                                                            placeholder="Masukkan alamat email Anda"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            required
                                                        />
                                                        <i className="fa fa-envelope-open" />
                                                        <button className="ta-button" type="submit" disabled={loading}>
                                                            {loading ? 'Mengirim...' : 'Langganan'} <i className="fa fa-paper-plane" />
                                                        </button>
                                                    </div>
                                                    {status.type === 'error' && (
                                                        <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '8px' }}>
                                                            {status.msg}
                                                        </p>
                                                    )}
                                                </form>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="thumb-bg position-absloute">
                                    <img src="/assets/img/bg/newsletter-bg-1.webp" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

