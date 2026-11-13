'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'

const defaultCategoryList = [
    { id: 10, name: "Bola", slug: "bola", postsCount: 7 },
    { id: 15, name: "Cek Fakta", slug: "cek-fakta", postsCount: 6 },
    { id: 2, name: "Design", slug: "design", postsCount: 7 },
    { id: 11, name: "Edukasi", slug: "edukasi", postsCount: 7 },
    { id: 5, name: "Lifestyle", slug: "lifestyle", postsCount: 7 },
    { id: 3, name: "Marketing", slug: "marketing", postsCount: 7 },
    { id: 13, name: "Money", slug: "money", postsCount: 6 },
    { id: 7, name: "News", slug: "news", postsCount: 7 },
    { id: 14, name: "Otomotif", slug: "otomotif", postsCount: 6 },
    { id: 6, name: "Podcast", slug: "podcast", postsCount: 7 },
    { id: 12, name: "Sains", slug: "sains", postsCount: 7 },
    { id: 1, name: "Technology", slug: "technology", postsCount: 7 },
    { id: 8, name: "Tekno", slug: "tekno", postsCount: 7 },
    { id: 4, name: "Travel", slug: "travel", postsCount: 7 },
    { id: 9, name: "Tren", slug: "tren", postsCount: 8 }
]

const categoryImageMap = {
    'bola': '/assets/img/post/popular-sports-1.jpg',
    'cek-fakta': '/assets/img/images/categori-img-2.jpg',
    'design': '/assets/img/images/categori-img-3.jpg',
    'edukasi': '/assets/img/images/categori-img-4.jpg',
    'lifestyle': '/assets/img/images/categori-img-5.jpg',
    'marketing': '/assets/img/images/categori-img-6.jpg',
    'money': '/assets/img/images/categori-img-7.jpg',
    'news': '/assets/img/images/categori-img-8.jpg',
    'otomotif': '/assets/img/post/read-post-img-1.jpg',
    'podcast': '/assets/img/post/gadget-post-2.jpg',
    'sains': '/assets/img/post/tech-post-3.jpg',
    'technology': '/assets/img/images/categori-img-1.jpg',
    'tekno': '/assets/img/post/tech-post-1.jpg',
    'travel': '/assets/img/post/travel-post-1.jpg',
    'tren': '/assets/img/post/trending-post-1.jpg',
}

const getCategoryImage = (cat, index = 0) => {
    if (cat.image) return cat.image
    if (cat.img) return cat.img
    const slug = (cat.slug || '').toLowerCase()
    if (categoryImageMap[slug]) return categoryImageMap[slug]
    const name = (cat.name || '').toLowerCase()
    for (const [key, val] of Object.entries(categoryImageMap)) {
        if (name.includes(key) || slug.includes(key)) return val
    }
    return `/assets/img/images/categori-img-${(index % 8) + 1}.jpg`
}

