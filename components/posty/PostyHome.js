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

const defaultFallbackPosts = [
    {
        id: 1,
        title: "Kecerdasan Buatan dan Transformasi Digital Media Jurnalisme Modern",
        slug: "kecerdasan-buatan-dan-transformasi-digital",
        excerpt: "Eksplorasi mendalam mengenai adopsi kecerdasan buatan, regulasi data, dan tren media digital masa depan.",
        img: "/assets/img/post/post-img-1.jpg",
        category: { id: 1, name: "Tekno", slug: "tekno" },
        author: { id: 1, name: "Redaksi", avatar: "/assets/img/author/qa-author.webp" },
        createdAt: "2026-11-12T08:00:00.000Z",
        views: 1820,
        featured: true
    },
    {
        id: 2,
        title: "Analisis Pasar Keuangan Global: Peluang Investasi dan Kebijakan Fiskal",
        slug: "analisis-pasar-keuangan-global",
        excerpt: "Perkembangan suku bunga acuan dan strategi manajemen risiko di tengah dinamika pasar keuangan global.",
        img: "/assets/img/post/post-img-2.jpg",
        category: { id: 2, name: "Money", slug: "money" },
        author: { id: 2, name: "Editor Keuangan", avatar: "/assets/img/author/author-2.webp" },
        createdAt: "2026-11-12T07:30:00.000Z",
        views: 1540,
        featured: true
    },
    {
        id: 3,
        title: "Eksplorasi Destinasi Wisata Tersembunyi Nusantara yang Memukau",
        slug: "destinasi-wisata-tersembunyi-nusantara",
        excerpt: "Panduan lengkap menjelajahi keindahan alam tersembunyi dengan kearifan lokal yang lestari.",
        img: "/assets/img/post/travel-post-1.jpg",
        category: { id: 3, name: "Travel", slug: "travel" },
        author: { id: 3, name: "Traveler", avatar: "/assets/img/author/author-1.webp" },
        createdAt: "2026-11-11T14:15:00.000Z",
        views: 1420,
        featured: true
    },
    {
        id: 4,
        title: "Gaya Hidup Berkelanjutan: Langkah Sederhana untuk Masa Depan Bumi",
        slug: "gaya-hidup-berkelanjutan",
        excerpt: "Menerapkan prinsip ramah lingkungan dalam kehidupan sehari-hari demi kelestarian alam.",
        img: "/assets/img/post/post-img-3.jpg",
        category: { id: 4, name: "Lifestyle", slug: "lifestyle" },
        author: { id: 1, name: "Redaksi", avatar: "/assets/img/author/qa-author.webp" },
        createdAt: "2026-11-11T10:00:00.000Z",
        views: 1310,
        featured: false
    },
    {
        id: 5,
        title: "Perkembangan Otomotif Ramah Lingkungan dan Masa Depan Kendaraan Listrik",
        slug: "perkembangan-otomotif-ramah-lingkungan",
        excerpt: "Inovasi baterai dan akselerasi infrastruktur pengisian daya kendaraan listrik.",
        img: "/assets/img/post/read-post-img-1.jpg",
        category: { id: 5, name: "Otomotif", slug: "otomotif" },
        author: { id: 2, name: "Editor Otomotif", avatar: "/assets/img/author/author-2.webp" },
        createdAt: "2026-11-10T16:20:00.000Z",
        views: 1210,
        featured: false
    },
    {
        id: 6,
        title: "Pendidikan Masa Depan: Integrasi Pembelajaran Interaktif Berbasis Cloud",
        slug: "pendidikan-masa-depan-cloud",
        excerpt: "Transformasi kurikulum dan pemanfaatan platform interaktif dalam dunia edukasi.",
        img: "/assets/img/images/categori-img-4.jpg",
        category: { id: 6, name: "Edukasi", slug: "edukasi" },
        author: { id: 1, name: "Redaksi", avatar: "/assets/img/author/qa-author.webp" },
        createdAt: "2026-11-10T11:45:00.000Z",
        views: 1150,
        featured: false
    },
    {
        id: 7,
        title: "Kilas Balik Prestasi Olahraga Indonesia di Kancah Internasional",
        slug: "kilas-balik-prestasi-olahraga",
        excerpt: "Catatan perjuangan dan pencapaian atlet-atlet nasional di kompetisi dunia.",
        img: "/assets/img/post/popular-sports-1.jpg",
        category: { id: 7, name: "Bola", slug: "bola" },
        author: { id: 3, name: "Redaksi Olahraga", avatar: "/assets/img/author/author-1.webp" },
        createdAt: "2026-11-09T09:10:00.000Z",
        views: 1090,
        featured: false
    },
    {
        id: 8,
        title: "Pentingnya Literasi Digital dan Verifikasi Fakta di Era Informasi",
        slug: "pentingnya-literasi-digital",
        excerpt: "Menangkal hoaks dan membangun masyarakat melek informasi dengan panduan verifikasi.",
        img: "/assets/img/images/categori-img-2.jpg",
        category: { id: 8, name: "Cek Fakta", slug: "cek-fakta" },
        author: { id: 1, name: "Tim Cek Fakta", avatar: "/assets/img/author/qa-author.webp" },
        createdAt: "2026-11-09T08:00:00.000Z",
        views: 990,
        featured: false
    }
]

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
    const activePosts = posts && posts.length > 0 ? posts : defaultFallbackPosts
    const activePopular = popularPosts && popularPosts.length > 0 ? popularPosts : activePosts

    // 1. Hero Posts Filtering & Slot Resolution
    let heroPosts = activePosts.slice(0, 10)
    if (settings.featured_posts_mode === 'manual') {
        const slot1 = activePosts.find(p => String(p.id) === String(settings.featured_post_slot_1))
        const slot2 = activePosts.find(p => String(p.id) === String(settings.featured_post_slot_2))
        const slot3 = activePosts.find(p => String(p.id) === String(settings.featured_post_slot_3))
        const slot4 = activePosts.find(p => String(p.id) === String(settings.featured_post_slot_4))
        const slot5 = activePosts.find(p => String(p.id) === String(settings.featured_post_slot_5))
        const manualSlots = [slot1, slot2, slot3, slot4, slot5].filter(Boolean)
        if (manualSlots.length > 0) {
            const others = activePosts.filter(p => !manualSlots.some(m => m.id === p.id))
            heroPosts = [...manualSlots, ...others]
        }
    } else if (settings.featured_posts_category && settings.featured_posts_category !== 'all') {
        const filtered = activePosts.filter(p => {
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
    let trendingPosts = activePopular.length > 0 ? activePopular : activePosts.slice(0, 8)
    if (settings.trending_posts_category && settings.trending_posts_category !== 'all') {
        const filtered = activePosts.filter(p => {
            const s = p.category?.slug || (typeof p.category === 'string' ? p.category : '')
            return s.toLowerCase() === settings.trending_posts_category.toLowerCase()
        })
        if (filtered.length > 0) {
            trendingPosts = filtered.slice(0, 8)
        }
    }

    // 3. Hand-Picked / Editor's Pick Posts
    let editorPosts = activePosts.filter(p => p.featured).length >= 4 
        ? activePosts.filter(p => p.featured).slice(0, 4) 
        : activePosts.slice(2, 6)
    if (settings.handpick_posts_mode === 'manual' && settings.handpick_posts_manual_ids) {
        const ids = settings.handpick_posts_manual_ids.split(',').map(x => x.trim()).filter(Boolean)
        const manualList = ids.map(id => activePosts.find(p => String(p.id) === id)).filter(Boolean)
        if (manualList.length > 0) {
            editorPosts = manualList
        }
    } else if (settings.handpick_posts_category && settings.handpick_posts_category !== 'all') {
        const filtered = activePosts.filter(p => {
            const s = p.category?.slug || (typeof p.category === 'string' ? p.category : '')
            return s.toLowerCase() === settings.handpick_posts_category.toLowerCase()
        })
        if (filtered.length >= 4) {
            editorPosts = filtered.slice(0, 4)
        }
    }

    // 4. Popular Posts (Most Read - 1 Hero Besar + 4 Artikel Kecil)
    let popSource = settings.popular_posts_sort === 'latest' ? activePosts : activePopular
    if (settings.popular_posts_category && settings.popular_posts_category !== 'all') {
        const filtered = popSource.filter(p => {
            const s = p.category?.slug || (typeof p.category === 'string' ? p.category : '')
            return s.toLowerCase() === settings.popular_posts_category.toLowerCase()
        })
        if (filtered.length > 0) {
            popSource = filtered
        }
    }
    let mostReadPosts = [...popSource]
    if (mostReadPosts.length < 5) {
        const remaining = activePosts.filter(p => !mostReadPosts.some(m => m.id === p.id))
        mostReadPosts = [...mostReadPosts, ...remaining]
    }
    mostReadPosts = mostReadPosts.slice(0, 5)

    // 5. Section Slices
    // Breaking News: HANYA artikel yang diceklis Breaking News di dashboard
    const breakingNewsPosts = activePosts.filter(p => {
        if (p.isBreaking === true || p.isBreaking === 'true') return true
        if (Array.isArray(p.tags)) {
            return p.tags.some(t => {
                const s = (typeof t === 'string' ? t : (t.slug || t.name || '')).toLowerCase()
                return s.includes('breaking') || s.includes('kilas-berita') || s.includes('urgent')
            })
        }
        return false
    })
    const newsTickerPosts = breakingNewsPosts.slice(0, 10)
    const latestNewsPosts = activePosts.length > 8 ? activePosts.slice(6) : activePosts
    const videoPosts = activePosts.filter(p => p.postType === 'video' || p.videoUrl).length > 0 
        ? activePosts.filter(p => p.postType === 'video' || p.videoUrl) 
        : activePosts.slice(0, 4)
    const lifestylePosts = activePosts.filter(p => {
        const s = (typeof p.category === 'string' ? p.category : (p.category?.slug || p.category?.name || '')).toLowerCase()
        return s.includes('life') || s.includes('style') || s.includes('tren') || s.includes('travel')
    })
    const travelPosts = activePosts.filter(p => {
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
    const showCategories = settings.show_categories_section !== 'false'
    const showLatestNews = settings.show_latest_posts !== 'false'
    const showVideo = settings.show_video_section !== 'false'
    const showLifestyle = settings.show_lifestyle_section !== 'false'
    const showCta2 = settings.show_cta_banner_2 !== 'false'
    const showTravel = settings.show_travel_section !== 'false'
    const showNewsletter = settings.show_newsletter !== 'false'
    const showRecent = settings.show_recent_posts !== 'false'

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
                <Cta1 settings={settings} />

                {/* 5. Editor's Pick Section & Follow Us */}
                {showHandpick && <EditorBlog1 posts={editorPosts} settings={settings} />}

                {/* 6. Most Read Post Section */}
                {showPopular && <HeroPost2 posts={mostReadPosts} settings={settings} />}

                {/* 7. Categories Slider */}
                {showCategories && <Categories categories={categories} settings={settings} />}

                {/* 8. Latest News & Sidebar Section */}
                {showLatestNews && <NewsPost1 posts={latestNewsPosts} popularPosts={popularPosts} categories={categories} settings={settings} />}

                {/* 9. Video Section (What to Watch) */}
                {showVideo && <Watch posts={videoPosts} settings={settings} />}

                {/* 10. Lifestyle / Fashion Section */}
                {showLifestyle && <FashionBlog1 posts={lifestylePosts.length >= 3 ? lifestylePosts : activePosts.slice(3, 6)} settings={settings} />}

                {/* 11. CTA Banner 2 */}
                {showCta2 && <Cta2 settings={settings} />}

                {/* 12. Travel / Feature Section */}
                {showTravel && <HeroPost3 posts={travelPosts.length >= 3 ? travelPosts : activePosts.slice(2, 5)} categoryName="Travel & Adventure" settings={settings} />}

                {/* 13. Newsletter Subscribe */}
                {showNewsletter && <Subscribe1 settings={settings} />}

                {/* 14. Recent Posts Grid */}
                {showRecent && <RecentPost posts={activePosts} settings={settings} />}
            </Layout>
        </>
    )
}
