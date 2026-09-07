import Link from "next/link"
import Menu from "../Menu"
import SocialLinks from "@/components/elements/SocialLinks"

export default function Header5({ scroll,handleMobileMenu }) {
    return (
        <>
            <header className="ta-header ta-header__style-5">
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
                                            <img className="hide-on-dark" src="/assets/img/logo/logo.webp" alt="logo" />
                                            <img className="show-on-dark" src="/assets/img/logo/logo-white.webp" alt="logo" />
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
                <div className={`ta-header__menuarea theme-bg ${scroll ? "ta-sticky-header" : ""}`}>
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="menu-area-wrapper menu-area-wrapper__nobg">
                                    <div className="row">
                                        <div className="col-xl-3 col-lg-1 col-md-6 col-4 align-self-center">
                                            <button className="side-info-trigger" onClick={handleMobileMenu}>
                                                <img src="/assets/img/icons/side-info-icon.webp" alt="" />
                                            </button>
                                        </div>
                                        <div className="col-xl-6 col-lg-9 d-none d-lg-block align-self-center">
                                            <div className="ta-main-menu ta-main-menu__style-2">
                                                <Menu />
                                            </div>
                                        </div>
                                        <div className="col-xl-3 col-lg-2 col-md-6 col-8 align-self-center">
                                            <div className="ta-header__menuarea__right">
                                                <div className="ta-search ta-search__light">
                                                    <form action="#">
                                                        <div>
                                                            <button type="submit"><i className="fa fa-search" /></button>
                                                            <input type="text" placeholder="Search" />
                                                            <span className="ta-underline" />
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="shape"><img src="/assets/img/shape/menu-shape-1.webp" alt="" /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

        </>
    )
}
