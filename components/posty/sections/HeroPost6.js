
import Link from 'next/link'

export default function HeroPost6() {
    return (
        <>
            <section className="hero-post-4">
                <div className="row hero-wrap">
                    <div className="col-lg-3 col-md-6">
                        <div className="hero-item item-1">
                            <div className="hero-img text-center">
                                <Link href="/#"><img src="/assets/img/images/hero-img-1.png" alt="hero" /></Link>
                            </div>
                            <div className="post-card hero-card">
                                <div className="post-content">
                                    <Link href="/single-post-1" className="card-btn bg-red">Design</Link>
                                    <h3 className="title">
                                        <Link href="/single-post">64 Creative Marketing Ideas to Boost Your Business</Link>
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
                    <div className="col-lg-3 col-md-6">
                        <div className="hero-item item-2">
                            <div className="hero-img text-center">
                                <Link href="/single-post"><img src="/assets/img/images/hero-img-2.png" alt="hero" /></Link>
                            </div>
                            <div className="post-card hero-card">
                                <div className="post-content">
                                    <Link href="/single-post-1" className="card-btn bg-blue">News</Link>
                                    <h3 className="title">
                                        <Link href="/single-post">Tips Debugging with CMS code Optimization Quick</Link>
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
                    <div className="col-lg-3 col-md-6">
                        <div className="hero-item item-3">
                            <div className="hero-img text-center">
                                <Link href="/single-post"><img src="/assets/img/images/hero-img-3.png" alt="hero" /></Link>
                            </div>
                            <div className="post-card hero-card">
                                <div className="post-content">
                                    <Link href="/single-post-1" className="card-btn bg-green">illustration</Link>
                                    <h3 className="title">
                                        <Link href="/single-post">A Guide to Effective SEO Tactics to Improve Ranking</Link>
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
                    <div className="col-lg-3 col-md-6">
                        <div className="hero-item item-4">
                            <div className="hero-img text-center">
                                <Link href="/single-post"><img src="/assets/img/images/hero-img-4.png" alt="hero" /></Link>
                            </div>
                            <div className="post-card hero-card">
                                <div className="post-content">
                                    <Link href="/single-post-1" className="card-btn bg-blue-2">3d art</Link>
                                    <h3 className="title">
                                        <Link href="/single-post">Definitive Guide to Marketing Metrics, Analytics</Link>
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
