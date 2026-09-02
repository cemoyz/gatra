import Link from "next/link"

export default function Footer8() {
    return (
        <div>
            <footer className="ta-footer ta-footer__style-2 ta-dark-mode" data-ta-sticky-footer>
                <div className="container pt-100">
                    <div className="row mt-none-30">
                        <div className="col-xl-2 col-lg-4 col-md-4 col-sm-6 mt-30">
                            <div className="ta-footer-widget widget">
                                <h4 className="widget-title">Company</h4>
                                <ul>
                                    <li><Link href="/about-us">About Us</Link></li>
                                    <li><Link href="/contact">Press</Link></li>
                                    <li><Link href="/contact">Support</Link></li>
                                    <li><Link href="/contact">Get In Touch</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-2 col-lg-4 col-md-4 col-sm-6 mt-30">
                            <div className="ta-footer-widget widget">
                                <h4 className="widget-title">Resources</h4>
                                <ul>
                                    <li><Link href="/contact">Promotions</Link></li>
                                    <li><Link href="/about-us">Terms  Conditions</Link></li>
                                    <li><Link href="/about-us">FAQ Page</Link></li>
                                    <li><Link href="/blog-details-video">Video</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-2 col-lg-4 col-md-4 col-sm-6 mt-30">
                            <div className="ta-footer-widget widget">
                                <h4 className="widget-title">Press Kit</h4>
                                <ul>
                                    <li><Link href="/about-us">Logo</Link></li>
                                    <li><Link href="/about-us">Ads Banner</Link></li>
                                    <li><Link href="/about-us">Color Plate</Link></li>
                                    <li><Link href="/about-us">Ui Kits</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6 mt-30">
                            <div className="ta-footer-widget widget">
                                <h4 className="widget-title">Popular Tags</h4>
                                <div className="menu-list-wrapper">
                                    <ul>
                                        <li><Link href="/blog-filter-category">Business</Link></li>
                                        <li><Link href="/blog-filter-category">Technology</Link></li>
                                        <li><Link href="/blog-filter-category">AI Solution</Link></li>
                                        <li><Link href="/blog-filter-category">Sports</Link></li>
                                    </ul>
                                    <ul>
                                        <li><Link href="/blog-filter-category">UI  UX</Link></li>
                                        <li><Link href="/blog-filter-category">Museum</Link></li>
                                        <li><Link href="/blog-filter-category">Movie</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-8 col-sm-10 col-md-8 mt-30">
                            <div className="ta-footer-widget widget">
                                <div className="insta-gallery">
                                    <div className="item ta-stroke"><img src="/assets/img/insta/insta-1.webp" alt="img" /></div>
                                    <div className="item ta-stroke"><img src="/assets/img/insta/insta-2.webp" alt="img" /></div>
                                    <div className="item ta-stroke"><img src="/assets/img/insta/insta-3.webp" alt="img" /></div>
                                    <div className="item ta-stroke"><img src="/assets/img/insta/insta-4.webp" alt="img" /></div>
                                    <div className="item ta-stroke"><img src="/assets/img/insta/insta-5.webp" alt="img" /></div>
                                    <div className="item ta-stroke"><img src="/assets/img/insta/insta-6.webp" alt="img" /></div>
                                </div>
                                <h6 className="title">@Hoom.Design</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ta-footer__bottom pt-100 pb-6">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="ta-bottom-wrapper ta-stroke">
                                    <div className="ta-bottom-left">
                                        <p>NextJS template by
                                            <Link href="https://themeforest.net/user/AliThemes.com"> AliThemes.com</Link>
                                        </p>
                                    </div>
                                    <div className="ta-bottom-right">
                                        <p>View more <Link href="https://themeforest.net/user/alithemes/portfolio">Projects</Link></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

        </div>
    )
}
