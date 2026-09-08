import Layout from "@/components/layout/Layout"
import Link from "next/link"
import Head from "next/head"
import { useState, useEffect } from "react"

const defaultTopics = [
    { id: 'Politik', label: 'Politik & Kebijakan', icon: 'fa-balance-scale' },
    { id: 'Teknologi', label: 'Teknologi & Digital', icon: 'fa-microchip' },
    { id: 'Bisnis', label: 'Bisnis & Ekonomi', icon: 'fa-line-chart' },
    { id: 'Opini', label: 'Opini & Kolom Redaksi', icon: 'fa-pencil-square-o' },
    { id: 'Gaya Hidup', label: 'Gaya Hidup & Budaya', icon: 'fa-coffee' },
    { id: 'Olahraga', label: 'Olahraga & Kesehatan', icon: 'fa-trophy' },
]

const getTopicIcon = (name = '') => {
    const n = name.toLowerCase()
    if (n.includes('tekno') || n.includes('ai') || n.includes('tech')) return 'fa-microchip'
    if (n.includes('politik') || n.includes('hukum')) return 'fa-balance-scale'
    if (n.includes('bisnis') || n.includes('ekonomi') || n.includes('finan')) return 'fa-line-chart'
    if (n.includes('opini') || n.includes('kolom')) return 'fa-pencil-square-o'
    if (n.includes('gaya') || n.includes('hiburan') || n.includes('kuliner')) return 'fa-coffee'
    if (n.includes('sains') || n.includes('lingkungan')) return 'fa-globe'
    if (n.includes('olahraga') || n.includes('sport')) return 'fa-trophy'
    return 'fa-newspaper-o'
}

