
import Link from 'next/link'

export default function Trending2() {
    return (
        <>
            <section className="trending-section-2 bg-grey-2 padding">
                <div className="container">
                    <div className="section-heading mb-40">
                        <h3 className="section-title title-border"><span className="bg-grey-2">Trending Post</span></h3>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-md-6">
                            <div className="post-card trending-card">
                                <div className="post-thumb">
                                    <Link href="/single-post-1"><img src="/assets/img/post/trending-post-5.jpg" alt="post" /></Link>
                                </div>
                                <div className="post-content">
                                    <Link href="/single-post-1" className="card-btn-2">Basketball</Link>
                                    <h3 className="title">
                                        <Link href="/single-post-1">Top 5 Reasons Why Basketball is the Greatest Sport of All
                                            Time</Link>
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
                        <div className="col-lg-3 col-md-6">
                            <div className="post-card trending-card">
                                <div className="post-thumb">
                                    <Link href="/single-post-1"><img src="/assets/img/post/trending-post-6.jpg" alt="post" /></Link>
                                </div>
                                <div className="post-content">
                                    <Link href="/single-post-1" className="card-btn-2">Formulla 1</Link>
                                    <h3 className="title">
                                        <Link href="/single-post-1">What is the Architecture of a Formula 1 Race Circuit?</Link>
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
                        <div className="col-lg-3 col-md-6">
                            <div className="post-card trending-card">
                                <div className="post-thumb">
                                    <Link href="/single-post-1"><img src="/assets/img/post/trending-post-7.jpg" alt="post" /></Link>
                                </div>
                                <div className="post-content">
                                    <Link href="/single-post-1" className="card-btn-2">Football</Link>
                                    <h3 className="title">
                                        <Link href="/single-post-1">Motor and Cognitive Growth Follow Football Training.</Link>
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
                        <div className="col-lg-3 col-md-6">
                            <div className="post-card trending-card">
                                <div className="post-thumb">
                                    <Link href="/single-post-1"><img src="/assets/img/post/trending-post-8.jpg" alt="post" /></Link>
                                </div>
                                <div className="post-content">
                                    <Link href="/single-post-1" className="card-btn-2">Rugby</Link>
                                    <h3 className="title">
                                        <Link href="/single-post-1">The Best Rugby Streaming to Watch Live Games Legally</Link>
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
