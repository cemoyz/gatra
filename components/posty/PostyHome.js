'use client'
import Head from "next/head"
import { useState, useEffect } from "react"
import Layout from "./layout/Layout"
import News from "./sections/News"
import Trending1 from "./sections/Trending1"
import HeroPost1 from "./sections/HeroPost1"
import Cta1 from "./sections/Cta1"
import EditorBlog1 from "./sections/EditorBlog1"
import HeroPost2 from "./sections/HeroPost2"
import Categories from "./sections/Categories"
import NewsPost1 from "./sections/NewsPost1"
import Watch from "./sections/Watch"
import FashionBlog1 from "./sections/FashionBlog1"
import Cta2 from "./sections/Cta2"
import HeroPost3 from "./sections/HeroPost3"
import Subscribe1 from "./sections/Subscribe1"
import RecentPost from "./sections/RecentPost"

export default function PostyHome({
    settings = {},
    initialPosts = [],
    initialPopularPosts = [],
    initialCategories = []
}) {
    const [posts, setPosts] = useState(initialPosts)
    const [popularPosts, setPopularPosts] = useState(initialPopularPosts)
    const [categories, setCategories] = useState(initialCategories)

    useEffect(() => {
        if (initialPosts.length === 0) {
            fetch('/api/posts?limit=50&status=PUBLISHED')
                .then(res => res.json())
                .then(data => {
                    if (data.success && Array.isArray(data.posts)) {
                        setPosts(data.posts)
                    }
                })
                .catch(console.error)
        }
        if (initialPopularPosts.length === 0) {
            fetch('/api/posts?limit=10&sortBy=popular&status=PUBLISHED')
                .then(res => res.json())
                .then(data => {
                    if (data.success && Array.isArray(data.posts)) {
                        setPopularPosts(data.posts)
                    }
                })
                .catch(console.error)
        }
        if (initialCategories.length === 0) {
            fetch('/api/categories')
                .then(res => res.json())
                .then(data => {
                    if (data.success && Array.isArray(data.categories)) {
                        setCategories(data.categories)
                    }
                })
                .catch(console.error)
        }
    }, [initialPosts.length, initialPopularPosts.length, initialCategories.length])

    // --- DASHBOARD SETTINGS BINDINGS ---

    // 1. Hero Posts Filtering & Slot Resolution
    let heroPosts = posts.slice(0, 10)
    if (settings.featured_posts_mode === 'manual') {
        const slot1 = posts.find(p => String(p.id) === String(settings.featured_post_slot_1))
        const slot2 = posts.find(p => String(p.id) === String(settings.featured_post_slot_2))
        const slot3 = posts.find(p => String(p.id) === String(settings.featured_post_slot_3))
        const slot4 = posts.find(p => String(p.id) === String(settings.featured_post_slot_4))
        const slot5 = posts.find(p => String(p.id) === String(settings.featured_post_slot_5))
        const manualSlots = [slot1, slot2, slot3, slot4, slot5].filter(Boolean)
        if (manualSlots.length > 0) {
            const others = posts.filter(p => !manualSlots.some(m => m.id === p.id))
            heroPosts = [...manualSlots, ...others]
        }
    } else if (settings.featured_posts_category && settings.featured_posts_category !== 'all') {
        const filtered = posts.filter(p => {
            const s = p.category?.slug || (typeof p.category === 'string' ? p.category : '')
            return s.toLowerCase() === settings.featured_posts_category.toLowerCase()
        })
        if (filtered.length > 0) {
            heroPosts = filtered
        }
    }
    if (settings.featured_posts_sort === 'views') {
        heroPosts = [...heroPosts].sort((a, b) => (b.views || 0) - (a.views || 0))
    }

    // 2. Trending Posts Filtering
    let trendingPosts = popularPosts.length > 0 ? popularPosts : posts.slice(0, 8)
    if (settings.trending_posts_category && settings.trending_posts_category !== 'all') {
        const filtered = posts.filter(p => {
            const s = p.category?.slug || (typeof p.category === 'string' ? p.category : '')
            return s.toLowerCase() === settings.trending_posts_category.toLowerCase()
        })
        if (filtered.length > 0) {
            trendingPosts = filtered.slice(0, 8)
        }
    }

    // 3. Hand-Picked / Editor's Pick Posts
    let editorPosts = posts.filter(p => p.featured).length >= 4 
        ? posts.filter(p => p.featured).slice(0, 4) 
        : posts.slice(2, 6)
    if (settings.handpick_posts_mode === 'manual' && settings.handpick_posts_manual_ids) {
        const ids = settings.handpick_posts_manual_ids.split(',').map(x => x.trim()).filter(Boolean)
        const manualList = ids.map(id => posts.find(p => String(p.id) === id)).filter(Boolean)
        if (manualList.length > 0) {
            editorPosts = manualList
        }
    } else if (settings.handpick_posts_category && settings.handpick_posts_category !== 'all') {
        const filtered = posts.filter(p => {
            const s = p.category?.slug || (typeof p.category === 'string' ? p.category : '')
            return s.toLowerCase() === settings.handpick_posts_category.toLowerCase()
        })
        if (filtered.length >= 4) {
            editorPosts = filtered.slice(0, 4)
        }
    }

    // 4. Popular Posts (Most Read)
    let mostReadPosts = popularPosts.length >= 3 ? popularPosts.slice(0, 3) : posts.slice(4, 7)
    if (settings.popular_posts_category && settings.popular_posts_category !== 'all') {
        const filtered = (popularPosts.length > 0 ? popularPosts : posts).filter(p => {
            const s = p.category?.slug || (typeof p.category === 'string' ? p.category : '')
            return s.toLowerCase() === settings.popular_posts_category.toLowerCase()
        })
        if (filtered.length >= 3) {
            mostReadPosts = filtered.slice(0, 3)
        }
    }

    // 5. Section Slices
    const newsTickerPosts = posts.slice(0, 5)
    const latestNewsPosts = posts.length > 8 ? posts.slice(6) : posts
    const videoPosts = posts.filter(p => p.postType === 'video' || p.videoUrl).length > 0 
        ? posts.filter(p => p.postType === 'video' || p.videoUrl) 
        : posts.slice(8, 14)
    const lifestylePosts = posts.filter(p => {
        const s = (typeof p.category === 'string' ? p.category : (p.category?.slug || p.category?.name || '')).toLowerCase()
        return s.includes('life') || s.includes('style') || s.includes('tren') || s.includes('travel')
    })
    const travelPosts = posts.filter(p => {
        const s = (typeof p.category === 'string' ? p.category : (p.category?.slug || p.category?.name || '')).toLowerCase()
        return s.includes('travel') || s.includes('wisata') || s.includes('kuliner') || s.includes('alam')
    })

    const siteTitle = settings.site_title || "Gatra Portal"
    const siteTagline = settings.site_tagline || "Portal Berita Terkini, Akurat, dan Terpercaya"

    // Section Visibility Toggles from Dashboard
    const showMarquee = settings.show_marquee_cats !== 'false' && settings.breaking_ticker_enabled !== 'false'
    const showFeatured = settings.show_featured_posts !== 'false'
    const showTrending = settings.show_trending_posts !== 'false'
    const showPopular = settings.show_popular_posts !== 'false'
    const showHandpick = settings.show_handpick_posts !== 'false'

    return (
        <>
            <Head>
                <title>{`${siteTitle} - ${siteTagline}`}</title>
                <meta name="description" content={siteTagline} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href={settings.site_favicon || "/assets/img/logo/favicon.webp"} />
            </Head>

            <Layout headerStyle={1} footerStyle={1} settings={settings}>
                {/* 1. Breaking / Top News Ticker */}
                {showMarquee && <News posts={newsTickerPosts} settings={settings} />}

                {/* 2. Trending Carousel */}
                {showTrending && <Trending1 posts={trendingPosts} settings={settings} />}

                {/* 3. Hero Post Section (Cards, Slider, Tabs) */}
                {showFeatured && <HeroPost1 posts={heroPosts} popularPosts={popularPosts} settings={settings} />}

                {/* 4. CTA Banner 1 */}
                <Cta1 />

                {/* 5. Editor's Pick Section & Follow Us */}
                {showHandpick && <EditorBlog1 posts={editorPosts} settings={settings} />}

                {/* 6. Most Read Post Section */}
                {showPopular && <HeroPost2 posts={mostReadPosts} settings={settings} />}

                {/* 7. Categories Grid */}
                <Categories categories={categories} settings={settings} />

                {/* 8. Latest News & Sidebar Section */}
                <NewsPost1 posts={latestNewsPosts} popularPosts={popularPosts} categories={categories} settings={settings} />

                {/* 9. Video Section (What to Watch) */}
                <Watch posts={videoPosts} settings={settings} />

                {/* 10. Lifestyle / Fashion Section */}
                <FashionBlog1 posts={lifestylePosts.length >= 3 ? lifestylePosts : posts.slice(3, 6)} settings={settings} />

                {/* 11. CTA Banner 2 */}
                <Cta2 />

                {/* 12. Travel / Feature Section */}
                <HeroPost3 posts={travelPosts.length >= 3 ? travelPosts : posts.slice(7, 10)} categoryName="Travel & Adventure" settings={settings} />

                {/* 13. Newsletter Subscribe */}
                <Subscribe1 settings={settings} />

                {/* 14. Recent Posts Grid */}
                <RecentPost posts={posts} settings={settings} />
            </Layout>
        </>
    )
}
