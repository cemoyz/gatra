import Link from "next/link"
import { useState } from "react"
import Menu from "../Menu"
import SocialLinks from "@/components/elements/SocialLinks"

export default function Header8({ scroll, handleMobileMenu }) {
    // Moblile Menu
    const [isSearch, setSearch] = useState(false)
    const handleSearch = () => setSearch(!isSearch)
    return (
        <>
            <header className="ta-header ta-header__style-11 pt-20">
                <div className={`ta-header__menuarea ${scroll ? "ta-sticky-header" : ""}`}>
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="menu-area-wrapper menu-area-wrapper__nobg bg-white-on-sticky">
                                    <div className="row">
                                        <div className="col-xl-1 col-lg-1 col-md-6 col-6 align-self-center d-md-block d-lg-none">
                                            <div className="ta-logo align-items-start">
                                                <Link href="/">
                                                    <img className="hide-on-dark" src="/assets/img/logo/logo.webp" alt="logo" />
                                                    <img className="show-on-dark" src="/assets/img/logo/logo-white.webp" alt="logo" />
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="col-xl-12 d-none d-lg-block">
                                            <div className="ta-main-menu ta-main-menu__pdpt-29 text-center">
                                                <Menu />
                                            </div>
                                        </div>
                                        <div className="col-xl-3 col-lg-1 col-md-6 col-6 align-self-center justify-content-end d-flex d-lg-none">
                                            <button className="side-info-trigger" onClick={handleMobileMenu}>
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

            <div className="ta-authorinfo-section pt-40">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-2 d-none d-lg-block">
                            <SocialLinks className="ta-social-links__self-bg d-flex align-items-center pt-80" />
                        </div>
                        <div className="col-lg-8">
                            <div className="ta-authorinfo-box text-center">
                                <div className="thumb mx-auto mb-50">
                                    <img src="/assets/img/author/author-big-2.webp" alt="" />
                                </div>
                                <div className="content">
                                    <h1 className="name mb-20">Marlie Evens</h1>
                                    <p>Be the first to know about latest updates, volunteer opportunities, events, and more. <br />
                                        Stories  updates from the Unspoken Smiles team, partners, and supporters. Dontate. Courses: dental <br />
                                        assistants, dentistry, dental professionals  etc.</p>
                                    <div className="ta-buttons mt-45">
                                        <Link href="/contact" className="ta-button">Subscribe <i className="fa fa-paper-plane" /></Link>
                                        <Link href="#0" className="ta-button ta-button__light">Get In Touch</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 d-none d-lg-block">
                            <div className="search-info-wrapper pt-80">
                                <button className="search-trigger" onClick={handleSearch}>
                                    <i className="fa fa-search" />
                                </button>
                                <button className="side-info-trigger" onClick={handleMobileMenu}>
                                    <img src="/assets/img/icons/side-info-icon.webp" alt="" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`search-popup-wrapper ${isSearch ? "is-open" : ""}`}>
                <div className="inner-wrapper">
                    <button className="close-button" onClick={handleSearch}><i className="fal fa-times" /></button>
                    <form method="GET" action="/">
                        <div className="ta-search-box">
                            <input type="search" name="s" placeholder="Search Here..." />
                            <button type="submit"><i className="fal fa-search" /></button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}
