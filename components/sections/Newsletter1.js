import React, { useState } from 'react'

export default function Newsletter1() {
    const [email, setEmail] = useState('')
    const [subscribed, setSubscribed] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!email.trim() || loading) return
        setLoading(true)
        try {
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email.trim(), topics: ['Weekly News'], frequency: 'weekly' })
            })
            const data = await res.json()
            if (data.success) {
                setSubscribed(true)
                setEmail('')
                setTimeout(() => setSubscribed(false), 5000)
            } else {
                alert(data.message || 'Gagal berlangganan')
            }
        } catch (err) {
            console.error('Subscription error:', err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="ta-newsletter-area">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="ta-newsletter-wrapper dark-bg pt-100 pb-100">
                                <div className="row">
                                    <div className="col-xl-5 offset-xl-1">
                                        <div className="ta-section-heading">
                                            <img src="/assets/img/logo/logo-white.webp" alt="" />
                                            <h2 className="ta-title mt-50">Dapatkan Pembaruan Berita Setiap Minggu</h2>
                                            <p>Berlangganan buletin kabar terbaru dari Dua Narasi langsung di inbox email Anda.</p>
                                        </div>
                                        <div className="ta-newsletter-form ta-input-field mt-40">
                                            {subscribed ? (
                                                <div style={{ background: '#dcfce7', border: '1px solid #86efac', padding: '14px 20px', borderRadius: '8px', color: '#166534', fontWeight: 600 }}>
                                                    <i className="fa fa-check-circle" style={{ marginRight: '8px' }} />
                                                    Terima kasih! Anda telah berhasil berlangganan newsletter Dua Narasi.
                                                </div>
                                            ) : (
                                                <form onSubmit={handleSubmit}>
                                                    <div>
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            id="email"
                                                            placeholder="Email bisnis atau pribadi Anda"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            required
                                                        />
                                                        <i className="fa fa-envelope-open" />
                                                        <button className="ta-button" type="submit" disabled={loading}>
                                                            {loading ? 'Memproses...' : 'Subscribe'} <i className="fa fa-paper-plane" />
                                                        </button>
                                                    </div>
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
        </>
    )
}
