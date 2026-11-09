
import Link from 'next/link'

export default function Categories2() {
    return (
        <>
            <section className="categories-section categorie-2 padding bg-grey-2">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6">
                            <div className="categorie-item">
                                <div className="categorie-thumb">
                                    <Link href="/blog-layout-2"><img src="/assets/img/images/categori-img-4.jpg" alt="img" /></Link>
                                </div>
                                <div className="categorie-content">
                                    <div className="top-item">
                                        <span>3 Post</span>
                                        <h3 className="categorie-title"><Link href="/blog-layout-2">Business Post</Link></h3>
                                    </div>
                                    <div className="bottom-item">
                                        <Link href="/blog-layout-2" className="default-btn categorie-btn">See All Post</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="categorie-item">
                                <div className="categorie-thumb">
                                    <Link href="/blog-layout-1"><img src="/assets/img/images/categori-img-5.jpg" alt="img" /></Link>
                                </div>
                                <div className="categorie-content">
                                    <div className="top-item">
                                        <span>3 Post</span>
                                        <h3 className="categorie-title"><Link href="/blog-layout-2">Business Post</Link></h3>
                                    </div>
                                    <div className="bottom-item">
                                        <Link href="/blog-layout-2" className="default-btn categorie-btn">See All Post</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="categorie-item">
                                <div className="categorie-thumb">
                                    <Link href="/blog-layout-2"><img src="/assets/img/images/categori-img-6.jpg" alt="img" /></Link>
                                </div>
                                <div className="categorie-content">
                                    <div className="top-item">
                                        <span>3 Post</span>
                                        <h3 className="categorie-title"><Link href="/blog-layout-2">Business Post</Link></h3>
                                    </div>
                                    <div className="bottom-item">
                                        <Link href="/blog-layout-2" className="default-btn categorie-btn">See All Post</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="categorie-item">
                                <div className="categorie-thumb">
                                    <Link href="/blog-layout-2"><img src="/assets/img/images/categori-img-7.jpg" alt="img" /></Link>
                                </div>
                                <div className="categorie-content">
                                    <div className="top-item">
                                        <span>3 Post</span>
                                        <h3 className="categorie-title"><Link href="/blog-layout-2">Business Post</Link></h3>
                                    </div>
                                    <div className="bottom-item">
                                        <Link href="/blog-layout-2" className="default-btn categorie-btn">See All Post</Link>
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
