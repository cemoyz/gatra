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

export default function PostyHome({ settings = {}, initialPosts = [], initialPopularPosts = [] }) {
    const [posts, setPosts] = useState(initialPosts)
    const [popularPosts, setPopularPosts] = useState(initialPopularPosts)
    const [categories, setCategories] = useState([])

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
        fetch('/api/categories')
            .then(res => res.json())
            .then(data => {
                if (data.success && Array.isArray(data.categories)) {
                    setCategories(data.categories)
                }
            })
            .catch(console.error)
    }, [initialPosts.length, initialPopularPosts.length])

    // Slices for different sections
    const newsTickerPosts = posts.slice(0, 5)
    const trendingPosts = popularPosts.length > 0 ? popularPosts : posts.slice(0, 8)
    const heroPosts = posts.slice(0, 10)
    const editorPosts = posts.filter(p => p.featured).length >= 4 
        ? posts.filter(p => p.featured).slice(0, 4) 
        : posts.slice(2, 6)
    const mostReadPosts = popularPosts.length >= 3 ? popularPosts.slice(0, 3) : posts.slice(4, 7)
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

    const siteTitle = settings.site_title || "Posty - Portal Berita & Majalah Modern"
    const siteTagline = settings.site_tagline || "Portal Berita Terkini, Akurat, dan Terpercaya"

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
                <News posts={newsTickerPosts} />

                {/* 2. Trending Carousel */}
                <Trending1 posts={trendingPosts} />

                {/* 3. Hero Post Section (Cards, Slider, Tabs) */}
                <HeroPost1 posts={heroPosts} popularPosts={popularPosts} />

                {/* 4. CTA Banner 1 */}
                <Cta1 />

                {/* 5. Editor's Pick Section & Follow Us */}
                <EditorBlog1 posts={editorPosts} settings={settings} />

                {/* 6. Most Read Post Section */}
                <HeroPost2 posts={mostReadPosts} />

                {/* 7. Categories Grid */}
                <Categories categories={categories} />

                {/* 8. Latest News & Sidebar Section */}
                <NewsPost1 posts={latestNewsPosts} popularPosts={popularPosts} categories={categories} />

                {/* 9. Video Section (What to Watch) */}
                <Watch posts={videoPosts} />

                {/* 10. Lifestyle / Fashion Section */}
                <FashionBlog1 posts={lifestylePosts.length >= 3 ? lifestylePosts : posts.slice(3, 6)} />

                {/* 11. CTA Banner 2 */}
                <Cta2 />

                {/* 12. Travel / Feature Section */}
                <HeroPost3 posts={travelPosts.length >= 3 ? travelPosts : posts.slice(7, 10)} categoryName="Travel & Adventure" />

                {/* 13. Newsletter Subscribe */}
                <Subscribe1 />

                {/* 14. Recent Posts Grid */}
                <RecentPost posts={posts} />
            </Layout>
        </>
    )
}

