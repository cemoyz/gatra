import Link from "next/link"
import { getImageUrl } from "@/lib/imageUtils"

export default function Footer1({ settings = {} }) {
    const siteTitle = settings.site_title || "Gatra Portal"
    const siteTagline = settings.site_tagline || "Portal Berita Terkini, Akurat, dan Terpercaya Menyajikan Informasi Pilihan Seputar Nasional dan Internasional."
    const logoLight = getImageUrl(settings.logo_footer || settings.logo_header || settings.site_logo, "/assets/img/logo/logo-light.png")
    const email = settings.contact_email_1 || settings.contact_email || "redaksi@gatra.com"
    const phone = settings.contact_phone_1 || settings.contact_phone || "+62 21 555 7890"

    return (
        <>
            <footer className="footer-section">
                <div className="footer-top padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-5 col-md-6">
                                <div className="footer-item">
                                    <h3 className="footer-header">Tentang {siteTitle}</h3>
                                    <div className="footer-content">
                                        <p className="desc">
                                            {siteTagline}
                                        </p>
                                        <ul className="contact-list">
                                            <li>
                                                Email: <Link href={`mailto:${email}`}>{email}</Link>
                                            </li>
                                            <li>Kontak Redaksi: <Link href={`tel:${phone}`}>{phone}</Link></li>
                                            <li>
                                                <ul className="footer-social">
                                                    {settings.social_facebook && (
                                                        <li><a href={settings.social_facebook} target="_blank" rel="noopener noreferrer" className="facebook" aria-label="Facebook"><i className="lab la-facebook-f" /></a></li>
                                                    )}
                                                    {settings.social_twitter && (
                                                        <li><a href={settings.social_twitter} target="_blank" rel="noopener noreferrer" className="twitter" aria-label="Twitter"><i className="lab la-twitter" /></a></li>
                                                    )}
                                                    {settings.social_instagram && (
                                                        <li><a href={settings.social_instagram} target="_blank" rel="noopener noreferrer" className="instagram" aria-label="Instagram"><i className="lab la-instagram" /></a></li>
                                                    )}
                                                    {settings.social_youtube && (
                                                        <li><a href={settings.social_youtube} target="_blank" rel="noopener noreferrer" className="youtube" aria-label="YouTube"><i className="lab la-youtube" /></a></li>
                                                    )}
                                                    {settings.social_whatsapp && (
                                                        <li><a href={`https://wa.me/${settings.social_whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="whatsapp" aria-label="WhatsApp"><i className="lab la-whatsapp" /></a></li>
                                                    )}
                                                    {!settings.social_facebook && !settings.social_twitter && !settings.social_instagram && (
                                                        <>
                                                            <li><Link href="/#" className="facebook" aria-label="Facebook"><i className="lab la-facebook-f" /></Link></li>
                                                            <li><Link href="/#" className="twitter" aria-label="Twitter"><i className="lab la-twitter" /></Link></li>
                                                            <li><Link href="/#" className="instagram" aria-label="Instagram"><i className="lab la-instagram" /></Link></li>
                                                        </>
                                                    )}
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="footer-item">
                                    <h3 className="footer-header" style={{ color: '#ffffff', fontWeight: 700, fontSize: '17px', marginBottom: '20px' }}>
                                        Kanal Berita
                                    </h3>
                                    <div className="footer-content">
                                        <ul className="footer-links" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                            <li className="mb-2"><Link href="/blog-filter-category?category=news"><i className="las la-angle-right" style={{ fontSize: '12px', color: '#da0105', marginRight: '6px' }} />News</Link></li>
                                            <li className="mb-2"><Link href="/blog-filter-category?category=tekno"><i className="las la-angle-right" style={{ fontSize: '12px', color: '#da0105', marginRight: '6px' }} />Tekno</Link></li>
                                            <li className="mb-2"><Link href="/blog-filter-category?category=bola"><i className="las la-angle-right" style={{ fontSize: '12px', color: '#da0105', marginRight: '6px' }} />Bola</Link></li>
                                            <li className="mb-2"><Link href="/blog-filter-category?category=money"><i className="las la-angle-right" style={{ fontSize: '12px', color: '#da0105', marginRight: '6px' }} />Money</Link></li>
                                            <li className="mb-2"><Link href="/blog-filter-category?category=lifestyle"><i className="las la-angle-right" style={{ fontSize: '12px', color: '#da0105', marginRight: '6px' }} />Lifestyle</Link></li>
                                            <li className="mb-2"><Link href="/blog-filter-category?category=tren"><i className="las la-angle-right" style={{ fontSize: '12px', color: '#da0105', marginRight: '6px' }} />Tren</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="footer-item">
                                    <h3 className="footer-header" style={{ color: '#ffffff', fontWeight: 700, fontSize: '17px', marginBottom: '20px' }}>
                                        Tautan Cepat
                                    </h3>
                                    <div className="footer-content">
                                        <ul className="footer-links" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                            <li className="mb-2"><Link href="/blog"><i className="las la-angle-right" style={{ fontSize: '12px', color: '#da0105', marginRight: '6px' }} />Semua Berita Terkini</Link></li>
                                            <li className="mb-2"><Link href="/breaking-news"><i className="las la-angle-right" style={{ fontSize: '12px', color: '#da0105', marginRight: '6px' }} />Breaking News</Link></li>
                                            <li className="mb-2"><Link href="/about"><i className="las la-angle-right" style={{ fontSize: '12px', color: '#da0105', marginRight: '6px' }} />Tentang Redaksi</Link></li>
                                            <li className="mb-2"><Link href="/pedoman-media-siber"><i className="las la-angle-right" style={{ fontSize: '12px', color: '#da0105', marginRight: '6px' }} />Pedoman Media Siber</Link></li>
                                            <li className="mb-2"><Link href="/contact"><i className="las la-angle-right" style={{ fontSize: '12px', color: '#da0105', marginRight: '6px' }} />Hubungi Kami & Pasang Iklan</Link></li>
                                            <li className="mb-2"><Link href="/subscribe"><i className="las la-angle-right" style={{ fontSize: '12px', color: '#da0105', marginRight: '6px' }} />Berlangganan Newsletter</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* ./ footer-top */}
                <div className="footer-bottom">
                    <div className="container">
                        <div className="footer-bottom-wrap">
                            <div className="footer-logo">
                                <Link href="/">
                                    <img src={logoLight} alt={siteTitle} style={{ maxHeight: '40px', width: 'auto' }} />
                                </Link>
                            </div>
                            <ul className="footer-menu-list">
                                <li><Link href="/">Beranda</Link></li>
                                <li><Link href="/blog">Kanal Berita</Link></li>
                                <li><Link href="/breaking-news">Breaking News</Link></li>
                                <li><Link href="/about">Tentang Kami</Link></li>
                                <li><Link href="/contact">Kontak</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* ./ footer-bottom */}
                <div className="copyright-area">
                    <div className="container">
                        <div className="copyright-wrap">
                            <p><span>{siteTitle}</span> © {new Date().getFullYear()}. All Rights Reserved.</p>
                            <ul className="list">
                                <li><Link href="/contact">Kontak</Link></li>
                                <li><Link href="/blog">Berita</Link></li>
                                <li><Link href="/pedoman-media-siber">Pedoman Siber</Link></li>
                                <li><Link href="/contact">Iklan</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}
