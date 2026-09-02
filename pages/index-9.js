import dynamic from 'next/dynamic'
const PortfolioFilter1 = dynamic(() => import('@/components/sections/PortfolioFilter1'), {
    ssr: false,
})
import Layout from "@/components/layout/Layout"
import Link from "next/link"
export default function Home9() {

    return (
        <>
            <Layout headerStyle={6} footerStyle={9}>
                <div>
                    <div className="ta-author-info-section fix pb-90">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="ta-author-info-box-wrapper position-relative ta-stroke ">
                                        <div className="shape shape__2 position-absolute">
                                            <img src="/assets/img/shape/author-big-cercle.webp" alt="" /></div>
                                        <div className="shape shape__3 position-absolute">
                                            <img src="/assets/img/shape/author-shape-2.webp" alt="" /></div>
                                        <div className="ta-author-info-box">
                                            <div className="row">
                                                <div className="col-lg-6 order-2 order-lg-1">
                                                    <div className="ta-content">
                                                        <h1 className="ta-name mb-15">I’m <span>Marlie Evens</span></h1>
                                                        <p>Headline-making Entrepreneur, Author, Podcaster,
                                                            Speaker, Determinista  the Sidekick who always
                                                            brings a sizzling slice of pizza.</p>
                                                        <div className="ta-social-links d-flex align-items-center">
                                                            <Link href="#"><i className="fab fa-facebook-f" /></Link>
                                                            <Link href="#"><i className="fab fa-twitter" /></Link>
                                                            <Link href="#"><i className="fab fa-github" /></Link>
                                                            <Link href="#"><i className="fab fa-linkedin" /></Link>
                                                            <Link href="#"><i className="fab fa-youtube" /></Link>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-5 order-1 order-lg-2">
                                                    <div className="ta-thumb">
                                                        <img src="/assets/img/author/author-big-1.webp" alt="" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* author info box end */}
                    {/* recent posts area start */}
                    <div className="ta-recent-post-section">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="ta-section-heading text-center mb-55">
                                        <h2 className="ta-title ta-title--mid">Recent Posts</h2>
                                        <p>The opportunity to work abroad is a popular prospect, one </p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xl-12">
                                    <PortfolioFilter1/>
                                </div>
                                <div className="col-xl-12 d-flex justify-content-center">
                                    <Link href="#0" className="ta-round-btn ta-round-btn__not-badge mt-60">Load <br />More</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Layout>
        </>
    )
}