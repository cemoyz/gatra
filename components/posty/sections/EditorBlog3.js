
import Link from 'next/link'

export default function EditorBlog3() {
    return (
        <>
            <section className="editor-blog-area padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="section-heading mb-40">
                                <h3 className="section-title title-border"><span>Editor's Pick</span></h3>
                            </div>
                            <div className="post-card editor-post-card">
                                <div className="post-thumb">
                                    <Link href="/single-post-1"><img src="/assets/img/post/editor-post-img-5.jpg" alt="post" />
                                    </Link>
                                </div>
                                <div className="post-content">
                                    <Link href="/single-post-1" className="card-btn bg-blue-2">Gadget</Link>
                                    <h3 className="title">
                                        <Link href="/single-post-1">Bad Credit Shouldn’t Affect Health Insurance, Experts
                                            Say</Link>
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
                            <div className="editor-post-wrap">
                                <div className="post-card editor-post">
                                    <div className="post-thumb">
                                        <Link href="/single-post-1"><img src="/assets/img/post/editor-post-img-6.jpg" alt="post" /></Link>
                                    </div>
                                    <div className="post-content">
                                        <Link href="/single-post-1" className="card-btn bg-red">Tech News</Link>
                                        <h3 className="title">
                                            <Link href="/single-post-1">19 Cold Soup Recipes for Hot Summer Days</Link>
                                        </h3>
                                        <ul className="post-list">
                                            <li className="author">
                                                by <span><Link href="/author-details">David Bin</Link></span>
                                            </li>
                                            <li className="date">July 29, 2024</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="post-card editor-post">
                                    <div className="post-thumb">
                                        <Link href="/single-post-1"><img src="/assets/img/post/editor-post-img-7.jpg" alt="post" /></Link>
                                    </div>
                                    <div className="post-content">
                                        <Link href="/single-post-1" className="card-btn bg-blue-2">Gadget</Link>
                                        <h3 className="title">
                                            <Link href="/single-post-1">15 ways you can your phone your productivity</Link>
                                        </h3>
                                        <ul className="post-list">
                                            <li className="author">
                                                by <span><Link href="/author-details">David Bin</Link></span>
                                            </li>
                                            <li className="date">July 29, 2024</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="post-card editor-post">
                                    <div className="post-thumb">
                                        <Link href="/single-post-1"><img src="/assets/img/post/editor-post-img-8.jpg" alt="post" /></Link>
                                    </div>
                                    <div className="post-content">
                                        <Link href="/single-post-1" className="card-btn bg-blue-light">Business</Link>
                                        <h3 className="title">
                                            <Link href="/single-post-1">Navigation System as anything Doesn’t Space?</Link>
                                        </h3>
                                        <ul className="post-list">
                                            <li className="author">
                                                by <span><Link href="/author-details">David Bin</Link></span>
                                            </li>
                                            <li className="date">July 29, 2024</li>
                                        </ul>
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
                            <div className="post-author-box text-center">
                                <div className="bg" />
                                <img src="/assets/img/post/post-author.png" alt="post" />
                                <h3 className="author">Hello, I'm James</h3>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur. Ut tellus suspendisse nulla aliquam. Risus
                                    rutrum tellus eget ultrices pretium.
                                </p>
                                <Link href="/author-details" className="default-btn">About Me</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
