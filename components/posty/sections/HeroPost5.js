
import Link from 'next/link'

export default function HeroPost5() {
    return (
        <>
            <section className="hero-post-3 bg-grey-2 padding">
                <div className="container">
                    <div className="row hero-top-wrap">
                        <div className="col-lg-8">
                            <div className="post-card top-post mb-25">
                                <div className="post-thumb">
                                    <Link href="/single-post-1"><img src="/assets/img/post/hero-post-7.jpg" alt="post" /></Link>
                                </div>
                                <div className="post-content">
                                    <Link href="/single-post-1" className="card-btn bg-blue">Tech</Link>
                                    <h3 className="title">
                                        <Link href="/single-post-1">Winners of the 2022 the Nature Conservancy any Contest</Link>
                                    </h3>
                                    <ul className="post-list">
                                        <li className="author">
                                            by <span><Link href="/author-details">David Bin</Link></span>
                                        </li>
                                        <li className="date">July 29, 2024</li>
                                        <li><i className="las la-comments" />5</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="post-card top-post top-2 mb-25">
                                <div className="post-thumb">
                                    <Link href="/single-post-1"><img src="/assets/img/post/hero-post-8.jpg" alt="post" /></Link>
                                </div>
                                <div className="post-content">
                                    <Link href="/single-post-1" className="card-btn">Tech News</Link>
                                    <h3 className="title">
                                        <Link href="/single-post-1">Learn the of Product Design With This $20 eBook Bundle</Link>
                                    </h3>
                                    <ul className="post-list">
                                        <li className="author">
                                            by <span><Link href="/author-details">David Bin</Link></span>
                                        </li>
                                        <li className="date">July 29, 2024</li>
                                        <li><i className="las la-comments" />5</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row hero-bottom-wrap justify-content-center">
                        <div className="col-lg-4 col-md-6">
                            <div className="post-card gadget-card mb-25">
                                <div className="post-thumb">
                                    <Link href="/single-post-1"><img src="/assets/img/post/gadget-post-1.jpg" alt="post" /></Link>
                                </div>
                                <div className="post-content">
                                    <Link href="/single-post-1" className="card-btn bg-blue-light">Gadget</Link>
                                    <h3 className="title">
                                        <Link href="/single-post-1">How to Sell Online: Finding any Products for Your Store</Link>
                                    </h3>
                                    <ul className="post-list">
                                        <li className="author">
                                            by <span><Link href="/author-details">David Bin</Link></span>
                                        </li>
                                        <li className="date">July 29, 2024</li>
                                        <li><i className="las la-comments" />5</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="post-card gadget-card mb-25">
                                <div className="post-thumb">
                                    <Link href="/single-post-1"><img src="/assets/img/post/gadget-post-2.jpg" alt="post" /></Link>
                                </div>
                                <div className="post-content">
                                    <Link href="/single-post-1" className="card-btn bg-red">Tech News</Link>
                                    <h3 className="title">
                                        <Link href="/single-post-1">15 ways you can your phone your productivity</Link>
                                    </h3>
                                    <ul className="post-list">
                                        <li className="author">
                                            by <span><Link href="/author-details">David Bin</Link></span>
                                        </li>
                                        <li className="date">July 29, 2024</li>
                                        <li><i className="las la-comments" />5</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="post-card gadget-card">
                                <div className="post-thumb">
                                    <Link href="/single-post-1"><img src="/assets/img/post/gadget-post-3.jpg" alt="post" /></Link>
                                </div>
                                <div className="post-content">
                                    <Link href="/single-post-1" className="card-btn bg-blue-light">Gadget</Link>
                                    <h3 className="title">
                                        <Link href="/single-post-1">Code Using Python With This Discounted Boot Camp</Link>
                                    </h3>
                                    <ul className="post-list">
                                        <li className="author">
                                            by <span><Link href="/author-details">David Bin</Link></span>
                                        </li>
                                        <li className="date">July 29, 2024</li>
                                        <li><i className="las la-comments" />5</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
