import Link from "next/link"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 6,
    spaceBetween: 30,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    loop: true,

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
            slidesPerView: 3,
            spaceBetween: 30,
        },
        991: {
            slidesPerView: 4,
            spaceBetween: 30,
        },
        1199: {
            slidesPerView: 5,
            spaceBetween: 30,
        },
        1350: {
            slidesPerView: 5,
            spaceBetween: 30,
        },
    }
}

export default function FeaturedSlider2() {
    return (
        <>
            <Swiper {...swiperOptions} className="ta-feature-post-slider " data-ta-fp-slider-2>
                <SwiperSlide>
                    <article className="ta-blog-box ta-blog-box__style-3">
                        <div className="thumb ta-stroke">
                            <img src="/assets/img/blog/blog-3-1.webp" alt="blog" />
                            <div className="inner-content text-center pb-75 pl-60 pr-60">
                                <div className="ta-blog-box__cats position-static">
                                    <Link href="#0">music</Link>
                                </div>
                                <h3 className="ta-blog-box__title ta-blog-box__title--small ta-border-effect mt-20 ta-line-2">
                                    <Link href="/blog-details">Fluid Typography: Predicting A
                                        Problem With</Link></h3>
                            </div>
                        </div>
                        <div className="content mt-none-40 d-flex justify-content-center align-items-center flex-column">
                            <div className="author-thumb">
                                <img src="/assets/img/author/author-3.webp" alt="" />
                            </div>
                            <ul className="ta-blog-box__meta-info meta-infos pt-30 d-flex justify-content-center align-items-center list-unstyled">
                                <li>
                                    <Link href="#0" className="author-wrapper d-flex justify-content-center align-items-center">
                                        <span className="by">By</span>
                                        <span className="author-name">Alexis D.</span>
                                    </Link>
                                </li>
                                <li><Link href="#0">March 21, {new Date().getFullYear()}</Link></li>
                            </ul>
                        </div>
                    </article>
                </SwiperSlide>
                <SwiperSlide>
                    <article className="ta-blog-box ta-blog-box__style-3">
                        <div className="thumb ta-stroke">
                            <img src="/assets/img/blog/blog-3-2.webp" alt="blog" />
                            <div className="inner-content text-center pb-75 pl-60 pr-60">
                                <div className="ta-blog-box__cats position-static">
                                    <Link href="#0">PHOTO</Link>
                                </div>
                                <h3 className="ta-blog-box__title ta-blog-box__title--small ta-border-effect mt-20 ta-line-2">
                                    <Link href="/blog-details">An Ultimate Guide On Sizing,
                                        Space Grids</Link></h3>
                            </div>
                        </div>
                        <div className="content mt-none-40 d-flex justify-content-center align-items-center flex-column">
                            <div className="author-thumb">
                                <img src="/assets/img/author/author-4.webp" alt="" />
                            </div>
                            <ul className="ta-blog-box__meta-info meta-infos pt-30 d-flex justify-content-center align-items-center list-unstyled">
                                <li>
                                    <Link href="#0" className="author-wrapper d-flex justify-content-center align-items-center">
                                        <span className="by">By</span>
                                        <span className="author-name">Alexis D.</span>
                                    </Link>
                                </li>
                                <li><Link href="#0">March 21, {new Date().getFullYear()}</Link></li>
                            </ul>
                        </div>
                    </article>
                </SwiperSlide>
                <SwiperSlide>
                    <article className="ta-blog-box ta-blog-box__style-3">
                        <div className="thumb ta-stroke">
                            <img src="/assets/img/blog/blog-3-3.webp" alt="blog" />
                            <div className="inner-content text-center pb-75 pl-60 pr-60">
                                <div className="ta-blog-box__cats position-static">
                                    <Link href="#0">PHOTO</Link>
                                </div>
                                <h3 className="ta-blog-box__title ta-blog-box__title--small ta-border-effect mt-20 ta-line-2">
                                    <Link href="/blog-details">Calendars For Web Designer
                                        Developer ({new Date().getFullYear()} Edition)</Link></h3>
                            </div>
                        </div>
                        <div className="content mt-none-40 d-flex justify-content-center align-items-center flex-column">
                            <div className="author-thumb">
                                <img src="/assets/img/author/author-5.webp" alt="" />
                            </div>
                            <ul className="ta-blog-box__meta-info meta-infos pt-30 d-flex justify-content-center align-items-center list-unstyled">
                                <li>
                                    <Link href="#0" className="author-wrapper d-flex justify-content-center align-items-center">
                                        <span className="by">By</span>
                                        <span className="author-name">Alexis D.</span>
                                    </Link>
                                </li>
                                <li><Link href="#0">March 21, {new Date().getFullYear()}</Link></li>
                            </ul>
                        </div>
                    </article>
                </SwiperSlide>
                <SwiperSlide>
                    <article className="ta-blog-box ta-blog-box__style-3">
                        <div className="thumb ta-stroke">
                            <img src="/assets/img/blog/blog-3-4.webp" alt="blog" />
                            <div className="inner-content text-center pb-75 pl-60 pr-60">
                                <div className="ta-blog-box__cats position-static">
                                    <Link href="#0">PHOTO</Link>
                                </div>
                                <h3 className="ta-blog-box__title ta-blog-box__title--small ta-border-effect mt-20 ta-line-2">
                                    <Link href="/blog-details">FabUnit: Smart Way To Control
                                        And Synchronize</Link></h3>
                            </div>
                        </div>
                        <div className="content mt-none-40 d-flex justify-content-center align-items-center flex-column">
                            <div className="author-thumb">
                                <img src="/assets/img/author/author-6.webp" alt="" />
                            </div>
                            <ul className="ta-blog-box__meta-info meta-infos pt-30 d-flex justify-content-center align-items-center list-unstyled">
                                <li>
                                    <Link href="#0" className="author-wrapper d-flex justify-content-center align-items-center">
                                        <span className="by">By</span>
                                        <span className="author-name">Alexis D.</span>
                                    </Link>
                                </li>
                                <li><Link href="#0">March 21, {new Date().getFullYear()}</Link></li>
                            </ul>
                        </div>
                    </article>
                </SwiperSlide>
                <SwiperSlide>
                    <article className="ta-blog-box ta-blog-box__style-3">
                        <div className="thumb ta-stroke">
                            <img src="/assets/img/blog/blog-3-5.webp" alt="blog" />
                            <div className="inner-content text-center pb-75 pl-60 pr-60">
                                <div className="ta-blog-box__cats position-static">
                                    <Link href="#0">PHOTO</Link>
                                </div>
                                <h3 className="ta-blog-box__title ta-blog-box__title--small ta-border-effect mt-20 ta-line-2">
                                    <Link href="/blog-details">The Anatomy Of Themed Design
                                        System Components</Link></h3>
                            </div>
                        </div>
                        <div className="content mt-none-40 d-flex justify-content-center align-items-center flex-column">
                            <div className="author-thumb">
                                <img src="/assets/img/author/author-7.webp" alt="" />
                            </div>
                            <ul className="ta-blog-box__meta-info meta-infos pt-30 d-flex justify-content-center align-items-center list-unstyled">
                                <li>
                                    <Link href="#0" className="author-wrapper d-flex justify-content-center align-items-center">
                                        <span className="by">By</span>
                                        <span className="author-name">Alexis D.</span>
                                    </Link>
                                </li>
                                <li><Link href="#0">March 21, {new Date().getFullYear()}</Link></li>
                            </ul>
                        </div>
                    </article>
                </SwiperSlide>
                <SwiperSlide>
                    <article className="ta-blog-box ta-blog-box__style-3">
                        <div className="thumb ta-stroke">
                            <img src="/assets/img/blog/blog-3-1.webp" alt="blog" />
                            <div className="inner-content text-center pb-75 pl-60 pr-60">
                                <div className="ta-blog-box__cats position-static">
                                    <Link href="#0">music</Link>
                                </div>
                                <h3 className="ta-blog-box__title ta-blog-box__title--small ta-border-effect mt-20 ta-line-2">
                                    <Link href="/blog-details">Fluid Typography: Predicting A
                                        Problem With</Link></h3>
                            </div>
                        </div>
                        <div className="content mt-none-40 d-flex justify-content-center align-items-center flex-column">
                            <div className="author-thumb">
                                <img src="/assets/img/author/author-3.webp" alt="" />
                            </div>
                            <ul className="ta-blog-box__meta-info meta-infos pt-30 d-flex justify-content-center align-items-center list-unstyled">
                                <li>
                                    <Link href="#0" className="author-wrapper d-flex justify-content-center align-items-center">
                                        <span className="by">By</span>
                                        <span className="author-name">Alexis D.</span>
                                    </Link>
                                </li>
                                <li><Link href="#0">March 21, {new Date().getFullYear()}</Link></li>
                            </ul>
                        </div>
                    </article>
                </SwiperSlide>
                <SwiperSlide>
                    <article className="ta-blog-box ta-blog-box__style-3">
                        <div className="thumb ta-stroke">
                            <img src="/assets/img/blog/blog-3-2.webp" alt="blog" />
                            <div className="inner-content text-center pb-75 pl-60 pr-60">
                                <div className="ta-blog-box__cats position-static">
                                    <Link href="#0">PHOTO</Link>
                                </div>
                                <h3 className="ta-blog-box__title ta-blog-box__title--small ta-border-effect mt-20 ta-line-2">
                                    <Link href="/blog-details">An Ultimate Guide On Sizing,
                                        Space Grids</Link></h3>
                            </div>
                        </div>
                        <div className="content mt-none-40 d-flex justify-content-center align-items-center flex-column">
                            <div className="author-thumb">
                                <img src="/assets/img/author/author-4.webp" alt="" />
                            </div>
                            <ul className="ta-blog-box__meta-info meta-infos pt-30 d-flex justify-content-center align-items-center list-unstyled">
                                <li>
                                    <Link href="#0" className="author-wrapper d-flex justify-content-center align-items-center">
                                        <span className="by">By</span>
                                        <span className="author-name">Alexis D.</span>
                                    </Link>
                                </li>
                                <li><Link href="#0">March 21, {new Date().getFullYear()}</Link></li>
                            </ul>
                        </div>
                    </article>
                </SwiperSlide>
                <SwiperSlide>
                    <article className="ta-blog-box ta-blog-box__style-3">
                        <div className="thumb ta-stroke">
                            <img src="/assets/img/blog/blog-3-3.webp" alt="blog" />
                            <div className="inner-content text-center pb-75 pl-60 pr-60">
                                <div className="ta-blog-box__cats position-static">
                                    <Link href="#0">PHOTO</Link>
                                </div>
                                <h3 className="ta-blog-box__title ta-blog-box__title--small ta-border-effect mt-20 ta-line-2">
                                    <Link href="/blog-details">Calendars For Web Designer
                                        Developer ({new Date().getFullYear()} Edition)</Link></h3>
                            </div>
                        </div>
                        <div className="content mt-none-40 d-flex justify-content-center align-items-center flex-column">
                            <div className="author-thumb">
                                <img src="/assets/img/author/author-5.webp" alt="" />
                            </div>
                            <ul className="ta-blog-box__meta-info meta-infos pt-30 d-flex justify-content-center align-items-center list-unstyled">
                                <li>
                                    <Link href="#0" className="author-wrapper d-flex justify-content-center align-items-center">
                                        <span className="by">By</span>
                                        <span className="author-name">Alexis D.</span>
                                    </Link>
                                </li>
                                <li><Link href="#0">March 21, {new Date().getFullYear()}</Link></li>
                            </ul>
                        </div>
                    </article>
                </SwiperSlide>
                <SwiperSlide>
                    <article className="ta-blog-box ta-blog-box__style-3">
                        <div className="thumb ta-stroke">
                            <img src="/assets/img/blog/blog-3-4.webp" alt="blog" />
                            <div className="inner-content text-center pb-75 pl-60 pr-60">
                                <div className="ta-blog-box__cats position-static">
                                    <Link href="#0">PHOTO</Link>
                                </div>
                                <h3 className="ta-blog-box__title ta-blog-box__title--small ta-border-effect mt-20 ta-line-2">
                                    <Link href="/blog-details">FabUnit: Smart Way To Control
                                        And Synchronize</Link></h3>
                            </div>
                        </div>
                        <div className="content mt-none-40 d-flex justify-content-center align-items-center flex-column">
                            <div className="author-thumb">
                                <img src="/assets/img/author/author-6.webp" alt="" />
                            </div>
                            <ul className="ta-blog-box__meta-info meta-infos pt-30 d-flex justify-content-center align-items-center list-unstyled">
                                <li>
                                    <Link href="#0" className="author-wrapper d-flex justify-content-center align-items-center">
                                        <span className="by">By</span>
                                        <span className="author-name">Alexis D.</span>
                                    </Link>
                                </li>
                                <li><Link href="#0">March 21, {new Date().getFullYear()}</Link></li>
                            </ul>
                        </div>
                    </article>
                </SwiperSlide>
                <SwiperSlide>
                    <article className="ta-blog-box ta-blog-box__style-3">
                        <div className="thumb ta-stroke">
                            <img src="/assets/img/blog/blog-3-5.webp" alt="blog" />
                            <div className="inner-content text-center pb-75 pl-60 pr-60">
                                <div className="ta-blog-box__cats position-static">
                                    <Link href="#0">PHOTO</Link>
                                </div>
                                <h3 className="ta-blog-box__title ta-blog-box__title--small ta-border-effect mt-20 ta-line-2">
                                    <Link href="/blog-details">The Anatomy Of Themed Design
                                        System Components</Link></h3>
                            </div>
                        </div>
                        <div className="content mt-none-40 d-flex justify-content-center align-items-center flex-column">
                            <div className="author-thumb">
                                <img src="/assets/img/author/author-7.webp" alt="" />
                            </div>
                            <ul className="ta-blog-box__meta-info meta-infos pt-30 d-flex justify-content-center align-items-center list-unstyled">
                                <li>
                                    <Link href="#0" className="author-wrapper d-flex justify-content-center align-items-center">
                                        <span className="by">By</span>
                                        <span className="author-name">Alexis D.</span>
                                    </Link>
                                </li>
                                <li><Link href="#0">March 21, {new Date().getFullYear()}</Link></li>
                            </ul>
                        </div>
                    </article>
                </SwiperSlide>
            </Swiper>
        </>
    )
}
