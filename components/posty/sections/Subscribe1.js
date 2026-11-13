'use client'
import { useState } from 'react'

export default function Subscribe1({ settings = {} }) {
    if (settings.show_newsletter === 'false') {
        return null
    }

    const [email, setEmail] = useState('')
    const [status, setStatus] = useState(null)
    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!email.trim()) return

        setSubmitting(true)
        setStatus(null)
        try {
            const res = await fetch('/api/subscribers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email.trim() })
            })
            const data = await res.json()
            if (data.success) {
                setStatus({ type: 'success', msg: 'Terima kasih telah berlangganan newsletter kami!' })
                setEmail('')
            } else {
                setStatus({ type: 'info', msg: data.message || 'Email Anda sudah terdaftar dalam newsletter.' })
            }
        } catch {
            setStatus({ type: 'error', msg: 'Terjadi kesalahan jaringan saat mendaftar.' })
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <>
            <section className="subscribe-section bg-grey-2">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="subscribe-content">
                                <h3 className="title">
                                    {settings.about_newsletter_title || "Dapatkan berita dan analisis terhangat langsung di email Anda!"}
                                </h3>
                                <form onSubmit={handleSubmit} className="subscribe-form">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Masukkan alamat email Anda..."
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <button id="submit" className="default-btn" type="submit" disabled={submitting}>
                                        <i className="lab la-telegram-plane" />
                                        {submitting ? "Memproses..." : "Langganan"}
                                    </button>
                                    <div className="form-icon">
                                        <i className="las la-envelope" />
                                    </div>
                                </form>
                                {status && (
                                    <div className={`mt-2 font-weight-bold ${status.type === 'success' ? 'text-success' : status.type === 'error' ? 'text-danger' : 'text-primary'}`} style={{ fontSize: '13.5px', marginTop: '10px' }}>
                                        {status.msg}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="col-lg-6 text-center">
                            <div className="subscribe-thumb">
                                <div className="line" />
                                <img src="/assets/img/images/subscribe-img.png" alt="Langganan newsletter" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
