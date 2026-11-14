'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const isBreakingPost = (post) => {
    if (!post) return false
    if (post.isBreaking === true || post.isBreaking === 'true') return true
    if (Array.isArray(post.tags)) {
        return post.tags.some(t => {
            const s = (typeof t === 'string' ? t : (t.slug || t.name || '')).toLowerCase()
            return s.includes('breaking') || s.includes('kilas-berita') || s.includes('urgent')
        })
    }
    return false
}

export default function News({ posts = [], settings = {} }) {
    // 1. Filter awal: HANYA artikel yang diceklis Breaking News
    const initialBreaking = (posts || []).filter(isBreakingPost)
    const [breakingPosts, setBreakingPosts] = useState(initialBreaking)

    // 2. Client-side fetch ke /api/breaking-news agar selalu sinkron real-time saat ceklis di dashboard diubah
    useEffect(() => {
        let isMounted = true
        fetch('/api/breaking-news?limit=15')
            .then(res => res.json())
            .then(data => {
                if (isMounted && data.success && Array.isArray(data.posts)) {
                    setBreakingPosts(data.posts)
                }
            })
            .catch(() => {
                // Gunakan initialBreaking jika offline/error
            })
        return () => { isMounted = false }
    }, [])

    let displayPosts = [...breakingPosts]
    const customText = settings.breaking_ticker_custom_text && settings.breaking_ticker_custom_text.trim()
    if (customText) {
        displayPosts = [{ id: 'custom-ticker', title: customText, slug: "" }, ...displayPosts]
    }

    // Jika TIDAK ADA artikel yang diceklis breaking news dan tidak ada custom text:
    // Jangan tampilkan artikel sembarang. Sembunyikan ticker.
    if (displayPosts.length === 0) {
        return null
    }

    const tickerTitle = settings.breaking_ticker_title || "BREAKING NEWS"
    const canLoop = displayPosts.length > 1

    const swiperOptions = {
        modules: [Autoplay, Pagination, Navigation],
        slidesPerView: 1,
        spaceBetween: 0,
        slidesPerGroup: 1,
        direction: 'vertical',
        loop: canLoop,
        navigation: {
            nextEl: ".news-carousel .swiper-prev",
            prevEl: ".news-carousel .swiper-next",
        },
        autoplay: canLoop ? {
            delay: 4000,
            reverseDirection: true,
            disableOnInteraction: false,
        } : false,
        speed: 400,
    }

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
                        {canLoop && (
                            <div className="swiper-arrow">
                                <div className="swiper-nav swiper-next"><i className="las la-angle-left" /></div>
                                <div className="swiper-nav swiper-prev"><i className="las la-angle-right" /></div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}
