import Link from "next/link"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import VideoPopup from "../elements/VideoPopup"

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 3,
    spaceBetween: 30,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    loop: true,
    navigation: {
        nextEl: '.owl-next',
        prevEl: '.owl-prev',
    },

    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 30,
        },
        575: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        767: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        991: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
        1199: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
        1350: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
    }
}

export default function TrendingSlider1() {
    return (
        <>
            <div className=" ta-owl-nav ta-owl-nav__top-right ta-owl-nav__top-right--top-60 position-relative">
                <Swiper {...swiperOptions} className="rcp-slider-wrapper">
                    <SwiperSlide><article className="ta-blog-box ta-thumb-zoom ta-blog-box__style-2 ta-stroke ">
                        <div className="thumb ">
                            <img src="/assets/img/blog/blog-6-5.webp" alt="blog" />
                            <div className="ta-blog-box__cats ta-blog-box__cats--right">
                                <Link href="#0">photo</Link>
                            </div>
                            <VideoPopup style={1} />
                        </div>
                        <div className="content ">
                            <ul className="ta-blog-box__meta-info meta-infos d-flex justify-content-center align-items-center list-unstyled tfy-neg-30 ta-stroke ">
                                <li>
                                    <Link href="#0" className="author-wrapper d-flex justify-content-center align-items-center">
                                        <span className="by">By</span>
                                        <span className="author-name">Alexis D.</span>
                                    </Link>
                                </li>
                                <li><Link href="#0">March 21, {new Date().getFullYear()}</Link></li>
                                <li><Link href="#0"><i className="fa fa-clock" /> 20 Min</Link></li>
                            </ul>
                            <h3 className="ta-blog-box__title ta-blog-box__title--small ta-border-effect "><Link href="/blog-details">The Future Of Design: Human Powered Or AI-Driven?</Link></h3>
                            <div className="excerpt excerpt__small mt-15">
                                <p>Let’s talk about Next.js, one of the most well
                                    known React frameworks.</p>
                            </div>
                            <div className="bottom-wrapper pt-20 d-flex justify-content-between align-items-center mt-30">
                                <Link href="/blog-details" className="ta-inline-btn">Read More <i className="fa fa-long-arrow-right" /></Link>
                                <div className="ta-blog-box__share-info share-info d-flex justify-content-center align-items-center">
                                    <ul className="d-flex justify-content-center align-items-center list-unstyled">
                                        <li><i className="fa fa-comment" /> 82</li>
                                        <li><i className="fa fa-heart" /> 258</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </article></SwiperSlide>
                    <SwiperSlide><article className="ta-blog-box ta-thumb-zoom ta-blog-box__style-2 ta-stroke ">
                        <div className="thumb ">
                            <img src="/assets/img/blog/blog-6-6.webp" alt="blog" />
                            <div className="ta-blog-box__cats ta-blog-box__cats--right">
                                <Link href="#0">travel</Link>
                            </div>
                            <VideoPopup style={1} />
                        </div>
                        <div className="content ">
                            <ul className="ta-blog-box__meta-info meta-infos d-flex justify-content-center align-items-center list-unstyled tfy-neg-30 ta-stroke ">
                                <li>
                                    <Link href="#0" className="author-wrapper d-flex justify-content-center align-items-center">
                                        <span className="by">By</span>
                                        <span className="author-name">Alexis D.</span>
                                    </Link>
                                </li>
                                <li><Link href="#0">March 21, {new Date().getFullYear()}</Link></li>
                                <li><Link href="#0"><i className="fa fa-clock" /> 20 Min</Link></li>
                            </ul>
                            <h3 className="ta-blog-box__title ta-blog-box__title--small ta-border-effect "><Link href="/blog-details">Understanding Privacy: Protect Your Users, Protect Yourself</Link></h3>
                            <div className="excerpt excerpt__small mt-15">
                                <p>Let’s talk about Next.js, one of the most well
                                    known React frameworks.</p>
                            </div>
                            <div className="bottom-wrapper pt-20 d-flex justify-content-between align-items-center mt-30">
                                <Link href="/blog-details" className="ta-inline-btn">Read More <i className="fa fa-long-arrow-right" /></Link>
                                <div className="ta-blog-box__share-info share-info d-flex justify-content-center align-items-center">
                                    <ul className="d-flex justify-content-center align-items-center list-unstyled">
                                        <li><i className="fa fa-comment" /> 82</li>
                                        <li><i className="fa fa-heart" /> 258</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </article></SwiperSlide>
                    <SwiperSlide><article className="ta-blog-box ta-thumb-zoom ta-blog-box__style-2 ta-stroke ">
                        <div className="thumb ">
                            <img src="/assets/img/blog/blog-6-7.webp" alt="blog" />
                            <div className="ta-blog-box__cats ta-blog-box__cats--right">
                                <Link href="#0">discover</Link>
                            </div>
                            <VideoPopup style={1} />
                        </div>
                        <div className="content ">
                            <ul className="ta-blog-box__meta-info meta-infos d-flex justify-content-center align-items-center list-unstyled tfy-neg-30 ta-stroke ">
                                <li>
                                    <Link href="#0" className="author-wrapper d-flex justify-content-center align-items-center">
                                        <span className="by">By</span>
                                        <span className="author-name">Alexis D.</span>
                                    </Link>
                                </li>
                                <li><Link href="#0">March 21, {new Date().getFullYear()}</Link></li>
                                <li><Link href="#0"><i className="fa fa-clock" /> 20 Min</Link></li>
                            </ul>
                            <h3 className="ta-blog-box__title ta-blog-box__title--small ta-border-effect "><Link href="/blog-details">Boosting Productivity For Designers With Efficient Tools</Link></h3>
                            <div className="excerpt excerpt__small mt-15">
                                <p>Let’s talk about Next.js, one of the most well
                                    known React frameworks.</p>
                            </div>
                            <div className="bottom-wrapper pt-20 d-flex justify-content-between align-items-center mt-30">
                                <Link href="/blog-details" className="ta-inline-btn">Read More <i className="fa fa-long-arrow-right" /></Link>
                                <div className="ta-blog-box__share-info share-info d-flex justify-content-center align-items-center">
                                    <ul className="d-flex justify-content-center align-items-center list-unstyled">
                                        <li><i className="fa fa-comment" /> 82</li>
                                        <li><i className="fa fa-heart" /> 258</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </article></SwiperSlide>
                    <SwiperSlide><article className="ta-blog-box ta-thumb-zoom ta-blog-box__style-2 ta-stroke ">
                        <div className="thumb ">
                            <img src="/assets/img/blog/blog-6-8.webp" alt="blog" />
                            <div className="ta-blog-box__cats ta-blog-box__cats--right">
                                <Link href="#0">nature</Link>
                            </div>
                            <VideoPopup style={1} />
                        </div>
                        <div className="content ">
                            <ul className="ta-blog-box__meta-info meta-infos d-flex justify-content-center align-items-center list-unstyled tfy-neg-30 ta-stroke ">
                                <li>
                                    <Link href="#0" className="author-wrapper d-flex justify-content-center align-items-center">
                                        <span className="by">By</span>
                                        <span className="author-name">Alexis D.</span>
                                    </Link>
                                </li>
                                <li><Link href="#0">March 21, {new Date().getFullYear()}</Link></li>
                                <li><Link href="#0"><i className="fa fa-clock" /> 20 Min</Link></li>
                            </ul>
                            <h3 className="ta-blog-box__title ta-blog-box__title--small ta-border-effect "><Link href="/blog-details">Taking The Stress Out Of Design System Management</Link></h3>
                            <div className="excerpt excerpt__small mt-15">
                                <p>Let’s talk about Next.js, one of the most well
                                    known React frameworks.</p>
                            </div>
                            <div className="bottom-wrapper pt-20 d-flex justify-content-between align-items-center mt-30">
                                <Link href="/blog-details" className="ta-inline-btn">Read More <i className="fa fa-long-arrow-right" /></Link>
                                <div className="ta-blog-box__share-info share-info d-flex justify-content-center align-items-center">
                                    <ul className="d-flex justify-content-center align-items-center list-unstyled">
                                        <li><i className="fa fa-comment" /> 82</li>
                                        <li><i className="fa fa-heart" /> 258</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </article></SwiperSlide>
                </Swiper>
                <div className="owl-nav">
                    <div className="owl-prev">
                        <i className="far fa-long-arrow-left" />
                    </div>
                    <div className="owl-next">
                        <i className="far fa-long-arrow-right" />
                    </div>
                </div>
            </div>
        </>
    )
}
