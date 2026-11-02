import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import Menu from "../Menu"
import SocialLinks from "@/components/elements/SocialLinks"
import { getImageUrl } from "@/lib/imageUtils"
import { useSettings } from "@/context/SettingsContext"

export default function Header1({ scroll, handleMobileMenu, settings: propSettings = {} }) {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState("")
    const { settings: ctxSettings } = useSettings()

    const settings = { ...(ctxSettings || {}), ...(propSettings || {}) }
    const logoLight = getImageUrl(settings.logo_header || settings.site_logo, "/assets/img/logo/logo.webp")

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            router.push(`/blog-filter-search?search=${encodeURIComponent(searchQuery.trim())}`)
        }
    }

    return (
        <>
            <header className="ta-header">
                <div className="ta-header__top">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-5 align-self-center d-none d-lg-flex align-items-center" style={{ position: 'relative', zIndex: 10 }}>
                                <SocialLinks className="d-flex align-items-center flex-wrap" />
                            </div>
                            <div className="col-lg-2 col-12 align-self-center text-center">
                                <div className="ta-header__top__center">
                                    <div className="ta-logo">
                                        <Link href="/">
                                            <img
                                                src={logoLight}
                                                alt={settings.site_title || "Logo"}
                                                style={{
                                                    height: '38px',
                                                    width: 'auto',
                                                    maxWidth: '220px',
                                                    objectFit: 'contain',
                                                    display: 'inline-block'
                                                }}
                                                onError={(e) => {
                                                    e.currentTarget.src = "/assets/img/logo/logo.webp"
                                                }}
                                            />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-5 align-self-center d-none d-lg-flex align-items-center justify-content-end" style={{ position: 'relative', zIndex: 10 }}>
                                <div className="ta-header__top__right justify-content-end">
                                    <Link href="/subscribe" className="ta-button">Subscribe <i className="fa fa-paper-plane" /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`ta-header__menuarea bg-white-on-sticky ${scroll ? "ta-sticky-header" : ""}`}>
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="menu-area-wrapper menu-area-wrapper__nobg bg-white-on-sticky ta-border-bottom ta-border-top ta-border-top__bg">
                                    <div className="row">
                                        <div className="col-xl-3 col-lg-2 col-md-6 col-8 align-self-center">
                                            <div className="ta-header__menuarea__right justify-content-start">
                                                <div className="ta-search" style={{ width: '100%', maxWidth: '200px' }}>
                                                    <form onSubmit={handleSearch}>
                                                        <div style={{ display: 'flex', alignItems: 'center', position: 'relative', width: '100%' }}>
                                                            <button type="submit" style={{ background: 'none', border: 'none', padding: '0 8px 0 0', cursor: 'pointer' }}>
                                                                <i className="fa fa-search" />
                                                            </button>
                                                            <input
                                                                type="text"
                                                                placeholder="Cari berita..."
                                                                value={searchQuery}
                                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                                style={{
                                                                    width: '100%',
                                                                    minWidth: '130px',
                                                                    maxWidth: '170px',
                                                                    background: 'transparent',
                                                                    border: 'none',
                                                                    fontSize: '13.5px',
                                                                    fontWeight: 500,
                                                                    color: '#334155',
                                                                    outline: 'none'
                                                                }}
                                                            />
                                                            <span className="ta-underline" />
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-8 col-lg-9 d-none d-lg-block align-self-center">
                                            <div className="ta-main-menu text-center">
                                                <Menu />
                                            </div>
                                        </div>
                                        <div className="col-xl-1 col-lg-1 col-md-6 col-4 d-flex align-self-center justify-content-end">
                                            <button className="side-info-trigger side-info-trigger__dark" onClick={handleMobileMenu}>
                                                <img src="/assets/img/icons/side-info-icon.webp" alt="" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}
