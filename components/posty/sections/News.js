'use client'
import Link from 'next/link'
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 1,
    spaceBetween: 0,
    slidesPerGroup: 1,
    direction: 'vertical',
    loop: true,
    navigation: {
        nextEl: ".news-carousel .swiper-prev",
        prevEl: ".news-carousel .swiper-next",
    },
    autoplay: {
        delay: 4000,
        reverseDirection: true,
        disableOnInteraction: false,
    },
    speed: 400,
}

export default function News({ posts = [], settings = {} }) {
    let displayPosts = posts && posts.length > 0 ? posts.slice(0, 5) : [
        { id: 'sample-1', title: "The Improbable Rise and Savage Fall of Siegfried. How My Phone’s Most Annoying Feature Saved My Life", slug: "" },
        { id: 'sample-2', title: "Artificial Intelligence and the Modern Horizon of Digital News Media in 2026", slug: "" }
    ]
    if (settings.breaking_ticker_custom_text && settings.breaking_ticker_custom_text.trim()) {
        displayPosts = [{ id: 'custom-ticker', title: settings.breaking_ticker_custom_text.trim(), slug: "" }, ...displayPosts]
    }
    const tickerTitle = settings.breaking_ticker_title || "Top News"

    return (
        <>
            <section className="news-area">
                <div className="container">
                    <div className="news-carousel">
                        <Swiper {...swiperOptions} className="news-swiper" style={{ height: '100%', width: '100%' }}>
                            {displayPosts.map((post) => (
                                <SwiperSlide key={post.id} style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                                    <div className="hero-text">
                                        <span className="news"><img src="/assets/img/images/news-icon.png" alt="icon" />{tickerTitle}</span>
                                        <span>
                                            {post.slug ? (
                                                <Link href={`/blog/${post.slug || post.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                                    {post.title}
                                                </Link>
                                            ) : (
                                                post.title
                                            )}
                                        </span>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className="swiper-arrow">
                            <div className="swiper-nav swiper-next"><i className="las la-angle-left" /></div>
                            <div className="swiper-nav swiper-prev"><i className="las la-angle-right" /></div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
