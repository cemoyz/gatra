import Link from "next/link"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

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
            slidesPerView: 4,
            spaceBetween: 30,
        },
        1350: {
            slidesPerView: 4,
            spaceBetween: 30,
        },
    }
}

export default function RecendlyAddedSlider1() {
    return (
        <>
            <div className=" ta-owl-nav ta-owl-nav__top-right ta-owl-nav__top-right--top-60 position-relative">
                <Swiper {...swiperOptions}>
                    <SwiperSlide><article className="ta-blog-box ta-blog-box__style-2 ta-blog-box__style-5 ta-stroke ">
                        <div className="thumb ">
                            <img src="/assets/img/blog/blog-6-1.webp" alt="blog" />
                            <div className="ta-blog-box__cats ta-blog-box__cats--right">
                                <Link href="#0">video</Link>
                            </div>
                        </div>
                        <div className="content ">
                            <ul className="ta-blog-box__meta-info meta-infos d-flex align-items-center list-unstyled p-0 ta-bg-none">
                                <li>
                                    <Link href="#0" className="author-wrapper d-flex justify-content-center align-items-center">
                                        <span className="by">By</span>
                                        <span className="author-name">Alexis D.</span>
                                    </Link>
                                </li>
                                <li><Link href="#0">March 21, {new Date().getFullYear()}</Link></li>
                            </ul>
                            <h3 className="ta-blog-box__title ta-blog-box__title--small ta-border-effect mt-10 ta-line-2 ta-line-2"><Link href="/blog-details">Own handsome delicate its property...</Link></h3>
                        </div>
                    </article>
                    </SwiperSlide>
                    <SwiperSlide><article className="ta-blog-box ta-blog-box__style-2 ta-blog-box__style-5 ta-stroke ">
                        <div className="thumb ">
                            <img src="/assets/img/blog/blog-6-2.webp" alt="blog" />
                            <div className="ta-blog-box__cats ta-blog-box__cats--right">
                                <Link href="#0">video</Link>
                            </div>
                        </div>
                        <div className="content ">
                            <ul className="ta-blog-box__meta-info meta-infos d-flex align-items-center list-unstyled p-0 ta-bg-none">
                                <li>
                                    <Link href="#0" className="author-wrapper d-flex justify-content-center align-items-center">
                                        <span className="by">By</span>
                                        <span className="author-name">Alexis D.</span>
                                    </Link>
                                </li>
                                <li><Link href="#0">March 21, {new Date().getFullYear()}</Link></li>
                            </ul>
                            <h3 className="ta-blog-box__title ta-blog-box__title--small ta-border-effect mt-10 ta-line-2 ta-line-2"><Link href="/blog-details">How To Prioritize User Security</Link></h3>
                        </div>
                    </article>
                    </SwiperSlide>
                    <SwiperSlide><article className="ta-blog-box ta-blog-box__style-2 ta-blog-box__style-5 ta-stroke ">
                        <div className="thumb ">
                            <img src="/assets/img/blog/blog-6-3.webp" alt="blog" />
                            <div className="ta-blog-box__cats ta-blog-box__cats--right">
                                <Link href="#0">video</Link>
                            </div>
                        </div>
                        <div className="content ">
                            <ul className="ta-blog-box__meta-info meta-infos d-flex align-items-center list-unstyled p-0 ta-bg-none">
                                <li>
                                    <Link href="#0" className="author-wrapper d-flex justify-content-center align-items-center">
                                        <span className="by">By</span>
                                        <span className="author-name">Alexis D.</span>
                                    </Link>
                                </li>
                                <li><Link href="#0">March 21, {new Date().getFullYear()}</Link></li>
                            </ul>
                            <h3 className="ta-blog-box__title ta-blog-box__title--small ta-border-effect mt-10 ta-line-2 ta-line-2"><Link href="/blog-details">Understanding Privacy: Protect Your Users</Link></h3>
                        </div>
                    </article>
                    </SwiperSlide>
                    <SwiperSlide><article className="ta-blog-box ta-blog-box__style-2 ta-blog-box__style-5 ta-stroke ">
                        <div className="thumb ">
                            <img src="/assets/img/blog/blog-6-4.webp" alt="blog" />
                            <div className="ta-blog-box__cats ta-blog-box__cats--right">
                                <Link href="#0">video</Link>
                            </div>
                        </div>
                        <div className="content ">
                            <ul className="ta-blog-box__meta-info meta-infos d-flex align-items-center list-unstyled p-0 ta-bg-none">
                                <li>
                                    <Link href="#0" className="author-wrapper d-flex justify-content-center align-items-center">
                                        <span className="by">By</span>
                                        <span className="author-name">Alexis D.</span>
                                    </Link>
                                </li>
                                <li><Link href="#0">March 21, {new Date().getFullYear()}</Link></li>
                            </ul>
                            <h3 className="ta-blog-box__title ta-blog-box__title--small ta-border-effect mt-10 ta-line-2 ta-line-2"><Link href="/blog-details">Accessible Front-End Patterns</Link></h3>
                        </div>
                    </article>
                    </SwiperSlide>
                    <SwiperSlide><article className="ta-blog-box ta-blog-box__style-2 ta-blog-box__style-5 ta-stroke ">
                        <div className="thumb ">
                            <img src="/assets/img/blog/blog-6-1.webp" alt="blog" />
                            <div className="ta-blog-box__cats ta-blog-box__cats--right">
                                <Link href="#0">video</Link>
                            </div>
                        </div>
                        <div className="content ">
                            <ul className="ta-blog-box__meta-info meta-infos d-flex align-items-center list-unstyled p-0 ta-bg-none">
                                <li>
                                    <Link href="#0" className="author-wrapper d-flex justify-content-center align-items-center">
                                        <span className="by">By</span>
                                        <span className="author-name">Alexis D.</span>
                                    </Link>
                                </li>
                                <li><Link href="#0">March 21, {new Date().getFullYear()}</Link></li>
                            </ul>
                            <h3 className="ta-blog-box__title ta-blog-box__title--small ta-border-effect mt-10 ta-line-2 ta-line-2"><Link href="/blog-details">Own handsome delicate its property...</Link></h3>
                        </div>
                    </article>
                    </SwiperSlide>
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
