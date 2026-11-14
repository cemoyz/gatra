'use client'
import Link from 'next/link'
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 3,
    spaceBetween: 90,
    slidesPerGroup: 1,
    loop: true,
    autoplay: true,
    // grabcursor: true,
    speed: 400,
    breakpoints: {
        320: {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 25,
        },
        767: {
            slidesPerView: 2,
            slidesPerGroup: 1,
            spaceBetween: 30,
        },
        1024: {
            slidesPerView: 3,
            slidesPerGroup: 1,
        },
        1200: {
            slidesPerView: 3,
            slidesPerGroup: 1,
        },
    },
}

import { getImageUrl } from "@/lib/imageUtils"

export default function Trending1({ posts = [], settings = {} }) {
    if (settings.show_trending_posts === 'false') {
        return null
    }
    const displayPosts = posts && posts.length > 0 ? posts.slice(0, 8) : null

    return (
        <>
            <section className="trending-area">
                <div className="container">
                    <div className="trending-carousel">
                        <Swiper {...swiperOptions} className="trending-swiper">
                            {displayPosts ? (
                                displayPosts.map((post) => {
                                    const catName = post.category?.name || (typeof post.category === 'string' ? post.category : 'Trending')
                                    return (
                                        <SwiperSlide key={post.id}>
                                            <div className="trending-item">
                                                <div className="trending-thumb">
                                                    <Link href={`/blog/${post.slug || post.id}`}>
                                                        <img
                                                            src={getImageUrl(post.img, '/assets/img/trending/trending-img-1.jpg')}
                                                            alt={post.title}
                                                            onError={(e) => { e.currentTarget.src = '/assets/img/trending/trending-img-1.jpg' }}
                                                        />
                                                    </Link>
                                                </div>
                                                <div className="post-content trending-content">
                                                    <span>{catName}</span>
                                                    <h4 className="title trending-title">
                                                        <Link href={`/blog/${post.slug || post.id}`}>{post.title}</Link>
                                                    </h4>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    )
                                })
                            ) : (
                                <>
                                    <SwiperSlide>
                                        <div className="trending-item">
                                            <div className="trending-thumb">
                                                <Link href="/blog"><img src="/assets/img/trending/trending-img-1.jpg" alt="trend" /></Link>
                                            </div>
                                            <div className="post-content trending-content">
                                                <span>Business</span>
                                                <h4 className="title trending-title">
                                                    <Link href="/blog">What Happens When Fed Raises any Rates?</Link>
                                                </h4>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="trending-item">
                                            <div className="trending-thumb">
                                                <Link href="/blog"><img src="/assets/img/trending/trending-img-2.jpg" alt="trend" /></Link>
                                            </div>
                                            <div className="post-content trending-content">
                                                <span>Sports</span>
                                                <h4 className="title trending-title">
                                                    <Link href="/blog">The Big Project to Link UK to Huge a Solar Farm.</Link>
                                                </h4>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="trending-item">
                                            <div className="trending-thumb">
                                                <Link href="/blog"><img src="/assets/img/trending/trending-img-3.jpg" alt="trend" /></Link>
                                            </div>
                                            <div className="post-content trending-content">
                                                <span>Lifestyle</span>
                                                <h4 className="title trending-title">
                                                    <Link href="/blog">The simplest keep your family problem now.</Link>
                                                </h4>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                </>
                            )}
                        </Swiper>
                    </div>
                </div>
            </section>
        </>
    )
}
