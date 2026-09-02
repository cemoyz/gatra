import Link from "next/link"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 1,
    spaceBetween: 0,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    loop: true
}
export default function HeroSlider3() {
    return (
        <>
            <Swiper {...swiperOptions} className="ta-feature-post-slider ta-feature-post-slider__style-2 " data-ta-fp-slider-3>
                <SwiperSlide><article className="ta-blog-box ta-blog-box__style-3">
                    <div className="thumb ta-stroke">
                        <img src="/assets/img/blog/blog-big-1.webp" alt="blog" />
                        <div className="ta-blog-box__cats ta-blog-box__cats--right">
                            <Link href="#0">music</Link>
                        </div>
                    </div>
                    <div className="inner-content text-center pb-55 pl-60 pr-60">
                        <div className="content">
                            <ul className="ta-blog-box__meta-info ta-blog-box__meta-info--white meta-infos d-flex justify-content-center align-items-center list-unstyled">
                                <li>
                                    <Link href="#0" className="author-wrapper d-flex justify-content-center align-items-center">
                                        <span className="author-thumb">
                                            <img src="/assets/img/author/author-1.webp" alt="" />
                                        </span>
                                        <span className="author-name">Alexis Dowson</span>
                                    </Link>
                                </li>
                                <li><Link href="#0">March 21, {new Date().getFullYear()}</Link></li>
                                <li><Link href="#0"><i className="fa fa-clock" /> 20 Min Read</Link></li>
                            </ul>
                            <h3 className="ta-blog-box__title ta-blog-box__title--white ta-border-effect mt-10">
                                <Link href="/blog-details">Fluid Typography: Predicting A
                                    Problem With</Link></h3>
                        </div>
                    </div>
                </article>
                </SwiperSlide>
                <SwiperSlide><article className="ta-blog-box ta-blog-box__style-3">
                    <div className="thumb ta-stroke">
                        <img src="/assets/img/blog/blog-big-2.webp" alt="blog" />
                        <div className="ta-blog-box__cats ta-blog-box__cats--right">
                            <Link href="#0">music</Link>
                        </div>
                    </div>
                    <div className="inner-content text-center pb-55 pl-60 pr-60">
                        <div className="content">
                            <ul className="ta-blog-box__meta-info ta-blog-box__meta-info--white meta-infos d-flex justify-content-center align-items-center list-unstyled">
                                <li>
                                    <Link href="#0" className="author-wrapper d-flex justify-content-center align-items-center">
                                        <span className="author-thumb">
                                            <img src="/assets/img/author/author-1.webp" alt="" />
                                        </span>
                                        <span className="author-name">Alexis Dowson</span>
                                    </Link>
                                </li>
                                <li><Link href="#0">March 21, {new Date().getFullYear()}</Link></li>
                                <li><Link href="#0"><i className="fa fa-clock" /> 20 Min Read</Link></li>
                            </ul>
                            <h3 className="ta-blog-box__title ta-blog-box__title--white ta-border-effect mt-10">
                                <Link href="/blog-details">Fluid Typography: Predicting A
                                    Problem With</Link></h3>
                        </div>
                    </div>
                </article>
                </SwiperSlide>
                <SwiperSlide><article className="ta-blog-box ta-blog-box__style-3">
                    <div className="thumb ta-stroke">
                        <img src="/assets/img/blog/blog-big-3.webp" alt="blog" />
                        <div className="ta-blog-box__cats ta-blog-box__cats--right">
                            <Link href="#0">music</Link>
                        </div>
                    </div>
                    <div className="inner-content text-center pb-55 pl-60 pr-60">
                        <div className="content">
                            <ul className="ta-blog-box__meta-info ta-blog-box__meta-info--white meta-infos d-flex justify-content-center align-items-center list-unstyled">
                                <li>
                                    <Link href="#0" className="author-wrapper d-flex justify-content-center align-items-center">
                                        <span className="author-thumb">
                                            <img src="/assets/img/author/author-1.webp" alt="" />
                                        </span>
                                        <span className="author-name">Alexis Dowson</span>
                                    </Link>
                                </li>
                                <li><Link href="#0">March 21, {new Date().getFullYear()}</Link></li>
                                <li><Link href="#0"><i className="fa fa-clock" /> 20 Min Read</Link></li>
                            </ul>
                            <h3 className="ta-blog-box__title ta-blog-box__title--white ta-border-effect mt-10">
                                <Link href="/blog-details">Fluid Typography: Predicting A
                                    Problem With</Link></h3>
                        </div>
                    </div>
                </article>
                </SwiperSlide>
            </Swiper>
        </>
    )
}
