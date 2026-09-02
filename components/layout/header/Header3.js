import Link from "next/link"
import Menu from "../Menu"
import SocialLinks from "@/components/elements/SocialLinks"

export default function Header3({ scroll,handleMobileMenu }) {
    return (
        <>
            <header className="ta-header ta-header__style-5 ta-header__style-10">
                <div className="ta-header__info theme-bg d-none d-lg-block">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 align-self-center">
                                <div className="right-wrapper d-flex align-items-center">
                                    <p><Link href="mailto:info@themealpha.dev"><i className="fa fa-envelope-open" /> info@themealpha.dev</Link></p>
                                </div>
                            </div>
                            <div className="col-lg-8 align-self-center text-end">
                                <p> <span><i className="fas fa-bolt" />Breaking News:</span> #01 Light-Weight  Minimal Blog Theme for Everyone!</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ta-header__top">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3 align-self-center d-none d-md-block">
                                <SocialLinks className="d-flex align-items-center" />
                            </div>
                            <div className="col-md-6 align-self-center">
                                <div className="ta-header__top__center">
                                    <div className="ta-logo">
                                        <Link href="/">
                                            <img className="hide-on-dark" src="/assets/img/logo/logo.webp" alt="logo" />
                                            <img className="show-on-dark" src="/assets/img/logo/logo-white.webp" alt="logo" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 align-self-center d-none d-md-block">
                                <div className="ta-header__top__right">
                                    <Link href="/subscribe" className="ta-button">Subscribe <i className="fa fa-paper-plane" /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`ta-header__menuarea dark-bg ${scroll ? "ta-sticky-header" : ""}`}>
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="menu-area-wrapper menu-area-wrapper__nobg">
                                    <div className="row">
                                        <div className="col-xl-3 col-lg-2 col-md-6 col-8 align-self-center">
                                            <div className="ta-header__menuarea__right justify-content-start">
                                                <div className="ta-search ta-search__light">
                                                    <form action="#">
                                                        <div>
                                                            <button type="submit"><i className="far fa-search" /></button>
                                                            <input type="text" placeholder="Search" />
                                                            <span className="ta-underline" />
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-9 d-none d-lg-block align-self-center">
                                            <div className="ta-main-menu ta-main-menu__style-2 text-center">
                                                <Menu />
                                            </div>
                                        </div>
                                        <div className="col-xl-3 col-lg-1 col-md-6 col-4 d-flex align-self-center justify-content-end">
                                            <button className="side-info-trigger side-info-trigger__light" onClick={handleMobileMenu}>
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
