import Layout from "@/components/posty/layout/Layout"
import Link from "next/link"
import Head from "next/head"
import prisma from "@/lib/prisma"

export default function About({ settings = {} }) {
    const siteTitle = settings.site_title || "Gatra Portal"
    const siteTagline = settings.site_tagline || "Portal Berita Terkini, Akurat, dan Terpercaya"

    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Tentang Kami" settings={settings}>
            <Head>
                <title>Tentang Kami - {siteTitle}</title>
                <meta name="description" content={`Profil dan visi misi ${siteTitle}. ${siteTagline}`} />
            </Head>

            <section className="about-section padding">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="about-content">
                                <span className="text-primary fw-bold mb-2 d-inline-block" style={{ color: "#004CFF" }}>
                                    TENTANG MEDIA KAMI
                                </span>
                                <h2 className="title mb-3" style={{ fontSize: "36px", fontWeight: 700, lineHeight: 1.3 }}>
                                    Menghadirkan Informasi Akurat, Berimbang, dan Terpercaya
                                </h2>
                                <p className="mb-4" style={{ color: "#475569", lineHeight: 1.8 }}>
                                    {siteTitle} hadir sebagai platform media digital independen yang berdedikasi menyajikan berita terkini, analisis komprehensif, dan liputan mendalam dari berbagai sudut pandang. Kami menjunjung tinggi Kode Etik Jurnalistik dan prinsip keterbukaan informasi publik.
                                </p>
                                <div className="about-list-wrap mb-4">
                                    <ul className="about-list">
                                        <li><i className="las la-check-circle" style={{ color: "#004CFF" }} /> Verifikasi Fakta Berlapis</li>
                                        <li><i className="las la-check-circle" style={{ color: "#004CFF" }} /> Liputan Independen & Netral</li>
                                        <li><i className="las la-check-circle" style={{ color: "#004CFF" }} /> Kecepatan & Akurasi Informasi</li>
                                    </ul>
                                    <ul className="about-list">
                                        <li><i className="las la-check-circle" style={{ color: "#004CFF" }} /> Menjunjung Etika Pers</li>
                                        <li><i className="las la-check-circle" style={{ color: "#004CFF" }} /> Berpihak pada Kepentingan Publik</li>
                                        <li><i className="las la-check-circle" style={{ color: "#004CFF" }} /> Pembaruan Berita 24 Jam Nonstop</li>
                                    </ul>
                                </div>
                                <h3 className="about-year" style={{ color: "#004CFF" }}>
                                    Terpercaya & Kredibel
                                </h3>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="about-thumb">
                                <img
                                    src="/assets/img/images/about-img.jpg"
                                    alt="About Portal"
                                    style={{ borderRadius: "10px", width: "100%", objectFit: "cover" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="subscribe-section bg-grey-2">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="subscribe-content">
                                <h3 className="title">Dapatkan berita dan analisis terhangat langsung di email Anda!</h3>
                                <form action="/subscribe" className="subscribe-form">
                                    <input type="email" id="email" name="email" className="form-control" placeholder="Masukkan alamat email Anda..." required />
                                    <button id="submit" className="default-btn" type="submit">
                                        <i className="lab la-telegram-plane" /> Langganan
                                    </button>
                                    <div className="form-icon">
                                        <i className="las la-envelope" />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-6 text-center">
                            <div className="subscribe-thumb">
                                <div className="line" />
                                <img src="/assets/img/images/subscribe-img.png" alt="Subscribe" />
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

