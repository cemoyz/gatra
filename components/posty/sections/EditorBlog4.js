
import Link from 'next/link'

export default function EditorBlog4() {
    return (
        <>
            <section className="editor-blog-area padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="section-heading mb-40">
                                <h3 className="section-title title-border"><span>Traveling</span></h3>
                            </div>
                            <div className="travel-post-wrap">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="post-card travel-card">
                                            <div className="post-thumb">
                                                <Link href="/single-post-1"><img src="/assets/img/post/editor-sports-1.jpg" alt="post" /></Link>
                                            </div>
                                            <div className="post-content">
                                                <Link href="/single-post-1" className="card-btn bg-green">Travel</Link>
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
                                                    rutrum tellus eget ultrices pretium nisi amet facilisis egestas cursus
                                                    vivamus.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="post-card travel-card-2">
                                            <div className="post-content">
                                                <h3 className="title">
                                                    <Link href="/single-post-1">End of the Bonus Coming is Wall Street
                                                        Works.</Link>
                                                </h3>
                                                <ul className="post-list">
                                                    <li className="author">
                                                        by <span><Link href="/author-details">David Bin</Link></span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="post-thumb">
                                                <Link href="/single-post-1"><img src="/assets/img/post/editor-sports-2.jpg" alt="post" /></Link>
                                            </div>
                                        </div>
                                        <div className="post-card travel-card-2">
                                            <div className="post-content">
                                                <h3 className="title">
                                                    <Link href="/single-post-1">End of the Bonus Coming is Wall Street
                                                        Works.</Link>
                                                </h3>
                                                <ul className="post-list">
                                                    <li className="author">
                                                        by <span><Link href="/author-details">David Bin</Link></span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="post-thumb">
                                                <Link href="/single-post-1"><img src="/assets/img/post/editor-sports-3.jpg" alt="post" /></Link>
                                            </div>
                                        </div>
                                        <div className="post-card travel-card-2">
                                            <div className="post-content">
                                                <h3 className="title">
                                                    <Link href="/single-post-1">End of the Bonus Coming is Wall Street
                                                        Works.</Link>
                                                </h3>
                                                <ul className="post-list">
                                                    <li className="author">
                                                        by <span><Link href="/author-details">David Bin</Link></span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="post-thumb">
                                                <Link href="/single-post-1"><img src="/assets/img/post/editor-sports-4.jpg" alt="post" /></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="section-heading mb-40">
                                <h3 className="section-title title-border"><span>Follow Us</span></h3>
                            </div>
                            <div className="social-box-wrap">
                                <div className="social-box facebook">
                                    <Link href="/#"><i className="lab la-facebook-square" /></Link>
                                    <h4 className="title"><Link href="/#">Facebook</Link> <span>23k Likes</span></h4>
                                </div>
                                <div className="social-box twitter">
                                    <Link href="/#" className="icon"><i className="lab la-twitter" /></Link>
                                    <h4 className="title"><Link href="/#">Twitter</Link> <span>56k Followers</span></h4>
                                </div>
                                <div className="social-box youtube">
                                    <Link href="/#" className="icon"><i className="lab la-youtube" /></Link>
                                    <h4 className="title"><Link href="/#">Youtube</Link> <span>56k Subscribe</span></h4>
                                </div>
                                <div className="social-box spotify">
                                    <Link href="/#" className="icon"><i className="lab la-spotify" /></Link>
                                    <h4 className="title"><Link href="/#">Spotify</Link> <span>14k Followers</span></h4>
                                </div>
                                <div className="social-box insta">
                                    <Link href="/#" className="icon"><i className="lab la-instagram" /></Link>
                                    <h4 className="title"><Link href="/#">Instagram</Link> <span>5m Followers</span></h4>
                                </div>
                                <div className="social-box pinterest">
                                    <Link href="/#" className="icon"><i className="lab la-pinterest-p" /></Link>
                                    <h4 className="title"><Link href="/#">Pinterest</Link> <span>59k Followers</span></h4>
                                </div>
                            </div>
                            <div className="poster poster-2">
                                <div className="bg-shape" />
                                <div className="poster-men" />
                                <div className="poster-content">
                                    <Link href="/single-post-1"><img src="/assets/img/logo/logo-light.png" alt="logo" /></Link>
                                    <h4 className="title">News &amp; Magazine Blog HTML Theme</h4>
                                    <Link href="/contact" className="default-btn poster-btn">Buy Now</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
