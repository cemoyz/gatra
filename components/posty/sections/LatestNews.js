
import Link from 'next/link'

export default function LatestNews() {
    return (
        <>
            <section className="latest-news-area padding pt-0">
                <div className="container">
                    <div className="top-area mb-40 title-border">
                        <div className="section-heading">
                            <h3 className="section-title"><span className="bg-grey-2">Recent Post</span></h3>
                        </div>
                        <div className="right-btn white">
                            <Link href="/blog-default" className="default-btn">See More</Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="left-post-area">
                                <div className="post-card latest-post">
                                    <div className="post-thumb">
                                        <Link href="/single-post-1"><img src="/assets/img/post/latest-post-1.jpg" alt="post" /></Link>
                                    </div>
                                    <div className="post-content">
                                        <Link href="/single-post-1" className="card-btn bg-green">illustration</Link>
                                        <h3 className="title">
                                            <Link href="/single-post-1">Graphic Design Trends That Will Help Your Business</Link>
                                        </h3>
                                        <ul className="post-list">
                                            <li className="author">
                                                by <span><Link href="/author-details">David Bin</Link></span>
                                            </li>
                                            <li className="date">July 29, 2024</li>
                                            <li><i className="las la-comments" />5</li>
                                        </ul>
                                        <p>
                                            Lorem ipsum dolor sit amet consectetur. Tellus suspen any more at disse reasy
                                            nulla aliquam.
                                        </p>
                                    </div>
                                </div>
                                <div className="post-card latest-post">
                                    <div className="post-thumb">
                                        <Link href="/single-post-1"><img src="/assets/img/post/latest-post-2.jpg" alt="post" /></Link>
                                    </div>
                                    <div className="post-content">
                                        <Link href="/single-post-1" className="card-btn bg-green">illustration</Link>
                                        <h3 className="title">
                                            <Link href="/single-post-1">Marketing Trends Insights in Design and Graphics</Link>
                                        </h3>
                                        <ul className="post-list">
                                            <li className="author">
                                                by <span><Link href="/author-details">David Bin</Link></span>
                                            </li>
                                            <li className="date">July 29, 2024</li>
                                            <li><i className="las la-comments" />5</li>
                                        </ul>
                                        <p>
                                            Lorem ipsum dolor sit amet consectetur. Tellus suspen any more at disse reasy
                                            nulla aliquam.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="list-post-area list-2 latest-list">
                                <div className="list-post-card">
                                    <div className="post-img">
                                        <Link href="/single-post-1"><img src="/assets/img/post/trending-post-1.jpg" alt="post" /></Link>
                                    </div>
                                    <div className="post-content">
                                        <h3 className="title">
                                            <Link href="/single-post-1">The Climate Shift in Allows Venice to Recover</Link>
                                        </h3>
                                        <span>July 29, 2024</span>
                                    </div>
                                </div>
                                <div className="list-post-card">
                                    <div className="post-img">
                                        <Link href="/single-post-1"><img src="/assets/img/post/trending-post-2.jpg" alt="post" /></Link>
                                    </div>
                                    <div className="post-content">
                                        <h3 className="title">
                                            <Link href="/single-post-1">Football and Figure Skating Collide to The Crowd’s
                                                Delight</Link>
                                        </h3>
                                        <span>July 29, 2024</span>
                                    </div>
                                </div>
                                <div className="list-post-card">
                                    <div className="post-img">
                                        <Link href="/single-post-1"><img src="/assets/img/post/trending-post-3.jpg" alt="post" /></Link>
                                    </div>
                                    <div className="post-content">
                                        <h3 className="title">
                                            <Link href="/single-post-1">Tips to Keep Cloud Storage Safe and Secure</Link>
                                        </h3>
                                        <span>July 29, 2024</span>
                                    </div>
                                </div>
                                <div className="list-post-card">
                                    <div className="post-img">
                                        <Link href="/single-post-1"><img src="/assets/img/post/trending-post-4.jpg" alt="post" /></Link>
                                    </div>
                                    <div className="post-content">
                                        <h3 className="title">
                                            <Link href="/single-post-1">The Season Courses and any Salads wow!</Link>
                                        </h3>
                                        <span>July 29, 2024</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
