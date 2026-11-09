
import Link from 'next/link'

export default function LatestPost() {
    return (
        <>
            <section className="latest-post-area padding">
                <div className="container">
                    <div className="top-area mb-40 title-border">
                        <div className="section-heading">
                            <h3 className="section-title"><span className="bg-grey-2">Latest Post</span></h3>
                        </div>
                    </div>
                    <div className="row" data-masonry="{&quot;percentPosition&quot;: true }">
                        <div className="col-lg-4 col-md-6">
                            <div className="post-card latest-card">
                                <div className="post-thumb-2">
                                    <Link href="/single-post-1"><img src="/assets/img/post/illustration-1.jpg" alt="post" /></Link>
                                </div>
                                <div className="post-content">
                                    <Link href="/single-post-1" className="card-btn bg-red">Design</Link>
                                    <h3 className="title">
                                        <Link href="/single-post-1">Navigation System Doesn’t Work in Space? We’ll See</Link>
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
                            <div className="post-card latest-card">
                                <div className="post-thumb-2">
                                    <Link href="/single-post-1"><img src="/assets/img/post/illustration-2.jpg" alt="post" /></Link>
                                </div>
                                <div className="post-content">
                                    <Link href="/single-post-1" className="card-btn bg-green">illustration</Link>
                                    <h3 className="title">
                                        <Link href="/single-post-1">Why UX Designers Should Learn Graphic Design?</Link>
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
                            <div className="post-card latest-card">
                                <div className="post-thumb-2">
                                    <Link href="/single-post-1"><img src="/assets/img/post/illustration-3.jpg" alt="post" /></Link>
                                </div>
                                <div className="post-content">
                                    <Link href="/single-post-1" className="card-btn bg-blue-2">News</Link>
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
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="post-card latest-card">
                                <div className="post-thumb-2">
                                    <Link href="/single-post-1"><img src="/assets/img/post/illustration-4.jpg" alt="post" /></Link>
                                </div>
                                <div className="post-content">
                                    <Link href="/single-post-1" className="card-btn bg-red">Design</Link>
                                    <h3 className="title">
                                        <Link href="/single-post-1">Navigation System Doesn’t Work in Space? We’ll See</Link>
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
                            <div className="post-card latest-card">
                                <div className="post-thumb-2">
                                    <Link href="/single-post-1"><img src="/assets/img/post/illustration-5.jpg" alt="post" /></Link>
                                </div>
                                <div className="post-content">
                                    <Link href="/single-post-1" className="card-btn bg-green">illustration</Link>
                                    <h3 className="title">
                                        <Link href="/single-post-1">Why UX Designers Should Learn Graphic Design?</Link>
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
                            <div className="post-card latest-card">
                                <div className="post-thumb-2">
                                    <Link href="/single-post-1"><img src="/assets/img/post/illustration-6.jpg" alt="post" /></Link>
                                </div>
                                <div className="post-content">
                                    <Link href="/single-post-1" className="card-btn bg-blue-2">News</Link>
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
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="post-card latest-card">
                                <div className="post-thumb-2">
                                    <Link href="/single-post-1"><img src="/assets/img/post/illustration-8.jpg" alt="post" /></Link>
                                </div>
                                <div className="post-content">
                                    <Link href="/single-post-1" className="card-btn bg-red">Design</Link>
                                    <h3 className="title">
                                        <Link href="/single-post-1">Navigation System Doesn’t Work in Space? We’ll See</Link>
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
                            <div className="post-card latest-card">
                                <div className="post-thumb-2">
                                    <Link href="/single-post-1"><img src="/assets/img/post/illustration-7.jpg" alt="post" /></Link>
                                </div>
                                <div className="post-content">
                                    <Link href="/single-post-1" className="card-btn bg-green">illustration</Link>
                                    <h3 className="title">
                                        <Link href="/single-post-1">Why UX Designers Should Learn Graphic Design?</Link>
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
                            <div className="post-card latest-card">
                                <div className="post-thumb-2">
                                    <Link href="/single-post-1"><img src="/assets/img/post/illustration-9.jpg" alt="post" /></Link>
                                </div>
                                <div className="post-content">
                                    <Link href="/single-post-1" className="card-btn bg-blue-2">News</Link>
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
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="post-card latest-card">
                                <div className="post-thumb-2">
                                    <Link href="/single-post-1"><img src="/assets/img/post/illustration-11.jpg" alt="post" /></Link>
                                </div>
                                <div className="post-content">
                                    <Link href="/single-post-1" className="card-btn bg-red">Design</Link>
                                    <h3 className="title">
                                        <Link href="/single-post-1">Navigation System Doesn’t Work in Space? We’ll See</Link>
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
                            <div className="post-card latest-card">
                                <div className="post-thumb-2">
                                    <Link href="/single-post-1"><img src="/assets/img/post/illustration-10.jpg" alt="post" /></Link>
                                </div>
                                <div className="post-content">
                                    <Link href="/single-post-1" className="card-btn bg-green">illustration</Link>
                                    <h3 className="title">
                                        <Link href="/single-post-1">Why UX Designers Should Learn Graphic Design?</Link>
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
                            <div className="post-card latest-card">
                                <div className="post-thumb-2">
                                    <Link href="/single-post-1"><img src="/assets/img/post/illustration-12.jpg" alt="post" /></Link>
                                </div>
                                <div className="post-content">
                                    <Link href="/single-post-1" className="card-btn bg-blue-2">News</Link>
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
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="latest-btn text-center">
                        <Link href="/#" className="default-btn">Load More</Link>
                    </div>
                </div>
            </section>
        </>
    )
}
