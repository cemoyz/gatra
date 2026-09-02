import Link from "next/link"
import { useEffect, useState } from "react"
import SocialLinks from "@/components/elements/SocialLinks"
import { getImageUrl } from "@/lib/imageUtils"

export default function Sidebar({ isMobileMenu, handleMobileMenu }) {
    const [categories, setCategories] = useState([])
    const [trendingPosts, setTrendingPosts] = useState([])
    const [settings, setSettings] = useState({
        site_title: 'Hoom Magazine',
        site_tagline: 'Portal Media Informasi & Wawasan Terkini Terpercaya',
        contact_email: 'redaksi@hoom.id',
        contact_address: 'Jakarta, Indonesia'
    })

    useEffect(() => {
        // Fetch categories
        fetch('/api/categories')
            .then(res => res.json())
            .then(data => {
                if (data.success && Array.isArray(data.categories)) {
                    setCategories(data.categories)
                }
            })
            .catch(console.error)

        // Fetch top trending posts
        fetch('/api/posts?limit=3&sort=views')
            .then(res => res.json())
            .then(data => {
                if (data.success && Array.isArray(data.posts)) {
                    setTrendingPosts(data.posts.slice(0, 3))
                }
            })
            .catch(console.error)

        // Fetch site settings
        fetch('/api/settings')
            .then(res => res.json())
            .then(data => {
                if (data.success && data.settings) {
                    setSettings(prev => ({ ...prev, ...data.settings }))
                }
            })
            .catch(console.error)
    }, [])

    const getPostThumb = (img, id) => {
        return getImageUrl(img, `blog-2-${(id % 12) + 1}.webp`)
    }

    return (
        <>
            <style jsx>{`
                :global(.ta-side-info-wrapper) {
                    width: 580px !important;
                    max-width: 90vw !important;
                    padding: 40px 45px !important;
                    transform: translateX(-100%) !important;
                    background: #ffffff !important;
                    box-shadow: 10px 0 40px rgba(0, 0, 0, 0.15) !important;
                    z-index: 9999 !important;
                }
                :global(.ta-side-info-wrapper.is-open) {
                    transform: translateX(0) !important;
                }
                :global(.dark .ta-side-info-wrapper) {
                    background: #0f172a !important;
                    color: #f8fafc !important;
                }
                @media (max-width: 767px) {
                    :global(.ta-side-info-wrapper) {
                        width: 100% !important;
                        max-width: 100vw !important;
                        padding: 28px 20px !important;
                    }
                }
                .side-close-btn {
                    position: absolute;
                    top: 28px;
                    right: 32px;
                    background: #f1f5f9;
                    border: 1px solid #e2e8f0;
                    width: 42px;
                    height: 42px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    color: #475569;
                    font-size: 18px;
                    transition: all 0.25s ease;
                }
                .side-close-btn:hover {
                    background: #da0105;
                    color: #ffffff;
                    border-color: #da0105;
                    transform: rotate(90deg);
                }
                .side-nav-item {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 10px 14px;
                    border-radius: 10px;
                    color: #1e293b;
                    text-decoration: none;
                    font-weight: 700;
                    font-size: 15px;
                    transition: all 0.2s ease;
                }
                .side-nav-item:hover {
                    background: #f8fafc;
                    color: #da0105;
                    padding-left: 18px;
                }
                :global(.dark) .side-nav-item {
                    color: #f1f5f9;
                }
                :global(.dark) .side-nav-item:hover {
                    background: #1e293b;
                    color: #ef4444;
                }
                .category-badge-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 6px 12px;
                    border-radius: 20px;
                    background: #f8fafc;
                    border: 1px solid #e2e8f0;
                    color: #334155;
                    font-size: 12.5px;
                    font-weight: 600;
                    text-decoration: none;
                    transition: all 0.2s ease;
                }
                .category-badge-pill:hover {
                    background: #da0105;
                    border-color: #da0105;
                    color: #ffffff;
                    transform: translateY(-2px);
                }
                :global(.dark) .category-badge-pill {
                    background: #1e293b;
                    border-color: #334155;
                    color: #cbd5e1;
                }
                :global(.dark) .category-badge-pill:hover {
                    background: #da0105;
                    border-color: #da0105;
                    color: #ffffff;
                }
            `}</style>

            <div className={`ta-side-info-wrapper ${isMobileMenu ? "is-open" : ""}`}>
                {/* Close Button */}
                <button
                    className="side-close-btn"
                    onClick={handleMobileMenu}
                    aria-label="Tutup Menu"
                >
                    <i className="fa fa-times" />
                </button>

                {/* Brand Logo */}
                <div className="top pb-25" style={{ borderBottom: '1px solid #f1f5f9', marginBottom: '24px' }}>
                    <div className="ta-logo">
                        <Link href="/" onClick={handleMobileMenu}>
                            <img className="hide-on-dark" src="/assets/img/logo/logo.webp" alt="Hoom Magazine" style={{ height: '36px', width: 'auto' }} />
                            <img className="show-on-dark" src="/assets/img/logo/logo-white.webp" alt="Hoom Magazine" style={{ height: '36px', width: 'auto' }} />
                        </Link>
                    </div>
                </div>

                {/* Slogan & Editorial Info */}
                <div className="mb-30">
                    <h3 style={{
                        fontSize: '22px',
                        fontWeight: 800,
                        lineHeight: '1.35',
                        color: '#0f172a',
                        marginBottom: '10px'
                    }}>
                        Inspirasi, Berita & Wawasan Terkini Setiap Hari.
                    </h3>
                    <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: '1.6', margin: 0 }}>
                        {settings.site_tagline || 'Menghadirkan konten artikel mendalam, tren terkini, dan panduan inspiratif untuk para pembaca modern.'}
                    </p>
                </div>

                {/* Quick Menu Navigation */}
                <div className="mb-35">
                    <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#da0105', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '10px' }}>
                        Navigasi Utama
                    </div>
                    <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <Link href="/" className="side-nav-item" onClick={handleMobileMenu}>
                            <span><i className="fa fa-home" style={{ width: '22px', color: '#94a3b8' }} /> Beranda</span>
                            <i className="fa fa-angle-right" style={{ fontSize: '12px', color: '#cbd5e1' }} />
                        </Link>
                        <Link href="/blog-filter-category" className="side-nav-item" onClick={handleMobileMenu}>
                            <span><i className="fa fa-th-large" style={{ width: '22px', color: '#94a3b8' }} /> Semua Kategori</span>
                            <i className="fa fa-angle-right" style={{ fontSize: '12px', color: '#cbd5e1' }} />
                        </Link>
                        <Link href="/about-us" className="side-nav-item" onClick={handleMobileMenu}>
                            <span><i className="fa fa-info-circle" style={{ width: '22px', color: '#94a3b8' }} /> Tentang Kami</span>
                            <i className="fa fa-angle-right" style={{ fontSize: '12px', color: '#cbd5e1' }} />
                        </Link>
                        <Link href="/contact" className="side-nav-item" onClick={handleMobileMenu}>
                            <span><i className="fa fa-envelope-o" style={{ width: '22px', color: '#94a3b8' }} /> Hubungi Redaksi</span>
                            <i className="fa fa-angle-right" style={{ fontSize: '12px', color: '#cbd5e1' }} />
                        </Link>
                        <Link href="/dashboard" className="side-nav-item" onClick={handleMobileMenu}>
                            <span><i className="fa fa-sliders" style={{ width: '22px', color: '#3b82f6' }} /> Dashboard Admin</span>
                            <span style={{ fontSize: '10px', background: '#eff6ff', color: '#2563eb', padding: '2px 8px', borderRadius: '8px' }}>CMS</span>
                        </Link>
                    </nav>
                </div>

                {/* Popular Categories Grid */}
                {categories.length > 0 && (
                    <div className="mb-35">
                        <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#da0105', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '12px' }}>
                            Jelajahi Topik Populer
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {categories.map((cat) => (
                                <Link
                                    key={cat.id}
                                    href={`/blog-filter-category?category=${cat.slug}`}
                                    className="category-badge-pill"
                                    onClick={handleMobileMenu}
                                >
                                    <span>{cat.name}</span>
                                    {cat.postsCount > 0 && (
                                        <span style={{ fontSize: '10px', opacity: 0.75 }}>({cat.postsCount})</span>
                                    )}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Trending Articles Snapshot */}
                {trendingPosts.length > 0 && (
                    <div className="mb-35">
                        <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#da0105', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '14px' }}>
                            🔥 Sedang Hangat
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {trendingPosts.map((post, idx) => (
                                <Link
                                    key={post.id}
                                    href={`/blog/${post.id}`}
                                    onClick={handleMobileMenu}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        textDecoration: 'none',
                                        padding: '8px',
                                        borderRadius: '10px',
                                        background: '#f8fafc',
                                        border: '1px solid #e2e8f0',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    <div style={{ position: 'relative', width: '56px', height: '56px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                                        <img
                                            src={getPostThumb(post.img, post.id)}
                                            alt={post.title}
                                            onError={(e) => { e.currentTarget.src = `/assets/img/blog/blog-2-${(post.id % 12) + 1}.webp` }}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                        <span style={{
                                            position: 'absolute',
                                            top: '2px',
                                            left: '2px',
                                            background: '#da0105',
                                            color: '#ffffff',
                                            fontSize: '9px',
                                            fontWeight: 800,
                                            padding: '1px 4px',
                                            borderRadius: '3px'
                                        }}>
                                            #{idx + 1}
                                        </span>
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <span style={{ fontSize: '10px', color: '#da0105', fontWeight: 700, textTransform: 'uppercase' }}>
                                            {post.category || 'Berita'}
                                        </span>
                                        <h6 style={{
                                            fontSize: '12.5px',
                                            fontWeight: 600,
                                            lineHeight: '1.35',
                                            margin: '2px 0 0 0',
                                            color: '#0f172a',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden'
                                        }}>
                                            {post.title}
                                        </h6>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Editorial Contact & Socials */}
                <div style={{ paddingTop: '20px', borderTop: '1px solid #f1f5f9', marginTop: '10px' }}>
                    <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#da0105', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '12px' }}>
                        Hubungi Redaksi
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#475569', marginBottom: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <i className="fa fa-envelope" style={{ color: '#da0105', width: '16px' }} />
                            <span>{settings.contact_email || 'redaksi@hoom.id'}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <i className="fa fa-map-marker" style={{ color: '#da0105', width: '16px' }} />
                            <span>{settings.contact_address || 'Jakarta, Indonesia'}</span>
                        </div>
                    </div>

                    <div style={{ marginTop: '16px' }}>
                        <SocialLinks className="d-flex align-items-center" />
                    </div>

                    <div style={{ marginTop: '24px', fontSize: '11.5px', color: '#94a3b8', textAlign: 'center' }}>
                        &copy; {new Date().getFullYear()} {settings.site_title || 'Hoom Magazine'}. All rights reserved.
                    </div>
                </div>
            </div>
        </>
    )
}