export default function SubscribePage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [frequency, setFrequency] = useState('weekly')
    const [topics, setTopics] = useState(defaultTopics)
    const [selectedTopics, setSelectedTopics] = useState(['Politik', 'Teknologi', 'Bisnis'])
    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [alert, setAlert] = useState(null)
    const [openFaq, setOpenFaq] = useState(null)

    useEffect(() => {
        fetch('/api/categories')
            .then(res => res.json())
            .then(data => {
                if (data.success && Array.isArray(data.categories) && data.categories.length > 0) {
                    const fetchedTopics = data.categories.map(cat => ({
                        id: cat.name,
                        label: cat.name,
                        icon: getTopicIcon(cat.name)
                    }))
                    setTopics(fetchedTopics)
                    setSelectedTopics(fetchedTopics.slice(0, 4).map(t => t.id))
                }
            })
            .catch(console.error)
    }, [])

    const toggleTopic = (id) => {
        if (selectedTopics.includes(id)) {
            if (selectedTopics.length > 1) {
                setSelectedTopics(selectedTopics.filter(t => t !== id))
            }
        } else {
            setSelectedTopics([...selectedTopics, id])
        }
    }

    const handleSubscribe = async (e) => {
        e.preventDefault()
        if (!email.trim() || !email.includes('@')) {
            setAlert({ type: 'error', msg: 'Mohon masukkan alamat email yang valid.' })
            return
        }

        setSubmitting(true)
        setAlert(null)

        try {
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    email,
                    frequency,
                    topics: selectedTopics
                })
            })
            const data = await res.json()

            if (data.success) {
                setSubmitted(true)
                setAlert({ type: 'success', msg: data.message })
            } else {
                setAlert({ type: 'error', msg: data.message || 'Gagal memproses langganan' })
            }
        } catch (err) {
            setAlert({ type: 'error', msg: 'Terjadi gangguan jaringan saat mengirim data.' })
        } finally {
            setSubmitting(false)
        }
    }

    const faqs = [
        {
            q: "Apakah langganan newsletter Dua Narasi gratis?",
            a: "Ya! Edisi newsletter mingguan dan kurasi berita harian kami 100% gratis. Anda akan mendapatkan ringkasan artikel terbaik langsung di kotak masuk email Anda."
        },
        {
            q: "Berapa sering saya akan menerima email?",
            a: "Anda dapat memilih frekuensi pengiriman sesuai preferensi: 'Edisi Mingguan' (setiap Sabtu pagi) atau 'Ringkasan Harian' (setiap hari pukul 07:00 WIB)."
        },
        {
            q: "Bagaimana jika saya ingin berhenti berlangganan (unsubscribe)?",
            a: "Setiap email yang kami kirimkan memiliki tautan 'Unsubscribe' di bagian footer. Anda dapat membatalkan langganan kapan saja hanya dengan satu kali klik tanpa syarat."
        },
        {
            q: "Apakah data email dan privasi saya aman?",
            a: "Kami menjamin kerahasiaan data pembaca kami. Email Anda tidak akan pernah dijual, dibagikan ke pihak ketiga, atau digunakan untuk spam."
        }
    ]

    return (
        <Layout headerStyle={1} footerStyle={1}>
            <Head>
                <title>Langganan Newsletter & Akses Redaksi &bull; Dua Narasi</title>
                <meta name="description" content="Berlangganan newsletter Dua Narasi untuk mendapatkan kurasi liputan mendalam, opini redaksi, dan analisis berita terkini langsung ke email Anda." />
            </Head>

            {/* Breadcrumb Header */}
            <div className="breadcrumb-area" style={{ background: '#0f172a', padding: '50px 0 40px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12 text-center">
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(218, 1, 5, 0.15)', color: '#da0105', padding: '6px 16px', borderRadius: '9999px', fontSize: '13px', fontWeight: 700, marginBottom: '16px', border: '1px solid rgba(218, 1, 5, 0.3)' }}>
                                <i className="fa fa-envelope-open-o"></i> Dua Narasi Dispatch & Newsletter
                            </div>
                            <h1 style={{ color: '#ffffff', fontSize: '38px', fontWeight: 800, marginBottom: '14px', letterSpacing: '-0.5px' }}>
                                Berlangganan & Akses Jurnalisme Berkualitas
                            </h1>
                            <p style={{ color: '#94a3b8', fontSize: '16px', maxWidth: '640px', margin: '0 auto' }}>
                                Dapatkan analisis mendalam, perspektif berimbang, dan kurasi berita penting langsung ke kotak masuk email Anda setiap minggu.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <section style={{ padding: '60px 0 80px', background: '#f8fafc' }}>
                <div className="container">
                    <div className="row g-5">

                        {/* Form Column */}
                        <div className="col-lg-7">
                            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '40px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>

                                {submitted ? (
                                    <div style={{ textAlign: 'center', padding: '40px 10px' }}>
                                        <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', margin: '0 auto 20px' }}>
                                            <i className="fa fa-check"></i>
                                        </div>
                                        <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>
                                            Terima Kasih Telah Berlangganan!
                                        </h3>
                                        <p style={{ color: '#64748b', fontSize: '15px', lineHeight: 1.6, maxWidth: '440px', margin: '0 auto 24px' }}>
                                            Kami telah mengirimkan email konfirmasi ke <strong>{email}</strong>. Bersiaplah untuk menerima kurasi berita terbaik dari redaksi Dua Narasi.
                                        </p>
                                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                                            <Link href="/" className="ta-button" style={{ textDecoration: 'none' }}>
                                                <i className="fa fa-home"></i> Kembali ke Beranda
                                            </Link>
                                            <button
                                                onClick={() => { setSubmitted(false); setEmail(''); setName('') }}
                                                className="ta-button"
                                                style={{ background: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1' }}
                                            >
                                                Daftarkan Email Lain
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubscribe}>
                                        <div style={{ marginBottom: '24px' }}>
                                            <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
                                                Gabung Bersama Para Pembaca Cerdas
                                            </h3>
                                            <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
                                                Pilih topik yang Anda minati dan kami akan sesuaikan isi buletin Anda.
                                            </p>
                                        </div>

                                        {alert && (
                                            <div style={{
                                                padding: '12px 16px',
                                                borderRadius: '10px',
                                                marginBottom: '20px',
                                                fontSize: '14px',
                                                fontWeight: 500,
                                                background: alert.type === 'success' ? '#dcfce7' : '#fee2e2',
                                                color: alert.type === 'success' ? '#166534' : '#991b1b',
                                                border: `1px solid ${alert.type === 'success' ? '#bbf7d0' : '#fecaca'}`
                                            }}>
                                                <i className={`fa ${alert.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`} style={{ marginRight: '8px' }}></i>
                                                {alert.msg}
                                            </div>
                                        )}

                                        {/* Input Name & Email */}
                                        <div className="row g-3 mb-4">
                                            <div className="col-md-6">
                                                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>
                                                    Nama Lengkap (Opsional)
                                                </label>
                                                <input
                                                    type="text"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    placeholder="Contoh: Rian Pratama"
                                                    style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '14px', outline: 'none' }}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>
                                                    Alamat Email <span style={{ color: '#da0105' }}>*</span>
                                                </label>
                                                <input
                                                    type="email"
                                                    required
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="nama@email.com"
                                                    style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '14px', outline: 'none' }}
                                                />
                                            </div>
                                        </div>

                                        {/* Topics Selector */}
                                        <div style={{ marginBottom: '28px' }}>
                                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '10px' }}>
                                                Pilih Topik Liputan yang Anda Sukai:
                                            </label>
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '10px' }}>
                                                {topics.map((t) => {
                                                    const isChecked = selectedTopics.includes(t.id)
                                                    return (
                                                        <div
                                                            key={t.id}
                                                            onClick={() => toggleTopic(t.id)}
                                                            style={{
                                                                padding: '10px 14px',
                                                                borderRadius: '10px',
                                                                border: isChecked ? '1.5px solid #da0105' : '1.5px solid #e2e8f0',
                                                                background: isChecked ? 'rgba(218, 1, 5, 0.04)' : '#ffffff',
                                                                color: isChecked ? '#da0105' : '#475569',
                                                                cursor: 'pointer',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '10px',
                                                                fontSize: '13px',
                                                                fontWeight: isChecked ? 700 : 500,
                                                                transition: 'all 0.15s ease'
                                                            }}
                                                        >
                                                            <i className={`fa ${t.icon}`} style={{ fontSize: '14px' }}></i>
                                                            <span>{t.label}</span>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>

                                        {/* Frequency Options */}
                                        <div style={{ marginBottom: '28px' }}>
                                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '10px' }}>
                                                Frekuensi Pengiriman Email:
                                            </label>
                                            <div style={{ display: 'flex', gap: '12px' }}>
                                                <label style={{
                                                    flex: 1,
                                                    padding: '12px 16px',
                                                    borderRadius: '10px',
                                                    border: frequency === 'weekly' ? '1.5px solid #da0105' : '1.5px solid #e2e8f0',
                                                    background: frequency === 'weekly' ? 'rgba(218, 1, 5, 0.04)' : '#ffffff',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'flex-start',
                                                    gap: '10px'
                                                }}>
                                                    <input
                                                        type="radio"
                                                        name="freq"
                                                        checked={frequency === 'weekly'}
                                                        onChange={() => setFrequency('weekly')}
                                                        style={{ marginTop: '3px', accentColor: '#da0105' }}
                                                    />
                                                    <div>
                                                        <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0f172a' }}>Edisi Mingguan (Disarankan)</div>
                                                        <div style={{ fontSize: '12px', color: '#64748b' }}>1x seminggu setiap Sabtu pagi</div>
                                                    </div>
                                                </label>

                                                <label style={{
                                                    flex: 1,
                                                    padding: '12px 16px',
                                                    borderRadius: '10px',
                                                    border: frequency === 'daily' ? '1.5px solid #da0105' : '1.5px solid #e2e8f0',
                                                    background: frequency === 'daily' ? 'rgba(218, 1, 5, 0.04)' : '#ffffff',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'flex-start',
                                                    gap: '10px'
                                                }}>
                                                    <input
                                                        type="radio"
                                                        name="freq"
                                                        checked={frequency === 'daily'}
                                                        onChange={() => setFrequency('daily')}
                                                        style={{ marginTop: '3px', accentColor: '#da0105' }}
                                                    />
                                                    <div>
                                                        <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0f172a' }}>Ringkasan Harian</div>
                                                        <div style={{ fontSize: '12px', color: '#64748b' }}>Setiap pagi pukul 07:00 WIB</div>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="ta-button"
                                            style={{
                                                width: '100%',
                                                padding: '14px',
                                                fontSize: '15px',
                                                fontWeight: 800,
                                                borderRadius: '10px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '8px'
                                            }}
                                        >
                                            {submitting ? (
                                                <>
                                                    <i className="fa fa-spinner fa-spin"></i>
                                                    <span>Memproses Pendaftaran...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <i className="fa fa-paper-plane"></i>
                                                    <span>Daftar Berlangganan Sekarang</span>
                                                </>
                                            )}
                                        </button>

                                        <p style={{ fontSize: '12px', color: '#94a3b8', textAlign: 'center', marginTop: '14px', marginBottom: 0 }}>
                                            <i className="fa fa-shield"></i> Bebas spam. Anda dapat berhenti berlangganan kapan saja dengan 1-klik.
                                        </p>
                                    </form>
                                )}
                            </div>
                        </div>

                        {/* Benefits & Perks Column */}
                        <div className="col-lg-5">
                            <div style={{ background: '#0f172a', borderRadius: '20px', padding: '36px', color: '#ffffff', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <div>
                                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(218, 1, 5, 0.2)', color: '#ff4d4f', padding: '4px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '16px' }}>
                                        <i className="fa fa-star"></i> Manfaat Pembaca
                                    </div>
                                    <h3 style={{ color: '#ffffff', fontSize: '24px', fontWeight: 800, marginBottom: '20px' }}>
                                        Kenapa Harus Berlangganan Dua Narasi?
                                    </h3>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                                        <div style={{ display: 'flex', gap: '14px' }}>
                                            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255,255,255,0.08)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                <i className="fa fa-check"></i>
                                            </div>
                                            <div>
                                                <h5 style={{ color: '#f8fafc', fontSize: '15px', fontWeight: 700, margin: '0 0 4px' }}>Liputan Eksklusif Tanpa Clickbait</h5>
                                                <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0, lineHeight: 1.5 }}>Artikel riset, wawancara mendalam, dan fakta terverifikasi dari para jurnalis berpengalaman.</p>
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', gap: '14px' }}>
                                            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255,255,255,0.08)', color: '#38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                <i className="fa fa-bolt"></i>
                                            </div>
                                            <div>
                                                <h5 style={{ color: '#f8fafc', fontSize: '15px', fontWeight: 700, margin: '0 0 4px' }}>Hemat Waktu & Padat Informasi</h5>
                                                <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0, lineHeight: 1.5 }}>Hanya butuh 5 menit untuk membaca ringkasan berita penting sepekan.</p>
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', gap: '14px' }}>
                                            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255,255,255,0.08)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                <i className="fa fa-users"></i>
                                            </div>
                                            <div>
                                                <h5 style={{ color: '#f8fafc', fontSize: '15px', fontWeight: 700, margin: '0 0 4px' }}>Akses Komunitas & Diskusi Redaksi</h5>
                                                <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0, lineHeight: 1.5 }}>Berikan tanggapan langsung kepada penulis dan ikut dalam polling mingguan.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ marginTop: '30px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div>
                                            <div style={{ fontSize: '12px', color: '#94a3b8' }}>Ingin berkontribusi sebagai penulis?</div>
                                            <div style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff' }}>Gabung dengan Tim Penulis Kami</div>
                                        </div>
                                        <Link href="/contact" className="ta-button" style={{ padding: '8px 16px', fontSize: '13px', textDecoration: 'none' }}>
                                            Hubungi Redaksi
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* FAQ Accordion Section */}
                    <div className="row justify-content-center" style={{ marginTop: '70px' }}>
                        <div className="col-lg-8">
                            <div style={{ textAlign: 'center', marginBottom: '36px' }}>
                                <h3 style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                                    Pertanyaan yang Sering Diajukan (FAQ)
                                </h3>
                                <p style={{ color: '#64748b', fontSize: '14.5px' }}>
                                    Hal-hal penting seputar langganan buletin berita Dua Narasi.
                                </p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {faqs.map((faq, idx) => {
                                    const isOpen = openFaq === idx
                                    return (
                                        <div
                                            key={idx}
                                            style={{
                                                background: '#ffffff',
                                                borderRadius: '14px',
                                                border: '1px solid #e2e8f0',
                                                overflow: 'hidden',
                                                boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                                            }}
                                        >
                                            <div
                                                onClick={() => setOpenFaq(isOpen ? null : idx)}
                                                style={{
                                                    padding: '18px 22px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    cursor: 'pointer',
                                                    userSelect: 'none'
                                                }}
                                            >
                                                <span style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>{faq.q}</span>
                                                <i className={`fa ${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`} style={{ color: '#94a3b8', fontSize: '12px' }}></i>
                                            </div>
                                            {isOpen && (
                                                <div style={{ padding: '0 22px 18px', color: '#64748b', fontSize: '14px', lineHeight: 1.6, borderTop: '1px solid #f1f5f9', paddingTop: '14px' }}>
                                                    {faq.a}
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </Layout>
    )
}
