import Link from "next/link"
import Menu from "../Menu"
import SocialLinks from "@/components/elements/SocialLinks"

export default function Header7({ scroll,handleMobileMenu }) {
    return (
        <>
            <header className="ta-header">
                <div className="ta-header__info theme-bg d-none d-lg-block">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 align-self-center">
                                <p>#01 Light-Weight  Minimal Blog Theme for Everyone!</p>
                            </div>
                            <div className="col-lg-6 align-self-center">
                                <div className="right-wrapper d-flex align-items-center justify-content-end">
                                    <p><Link href="mailto:info@themealpha.dev"><i className="fa fa-envelope-open" /> info@themealpha.dev</Link></p>
                                    <SocialLinks className="ta-social-links__white d-flex align-items-center" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ta-header__top ta-header__top--style-2 ta-border-bottom d-none d-lg-block">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3 align-self-center">
                                <button className="side-info-trigger" onClick={handleMobileMenu}>
                                    <img src="/assets/img/icons/side-info-icon.webp" alt="" />
                                </button>
                            </div>
                            <div className="col-md-5 align-self-center">
                                <div className="ta-header__top__center">
                                    <div className="ta-logo">
                                        <Link href="/">
                                            <img className="hide-on-dark" src="/assets/img/logo/logo.webp" alt="logo" />
                                            <img className="show-on-dark" src="/assets/img/logo/logo-white.webp" alt="logo" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 align-self-center">
                                <div className="ta-header__menuarea__right">
                                    <div className="ta-search mr-30">
                                        <form action="#">
                                            <div>
                                                <button type="submit"><i className="fa fa-search" /></button>
                                                <input type="text" placeholder="Search" />
                                                <span className="ta-underline" />
                                            </div>
                                        </form>
                                    </div>
                                    <Link href="/contact" className="ta-button">Subscribe <i className="fa fa-paper-plane" /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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

        </>
    )
}
