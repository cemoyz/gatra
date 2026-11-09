import Link from "next/link"

export default function Footer1() {
    return (
        <>

            <footer className="footer-section">
                <div className="footer-top padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-md-6">
                                <div className="footer-item">
                                    <h3 className="footer-header">About Us</h3>
                                    <div className="footer-content">
                                        <p className="desc">
                                            Lorem ipsum dolo consectetur the a adipiscing Lobortis mattis neque any
                                            adipiscing the nisl. dolo consectetur the a adipiscing.
                                        </p>
                                        <ul className="contact-list">
                                            <li>
                                                Email Us: <Link href="/mailto:infouemail@gmail.com">infouemail@gmail.com</Link>
                                            </li>
                                            <li>Contact: <Link href="/tel:+5-784-8894-678">+5-784-8894-678</Link></li>
                                            <li>
                                                <ul className="footer-social">
                                                    <li>
                                                        <Link href="/#"><i className="lab la-facebook-f" /></Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/#"><i className="lab la-twitter" /></Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/#"><i className="lab la-linkedin-in" /></Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/#"><i className="lab la-instagram" /></Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/#"><i className="lab la-pinterest-p" /></Link>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="footer-item">
                                    <h3 className="footer-header">Top Post</h3>
                                    <div className="footer-content">
                                        <ul className="footer-post-list">
                                            <li>
                                                <Link href="/single-post-1"><img src="/assets/img/images/footer-post-1.jpg" alt="post" /></Link>
                                                <h4 className="post-title">
                                                    <Link href="/single-post-1">The Season Courses and item Salads wow!
                                                        <span>July 29, 2024</span></Link>
                                                </h4>
                                            </li>
                                            <li>
                                                <Link href="/single-post-1"><img src="/assets/img/images/footer-post-2.jpg" alt="post" /></Link>
                                                <h4 className="post-title">
                                                    <Link href="/single-post-1">The Season Courses and item Salads wow!
                                                        <span>July 29, 2024</span></Link>
                                                </h4>
                                            </li>
                                            <li>
                                                <Link href="/single-post-1"><img src="/assets/img/images/footer-post-3.jpg" alt="post" /></Link>
                                                <h4 className="post-title">
                                                    <Link href="/single-post-1">The Season Courses and item Salads wow!
                                                        <span>July 29, 2024</span></Link>
                                                </h4>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="footer-item">
                                    <h3 className="footer-header">Top Comment</h3>
                                    <div className="footer-content">
                                        <ul className="comment-list">
                                            <li>
                                                <div className="icon">
                                                    <i className="las la-comments" />
                                                </div>
                                                <div className="comment-content">
                                                    <h4 className="comment-author">
                                                        <Link href="/author-details">David Bin</Link> <span>On</span>
                                                    </h4>
                                                    <span className="comment">Navigation System Doesn Work in Read Space? We’ll
                                                        See</span>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="icon">
                                                    <i className="las la-comments" />
                                                </div>
                                                <div className="comment-content">
                                                    <h4 className="comment-author">
                                                        <Link href="/author-details">David Bin</Link> <span>On</span>
                                                    </h4>
                                                    <span className="comment">Navigation System Doesn Work in Read Space? We’ll
                                                        See</span>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="icon">
                                                    <i className="las la-comments" />
                                                </div>
                                                <div className="comment-content">
                                                    <h4 className="comment-author">
                                                        <Link href="/author-details">David Bin</Link> <span>On</span>
                                                    </h4>
                                                    <span className="comment">Navigation System Doesn Work in Read Space? We’ll
                                                        See</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* ./ footer-top */}
                <div className="footer-bottom">
                    <div className="container">
                        <div className="footer-bottom-wrap">
                            <div className="footer-logo">
                                <Link href="/"><img src="/assets/img/logo/logo-light.png" alt="logo" /></Link>
                            </div>
                            <ul className="footer-menu-list">
                                <li><Link href="/index-2">Home</Link></li>
                                <li><Link href="/video-playlist-1">Features</Link></li>
                                <li><Link href="/blog-default">Categories</Link></li>
                                <li><Link href="/blog-layout-1">Design</Link></li>
                                <li><Link href="/contact">Contact</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* ./ footer-bottom */}
                <div className="copyright-area">
                    <div className="container">
                        <div className="copyright-wrap">
                            <p><span>Posty </span> {new Date().getFullYear()}. All Rights Reserved.</p>
                            <ul className="list">
                                <li><Link href="/contact">.Contact</Link></li>
                                <li><Link href="/blog-default">.Blog</Link></li>
                                <li><Link href="/contact">.Complaint</Link></li>
                                <li><Link href="/contact">.Advertise</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* ./ copyright-area */}
            </footer>


        </>
    )
}
