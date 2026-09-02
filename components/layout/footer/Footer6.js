import Newsletter2 from "@/components/sections/Newsletter2"
import Link from "next/link"
import SocialLinks from "@/components/elements/SocialLinks"

export default function Footer6() {
    return (
        <>
            <footer className="ta-footer pb-100">
                <Newsletter2 />
                <div className="container pt-100">
                    <div className="row justify-content-center">
                        <div className="col-xl-10">
                            <div className="row mt-none-30">
                                <div className="col-xl-3 col-lg-3 mt-30">
                                    <div className="ta-footer-widget ta-footer-widget__style-2 widget text-center">
                                        <div className="shape mb-50"><img src="/assets/img/shape/footer-widget-shape.webp" alt="" /></div>
                                        <ul>
                                            <li><Link href="#0">Privacy  Policy</Link></li>
                                            <li><Link href="#0">Terms  Conditions</Link></li>
                                            <li><Link href="#0">About Us</Link></li>
                                            <li><Link href="#0">Submit Report</Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 mt-30">
                                    <div className="ta-footer-widget ta-footer-widget__style-2 widget">
                                        <div className="ta-about-info-widget">
                                            <div className="ta-logo d-flex align-items-center justify-content-center flex-column text-center">
                                                <Link href="/">
                                                    <img className="hide-on-dark" src="/assets/img/logo/logo.webp" alt="logo" />
                                                    <img className="show-on-dark" src="/assets/img/logo/logo-white.webp" alt="logo" />
                                                </Link>
                                                <span>Next-Gen Personal Blog Theme</span>
                                            </div>
                                            <SocialLinks className="pt-55 d-flex align-items-center justify-content-center" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-3 mt-30">
                                    <div className="ta-footer-widget ta-footer-widget__style-2 widget text-center">
                                        <div className="shape mb-50"><img src="/assets/img/shape/footer-widget-shape.webp" alt="" /></div>
                                        <ul>
                                            <li><Link href="#0">Shipping Info</Link></li>
                                            <li><Link href="#0">Returns/Exchanges</Link></li>
                                            <li><Link href="#0">Get In Touch</Link></li>
                                            <li><Link href="#0">Careers</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ta-footer__bottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="ta-bottom-wrapper ta-bottom-wrapper__style-2 justify-content-center">
                                    <div className="ta-bottom-left text-center">
                                        <p>NextJS template by
                                            <Link href="https://themeforest.net/user/AliThemes.com"> AliThemes.com</Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>


        </>
    )
}
