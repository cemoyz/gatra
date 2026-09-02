import Link from "next/link"
import Menu from "../Menu"

export default function Header2({ scroll,handleMobileMenu }) {
    return (
        <>
            <header className="ta-header ta-header__style-4 pt-0">
                <div className="ta-header__info theme-bg">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12 text-center">
                                <p>#01 Light-Weight  Minimal Blog Theme for Everyone!</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`ta-header__menuarea pt-15 ${scroll ? "ta-sticky-header" : ""}`}>
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="menu-area-wrapper menu-area-wrapper__nobg">
                                    <div className="row">
                                        <div className="col-lg-2 col-md-6 col-6 align-self-center">
                                            <div className="ta-logo">
                                                <Link href="/">
                                                    <img className="hide-on-dark" src="/assets/img/logo/logo.webp" alt="logo" />
                                                    <img className="show-on-dark" src="/assets/img/logo/logo-white.webp" alt="logo" />
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="col-lg-7 d-none d-lg-block align-self-center">
                                            <div className="ta-main-menu text-center">
                                                <Menu />
                                            </div>
                                        </div>
                                        <div className="col-lg-3 align-self-center d-none d-lg-block">
                                            <div className="ta-header__menuarea__right">
                                                <Link href="/contact" className="ta-button">Subscribe <i className="fa fa-paper-plane" /></Link>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-6 align-self-center justify-content-end d-flex d-lg-none">
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
