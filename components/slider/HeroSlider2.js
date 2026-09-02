import Link from "next/link"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 1,
    spaceBetween: 0,
    centeredSlides: true,
    centeredSlidesBounds: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    loop: true
}

export default function HeroSlider2() {
    return (
        <>

            <Swiper {...swiperOptions} className="ta-feature-post-slider pt-20 pb-40 " data-ta-fp-slider>
                <SwiperSlide><article className="ta-blog-box ta-stroke ta-radious-40 ta-blog-box__featured">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="thumb ta-stroke ">
                                <img src="/assets/img/blog/blog-gallery-1.webp" alt="blog" />
                                <div className="ta-blog-box__cats ta-blog-box__cats--right">
                                    <Link href="#0">music</Link>
                                </div>
                                <span className="post-format-icon"><i className="fal fa-music" /></span>
                                <div className="inner-dots" />
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="content position-relative">
                                <span className="ta-round-btn mt-none-60">Latest <br />News</span>
                                <h2 className="ta-blog-box__title ta-blog-box__title--big ta-border-effect mt-30"><Link href="/blog-details">FabUnit: The Smart Way To
                                    Control  Synchronize</Link></h2>
                                <div className="excerpt excerpt__small mt-15">
                                    <p>The opportunity to work abroad is a popular prospect, one undimmed by the years
                                        of restriction due to the pandemic and made only more accessible thanks to hybrid
                                        working and the rise of the digital native.</p>
                                </div>
                                <Link href="/blog-details" className="ta-button ta-button__borderd mt-35">Read More <i className="fa fa-long-arrow-right" /></Link>
                                <div className="bottom-wrapper mt-55 pt-20 d-flex justify-content-between align-items-center">
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
                </SwiperSlide>
                <SwiperSlide><article className="ta-blog-box ta-stroke ta-radious-40 ta-blog-box__featured">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="thumb ta-stroke ">
                                <img src="/assets/img/blog/blog-gallery-2.webp" alt="blog" />
                                <div className="ta-blog-box__cats ta-blog-box__cats--right">
                                    <Link href="#0">video</Link>
                                </div>
                                <span className="post-format-icon"><i className="fal fa-video" /></span>
                                <div className="inner-dots" />
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="content position-relative">
                                <span className="ta-round-btn mt-none-60">Latest <br />News</span>
                                <h2 className="ta-blog-box__title ta-blog-box__title--big ta-border-effect mt-30"><Link href="/blog-details">Building Better UI Designs With Layout Grids</Link></h2>
                                <div className="excerpt excerpt__small mt-15">
                                    <p>The opportunity to work abroad is a popular prospect, one undimmed by the years
                                        of restriction due to the pandemic and made only more accessible thanks to hybrid
                                        working and the rise of the digital native.</p>
                                </div>
                                <Link href="/blog-details" className="ta-button ta-button__borderd mt-35">Read More <i className="fa fa-long-arrow-right" /></Link>
                                <div className="bottom-wrapper mt-55 pt-20 d-flex justify-content-between align-items-center">
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
                </SwiperSlide>
                <SwiperSlide>
                    <article className="ta-blog-box ta-stroke ta-radious-40 ta-blog-box__featured">
                        <div className="row">
                            <div className="col-lg-5">
                                <div className="thumb ta-stroke ">
                                    <img src="/assets/img/blog/blog-gallery-3.webp" alt="blog" />
                                    <div className="ta-blog-box__cats ta-blog-box__cats--right">
                                        <Link href="#0">Phopto</Link>
                                    </div>
                                    <span className="post-format-icon"><i className="fal fa-images" /></span>
                                    <div className="inner-dots" />
                                </div>
                            </div>
                            <div className="col-lg-7">
                                <div className="content position-relative">
                                    <span className="ta-round-btn mt-none-60">Latest <br />News</span>
                                    <h2 className="ta-blog-box__title ta-blog-box__title--big ta-border-effect mt-30"><Link href="/blog-details">An Ultimate Guide On Sizing, Spacing, And Grids.</Link></h2>
                                    <div className="excerpt excerpt__small mt-15">
                                        <p>The opportunity to work abroad is a popular prospect, one undimmed by the years
                                            of restriction due to the pandemic and made only more accessible thanks to hybrid
                                            working and the rise of the digital native.</p>
                                    </div>
                                    <Link href="/blog-details" className="ta-button ta-button__borderd mt-35">Read More <i className="fa fa-long-arrow-right" /></Link>
                                    <div className="bottom-wrapper mt-55 pt-20 d-flex justify-content-between align-items-center">
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
                </SwiperSlide>

            </Swiper>
        </>
    )
}
