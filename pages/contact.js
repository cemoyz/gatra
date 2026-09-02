import Layout from "@/components/layout/Layout"
import Link from "next/link"
import SocialLinks from "@/components/elements/SocialLinks"
import { useEffect, useState } from "react"

export default function Contact() {
    const [settings, setSettings] = useState({
        contact_title: 'Catch Us Here',
        contact_subtitle: 'Data visualizations are everywhere; from the news to the nutritional info on cereal boxes',
        contact_branch_1: 'Jakarta / New York',
        contact_email_1: 'info@hoom-magazine.com',
        contact_phone_1: '+62 21 555 7890',
        contact_address_1: '12/A, Dumb Tower, NYC',
        contact_branch_2: 'London',
        contact_email_2: 'support@hoom-magazine.com',
        contact_phone_2: '+44 20 7946 0912',
        contact_address_2: '12/A, Booston Studio, UK',
        contact_map_url: 'https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d56215.718841453985!2d-0.19959027821222705!3d51.48739183082915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1slondon%20eye!5e0!3m2!1sen!2sbd!4v1656749326947!5m2!1sen!2sbd'
    })

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    })
    const [submitting, setSubmitting] = useState(false)
    const [alert, setAlert] = useState(null)

    useEffect(() => {
        fetch('/api/settings')
            .then(res => res.json())
            .then(data => {
                if (data.success && data.settings) {
                    setSettings(prev => ({
                        ...prev,
                        ...data.settings
                    }))
                }
            })
            .catch(console.error)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
            setAlert({ type: 'error', msg: 'Nama lengkap, email, dan pesan wajib diisi.' })
            return
        }

        setSubmitting(true)
        setAlert(null)
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            const data = await res.json()
            if (data.success) {
                setAlert({ type: 'success', msg: data.message || 'Pesan Anda telah berhasil dikirim!' })
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: ''
                })
            } else {
                setAlert({ type: 'error', msg: data.message || 'Gagal mengirim pesan. Silakan coba lagi.' })
            }
        } catch (err) {
            setAlert({ type: 'error', msg: 'Terjadi gangguan jaringan saat mengirim pesan.' })
        } finally {
            setSubmitting(false)
        }
    }

    const defaultMap = 'https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d56215.718841453985!2d-0.19959027821222705!3d51.48739183082915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1slondon%20eye!5e0!3m2!1sen!2sbd!4v1656749326947!5m2!1sen!2sbd'

    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Contact Us">
            <div>
                {/* Dynamic Google Maps Area */}
                <div className="ta-map-section pb-100 pt-70">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
                                    <iframe
                                        src={settings.contact_map_url || defaultMap}
                                        style={{ width: '100%', height: '420px', border: 0 }}
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Info & Form Area */}
                <div className="ta-contactinfo-section pb-100">
                    <div className="container">
                        <div className="row">
                            {/* Left Column: Dynamic Contact Info */}
                            <div className="col-xl-5 col-lg-5">
                                <div className="ta-section-heading mb-35">
                                    <h2 className="ta-title ta-title--mid">
                                        {settings.contact_title || 'Catch Us Here'}
                                    </h2>
                                    <p style={{ color: '#64748b', fontSize: '15px', lineHeight: '1.7', marginTop: '10px' }}>
                                        {settings.contact_subtitle || 'Data visualizations are everywhere; from the news to the nutritional info on cereal boxes.'}
                                    </p>
                                </div>

                                <div className="ta-info-lists-wrapper">
                                    {/* Branch 1 */}
                                    <div className="ta-info-lists mb-30" style={{ background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                        <h4 className="ta-title" style={{ fontSize: '18px', color: '#1e293b', marginBottom: '14px' }}>
                                            {settings.contact_branch_1 || 'New York'}
                                        </h4>
                                        <ul className="list-unstyled" style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: 0 }}>
                                            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <i className="far fa-envelope-open" style={{ color: '#3b82f6', width: '20px' }} />
                                                <Link href={`mailto:${settings.contact_email_1 || 'info@webmail.com'}`} style={{ color: '#334155', fontWeight: 500 }}>
                                                    {settings.contact_email_1 || 'info@webmail.com'}
                                                </Link>
                                            </li>
                                            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <i className="far fa-phone" style={{ color: '#10b981', width: '20px' }} />
                                                <Link href={`tel:${settings.contact_phone_1 || '+99988877766'}`} style={{ color: '#334155', fontWeight: 500 }}>
                                                    {settings.contact_phone_1 || '+999 888 777 66'}
                                                </Link>
                                            </li>
                                            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                                                <i className="far fa-map-marker-alt" style={{ color: '#f59e0b', width: '20px', marginTop: '4px' }} />
                                                <p style={{ margin: 0, color: '#64748b' }}>
                                                    {settings.contact_address_1 || '12/A, Dumb Tower, NYC'}
                                                </p>
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Branch 2 */}
                                    {settings.contact_branch_2 && (
                                        <div className="ta-info-lists mb-30" style={{ background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                            <h4 className="ta-title" style={{ fontSize: '18px', color: '#1e293b', marginBottom: '14px' }}>
                                                {settings.contact_branch_2}
                                            </h4>
                                            <ul className="list-unstyled" style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: 0 }}>
                                                {settings.contact_email_2 && (
                                                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                        <i className="far fa-envelope-open" style={{ color: '#3b82f6', width: '20px' }} />
                                                        <Link href={`mailto:${settings.contact_email_2}`} style={{ color: '#334155', fontWeight: 500 }}>
                                                            {settings.contact_email_2}
                                                        </Link>
                                                    </li>
                                                )}
                                                {settings.contact_phone_2 && (
                                                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                        <i className="far fa-phone" style={{ color: '#10b981', width: '20px' }} />
                                                        <Link href={`tel:${settings.contact_phone_2}`} style={{ color: '#334155', fontWeight: 500 }}>
                                                            {settings.contact_phone_2}
                                                        </Link>
                                                    </li>
                                                )}
                                                {settings.contact_address_2 && (
                                                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                                                        <i className="far fa-map-marker-alt" style={{ color: '#f59e0b', width: '20px', marginTop: '4px' }} />
                                                        <p style={{ margin: 0, color: '#64748b' }}>
                                                            {settings.contact_address_2}
                                                        </p>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    )}
                                </div>

                                {/* Dynamic Social Media */}
                                <div className="mt-30">
                                    <h5 style={{ fontSize: '14px', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '12px', fontWeight: 700 }}>
                                        Follow Our Channels
                                    </h5>
                                    <SocialLinks />
                                </div>
                            </div>

                            {/* Right Column: Dynamic Contact Message Form */}
                            <div className="col-xl-7 col-lg-7">
                                <div className="ta-contact-form-wrapper ta-input-field ta-stroke" style={{ background: '#ffffff', padding: '40px', borderRadius: '16px' }}>
                                    <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px', color: '#0f172a' }}>
                                        {settings.contact_form_title || 'Kirim Pesan Langsung'}
                                    </h3>
                                    <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>
                                        {settings.contact_form_subtitle || 'Isi formulir di bawah ini untuk mengirimkan pertanyaan atau kerja sama langsung ke kotak masuk tim kami.'}
                                    </p>

                                    {alert && (
                                        <div
                                          style={{
                                            padding: '14px 18px',
                                            borderRadius: '8px',
                                            marginBottom: '20px',
                                            fontSize: '14px',
                                            fontWeight: 600,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px',
                                            background: alert.type === 'success' ? '#ecfdf5' : '#fef2f2',
                                            color: alert.type === 'success' ? '#065f46' : '#991b1b',
                                            border: alert.type === 'success' ? '1px solid #a7f3d0' : '1px solid #fecaca'
                                          }}
                                        >
                                          <i className={`fa ${alert.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
                                          <span>{alert.msg}</span>
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit} className="ta-contact-form">
                                        <div className="row row-gap-20 mt-none-20">
                                            {/* Name */}
                                            <div className="col-md-6 mt-20">
                                                <div className="ta-form-group">
                                                    <span className="icon"><i className="fa fa-user" /></span>
                                                    <input
                                                        name="name"
                                                        type="text"
                                                        required
                                                        placeholder="Full Name *"
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    />
                                                </div>
                                            </div>

                                            {/* Email */}
                                            <div className="col-md-6 mt-20">
                                                <div className="ta-form-group">
                                                    <span className="icon"><i className="fa fa-envelope-open" /></span>
                                                    <input
                                                        name="email"
                                                        type="email"
                                                        required
                                                        placeholder="Your Email *"
                                                        value={formData.email}
                                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    />
                                                </div>
                                            </div>

                                            {/* Phone */}
                                            <div className="col-md-6 mt-20">
                                                <div className="ta-form-group">
                                                    <span className="icon"><i className="fa fa-phone" /></span>
                                                    <input
                                                        name="phone"
                                                        type="tel"
                                                        placeholder="Phone Number (Optional)"
                                                        value={formData.phone}
                                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    />
                                                </div>
                                            </div>

                                            {/* Subject */}
                                            <div className="col-md-6 mt-20">
                                                <div className="ta-form-group">
                                                    <span className="icon"><i className="fa fa-tag" /></span>
                                                    <input
                                                        name="subject"
                                                        type="text"
                                                        placeholder="Subject / Topic"
                                                        value={formData.subject}
                                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                    />
                                                </div>
                                            </div>

                                            {/* Message */}
                                            <div className="col-md-12 mt-20">
                                                <div className="ta-form-group">
                                                    <span className="icon"><i className="fa fa-pencil" /></span>
                                                    <textarea
                                                        name="message"
                                                        id="message"
                                                        required
                                                        rows="5"
                                                        placeholder="Write your message here *"
                                                        value={formData.message}
                                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                    />
                                                </div>
                                            </div>

                                            {/* Submit Button */}
                                            <div className="col-md-12 mt-20">
                                                <div className="ta-form-group">
                                                    <button
                                                        type="submit"
                                                        disabled={submitting}
                                                        className="ta-button"
                                                        style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}
                                                    >
                                                        {submitting ? (
                                                            <>
                                                                <i className="fa fa-spinner fa-spin" />
                                                                <span>Sending Message...</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <span>Submit Request</span>
                                                                <i className="fal fa-long-arrow-right" />
                                                            </>
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}