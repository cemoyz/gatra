import BlogPost from "@/components/blog/BlogPost"
import Layout from "@/components/layout/Layout"
import BlogSidebar from "@/components/sections/BlogSidebar"
import HeroSlider1 from "@/components/slider/HeroSlider1"
import TrendingSlider1 from "@/components/slider/TrendingSlider1"
import Link from "next/link"
import { useState } from "react"
export default function Home3() {
    const [activeIndex, setActiveIndex] = useState(1)
    const handleOnClick = (index) => {
        setActiveIndex(index)
    }
    return (
        <>
            <Layout headerStyle={3} footerStyle={3}>
                <div>
                    {/* featured blog start */}
                    <HeroSlider1 />
                    {/* featured blog end */}
                    {/* latest post start */}
                    <div className="ta-latest-post-section mt-none-80">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="ta-latest-post-wrapper ta-stroke">
                                        <div className="row mt-none-30">
                                            <div className="col-xl-4 col-lg-6 mt-30">
                                                <div className="ta-latest-posts ta-latest-posts__style-2">
                                                    <div className="item">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-9.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect ta-line-2"><Link href="#0">Useful Accessibility  main
                                                                Usability...</Link></h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-6 mt-30">
                                                <div className="ta-latest-posts ta-latest-posts__style-2">
                                                    <div className="item">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-5.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect ta-line-2"><Link href="#0">A Guide To Getting Data
                                                                Visualization...</Link></h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-6 mt-30">
                                                <div className="ta-latest-posts ta-latest-posts__style-2">
                                                    <div className="item">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-13.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect ta-line-2"><Link href="#0">Opening The Doors To New Arab
                                                                {new Date().getFullYear()}...</Link></h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* latest post end */}
                    {/* recnt post slider start */}
                    <div className="rcp-area pt-100">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="ta-section-heading ta-section-heading__long-border mb-50">
                                        <h2 className="ta-title ta-title--mid pr-130">
                                            <span className="ta-title__tag">Trending Post</span>
                                            <span className="ta-long-border" />
                                        </h2>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xl-12">
                                    <TrendingSlider1 />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* recnt post slider end */}
                    {/* blog area start */}
                    <div className="ta-blog-area pt-100 pb-110">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-8">
                                    <div className="row">
                                        <div className="col-xl-12">
                                            <div className="ta-section-heading ta-section-heading__long-border mb-45">
                                                <h2 className="ta-title ta-title--mid">
                                                    <span className="ta-title__tag">Hand-Picked Post</span>
                                                    <span className="ta-long-border" />
                                                </h2>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row ta-column-gap-30 mt-none-30">
                                        <div className="col-xl-12 mt-30">
                                            <BlogPost showItem={1} showStart={33} showEnd={34} style={4} video />
                                        </div>
                                        <BlogPost showItem={8} showStart={0} showEnd={12} style={1} video showPagination col="col-xl-6 col-lg-6 mt-30" />
                                    </div>
                                </div>
                                <div className="col-xl-4">
                                    <BlogSidebar />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* blog area end */}
                    {/* recently added tab start */}
                    <div className="rcp-tab-section">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-6">
                                    <div className="ta-section-heading ta-section-heading__long-border mb-55">
                                        <h2 className="ta-title ta-title--mid">
                                            <span className="ta-title__tag">Recently Added</span>
                                            <span className="ta-long-border" />
                                        </h2>
                                    </div>
                                </div>
                                <div className="col-xl-6">
                                    <div className="rcp-tab-nav">
                                        <div className="nav tagcloud" role="tablist">
                                            <a className={activeIndex === 1 ? "nav-link active" : "nav-link"} onClick={() => handleOnClick(1)}><span>#</span> Development </a>
                                            <a className={activeIndex === 2 ? "nav-link active" : "nav-link"} onClick={() => handleOnClick(2)}><span>#</span> User </a>
                                            <a className={activeIndex === 3 ? "nav-link active" : "nav-link"} onClick={() => handleOnClick(3)}><span>#</span> Ux </a>
                                            <a className={activeIndex === 4 ? "nav-link active" : "nav-link"} onClick={() => handleOnClick(4)}><span>#</span> Interface </a>
                                            <a className={activeIndex === 5 ? "nav-link active" : "nav-link"} onClick={() => handleOnClick(5)}><span>#</span> UI Design </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-12">
                                <div className="tab-content" id="rcp-tabContent">
                                    <div className={activeIndex === 1 ? "tab-pane fade show active" : "tab-pane fade"}>
                                        <div className="row mt-none-30">
                                            <div className="col-xl-4 col-lg-6 mt-30">
                                                <div className="ta-latest-posts ta-latest-posts__style-2 mt-none-30 pr-60">
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-5.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">Useful Accessibility  main Usability...</Link></h6>
                                                        </div>
                                                    </div>
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-6.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">A Guide To Command-Line Data Manipulation</Link></h6>
                                                        </div>
                                                    </div>
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-7.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">Predicting A Problem With Your User’s Zoom-In</Link></h6>
                                                        </div>
                                                    </div>
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-8.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">Deploying CSS Logical Properties</Link></h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-6 mt-30">
                                                <div className="ta-latest-posts ta-latest-posts__style-2 mt-none-30 pr-60">
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-9.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">Taking The Stress Out Of Design System</Link></h6>
                                                        </div>
                                                    </div>
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-10.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">How To Prioritize User Security When</Link></h6>
                                                        </div>
                                                    </div>
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-11.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">Understanding Privacy: Protect</Link></h6>
                                                        </div>
                                                    </div>
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-12.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">The Anatomy Of Themed Design System</Link></h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-6 mt-30">
                                                <div className="ta-latest-posts ta-latest-posts__style-2 mt-none-30 pr-60">
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-13.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">FabUnit: A Smart Way To Control  Synchronize</Link></h6>
                                                        </div>
                                                    </div>
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-14.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">Endings  New Beginnings December {new Date().getFullYear()}</Link></h6>
                                                        </div>
                                                    </div>
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-15.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">Document Object Model (DOM)</Link></h6>
                                                        </div>
                                                    </div>
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-16.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">To Keyboard Accessibility: JavaScript (Part 2)</Link></h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={activeIndex === 2 ? "tab-pane fade show active" : "tab-pane fade"}>
                                        <div className="row mt-none-30">
                                            <div className="col-xl-4 col-lg-6 mt-30">
                                                <div className="ta-latest-posts ta-latest-posts__style-2 mt-none-30 pr-60">
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-9.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">Taking The Stress Out Of Design System</Link></h6>
                                                        </div>
                                                    </div>
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-10.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">How To Prioritize User Security When</Link></h6>
                                                        </div>
                                                    </div>
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-11.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">Understanding Privacy: Protect</Link></h6>
                                                        </div>
                                                    </div>
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-12.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">The Anatomy Of Themed Design System</Link></h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-6 mt-30">
                                                <div className="ta-latest-posts ta-latest-posts__style-2 mt-none-30 pr-60">
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-5.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">Useful Accessibility  main Usability...</Link></h6>
                                                        </div>
                                                    </div>
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-6.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">A Guide To Command-Line Data Manipulation</Link></h6>
                                                        </div>
                                                    </div>
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-7.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">Predicting A Problem With Your User’s Zoom-In</Link></h6>
                                                        </div>
                                                    </div>
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-8.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">Deploying CSS Logical Properties</Link></h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-6 mt-30">
                                                <div className="ta-latest-posts ta-latest-posts__style-2 mt-none-30 pr-60">
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-13.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">FabUnit: A Smart Way To Control  Synchronize</Link></h6>
                                                        </div>
                                                    </div>
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-14.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">Endings  New Beginnings December {new Date().getFullYear()}</Link></h6>
                                                        </div>
                                                    </div>
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-15.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">Document Object Model (DOM)</Link></h6>
                                                        </div>
                                                    </div>
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-16.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">To Keyboard Accessibility: JavaScript (Part 2)</Link></h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={activeIndex === 3 ? "tab-pane fade show active" : "tab-pane fade"}>
                                        <div className="row mt-none-30">
                                            <div className="col-xl-4 col-lg-6 mt-30">
                                                <div className="ta-latest-posts ta-latest-posts__style-2 mt-none-30 pr-60">
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-5.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">Useful Accessibility  main Usability...</Link></h6>
                                                        </div>
                                                    </div>
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-6.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">A Guide To Command-Line Data Manipulation</Link></h6>
                                                        </div>
                                                    </div>
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-7.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">Predicting A Problem With Your User’s Zoom-In</Link></h6>
                                                        </div>
                                                    </div>
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-8.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">Deploying CSS Logical Properties</Link></h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-6 mt-30">
                                                <div className="ta-latest-posts ta-latest-posts__style-2 mt-none-30 pr-60">
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-13.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">FabUnit: A Smart Way To Control  Synchronize</Link></h6>
                                                        </div>
                                                    </div>
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-14.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">Endings  New Beginnings December {new Date().getFullYear()}</Link></h6>
                                                        </div>
                                                    </div>
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-15.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">Document Object Model (DOM)</Link></h6>
                                                        </div>
                                                    </div>
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-16.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">To Keyboard Accessibility: JavaScript (Part 2)</Link></h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-6 mt-30">
                                                <div className="ta-latest-posts ta-latest-posts__style-2 mt-none-30 pr-60">
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-9.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">Taking The Stress Out Of Design System</Link></h6>
                                                        </div>
                                                    </div>
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-10.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">How To Prioritize User Security When</Link></h6>
                                                        </div>
                                                    </div>
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-11.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">Understanding Privacy: Protect</Link></h6>
                                                        </div>
                                                    </div>
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-12.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">The Anatomy Of Themed Design System</Link></h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={activeIndex === 4 ? "tab-pane fade show active" : "tab-pane fade"}>
                                        <div className="row mt-none-30">
                                            <div className="col-xl-4 col-lg-6 mt-30">
                                                <div className="ta-latest-posts ta-latest-posts__style-2 mt-none-30 pr-60">
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-5.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">Useful Accessibility  main Usability...</Link></h6>
                                                        </div>
                                                    </div>
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-6.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">A Guide To Command-Line Data Manipulation</Link></h6>
                                                        </div>
                                                    </div>
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-7.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">Predicting A Problem With Your User’s Zoom-In</Link></h6>
                                                        </div>
                                                    </div>
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-8.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">Deploying CSS Logical Properties</Link></h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-6 mt-30">
                                                <div className="ta-latest-posts ta-latest-posts__style-2 mt-none-30 pr-60">
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-9.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">Taking The Stress Out Of Design System</Link></h6>
                                                        </div>
                                                    </div>
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-10.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">How To Prioritize User Security When</Link></h6>
                                                        </div>
                                                    </div>
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-11.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">Understanding Privacy: Protect</Link></h6>
                                                        </div>
                                                    </div>
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-12.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">The Anatomy Of Themed Design System</Link></h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-6 mt-30">
                                                <div className="ta-latest-posts ta-latest-posts__style-2 mt-none-30 pr-60">
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-13.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">FabUnit: A Smart Way To Control  Synchronize</Link></h6>
                                                        </div>
                                                    </div>
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-14.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">Endings  New Beginnings December {new Date().getFullYear()}</Link></h6>
                                                        </div>
                                                    </div>
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-15.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">Document Object Model (DOM)</Link></h6>
                                                        </div>
                                                    </div>
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-16.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">To Keyboard Accessibility: JavaScript (Part 2)</Link></h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={activeIndex === 5 ? "tab-pane fade show active" : "tab-pane fade"}>
                                        <div className="row mt-none-30">
                                            <div className="col-xl-4 col-lg-6 mt-30">
                                                <div className="ta-latest-posts ta-latest-posts__style-2 mt-none-30 pr-60">
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-5.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">Useful Accessibility  main Usability...</Link></h6>
                                                        </div>
                                                    </div>
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-6.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">A Guide To Command-Line Data Manipulation</Link></h6>
                                                        </div>
                                                    </div>
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-7.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">Predicting A Problem With Your User’s Zoom-In</Link></h6>
                                                        </div>
                                                    </div>
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-8.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">Deploying CSS Logical Properties</Link></h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-6 mt-30">
                                                <div className="ta-latest-posts ta-latest-posts__style-2 mt-none-30 pr-60">
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-9.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">Taking The Stress Out Of Design System</Link></h6>
                                                        </div>
                                                    </div>
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-10.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">How To Prioritize User Security When</Link></h6>
                                                        </div>
                                                    </div>
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-11.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">Understanding Privacy: Protect</Link></h6>
                                                        </div>
                                                    </div>
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-12.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">The Anatomy Of Themed Design System</Link></h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-6 mt-30">
                                                <div className="ta-latest-posts ta-latest-posts__style-2 mt-none-30 pr-60">
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-13.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">FabUnit: A Smart Way To Control  Synchronize</Link></h6>
                                                        </div>
                                                    </div>
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-14.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">Endings  New Beginnings December {new Date().getFullYear()}</Link></h6>
                                                        </div>
                                                    </div>
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-15.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">Document Object Model (DOM)</Link></h6>
                                                        </div>
                                                    </div>
                                                    <div className="item mt-30">
                                                        <div className="thumb ta-stroke">
                                                            <img src="/assets/img/blog/blog-small-16.webp" alt="blog" />
                                                        </div>
                                                        <div className="content">
                                                            <span className="date">Mar 21, {new Date().getFullYear()}</span>
                                                            <h6 className="title ta-border-effect"><Link href="#0">To Keyboard Accessibility: JavaScript (Part 2)</Link></h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* recently added tab end */}


                </div>

            </Layout>
        </>
    )
}