'use client'
import Link from 'next/link'
import { useState } from 'react'
import 'swiper/css/free-mode'
import 'swiper/css/thumbs'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'



export default function HeroPost7() {
    const [thumbsSwiper, setThumbsSwiper] = useState(null)
    return (
        <>
            <div>
                <div className="swiper hero-carousel-top">
                    <Swiper
                        spaceBetween={10}
                        navigation={false}
                        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                        modules={[FreeMode, Navigation, Thumbs]} className="swiper-wrapper">
                        <SwiperSlide>
                            <div className="post-card carousel-card">
                                <div className="post-img">
                                    <img src="/assets/img/images/hero-carousel-1.jpg" alt="hero" />
                                </div>
                                <div className="post-content">
                                    <Link href="/single-post-1" className="card-btn bg-green">Sports</Link>
                                    <h3 className="title">
                                        <Link href="/single-post-1">World Cup Predictions: Back Ziyech Shots in Open Third Place
                                            Playoff</Link>
                                    </h3>
                                    <ul className="post-list">
                                        <li className="author">
                                            by <span><Link href="/author-details">David Bin</Link></span>
                                        </li>
                                        <li className="date">July 29, 2024</li>
                                        <li><i className="las la-comments" />5</li>
                                    </ul>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="post-card carousel-card">
                                <div className="post-img">
                                    <img src="/assets/img/images/hero-carousel-1.jpg" alt="hero" />
                                </div>
                                <div className="post-content">
                                    <Link href="/single-post-1" className="card-btn bg-green">Sports</Link>
                                    <h3 className="title">
                                        <Link href="/single-post-1">World Cup Predictions: Back Ziyech Shots in Open Third Place
                                            Playoff</Link>
                                    </h3>
                                    <ul className="post-list">
                                        <li className="author">
                                            by <span><Link href="/author-details">David Bin</Link></span>
                                        </li>
                                        <li className="date">July 29, 2024</li>
                                        <li><i className="las la-comments" />5</li>
                                    </ul>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="post-card carousel-card">
                                <div className="post-img">
                                    <img src="/assets/img/images/hero-carousel-1.jpg" alt="hero" />
                                </div>
                                <div className="post-content">
                                    <Link href="/single-post-1" className="card-btn bg-green">Sports</Link>
                                    <h3 className="title">
                                        <Link href="/single-post-1">World Cup Predictions: Back Ziyech Shots in Open Third Place
                                            Playoff</Link>
                                    </h3>
                                    <ul className="post-list">
                                        <li className="author">
                                            by <span><Link href="/author-details">David Bin</Link></span>
                                        </li>
                                        <li className="date">July 29, 2024</li>
                                        <li><i className="las la-comments" />5</li>
                                    </ul>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="post-card carousel-card">
                                <div className="post-img">
                                    <img src="/assets/img/images/hero-carousel-1.jpg" alt="hero" />
                                </div>
                                <div className="post-content">
                                    <Link href="/single-post-1" className="card-btn bg-green">Sports</Link>
                                    <h3 className="title">
                                        <Link href="/single-post-1">World Cup Predictions: Back Ziyech Shots in Open Third Place
                                            Playoff</Link>
                                    </h3>
                                    <ul className="post-list">
                                        <li className="author">
                                            by <span><Link href="/author-details">David Bin</Link></span>
                                        </li>
                                        <li className="date">July 29, 2024</li>
                                        <li><i className="las la-comments" />5</li>
                                    </ul>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
                <div className="hero-thumb-wrap">
                    <div className="container">
                        <div className="swiper hero-carousel-bottom">
                            <Swiper
                                onSwiper={setThumbsSwiper}
                                spaceBetween={10}
                                slidesPerView={4}
                                freeMode={true}
                                watchSlidesProgress={true}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className="swiper-wrapper">
                                <SwiperSlide>
                                    <div className="carousel-content">
                                        <h3 className="title">
                                            World Cup Predictions: Back Ziyech Shots in Open Third Place Playoff
                                        </h3>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="carousel-content">
                                        <h3 className="title">
                                            World Cup Predictions: Back Ziyech Shots in Open Third Place Playoff
                                        </h3>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="carousel-content">
                                        <h3 className="title">
                                            World Cup Predictions: Back Ziyech Shots in Open Third Place Playoff
                                        </h3>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="carousel-content">
                                        <h3 className="title">
                                            World Cup Predictions: Back Ziyech Shots in Open Third Place Playoff
                                        </h3>
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