export default function Categories({ categories = [], settings = {} }) {
    if (settings.show_categories_section === 'false') {
        return null
    }
    const swiperRef = useRef(null)
    const displayCats = categories && categories.length > 0 ? categories : defaultCategoryList

    return (
        <>
            <section className="categories-section padding">
                <div className="container">
                    <div className="categories-slider-wrap">
                        <Swiper
                            modules={[Autoplay, Navigation, Pagination]}
                            onBeforeInit={(swiper) => {
                                swiperRef.current = swiper
                            }}
                            slidesPerView={4}
                            spaceBetween={24}
                            loop={displayCats.length > 4}
                            autoplay={{
                                delay: 3200,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true,
                            }}
                            speed={650}
                            breakpoints={{
                                320: {
                                    slidesPerView: 1.3,
                                    spaceBetween: 12,
                                },
                                440: {
                                    slidesPerView: 1.75,
                                    spaceBetween: 14,
                                },
                                576: {
                                    slidesPerView: 2.3,
                                    spaceBetween: 16,
                                },
                                768: {
                                    slidesPerView: 3,
                                    spaceBetween: 20,
                                },
                                1200: {
                                    slidesPerView: 4,
                                    spaceBetween: 24,
                                },
                            }}
                            className="categories-swiper"
                        >
                            {displayCats.map((cat, idx) => {
                                const imgUrl = getCategoryImage(cat, idx)
                                const count = cat.postsCount || cat.count || cat._count?.posts || 0
                                return (
                                    <SwiperSlide key={cat.id || idx}>
                                        <div className="cat-card-item">
                                            <div className="cat-card-thumb">
                                                <Link href={`/blog-filter-category?category=${cat.slug}`}>
                                                    <img
                                                        src={imgUrl}
                                                        alt={cat.name}
                                                        onError={(e) => {
                                                            e.currentTarget.src = `/assets/img/images/categori-img-${(idx % 8) + 1}.jpg`
                                                        }}
                                                    />
                                                </Link>
                                                <div className="cat-card-overlay" />
                                            </div>
                                            <div className="cat-card-content">
                                                <span className="cat-post-count">{count} Posts</span>
                                                <h3 className="cat-title">
                                                    <Link href={`/blog-filter-category?category=${cat.slug}`}>{cat.name}</Link>
                                                </h3>
                                                <Link
                                                    href={`/blog-filter-category?category=${cat.slug}`}
                                                    className="cat-see-btn"
                                                >
                                                    See All Post
                                                </Link>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>

                        {/* Tombol Slide Kiri & Kanan */}
                        <button
                            type="button"
                            className="cat-nav-btn cat-nav-prev"
                            onClick={() => swiperRef.current?.slidePrev()}
                            aria-label="Kategori Sebelumnya"
                        >
                            <i className="las la-angle-left" />
                        </button>
                        <button
                            type="button"
                            className="cat-nav-btn cat-nav-next"
                            onClick={() => swiperRef.current?.slideNext()}
                            aria-label="Kategori Selanjutnya"
                        >
                            <i className="las la-angle-right" />
                        </button>
                    </div>
                </div>
            </section>

            <style jsx>{`
                .categories-slider-wrap {
                    position: relative;
                    width: 100%;
                }

                .cat-card-item {
                    position: relative;
                    border-radius: 14px;
                    overflow: hidden;
                    height: 290px;
                    box-shadow: 0 4px 18px rgba(0, 0, 0, 0.08);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }

                .cat-card-item:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.16);
                }

                .cat-card-thumb {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                }

                .cat-card-thumb :global(a) {
                    display: block;
                    width: 100%;
                    height: 100%;
                }

                .cat-card-thumb :global(img) {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                    border-radius: 14px !important;
                    transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
                }

                .cat-card-item:hover .cat-card-thumb :global(img) {
                    transform: scale(1.08);
                }

                .cat-card-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(180deg, rgba(15, 23, 42, 0.15) 0%, rgba(15, 23, 42, 0.72) 100%);
                    pointer-events: none;
                    transition: background 0.3s ease;
                }

                .cat-card-item:hover .cat-card-overlay {
                    background: linear-gradient(180deg, rgba(15, 23, 42, 0.25) 0%, rgba(15, 23, 42, 0.82) 100%);
                }

                .cat-card-content {
                    position: absolute;
                    bottom: 32px;
                    left: 0;
                    width: 100%;
                    text-align: center;
                    padding: 0 16px;
                    z-index: 2;
                }

                .cat-post-count {
                    font-size: 13px;
                    font-weight: 500;
                    color: rgba(255, 255, 255, 0.9);
                    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
                    display: block;
                    margin-bottom: 6px;
                    letter-spacing: 0.3px;
                }

                .cat-title {
                    margin: 0 0 14px 0;
                    line-height: 1.2;
                }

                .cat-title :global(a) {
                    color: #ffffff !important;
                    font-size: 21px;
                    font-weight: 700;
                    text-shadow: 0 2px 6px rgba(0, 0, 0, 0.8);
                    text-decoration: none;
                    transition: color 0.2s ease;
                }

                .cat-title :global(a:hover) {
                    color: #f1f5f9 !important;
                }

                :global(.cat-see-btn) {
                    display: inline-block;
                    padding: 7px 22px;
                    font-size: 12px;
                    font-weight: 600;
                    border-radius: 30px;
                    border: 1.5px solid rgba(255, 255, 255, 0.9);
                    color: #ffffff !important;
                    background: transparent;
                    text-decoration: none !important;
                    transition: all 0.25s ease;
                    letter-spacing: 0.4px;
                }

                :global(.cat-see-btn:hover) {
                    background: #ffffff !important;
                    color: #0f172a !important;
                    border-color: #ffffff !important;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(255, 255, 255, 0.25);
                }

                /* Nav Arrows */
                .cat-nav-btn {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    background: #ffffff;
                    color: #1e293b;
                    border: 1px solid rgba(0, 0, 0, 0.08);
                    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.14);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    z-index: 10;
                    transition: all 0.25s ease;
                    font-size: 18px;
                    outline: none;
                }

                .cat-nav-prev {
                    left: -22px;
                }

                .cat-nav-next {
                    right: -22px;
                }

                .cat-nav-btn:hover {
                    background: var(--primary-color, #da0105);
                    color: #ffffff;
                    border-color: var(--primary-color, #da0105);
                    box-shadow: 0 6px 20px rgba(218, 1, 5, 0.35);
                    transform: translateY(-50%) scale(1.1);
                }

                .cat-nav-btn:active {
                    transform: translateY(-50%) scale(0.95);
                }

                @media (max-width: 991px) {
                    .cat-nav-prev {
                        left: -6px;
                    }
                    .cat-nav-next {
                        right: -6px;
                    }
                }

                @media (max-width: 575px) {
                    .cat-card-item {
                        height: 240px;
                        border-radius: 12px;
                    }
                    .cat-title :global(a) {
                        font-size: 18px;
                    }
                    .cat-post-count {
                        font-size: 12px;
                        margin-bottom: 4px;
                    }
                    .cat-card-content {
                        bottom: 22px;
                        padding: 0 10px;
                    }
                    :global(.cat-see-btn) {
                        padding: 5px 16px;
                        font-size: 11px;
                    }
                    .cat-nav-btn {
                        width: 34px;
                        height: 34px;
                        font-size: 14px;
                        background: rgba(255, 255, 255, 0.94);
                        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.22);
                    }
                    .cat-nav-prev {
                        left: 4px;
                    }
                    .cat-nav-next {
                        right: 4px;
                    }
                }
            `}</style>
        </>
    )
}
