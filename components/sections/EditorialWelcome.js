import React, { useState } from 'react'
import Link from 'next/link'
import SocialLinks from '@/components/elements/SocialLinks'

export default function EditorialWelcome({ settings = {} }) {
    const [email, setEmail] = useState('')
    const [subscribed, setSubscribed] = useState(false)
    const [loading, setLoading] = useState(false)

    const siteTitle = settings.site_title || 'Dua Narasi'
    const siteTagline = settings.site_tagline || 'Menyuarakan Dua Sisi, Mengawal Kebenaran'

    const handleSubscribe = async (e) => {
        e.preventDefault()
        if (!email.trim() || loading) return
        setLoading(true)
        try {
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email.trim(), topics: ['Semua Topik'] })
            })
            const data = await res.json()
            if (data.success) {
                setSubscribed(true)
                setEmail('')
            }
        } catch (err) {
            console.error('Subscribe error:', err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="editorial-welcome-section py-5" style={{ minHeight: '75vh', display: 'flex', alignItems: 'center', background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)' }}>
            <div className="container">
                <div className="row justify-content-center text-center">
                    <div className="col-lg-10 col-xl-9">
                        
                        {/* Live Status Badge */}
                        <div className="d-inline-flex align-items-center mb-4 px-3 py-2 rounded-pill shadow-sm" style={{ background: '#ffffff', border: '1px solid #e2e8f0', gap: '8px' }}>
                            <span className="live-indicator-dot" style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444', display: 'inline-block', boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.2)' }} />
                            <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                                Portal Redaksi • {siteTitle}
                            </span>
                        </div>

                        {/* Main Title */}
                        <h1 className="display-4 fw-bold mb-3" style={{ color: '#0f172a', fontWeight: 800, lineHeight: 1.25, letterSpacing: '-0.5px' }}>
                            {siteTagline}
                        </h1>

                        {/* Editorial Subtitle */}
                        <p className="lead mx-auto mb-5" style={{ maxWidth: '720px', color: '#475569', fontSize: '18px', lineHeight: 1.7 }}>
                            Selamat datang di portal resmi <strong>{siteTitle}</strong>. Redaksi kami saat ini tengah menyusun artikel pilihan, liputan mendalam, dan analisis berimbang. Nantikan rilis berita perdana kami dalam waktu dekat.
                        </p>

                        {/* 3 Editorial Pillars Cards */}
                        <div className="row g-4 mb-5 text-start">
                            <div className="col-md-4">
                                <div className="p-4 rounded-4 h-100 shadow-sm" style={{ background: '#ffffff', border: '1px solid #e2e8f0', transition: 'transform 0.2s ease' }}>
                                    <div className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3" style={{ width: '48px', height: '48px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', fontSize: '20px' }}>
                                        <i className="fa fa-newspaper-o" />
                                    </div>
                                    <h5 className="fw-bold mb-2" style={{ color: '#0f172a', fontSize: '16px' }}>Liputan Berimbang</h5>
                                    <p className="mb-0 text-muted" style={{ fontSize: '13.5px', lineHeight: 1.6 }}>
                                        Mengulas fakta dari kedua sisi narasi secara objektif, proporsional, dan tanpa bias.
                                    </p>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="p-4 rounded-4 h-100 shadow-sm" style={{ background: '#ffffff', border: '1px solid #e2e8f0', transition: 'transform 0.2s ease' }}>
                                    <div className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3" style={{ width: '48px', height: '48px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', fontSize: '20px' }}>
                                        <i className="fa fa-bolt" />
                                    </div>
                                    <h5 className="fw-bold mb-2" style={{ color: '#0f172a', fontSize: '16px' }}>Terverifikasi & Akurat</h5>
                                    <p className="mb-0 text-muted" style={{ fontSize: '13.5px', lineHeight: 1.6 }}>
                                        Menjunjung standar verifikasi ketat sebelum setiap informasi dipublikasikan kepada publik.
                                    </p>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="p-4 rounded-4 h-100 shadow-sm" style={{ background: '#ffffff', border: '1px solid #e2e8f0', transition: 'transform 0.2s ease' }}>
                                    <div className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3" style={{ width: '48px', height: '48px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', fontSize: '20px' }}>
                                        <i className="fa fa-lightbulb-o" />
                                    </div>
                                    <h5 className="fw-bold mb-2" style={{ color: '#0f172a', fontSize: '16px' }}>Opini Mencerahkan</h5>
                                    <p className="mb-0 text-muted" style={{ fontSize: '13.5px', lineHeight: 1.6 }}>
                                        Ruang terbuka bagi gagasan intelektual, analisis pakar, dan pemikiran konstruktif.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Newsletter & Action Buttons Box */}
                        <div className="p-4 p-md-5 rounded-4 shadow-sm mx-auto" style={{ maxWidth: '680px', background: '#0f172a', color: '#ffffff' }}>
                            <h4 className="fw-bold mb-2" style={{ color: '#ffffff' }}>Dapatkan Kabar Terbitan Perdana</h4>
                            <p className="mb-4 text-slate-300" style={{ fontSize: '14px', color: '#94a3b8' }}>
                                Daftarkan email Anda agar menerima notifikasi saat artikel pertama resmi diterbitkan.
                            </p>

                            {subscribed ? (
                                <div className="alert alert-success d-flex align-items-center justify-content-center mb-0 py-3" style={{ borderRadius: '10px' }}>
                                    <i className="fa fa-check-circle me-2" style={{ marginRight: '8px' }} />
                                    <span>Terima kasih! Anda telah terdaftar sebagai pembaca perdana {siteTitle}.</span>
                                </div>
                            ) : (
                                <form onSubmit={handleSubscribe} className="d-flex flex-column flex-sm-row gap-2 justify-content-center">
                                    <input
                                        type="email"
                                        required
                                        placeholder="Ketik alamat email Anda..."
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="form-control"
                                        style={{ height: '48px', borderRadius: '8px', border: '1px solid #334155', background: '#1e293b', color: '#ffffff', fontSize: '14px', paddingLeft: '16px' }}
                                    />
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="btn btn-primary px-4 fw-bold"
                                        style={{ height: '48px', borderRadius: '8px', background: '#ef4444', borderColor: '#ef4444', minWidth: '150px' }}
                                    >
                                        {loading ? <i className="fa fa-spinner fa-spin" /> : 'Berlangganan'}
                                    </button>
                                </form>
                            )}

                            {/* Admin Quick Action Button */}
                            <div className="mt-4 pt-4 border-top" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                                <span style={{ fontSize: '13px', color: '#94a3b8', marginRight: '10px' }}>
                                    Anda Redaksi / Penulis?
                                </span>
                                <Link
                                    href="/dashboard/posts/new"
                                    className="d-inline-flex align-items-center px-3 py-1 rounded-pill"
                                    style={{ fontSize: '13px', fontWeight: 600, color: '#38bdf8', background: 'rgba(56, 189, 248, 0.1)', textDecoration: 'none', border: '1px solid rgba(56, 189, 248, 0.2)' }}
                                >
                                    <i className="fa fa-pencil-square-o" style={{ marginRight: '6px' }} /> Tulis Artikel Pertama di Dashboard &rarr;
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <style jsx>{`
                .editorial-welcome-section {
                    position: relative;
                    overflow: hidden;
                }
                @keyframes pulseDot {
                    0%, 100% {
                        opacity: 1;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 0.5;
                        transform: scale(1.1);
                    }
                }
                .live-indicator-dot {
                    animation: pulseDot 2s infinite ease-in-out;
                }
            `}</style>
        </section>
    )
}
