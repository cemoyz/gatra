import VideoPopup from "@/components/elements/VideoPopup"
import Layout from "@/components/layout/Layout"
import Newsletter2 from "@/components/sections/Newsletter2"
import BrandSlider1 from "@/components/slider/BrandSlider1"
import Link from "next/link"
import { useState } from "react"
export default function AboutUS() {
    const [activeIndex, setActiveIndex] = useState(1)
    const handleOnClick = (index) => {
        setActiveIndex(index)
    }
    return (
        <>
            <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="About Us">
                <div>
                    {/* about area start */}
                    <div className="ta-about-section pt-100 pb-100">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-6">
                                    <div className="thumb position-relative ta-stroke">
                                        <img src="/assets/img/bg/about-1.webp" alt="" />
                                        <VideoPopup style={1} />
                                    </div>
                                </div>
                                <div className="col-xl-6 align-self-center">
                                    <div className="right-wrapper pl-80 pr-50">
                                        <div className="ta-section-heading mb-45">
                                            <h2 className="ta-title ta-title--mid">Since from 2000</h2>
                                            <p>Data visualizations are everywhere; from the news to the nutritional info
                                                on cereal boxes, we’re constantly being presented.</p>
                                        </div>
                                        <div className="ta-about-tab wow fadeIn">
                                            <div className="nav tagcloud d-flex align-items-center" id="pinfo-tab" role="tablist">
                                                <a className={activeIndex === 1 ? "nav-link active" : "nav-link"} onClick={() => handleOnClick(1)}>
                                                    <span>#</span>
                                                    Our Mission
                                                </a>
                                                <a className={activeIndex === 2 ? "nav-link active" : "nav-link"} onClick={() => handleOnClick(2)}>
                                                    <span>#</span>
                                                    Our Vission
                                                </a>
                                            </div>
                                            <div className="tab-content pinfo-content mt-30" id="pinfoContent">
                                                <div className={activeIndex === 1 ? "tab-pane fade show active" : "tab-pane fade"}>
                                                    <p>Before getting into the content of the article, let’s briefly address language
                                                        usage. “Graph” and “chart” are often used interchangeably, but specificity
                                                        is important. In this article, the term “graph” refers to visual representation
                                                        of data on a cartesian plane (they often look like a grid and have an x-, y-,
                                                        and sometimes z-axis).</p>
                                                </div>
                                                <div className={activeIndex === 2 ? "tab-pane fade show active" : "tab-pane fade"}>
                                                    <p> In this article, the term “graph” refers to visual representation
                                                        of data on a cartesian plane (they often look like a grid and have an x-, y-,
                                                        and sometimes z-axis).Before getting into the content of the article, let’s briefly address language
                                                        usage. “Graph” and “chart” are often used interchangeably, but specificity
                                                        is important.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* about area end */}
                    {/* team section start */}
                    <div className="ta-team-section">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="ta-section-heading mb-60 text-center">
                                        <h2 className="ta-title ta-title--mid">Our Team</h2>
                                        <p>The opportunity to work abroad is a popular prospect, one </p>
                                    </div>
                                </div>
                            </div>
                            <div className="row ta-column-gap-30 mt-none-30">
                                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 mt-30">
                                    <div className="ta-team-box">
                                        <div className="thumb ta-stroke">
                                            <img src="/assets/img/team/team-1.webp" alt="" />
                                        </div>
                                        <div className="content text-center">
                                            <span className="designation d-block">Founder</span>
                                            <h4 className="name">Alexis D. Dowsonix</h4>
                                            <div className="ta-social-links d-flex justify-content-center align-items-center">
                                                <Link href="#"><i className="fab fa-facebook-f" /></Link>
                                                <Link href="#"><i className="fab fa-twitter" /></Link>
                                                <Link href="#"><i className="fab fa-behance" /></Link>
                                                <Link href="#"><i className="fab fa-youtube" /></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 mt-30">
                                    <div className="ta-team-box">
                                        <div className="thumb ta-stroke">
                                            <img src="/assets/img/team/team-2.webp" alt="" />
                                        </div>
                                        <div className="content text-center">
                                            <span className="designation d-block">CEO</span>
                                            <h4 className="name">Mirandoni N. Nelson</h4>
                                            <div className="ta-social-links d-flex justify-content-center align-items-center">
                                                <Link href="#"><i className="fab fa-facebook-f" /></Link>
                                                <Link href="#"><i className="fab fa-twitter" /></Link>
                                                <Link href="#"><i className="fab fa-behance" /></Link>
                                                <Link href="#"><i className="fab fa-youtube" /></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 mt-30">
                                    <div className="ta-team-box">
                                        <div className="thumb ta-stroke">
                                            <img src="/assets/img/team/team-3.webp" alt="" />
                                        </div>
                                        <div className="content text-center">
                                            <span className="designation d-block">Designer</span>
                                            <h4 className="name">Helix W. Williamson</h4>
                                            <div className="ta-social-links d-flex justify-content-center align-items-center">
                                                <Link href="#"><i className="fab fa-facebook-f" /></Link>
                                                <Link href="#"><i className="fab fa-twitter" /></Link>
                                                <Link href="#"><i className="fab fa-behance" /></Link>
                                                <Link href="#"><i className="fab fa-youtube" /></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 mt-30">
                                    <div className="ta-team-box">
                                        <div className="thumb ta-stroke">
                                            <img src="/assets/img/team/team-4.webp" alt="" />
                                        </div>
                                        <div className="content text-center">
                                            <span className="designation d-block">UI/UX</span>
                                            <h4 className="name">Trommer R. Relixson</h4>
                                            <div className="ta-social-links d-flex justify-content-center align-items-center">
                                                <Link href="#"><i className="fab fa-facebook-f" /></Link>
                                                <Link href="#"><i className="fab fa-twitter" /></Link>
                                                <Link href="#"><i className="fab fa-behance" /></Link>
                                                <Link href="#"><i className="fab fa-youtube" /></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* team section end */}
                    {/* brand area start */}
                    <div className="ta-brand-section pt-90 pb-100">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="ta-section-heading mb-60 text-center">
                                        <h2 className="ta-title ta-title--mid">We Featured On</h2>
                                        <p>The opportunity to work abroad is a popular prospect, one </p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xl-12">
                                    <BrandSlider1 />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* brand area end */}
                    {/* newsletter start */}
                    <Newsletter2 />
                    {/* newsletter end */}
                </div>

            </Layout>
        </>
    )
}