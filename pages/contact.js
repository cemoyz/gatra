import Layout from "@/components/posty/layout/Layout"
import Link from "next/link"
import Head from "next/head"
import { useState } from "react"
import prisma from "@/lib/prisma"

export default function Contact({ settings = {} }) {
    const siteTitle = settings.site_title || "Gatra Portal"
    const contactEmail = settings.contact_email_1 || settings.contact_email || "redaksi@gatra.com"
    const contactPhone = settings.contact_phone_1 || settings.contact_phone || "+62 21 555 7890"
    const contactAddress = settings.contact_address_1 || "Jl. Pegangsaan Timur No. 56, Jakarta Pusat, DKI Jakarta"

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    })
    const [submitting, setSubmitting] = useState(false)
    const [alert, setAlert] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
            setAlert({ type: "error", msg: "Nama lengkap, email, dan pesan wajib diisi." })
            return
        }

        setSubmitting(true)
        setAlert(null)
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })
            const data = await res.json()
            if (data.success) {
                setAlert({ type: "success", msg: "Terima kasih! Pesan Anda telah terkirim kepada redaksi." })
                setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
            } else {
                setAlert({ type: "error", msg: data.message || "Gagal mengirim pesan." })
            }
        } catch {
            setAlert({ type: "error", msg: "Terjadi kesalahan jaringan saat mengirim pesan." })
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Hubungi Kami" settings={settings}>
            <Head>
                <title>Hubungi Kami - {siteTitle}</title>
            </Head>

            <section className="contact-section padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="contact-content">
                                <div className="contact-left mb-40">
                                    <div className="adress-wrap">
                                        <div className="adress-box mb-30">
                                            <h3 className="title">Alamat Kantor Redaksi</h3>
                                            <ul className="adress-list">
                                                <li>
                                                    <i className="las la-map-marker" style={{ color: "#004CFF" }} />
                                                    <span>{contactAddress}</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="adress-box">
                                            <h3 className="title">Informasi Kontak</h3>
                                            <ul className="adress-list list-2">
                                                <li>
                                                    <i className="las la-mobile" style={{ color: "#004CFF" }} />
                                                    <span>Telepon / WhatsApp: </span>
                                                    <Link href={`tel:${contactPhone}`}>{contactPhone}</Link>
                                                </li>
                                                <li>
                                                    <i className="las la-envelope" style={{ color: "#004CFF" }} />
                                                    <span>Email Redaksi: </span>
                                                    <Link href={`mailto:${contactEmail}`}>{contactEmail}</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="contact-form-wrap">
                                    <h3 className="title">Kirim Pesan ke Redaksi</h3>
                                    <p>
                                        Punya informasi berita, siaran pers, hak jawab, atau pertanyaan seputar periklanan? Silakan kirimkan melalui formulir di bawah ini.
                                    </p>

                                    {alert && (
                                        <div className={`alert ${alert.type === "success" ? "alert-success" : "alert-danger"} my-3`}>
                                            {alert.msg}
                                        </div>
                                    )}

                                    <div className="contact-form">
                                        <form onSubmit={handleSubmit} className="form-horizontal">
                                            <div className="form-group row mb-3">
                                                <div className="col-sm-6 mb-3 mb-sm-0">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Nama Lengkap *"
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-sm-6">
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        placeholder="Alamat Email *"
                                                        value={formData.email}
                                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row mb-3">
                                                <div className="col-sm-6 mb-3 mb-sm-0">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Nomor Telepon / WhatsApp"
                                                        value={formData.phone}
                                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    />
                                                </div>
                                                <div className="col-sm-6">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Subjek / Topik Pesan"
                                                        value={formData.subject}
                                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row mb-3">
                                                <div className="col-md-12">
                                                    <textarea
                                                        rows={5}
                                                        className="form-control"
                                                        placeholder="Tuliskan pesan Anda di sini *"
                                                        value={formData.message}
                                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <button className="default-btn" type="submit" disabled={submitting}>
                                                {submitting ? "Mengirim..." : "Kirim Pesan"}
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 mt-4 mt-lg-0">
                            <div className="map-wrapper" style={{ borderRadius: "10px", overflow: "hidden", height: "100%", minHeight: "500px" }}>
                                <iframe
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, minHeight: "500px" }}
                                    loading="lazy"
                                    allowFullScreen
                                    src="https://maps.google.com/maps?width=100%25&height=600&hl=id&q=Jakarta,%20Indonesia&t=&z=13&ie=UTF8&iwloc=B&output=embed"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export async function getServerSideProps() {
    try {
        const settingsRecords = await prisma.setting.findMany()
        const settings = {}
        settingsRecords.forEach((item) => {
            settings[item.key] = item.value
        })
        return { props: { settings } }
    } catch {
        return { props: { settings: {} } }
    }
}
