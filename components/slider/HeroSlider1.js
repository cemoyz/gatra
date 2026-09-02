import Link from "next/link"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import VideoPopup from "../elements/VideoPopup"

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

export default function HeroSlider1() {
    return (
        <>
            <Swiper {...swiperOptions} className="ta-featured-blog-area ta-fp-wide-slider ">
                <SwiperSlide className="full-wid-fp-item">
                    <div className="ta-bg fix position-absolute" data-overlay="dark" data-opacity={4}>
                        <img src="/assets/img/bg/video-post-slider-1.webp" alt="img" />
                    </div>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-8">
                                <article className="ta-blog-box ta-thumb-zoom bg_img">
                                    <div className="inner-content text-center">
                                        <div className="content">
                                            <VideoPopup style={2} />
                                            <h3 className="ta-blog-box__title ta-blog-box__title--white ta-blog-box__title--big-60 ta-border-effect mt-40">
                                                <Link href="/blog-details">Indulgence Unreserved Is This
                                                    Alteration Of Waste</Link></h3>
                                            <ul className="ta-blog-box__meta-info ta-blog-box__meta-info--white meta-infos d-flex justify-content-center align-items-center list-unstyled pt-20">
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
                                        </div>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className="full-wid-fp-item">
                    <div className="ta-bg fix position-absolute" data-overlay="dark" data-opacity={4}>
                        <img src="/assets/img/bg/video-post-slider-2.webp" alt="img" />
                    </div>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-8">
                                <article className="ta-blog-box ta-thumb-zoom bg_img">
                                    <div className="inner-content text-center">
                                        <div className="content">
                                            <VideoPopup style={2} />
                                            <h3 className="ta-blog-box__title ta-blog-box__title--white ta-blog-box__title--big-60 ta-border-effect mt-40">
                                                <Link href="/blog-details">Indulgence Unreserved Is This
                                                    Alteration Of Waste</Link></h3>
                                            <ul className="ta-blog-box__meta-info ta-blog-box__meta-info--white meta-infos d-flex justify-content-center align-items-center list-unstyled pt-20">
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
                                        </div>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className="full-wid-fp-item">
                    <div className="ta-bg fix position-absolute" data-overlay="dark" data-opacity={4}>
                        <img src="/assets/img/bg/video-post-slider-3.webp" alt="img" />
                    </div>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-8">
                                <article className="ta-blog-box ta-thumb-zoom bg_img">
                                    <div className="inner-content text-center">
                                        <div className="content">
                                            <VideoPopup style={2} />
                                            <h3 className="ta-blog-box__title ta-blog-box__title--white ta-blog-box__title--big-60 ta-border-effect mt-40">
                                                <Link href="/blog-details">Indulgence Unreserved Is This
                                                    Alteration Of Waste</Link></h3>
                                            <ul className="ta-blog-box__meta-info ta-blog-box__meta-info--white meta-infos d-flex justify-content-center align-items-center list-unstyled pt-20">
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
                                        </div>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    )
}
