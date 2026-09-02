import BlogPost from "@/components/blog/BlogPost"
import Layout from "@/components/layout/Layout"
import BlogSidebar from "@/components/sections/BlogSidebar"
import PostGallerySlider1 from "@/components/slider/PostGallerySlider1"
import Link from "next/link"
export default function Home8() {

    return (
        <>
            <Layout headerStyle={4} footerStyle={8}>
                <div>
                    <div className="ta-featured-blog-area pt-70">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-12">
                                    <article className="ta-blog-box ta-blog-box__featured ta-stroke ">
                                        <div className="shape shape__1"><img src="/assets/img/shape/featerd-shape-1.webp" alt="shape" /></div>
                                        <div className="shape shape__2"><img src="/assets/img/shape/featerd-shape-2.webp" alt="shape" /></div>
                                        <div className="shape shape__3"><img src="/assets/img/shape/featerd-shape-3.webp" alt="shape" /></div>
                                        <div className="row">
                                            <div className="col-lg-5">
                                                <div className="thumb ta-stroke ">
                                                    <PostGallerySlider1 />
                                                    <div className="ta-blog-box__cats ta-blog-box__cats--right">
                                                        <Link href="#0">music</Link>
                                                    </div>
                                                    <span className="post-format-icon"><i className="fal fa-music" /></span>
                                                    <div className="inner-dots" />
                                                </div>
                                            </div>
                                            <div className="col-lg-7">
                                                <div className="content position-relative">
                                                    <span className="ta-round-btn mt-none-60">Latest <br />News</span>
                                                    <h2 className="ta-blog-box__title ta-blog-box__title--big ta-border-effect mt-30"><Link href="/blog-details">FabUnit: The Smart Way To
                                                        Control  Synchronize</Link></h2>
                                                    <div className="excerpt excerpt__small mt-15">
                                                        <p>The opportunity to work abroad is a popular prospect, one undimmed by the years
                                                            of restriction due to the pandemic and made only more accessible thanks to hybrid
                                                            working and the rise of the digital native.</p>
                                                    </div>
                                                    <Link href="/blog-details" className="ta-button ta-button__borderd mt-35">Read More <i className="fa fa-long-arrow-right" /></Link>
                                                    <div className="bottom-wrapper mt-55 pt-20 d-flex justify-content-between align-items-center">
                                                        <ul className="ta-blog-box__meta-info d-flex justify-content-center align-items-center list-unstyled">
                                                            <li>
                                                                <Link href="#0" className="author-wrapper d-flex justify-content-center align-items-center">
                                                                    <span className="by">By</span>
                                                                    <span className="author-name"> Alexis D.</span>
                                                                </Link>
                                                            </li>
                                                            <li><Link href="#0">March 21, {new Date().getFullYear()}</Link></li>
                                                            <li><Link href="#0"><i className="fa fa-clock" /> 20 Min Read</Link></li>
                                                        </ul>
                                                        <div className="ta-blog-box__share-info share-info d-flex justify-content-center align-items-center">
                                                            <ul className="d-flex justify-content-center align-items-center list-unstyled">
                                                                <li><i className="fa fa-comment" /> 82</li>
                                                                <li><i className="fa fa-heart" /> 258</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* featured blog end */}
                    {/* blog area start */}
                    <div className="ta-blog-area pt-80 pb-100">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-8">
                                    <div className="row ta-column-gap-30 mt-none-30">
                                        <BlogPost showItem={8} showStart={0} showEnd={12} style={1} formatIcon showPagination col="col-xl-6 col-lg-6 mt-30" />
                                    </div>
                                </div>
                                <div className="col-xl-4">
                                    <BlogSidebar />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Layout>
        </>
    )
}