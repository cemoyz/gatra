
import Isotope from "isotope-layout"
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from "react"

export default function PortfolioFilter1() {
    // Isotope
    const isotope = useRef()
    const [filterKey, setFilterKey] = useState("*")
    useEffect(() => {
        setTimeout(() => {
            isotope.current = new Isotope(".ta-rcps-wrapper", {
                itemSelector: ".ta-blog-box",
                // layoutMode: "fitRows",
                percentPosition: true,
                masonry: {
                    columnWidth: ".ta-blog-box",
                },
                animationOptions: {
                    duration: 750,
                    easing: "linear",
                    queue: false,
                },
            })
        }, 1000)
    }, [])
    useEffect(() => {
        if (isotope.current) {
            filterKey === "*"
                ? isotope.current.arrange({ filter: `*` })
                : isotope.current.arrange({ filter: `.${filterKey}` })
        }
    }, [filterKey])
    const handleFilterKeyChange = useCallback((key) => () => {
        setFilterKey(key)
    },
        []
    )

    const activeBtn = (value) => (value === filterKey ? "active" : "")
    return (
        <>
            <div className="ta-rcp-filters-wrapper">
                <ul className="ta-rcp-filters list-unstyled d-flex justify-content-center align-items-center" data-ta-rcp-filters>
                    <li className={activeBtn("*")} onClick={handleFilterKeyChange("*")}><span>#</span>View All</li>
                    <li className={activeBtn("cat-1")} onClick={handleFilterKeyChange("cat-1")}><span>#</span>Design</li>
                    <li className={activeBtn("cat-2")} onClick={handleFilterKeyChange("cat-2")}><span>#</span>Development</li>
                    <li className={activeBtn("cat-3")} onClick={handleFilterKeyChange("cat-3")}><span>#</span>User</li>
                    <li className={activeBtn("cat-4")} onClick={handleFilterKeyChange("cat-4")}><span>#</span>UX</li>
                    <li className={activeBtn("cat-5")} onClick={handleFilterKeyChange("cat-5")}><span>#</span>Interface</li>
                    <li className={activeBtn("cat-6")} onClick={handleFilterKeyChange("cat-6")}><span>#</span>UI Design</li>
                </ul>
            </div>
            <div className="ta-rcps-wrapper pt-10" data-ta-rcp-grid>
                <article className="ta-blog-box ta-blog-box__featured ta-stroke ta-radious-40 cat-1 cat-3 mt-30">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="thumb">
                                <div className="ta-post-gallery ta-stroke ">
                                    <img src="/assets/img/blog/blog-gallery-2.webp" alt="blog" />
                                </div>
                                <div className="ta-blog-box__cats ta-blog-box__cats--right">
                                    <Link href="#0">music</Link>
                                </div>
                                <span className="post-format-icon"><i className="fal fa-music" /></span>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="content position-relative">
                                <h2 className="ta-blog-box__title ta-blog-box__title--mid ta-border-effect mt-30"><Link href="/blog-details">An Ultimate Guide On Sizing, Spacing,
                                    Grids And Layout On The Web</Link></h2>
                                <div className="excerpt excerpt__small mt-15">
                                    <p>The opportunity to work abroad is a popular prospect, one undimmed by the years
                                        of restriction due to the pandemic and made only more accessible thanks to hybrid
                                        working and the rise of the digital native.</p>
                                </div>
                                <Link href="/blog-details" className="ta-button ta-button__borderd mt-95">Read More <i className="fa fa-long-arrow-right" /></Link>
                                <div className="bottom-wrapper mt-60 pt-30 d-flex justify-content-between align-items-center">
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
                <article className="ta-blog-box ta-blog-box__featured ta-stroke ta-radious-40 cat-2 cat-1 cat-5 mt-30">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="thumb">
                                <div className="ta-post-gallery ta-stroke ">
                                    <img src="/assets/img/blog/blog-gallery-3.webp" alt="blog" />
                                </div>
                                <div className="ta-blog-box__cats ta-blog-box__cats--right">
                                    <Link href="#0">music</Link>
                                </div>
                                <span className="post-format-icon"><i className="fal fa-music" /></span>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="content position-relative">
                                <h2 className="ta-blog-box__title ta-blog-box__title--mid ta-border-effect mt-30"><Link href="/blog-details">Useful Accessibility And Usability Examples
                                    To Help Improve Your Designs</Link></h2>
                                <div className="excerpt excerpt__small mt-15">
                                    <p>The opportunity to work abroad is a popular prospect, one undimmed by the years
                                        of restriction due to the pandemic and made only more accessible thanks to hybrid
                                        working and the rise of the digital native.</p>
                                </div>
                                <Link href="/blog-details" className="ta-button ta-button__borderd mt-95">Read More <i className="fa fa-long-arrow-right" /></Link>
                                <div className="bottom-wrapper mt-60 pt-30 d-flex justify-content-between align-items-center">
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
                <article className="ta-blog-box ta-blog-box__featured ta-stroke ta-radious-40 cat-4 cat-5 mt-30">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="thumb">
                                <div className="ta-post-gallery ta-stroke ">
                                    <img src="/assets/img/blog/blog-gallery-4.webp" alt="blog" />
                                </div>
                                <div className="ta-blog-box__cats ta-blog-box__cats--right">
                                    <Link href="#0">music</Link>
                                </div>
                                <span className="post-format-icon"><i className="fal fa-music" /></span>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="content position-relative">
                                <h2 className="ta-blog-box__title ta-blog-box__title--mid ta-border-effect mt-30"><Link href="/blog-details">Taking The Stress Out Of Design System
                                    Management Overview</Link></h2>
                                <div className="excerpt excerpt__small mt-15">
                                    <p>The opportunity to work abroad is a popular prospect, one undimmed by the years
                                        of restriction due to the pandemic and made only more accessible thanks to hybrid
                                        working and the rise of the digital native.</p>
                                </div>
                                <Link href="/blog-details" className="ta-button ta-button__borderd mt-95">Read More <i className="fa fa-long-arrow-right" /></Link>
                                <div className="bottom-wrapper mt-60 pt-30 d-flex justify-content-between align-items-center">
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
                <article className="ta-blog-box ta-blog-box__featured ta-stroke ta-radious-40 cat-6 cat-2 mt-30">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="thumb">
                                <div className="ta-post-gallery ta-stroke ">
                                    <img src="/assets/img/blog/blog-gallery-1.webp" alt="blog" />
                                </div>
                                <div className="ta-blog-box__cats ta-blog-box__cats--right">
                                    <Link href="#0">music</Link>
                                </div>
                                <span className="post-format-icon"><i className="fal fa-music" /></span>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="content position-relative">
                                <h2 className="ta-blog-box__title ta-blog-box__title--mid ta-border-effect mt-30"><Link href="/blog-details">Fluid Typography: Predicting A Problem
                                    With Your User’s Zoom-In</Link></h2>
                                <div className="excerpt excerpt__small mt-15">
                                    <p>The opportunity to work abroad is a popular prospect, one undimmed by the years
                                        of restriction due to the pandemic and made only more accessible thanks to hybrid
                                        working and the rise of the digital native.</p>
                                </div>
                                <Link href="/blog-details" className="ta-button ta-button__borderd mt-95">Read More <i className="fa fa-long-arrow-right" /></Link>
                                <div className="bottom-wrapper mt-60 pt-30 d-flex justify-content-between align-items-center">
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

        </>
    )
}
