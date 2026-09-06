import Link from "next/link"
import { useEffect, useState } from "react"
import SocialLinks from "@/components/elements/SocialLinks"

export default function Footer1({ settings = {} }) {
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState(["Design", "Technology", "UI/UX", "Marketing", "Travel", "Podcast", "Lifestyle"])

    const footerLogo = settings.logo_footer || "/assets/img/logo/logoredwhite.webp"

    useEffect(() => {
        fetch('/api/categories')
            .then(res => res.json())
            .then(data => {
                if (data.success && Array.isArray(data.categories)) {
                    setCategories(data.categories.slice(0, 6))
                }
            })
            .catch(console.error)
    }, [])

    return (
        <>
            <footer className="ta-footer ta-footer__style-2 ta-dark-mode" style={{ background: '#0a0a0d', color: '#cbd5e1' }}>
                <div className="container pt-80 pb-60">
                    <div className="row mt-none-30">
                        {/* Brand & About Column */}
                        <div className="col-xl-4 col-lg-4 col-md-6 mt-30">
                            <div className="ta-footer-widget widget">
                                <Link href="/" className="d-inline-block mb-25">
                                    <img src={footerLogo} alt={settings.site_title || "Duanarasi"} style={{ height: '38px', width: 'auto', objectFit: 'contain' }} />
                                </Link>
                                <p style={{ fontSize: '14px', lineHeight: '1.7', color: '#94a3b8', marginBottom: '20px' }}>
                                    {settings.site_tagline || `${settings.site_title || 'Hoom Magazine'} menyajikan berita terkini, artikel mendalam, tren teknologi, gaya hidup, dan wawasan terpercaya untuk pembaca modern di seluruh Indonesia.`}
                                </p>
                                <SocialLinks className="d-flex align-items-center" />
                            </div>
                        </div>

                        {/* Navigation Links */}
                        <div className="col-xl-2 col-lg-2 col-md-3 col-sm-6 mt-30">
                            <div className="ta-footer-widget widget">
                                <h4 className="widget-title" style={{ fontSize: '17px', fontWeight: 700, color: '#ffffff', marginBottom: '20px' }}>
                                    Redaksi
                                </h4>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <li><Link href="/" style={{ color: '#94a3b8', textDecoration: 'none' }}>Beranda</Link></li>
                                    <li><Link href="/about-us" style={{ color: '#94a3b8', textDecoration: 'none' }}>Tentang Kami</Link></li>
                                    <li><Link href="/author" style={{ color: '#94a3b8', textDecoration: 'none' }}>Tim Penulis</Link></li>
                                    <li><Link href="/contact" style={{ color: '#94a3b8', textDecoration: 'none' }}>Kontak Kami</Link></li>
                                    <li><Link href="/dashboard" style={{ color: '#38bdf8', textDecoration: 'none' }}>Dashboard</Link></li>
                                </ul>
                            </div>
                        </div>

                        {/* Top Categories */}
                        <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 mt-30">
                            <div className="ta-footer-widget widget">
                                <h4 className="widget-title" style={{ fontSize: '17px', fontWeight: 700, color: '#ffffff', marginBottom: '20px' }}>
                                    Kategori Pilihan
                                </h4>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    {categories.length > 0 ? (
                                        categories.map(c => (
                                            <li key={c.id}>
                                                <Link href={`/blog-filter-category?category=${c.slug}`} style={{ color: '#94a3b8', textDecoration: 'none' }}>
                                                    {c.name}
                                                </Link>
                                            </li>
                                        ))
                                    ) : (
                                        <>
                                            <li><Link href="/blog-filter-category" style={{ color: '#94a3b8', textDecoration: 'none' }}>Berita</Link></li>
                                            <li><Link href="/blog-filter-category" style={{ color: '#94a3b8', textDecoration: 'none' }}>Teknologi</Link></li>
                                            <li><Link href="/blog-filter-category" style={{ color: '#94a3b8', textDecoration: 'none' }}>Gaya Hidup</Link></li>
                                            <li><Link href="/blog-filter-category" style={{ color: '#94a3b8', textDecoration: 'none' }}>Bisnis</Link></li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        </div>

                        {/* Popular Tags Pills */}
                        <div className="col-xl-3 col-lg-3 col-md-6 mt-30">
                            <div className="ta-footer-widget widget">
                                <h4 className="widget-title" style={{ fontSize: '17px', fontWeight: 700, color: '#ffffff', marginBottom: '20px' }}>
                                    Tag Populer
                                </h4>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {tags.map(t => (
                                        <Link
                                            key={t}
                                            href={`/blog-filter-tag?tag=${t.toLowerCase()}`}
                                            style={{
                                                background: '#1e293b',
                                                color: '#cbd5e1',
                                                border: '1px solid #334155',
                                                padding: '5px 12px',
                                                borderRadius: '16px',
                                                fontSize: '12px',
                                                fontWeight: 600,
                                                textDecoration: 'none',
                                                transition: 'all 0.2s ease'
                                            }}
                                        >
                                            #{t}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Copyright Bar */}
                <div className="ta-footer__bottom pt-25 pb-25" style={{ borderTop: '1px solid #1e293b' }}>
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-md-6 text-center text-md-start mb-2 mb-md-0">
                                <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
                                    &copy; {new Date().getFullYear()} <strong style={{ color: '#f8fafc' }}>{settings.site_title || 'Hoom Magazine'}</strong>. Seluruh hak cipta dilindungi.
                                </p>
                            </div>
                            <div className="col-md-6 text-center text-md-end">
                                <div style={{ fontSize: '13px', color: '#64748b' }}>
                                    <Link href="/about-us" style={{ color: '#94a3b8', textDecoration: 'none', marginRight: '16px' }}>Tentang</Link>
                                    <Link href="/contact" style={{ color: '#94a3b8', textDecoration: 'none', marginRight: '16px' }}>Kontak</Link>
                                    <Link href="/dashboard" style={{ color: '#da0105', textDecoration: 'none', fontWeight: 600 }}>Panel Admin</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}
