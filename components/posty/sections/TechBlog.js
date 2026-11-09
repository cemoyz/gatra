
import Link from 'next/link'

export default function TechBlog() {
    return (
        <>
            <section className="tech-blog-area padding pt-0">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="top-area mb-40 title-border">
                                <div className="section-heading">
                                    <h3 className="section-title"><span className="bg-grey-2">Technology</span></h3>
                                </div>
                                <div className="right-btn">
                                    <Link href="/blog-layout-1" className="default-btn">See More</Link>
                                </div>
                            </div>
                            <div className="row tech-top-post">
                                <div className="col-md-6">
                                    <div className="post-thumb">
                                        <img src="/assets/img/post/tech-post-1.jpg" alt="tech" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="post-card">
                                        <div className="post-content">
                                            <Link href="/single-post-1" className="card-btn bg-blue">Tech</Link>
                                            <h3 className="title">
                                                <Link href="/single-post-1">Navigation System Doesn’t Work in Space? We’ll
                                                    See</Link>
                                            </h3>
                                            <ul className="post-list">
                                                <li className="author">
                                                    by <span><Link href="/author-details">David Bin</Link></span>
                                                </li>
                                                <li className="date">July 29, 2024</li>
                                                <li><i className="las la-comments" />5</li>
                                            </ul>
                                            <p>
                                                Lorem ipsum dolor sit amet consectetur. suspendisse nulla aliquam. Risus
                                                rutrum tellus eget ultrices pretium nisi amet facilisis.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tech-post-wrap">
                                <div className="post-card travel-card-2 border-line">
                                    <div className="post-content">
                                        <h3 className="title">
                                            <Link href="/single-post-1">End of the Bonus Coming is Wall Street Works.</Link>
                                        </h3>
                                        <ul className="post-list">
                                            <li className="author">
                                                by <span><Link href="/author-details">David Bin</Link></span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="post-thumb">
                                        <Link href="/single-post-1"><img src="/assets/img/post/tech-post-2.jpg" alt="post" /></Link>
                                    </div>
                                </div>
                                <div className="post-card travel-card-2 border-line">
                                    <div className="post-content">
                                        <h3 className="title">
                                            <Link href="/single-post-1">End of the Bonus Coming is Wall Street Works.</Link>
                                        </h3>
                                        <ul className="post-list">
                                            <li className="author">
                                                by <span><Link href="/author-details">David Bin</Link></span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="post-thumb">
                                        <Link href="/single-post-1"><img src="/assets/img/post/tech-post-3.jpg" alt="post" /></Link>
                                    </div>
                                </div>
                                <div className="post-card travel-card-2">
                                    <div className="post-content">
                                        <h3 className="title">
                                            <Link href="/single-post-1">End of the Bonus Coming is Wall Street Works.</Link>
                                        </h3>
                                        <ul className="post-list">
                                            <li className="author">
                                                by <span><Link href="/author-details">David Bin</Link></span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="post-thumb">
                                        <Link href="/single-post-1"><img src="/assets/img/post/tech-post-4.jpg" alt="post" /></Link>
                                    </div>
                                </div>
                                <div className="post-card travel-card-2">
                                    <div className="post-content">
                                        <h3 className="title">
                                            <Link href="/single-post-1">End of the Bonus Coming is Wall Street Works.</Link>
                                        </h3>
                                        <ul className="post-list">
                                            <li className="author">
                                                by <span><Link href="/author-details">David Bin</Link></span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="post-thumb">
                                        <Link href="/single-post-1"><img src="/assets/img/post/tech-post-5.jpg" alt="post" /></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="top-area mb-40 title-border">
                                <div className="section-heading">
                                    <h3 className="section-title"><span className="bg-grey-2">Comments</span></h3>
                                </div>
                            </div>
                            <div className="list-post-area">
                                <div className="list-post-card">
                                    <div className="post-img">
                                        <Link href="/single-post-1"><img src="/assets/img/post/list-post-img-1.png" alt="post" /></Link>
                                        <div className="icon">
                                            <i />
                                        </div>
                                    </div>
                                    <div className="post-content">
                                        <h3 className="title">
                                            <Link href="/single-post-1">The Season Courses and Salads wow!</Link>
                                        </h3>
                                        <span>July 29, 2024</span>
                                    </div>
                                </div>
                                <div className="list-post-card">
                                    <div className="post-img">
                                        <Link href="/single-post-1"><img src="/assets/img/post/list-post-img-2.png" alt="post" /></Link>
                                    </div>
                                    <div className="post-content">
                                        <h3 className="title">
                                            <Link href="/single-post-1">Catch the Best iPhone 13 Deals Favorite gadgets</Link>
                                        </h3>
                                        <span>July 29, 2024</span>
                                    </div>
                                </div>
                                <div className="list-post-card">
                                    <div className="post-img">
                                        <Link href="/single-post-1"><img src="/assets/img/post/list-post-img-4.png" alt="post" /></Link>
                                    </div>
                                    <div className="post-content">
                                        <h3 className="title">
                                            <Link href="/single-post-1">Which Game to Choose for Your Kids Middle School</Link>
                                        </h3>
                                        <span>July 29, 2024</span>
                                    </div>
                                </div>
                                <div className="list-post-card">
                                    <div className="post-img">
                                        <Link href="/single-post-1"><img src="/assets/img/post/list-post-img-5.png" alt="post" /></Link>
                                    </div>
                                    <div className="post-content">
                                        <h3 className="title">
                                            <Link href="/single-post-1">The Widening Impact of the Motion Design Industry</Link>
                                        </h3>
                                        <span>July 29, 2024</span>
                                    </div>
                                </div>
                                <div className="list-post-card">
                                    <div className="post-img">
                                        <Link href="/single-post-1"><img src="/assets/img/post/list-post-img-3.png" alt="post" /></Link>
                                    </div>
                                    <div className="post-content">
                                        <h3 className="title">
                                            <Link href="/single-post-1">If You Ever Decide to Travel to a Volcano…</Link>
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
