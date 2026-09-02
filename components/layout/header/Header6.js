import Link from "next/link"
import Menu from "../Menu"

export default function Header6({ scroll,handleMobileMenu }) {
    return (
        <>
            <header className="ta-header ta-header__style-4">
                <div className={`ta-header__menuarea ${scroll ? "ta-sticky-header" : ""}`}>
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="menu-area-wrapper menu-area-wrapper__nobg">
                                    <div className="row">
                                        <div className="col-xl-2 col-lg-2 col-md-6 col-6 align-self-center">
                                            <div className="ta-logo">
                                                <Link href="/">
                                                    <img className="hide-on-dark" src="/assets/img/logo/logo.webp" alt="logo" />
                                                    <img className="show-on-dark" src="/assets/img/logo/logo-white.webp" alt="logo" />
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 align-self-center d-none d-lg-block">
                                            <div className="ta-main-menu">
                                                <Menu />
                                            </div>
                                        </div>
                                        <div className="col-xl-4 col-lg-4 d-none d-lg-block align-self-center">
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
