import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import SocialLinks from "@/components/elements/SocialLinks"
import { getImageUrl } from "@/lib/imageUtils"

export default function Sidebar({ isMobileMenu, handleMobileMenu, settings: initialSettings }) {
    const router = useRouter()
    const [categories, setCategories] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [settings, setSettings] = useState(initialSettings || {
        site_title: 'Dua Narasi',
        contact_email: 'redaksi@duanarasi.com'
    })

    useEffect(() => {
        fetch('/api/categories')
            .then(res => res.json())
            .then(data => {
                if (data.success && Array.isArray(data.categories)) setCategories(data.categories)
            })
            .catch(console.error)

        if (!initialSettings) {
            fetch('/api/settings')
                .then(res => res.json())
                .then(data => {
                    if (data.success && data.settings) setSettings(prev => ({ ...prev, ...data.settings }))
                })
                .catch(console.error)
        } else {
            setSettings(prev => ({ ...prev, ...initialSettings }))
        }
    }, [initialSettings])

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            handleMobileMenu()
            router.push(`/blog-filter-search?search=${encodeURIComponent(searchQuery.trim())}`)
        }
    }

    const logoUrl = getImageUrl(settings.logo_header || settings.site_logo, "/assets/img/logo/logo.webp")

    return (
        <>
            <style jsx>{`
                /* ══════════════════════════════════════
                   GLASSMORPHISM OVERLAY BACKDROP
                ══════════════════════════════════════ */
                :global(.ta-overlay) {
                    position: fixed !important;
                    top: 0 !important;
                    left: 0 !important;
                    width: 100vw !important;
                    height: 100vh !important;
                    background: rgba(15, 23, 42, 0.45) !important;
                    backdrop-filter: blur(5px) !important;
                    -webkit-backdrop-filter: blur(5px) !important;
                    z-index: 9998 !important;
                    opacity: 0 !important;
                    visibility: hidden !important;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
                }
                :global(.ta-overlay.is-open) {
                    opacity: 1 !important;
                    visibility: visible !important;
                }

                /* ══════════════════════════════════════
                   WHITE MODERN SIDEBAR DRAWER
                ══════════════════════════════════════ */
                :global(.ta-side-info-wrapper) {
                    position: fixed !important;
                    top: 0 !important;
                    left: 0 !important;
                    width: 300px !important;
                    max-width: 85vw !important;
                    height: 100vh !important;
                    background: #ffffff !important;
                    transform: translateX(-100%) !important;
                    transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1) !important;
                    z-index: 9999 !important;
                    padding: 0 !important;
                    box-shadow: none !important;
                    overflow: hidden !important;
                    display: flex !important;
                    flex-direction: column !important;
                    border-right: 1px solid #f1f5f9 !important;
                }
                :global(.ta-side-info-wrapper.is-open) {
                    transform: translateX(0) !important;
                    box-shadow: 16px 0 40px rgba(15, 23, 42, 0.12) !important;
                }

                .sb-container {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    padding: 20px 18px;
                    overflow-y: auto;
                    scrollbar-width: thin;
                    scrollbar-color: #cbd5e1 transparent;
                }
                .sb-container::-webkit-scrollbar {
                    width: 4px;
                }
                .sb-container::-webkit-scrollbar-thumb {
                    background: #cbd5e1;
                    border-radius: 4px;
                }

                /* Header Area */
                :global(.ta-side-info-wrapper .sb-header) {
                    display: flex !important;
                    flex-direction: row !important;
                    align-items: center !important;
                    justify-content: space-between !important;
                    margin-bottom: 16px !important;
                    padding-bottom: 14px !important;
                    border-bottom: 1px solid #f1f5f9 !important;
                }
                :global(.ta-side-info-wrapper .sb-logo) {
                    display: inline-flex !important;
                    align-items: center !important;
                }
                :global(.ta-side-info-wrapper .sb-logo img) {
                    height: 30px !important;
                    max-height: 30px !important;
                    width: auto !important;
                    object-fit: contain !important;
                }
                
                /* Bulat Sempurna 100% Circle Close Button */
                :global(.ta-side-info-wrapper .sb-close-btn) {
                    background: #f8fafc !important;
                    border: 1px solid #e2e8f0 !important;
                    color: #64748b !important;
                    width: 32px !important;
                    height: 32px !important;
                    min-width: 32px !important;
                    min-height: 32px !important;
                    max-width: 32px !important;
                    max-height: 32px !important;
                    padding: 0 !important;
                    margin: 0 !important;
                    border-radius: 50% !important;
                    display: inline-flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    flex-shrink: 0 !important;
                    cursor: pointer !important;
                    font-size: 14px !important;
                    line-height: 1 !important;
                    transition: all 0.25s ease !important;
                    box-sizing: border-box !important;
                }
                :global(.ta-side-info-wrapper .sb-close-btn:hover) {
                    background: #da0105 !important;
                    color: #ffffff !important;
                    border-color: #da0105 !important;
                    transform: rotate(90deg) scale(1.05) !important;
                    box-shadow: 0 4px 12px rgba(218, 1, 5, 0.25) !important;
                }

                /* Search Form inside Sidebar */
                .sb-search-box {
                    margin-bottom: 16px;
                }
                .sb-search-form {
                    position: relative;
                    width: 100%;
                }
                .sb-search-input {
                    width: 100%;
                    padding: 9px 12px 9px 36px;
                    background: #f8fafc;
                    border: 1px solid #e2e8f0;
                    border-radius: 10px;
                    font-size: 13px;
                    color: #0f172a;
                    outline: none;
                    transition: all 0.2s ease;
                }
                .sb-search-input:focus {
                    background: #ffffff;
                    border-color: #da0105;
                    box-shadow: 0 0 0 3px rgba(218, 1, 5, 0.1);
                }
                .sb-search-icon {
                    position: absolute;
                    left: 12px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #94a3b8;
                    font-size: 13px;
                    pointer-events: none;
                }

                /* Section Label */
                .sb-section-label {
                    font-size: 11px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 1.2px;
                    color: #94a3b8;
                    margin: 6px 0 8px 4px;
                }

                /* Main Navigation Links (Strict Horizontal Alignment) */
                .sb-nav-group {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    margin-bottom: 18px;
                }
                :global(.ta-side-info-wrapper .sb-menu-item) {
                    display: flex !important;
                    flex-direction: row !important;
                    align-items: center !important;
                    justify-content: flex-start !important;
                    gap: 12px !important;
                    padding: 8px 10px !important;
                    border-radius: 10px !important;
                    color: #334155 !important;
                    font-size: 14px !important;
                    font-weight: 600 !important;
                    text-decoration: none !important;
                    white-space: nowrap !important;
                    width: 100% !important;
                    box-sizing: border-box !important;
                    transition: all 0.2s ease !important;
                }
                :global(.ta-side-info-wrapper .sb-icon-box) {
                    width: 30px !important;
                    height: 30px !important;
                    min-width: 30px !important;
                    min-height: 30px !important;
                    max-width: 30px !important;
                    max-height: 30px !important;
                    border-radius: 8px !important;
                    background: #f8fafc !important;
                    border: 1px solid #f1f5f9 !important;
                    display: inline-flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    color: #64748b !important;
                    font-size: 13px !important;
                    flex-shrink: 0 !important;
                    margin: 0 !important;
                    transition: all 0.2s ease !important;
                }
                :global(.ta-side-info-wrapper .sb-menu-item span:not(.sb-icon-box)) {
                    display: inline-block !important;
                    line-height: 1.2 !important;
                    margin: 0 !important;
                    padding: 0 !important;
                    white-space: nowrap !important;
                }
                :global(.ta-side-info-wrapper .sb-menu-item:hover) {
                    background: #f8fafc !important;
                    color: #0f172a !important;
                    transform: translateX(4px) !important;
                }
                :global(.ta-side-info-wrapper .sb-menu-item:hover .sb-icon-box) {
                    background: #da0105 !important;
                    color: #ffffff !important;
                    border-color: #da0105 !important;
                }
                :global(.ta-side-info-wrapper .sb-menu-item.active) {
                    background: #fef2f2 !important;
                    color: #da0105 !important;
                    font-weight: 700 !important;
                }
                :global(.ta-side-info-wrapper .sb-menu-item.active .sb-icon-box) {
                    background: #da0105 !important;
                    color: #ffffff !important;
                    border-color: #da0105 !important;
                    box-shadow: 0 3px 8px rgba(218, 1, 5, 0.25) !important;
                }

                /* Categories List */
                .sb-cat-list {
                    display: flex;
                    flex-direction: column;
                    gap: 3px;
                    margin-bottom: 18px;
                }
                :global(.ta-side-info-wrapper .sb-cat-item) {
                    display: flex !important;
                    flex-direction: row !important;
                    align-items: center !important;
                    justify-content: space-between !important;
                    padding: 8px 10px !important;
                    border-radius: 8px !important;
                    color: #475569 !important;
                    font-size: 13px !important;
                    font-weight: 500 !important;
                    text-decoration: none !important;
                    transition: all 0.2s ease !important;
                }
                :global(.ta-side-info-wrapper .sb-cat-item:hover) {
                    background: #f8fafc !important;
                    color: #da0105 !important;
                    padding-left: 14px !important;
                }
                :global(.ta-side-info-wrapper .sb-cat-item.active) {
                    background: #fef2f2 !important;
                    color: #da0105 !important;
                    font-weight: 700 !important;
                }
                .sb-cat-count {
                    font-size: 11px;
                    font-weight: 600;
                    background: #f1f5f9;
                    color: #64748b;
                    padding: 2px 8px;
                    border-radius: 10px;
                    transition: all 0.2s ease;
                }
                :global(.ta-side-info-wrapper .sb-cat-item:hover .sb-cat-count),
                :global(.ta-side-info-wrapper .sb-cat-item.active .sb-cat-count) {
                    background: #da0105 !important;
                    color: #ffffff !important;
                }

                /* Footer inside Sidebar */
                .sb-footer {
                    margin-top: auto;
                    padding-top: 16px;
                    border-top: 1px solid #f1f5f9;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
                :global(.ta-side-info-wrapper .social-circle-btn) {
                    width: 24px !important;
                    height: 24px !important;
                    min-width: 24px !important;
                    min-height: 24px !important;
                    max-width: 24px !important;
                    max-height: 24px !important;
                    background: #f8fafc !important;
                    border: 1px solid #e2e8f0 !important;
                    color: #64748b !important;
                }
                :global(.ta-side-info-wrapper .social-circle-btn svg) {
                    width: 10px !important;
                    height: 10px !important;
                }
                :global(.ta-side-info-wrapper .social-circle-btn i) {
                    font-size: 10px !important;
                }
                :global(.ta-side-info-wrapper .social-circle-btn:hover) {
                    background: #da0105 !important;
                    color: #ffffff !important;
                    border-color: #da0105 !important;
                }
                .sb-contact-info {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    font-size: 12px;
                    color: #64748b;
                    background: #f8fafc;
                    padding: 7px 10px;
                    border-radius: 8px;
                    border: 1px solid #f1f5f9;
                }
                .sb-contact-info i {
                    color: #da0105;
                }
                .sb-copyright {
                    font-size: 11px;
                    color: #94a3b8;
                    text-align: center;
                    line-height: 1.4;
                }
            `}</style>

            <div className={`ta-side-info-wrapper ${isMobileMenu ? "is-open" : ""}`}>
                <div className="sb-container">
                    
                    {/* Header Overlay */}
                    <div className="sb-header">
                        <Link href="/" className="sb-logo" onClick={handleMobileMenu}>
                            <img src={logoUrl} alt={settings.site_title || "Logo"} />
                        </Link>
                        <button className="sb-close-btn" onClick={handleMobileMenu} aria-label="Tutup Menu">
                            <i className="fa fa-times" />
                        </button>
                    </div>

                    {/* Quick Search */}
                    <div className="sb-search-box">
                        <form className="sb-search-form" onSubmit={handleSearchSubmit}>
                            <i className="fa fa-search sb-search-icon" />
                            <input
                                type="text"
                                className="sb-search-input"
                                placeholder="Cari berita & artikel..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </form>
                    </div>

                    {/* Main Nav Section */}
                    <div className="sb-section-label">Menu Utama</div>
                    <div className="sb-nav-group">
                        <Link
                            href="/"
                            className={`sb-menu-item ${router.pathname === "/" ? "active" : ""}`}
                            onClick={handleMobileMenu}
                        >
                            <span className="sb-icon-box"><i className="fa fa-home" /></span>
                            <span>Beranda</span>
                        </Link>
                        <Link
                            href="/blog-filter-category"
                            className={`sb-menu-item ${router.pathname === "/blog-filter-category" && !router.query.category ? "active" : ""}`}
                            onClick={handleMobileMenu}
                        >
                            <span className="sb-icon-box"><i className="fa fa-th-large" /></span>
                            <span>Semua Artikel</span>
                        </Link>
                        <Link
                            href="/about-us"
                            className={`sb-menu-item ${router.pathname === "/about-us" ? "active" : ""}`}
                            onClick={handleMobileMenu}
                        >
                            <span className="sb-icon-box"><i className="fa fa-info-circle" /></span>
                            <span>Tentang Kami</span>
                        </Link>
                        <Link
                            href="/contact"
                            className={`sb-menu-item ${router.pathname === "/contact" ? "active" : ""}`}
                            onClick={handleMobileMenu}
                        >
                            <span className="sb-icon-box"><i className="fa fa-envelope-o" /></span>
                            <span>Kontak</span>
                        </Link>
                        <Link
                            href="/dashboard"
                            className={`sb-menu-item ${router.pathname.startsWith("/dashboard") ? "active" : ""}`}
                            onClick={handleMobileMenu}
                        >
                            <span className="sb-icon-box"><i className="fa fa-user-circle-o" /></span>
                            <span>Dashboard</span>
                        </Link>
                    </div>

                    {/* Categories Section */}
                    {categories.length > 0 && (
                        <>
                            <div className="sb-section-label">Kategori Berita</div>
                            <div className="sb-cat-list">
                                {categories.map((cat) => {
                                    const isCatActive = router.pathname === "/blog-filter-category" && router.query.category === cat.slug
                                    return (
                                        <Link
                                            key={cat.id}
                                            href={`/blog-filter-category?category=${cat.slug}`}
                                            className={`sb-cat-item ${isCatActive ? "active" : ""}`}
                                            onClick={handleMobileMenu}
                                        >
                                            <span>{cat.name}</span>
                                            {cat.postsCount > 0 && (
                                                <span className="sb-cat-count">{cat.postsCount}</span>
                                            )}
                                        </Link>
                                    )
                                })}
                            </div>
                        </>
                    )}

                    {/* Footer Social & Copyright */}
                    <div className="sb-footer">
                        {settings.contact_email && (
                            <div className="sb-contact-info">
                                <i className="fa fa-envelope" />
                                <span>{settings.contact_email}</span>
                            </div>
                        )}
                        <div className="d-flex justify-content-center">
                            <SocialLinks className="d-flex align-items-center justify-content-center gap-2" />
                        </div>
                        <div className="sb-copyright">
                            © {new Date().getFullYear()} {settings.site_title || 'Dua Narasi'}. All rights reserved.
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}


