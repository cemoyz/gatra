import Layout from "@/components/layout/Layout"
import Link from "next/link"
export default function BlogCategoryList() {

    return (
        <>
            <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Blog Right Sidebar">
                <div className="ta-blog-cat-section fix pt-100 pb-100">
                    <div className="container">
                        <div className="row mt-none-30">
                            <div className="col-xl-3 mt-30">
                                <div className="ta-cat-box position-relative">
                                    <div className="thumb ta-stroke">
                                        <img src="/assets/img/blog-cat/blog-cat-1.webp" alt="img" />
                                    </div>
                                    <Link className="cat-link" href="/blog">Technology</Link>
                                </div>
                            </div>
                            <div className="col-xl-3 mt-30">
                                <div className="ta-cat-box position-relative">
                                    <div className="thumb ta-stroke">
                                        <img src="/assets/img/blog-cat/blog-cat-2.webp" alt="img" />
                                    </div>
                                    <Link className="cat-link" href="/blog">Development</Link>
                                </div>
                            </div>
                            <div className="col-xl-3 mt-30">
                                <div className="ta-cat-box position-relative">
                                    <div className="thumb ta-stroke">
                                        <img src="/assets/img/blog-cat/blog-cat-3.webp" alt="img" />
                                    </div>
                                    <Link className="cat-link" href="/blog">Photo</Link>
                                </div>
                            </div>
                            <div className="col-xl-3 mt-30">
                                <div className="ta-cat-box position-relative">
                                    <div className="thumb ta-stroke">
                                        <img src="/assets/img/blog-cat/blog-cat-4.webp" alt="img" />
                                    </div>
                                    <Link className="cat-link" href="/blog">Video</Link>
                                </div>
                            </div>
                            <div className="col-xl-3 mt-30">
                                <div className="ta-cat-box position-relative">
                                    <div className="thumb ta-stroke">
                                        <img src="/assets/img/blog-cat/blog-cat-5.webp" alt="img" />
                                    </div>
                                    <Link className="cat-link" href="/blog">Discover</Link>
                                </div>
                            </div>
                            <div className="col-xl-3 mt-30">
                                <div className="ta-cat-box position-relative">
                                    <div className="thumb ta-stroke">
                                        <img src="/assets/img/blog-cat/blog-cat-6.webp" alt="img" />
                                    </div>
                                    <Link className="cat-link" href="/blog">Planning</Link>
                                </div>
                            </div>
                            <div className="col-xl-3 mt-30">
                                <div className="ta-cat-box position-relative">
                                    <div className="thumb ta-stroke">
                                        <img src="/assets/img/blog-cat/blog-cat-7.webp" alt="img" />
                                    </div>
                                    <Link className="cat-link" href="/blog">SEO</Link>
                                </div>
                            </div>
                            <div className="col-xl-3 mt-30">
                                <div className="ta-cat-box position-relative">
                                    <div className="thumb ta-stroke">
                                        <img src="/assets/img/blog-cat/blog-cat-8.webp" alt="img" />
                                    </div>
                                    <Link className="cat-link" href="/blog">Marketing</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Layout>
        </>
    )
}