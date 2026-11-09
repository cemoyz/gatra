import BlogPost from "@/components/blog/BlogPost"
import Layout from "@/components/layout/Layout"
import BlogSidebar from "@/components/sections/BlogSidebar"
import MargueePost from "@/components/sections/MargueePost"
import Newsletter1 from "@/components/sections/Newsletter1"
import EditorialWelcome from "@/components/sections/EditorialWelcome"
import BreakingNewsTicker from "@/components/elements/BreakingNewsTicker"
import KompasHome from "@/components/kompas/KompasHome"
import PostyHome from "@/components/posty/PostyHome"
import Link from "next/link"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import prisma from "@/lib/prisma"

const Home2 = dynamic(() => import('./index-2'), { ssr: false })
const Home3 = dynamic(() => import('./index-3'), { ssr: false })
const Home4 = dynamic(() => import('./index-4'), { ssr: false })
const Home5 = dynamic(() => import('./index-5'), { ssr: false })
const Home6 = dynamic(() => import('./index-6'), { ssr: false })
const Home7 = dynamic(() => import('./index-7'), { ssr: false })
const Home8 = dynamic(() => import('./index-8'), { ssr: false })
const Home9 = dynamic(() => import('./index-9'), { ssr: false })
const Home10 = dynamic(() => import('./index-10'), { ssr: false })
const Home11 = dynamic(() => import('./index-11'), { ssr: false })
const HomeRtl = dynamic(() => import('./index-rtl'), { ssr: false })

function Home1({ settings = {} }) {
    const [hasPosts, setHasPosts] = useState(null)

    useEffect(() => {
        fetch('/api/posts?limit=1&status=PUBLISHED')
            .then(res => res.json())
            .then(data => {
                if (data.success && Array.isArray(data.posts) && data.posts.length > 0) {
                    setHasPosts(true)
                } else {
                    setHasPosts(false)
                }
            })
            .catch(() => {
                setHasPosts(false)
            })
    }, [])

    const showFeatured = settings.show_featured_posts !== 'false'
    const titleFeatured = settings.title_featured_posts || 'Featured Post'
    const showTrending = settings.show_trending_posts !== 'false'
    const titleTrending = settings.title_trending_posts || 'Trending Post'
    const showMarquee = settings.show_marquee_cats !== 'false'
    const showPopular = settings.show_popular_posts !== 'false'
    const titlePopular = settings.title_popular_posts || 'Popular Post'
    const showHandpick = settings.show_handpick_posts !== 'false'
    const titleHandpick = settings.title_handpick_posts || 'Hand-Picked News'

    // If database has 0 published articles, show the elegant Editorial Welcome State
    if (hasPosts === false) {
        return (
            <Layout headerStyle={1} footerStyle={1} settings={settings}>
                <EditorialWelcome settings={settings} />
            </Layout>
        )
    }

    return (
        <Layout headerStyle={1} footerStyle={1} settings={settings}>
            <div>
                {/* 1. featured post area start */}
                {showFeatured && (
                    <div className="featured-post-area pt-60">
                        <div className="container">
                            <div className="row ta-column-gap-30 mt-none-30 align-items-stretch">
                                {/* Left Side: Slot 1 (top) & Slot 2 (bottom) */}
                                <div className="col-xl-3 col-md-6 order-2 order-xl-1 mt-30 featured-hero-side">
                                    {settings.featured_posts_mode !== 'auto' && (settings.featured_post_slot_1 || settings.featured_post_slot_2) ? (
                                        <>
                                            <div style={{ marginBottom: '30px' }}>
                                                <BlogPost
                                                    showItem={1}
                                                    style={2}
                                                    desc
                                                    ids={settings.featured_post_slot_1 || undefined}
                                                    showStart={1}
                                                    showEnd={2}
                                                />
                                            </div>
                                            <div>
                                                <BlogPost
                                                    showItem={1}
                                                    style={2}
                                                    desc
                                                    ids={settings.featured_post_slot_2 || undefined}
                                                    showStart={2}
                                                    showEnd={3}
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <BlogPost
                                            showItem={2}
                                            showStart={1}
                                            showEnd={3}
                                            style={2}
                                            desc
                                            category={settings.featured_posts_category !== 'all' ? settings.featured_posts_category : undefined}
                                            sortBy={settings.featured_posts_sort || 'latest'}
                                        />
                                    )}
                                </div>

                                {/* Center: Slot 3 (Hero Utama Besar) */}
                                <div className="col-xl-6 col-lg-12 order-1 order-xl-2 mt-30 d-flex flex-column">
                                    <BlogPost
                                        showItem={1}
                                        showStart={0}
                                        showEnd={1}
                                        style={3}
                                        col="h-100"
                                        ids={settings.featured_posts_mode !== 'auto' && settings.featured_post_slot_3 ? settings.featured_post_slot_3 : undefined}
                                        category={settings.featured_posts_category !== 'all' ? settings.featured_posts_category : undefined}
                                        sortBy={settings.featured_posts_sort || 'latest'}
                                    />
                                </div>

                                {/* Right Side: Slot 4 (top) & Slot 5 (bottom) */}
                                <div className="col-xl-3 col-md-6 order-3 mt-30 featured-hero-side">
                                    {settings.featured_posts_mode !== 'auto' && (settings.featured_post_slot_4 || settings.featured_post_slot_5) ? (
                                        <>
                                            <div style={{ marginBottom: '30px' }}>
                                                <BlogPost
                                                    showItem={1}
                                                    style={2}
                                                    desc
                                                    ids={settings.featured_post_slot_4 || undefined}
                                                    showStart={3}
                                                    showEnd={4}
                                                />
                                            </div>
                                            <div>
                                                <BlogPost
                                                    showItem={1}
                                                    style={2}
                                                    desc
                                                    ids={settings.featured_post_slot_5 || undefined}
                                                    showStart={4}
                                                    showEnd={5}
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <BlogPost
                                            showItem={2}
                                            showStart={3}
                                            showEnd={5}
                                            style={2}
                                            desc
                                            category={settings.featured_posts_category !== 'all' ? settings.featured_posts_category : undefined}
                                            sortBy={settings.featured_posts_sort || 'latest'}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {/* featured post area end */}

                {/* Breaking News Ticker below Hero Section */}
                <BreakingNewsTicker settings={settings} container={true} />

                {/* 2. trending post start */}
                {showTrending && (
                    <div className="rcp-area pt-100">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="ta-section-wrapper ta-border-top ta-border-top__dark pt-20 pb-40">
                                        <div className="row">
                                            <div className="col-md-8 align-self-center">
                                                <div className="ta-section-heading">
                                                    <h2 className="ta-title ta-title--mid">{titleTrending}</h2>
                                                </div>
                                            </div>
                                            <div className="col-md-4 d-flex align-self-center justify-content-end">
                                                <Link href="/blog" className="ta-inline-btn ta-inline-btn__themebg">More Post <i className="far fa-long-arrow-right" /></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-none-30">
                                <BlogPost
                                    showItem={4}
                                    showStart={0}
                                    showEnd={4}
                                    style={2}
                                    desc
                                    col="col-xl-3 col-lg-6 col-md-6 col-sm-6 mt-30"
                                    category={settings.trending_posts_category !== 'all' ? settings.trending_posts_category : undefined}
                                    sortBy={settings.trending_posts_sort || 'trending'}
                                />
                            </div>
                        </div>
                    </div>
                )}
                {/* trending post end */}

                {/* 3. moving categories marquee start */}
                {showMarquee && <MargueePost cls="pt-115" />}
                {/* moving categories marquee end */}

                {/* 4. Popular Post area start (menggantikan Tech News) */}
                {showPopular && (
                    <div className="featured-post-area pt-80 pb-100">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="ta-section-wrapper ta-border-top ta-border-top__dark pt-20 pb-40">
                                        <div className="row">
                                            <div className="col-md-8 align-self-center">
                                                <div className="ta-section-heading">
                                                    <h2 className="ta-title ta-title--mid">{titlePopular}</h2>
                                                </div>
                                            </div>
                                            <div className="col-md-4 d-flex align-self-center justify-content-end">
                                                <Link href="/blog" className="ta-inline-btn ta-inline-btn__themebg">More Post <i className="far fa-long-arrow-right" /></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row ta-column-gap-30 mt-none-30">
                                <div className="col-xl-8 mt-30">
                                    <BlogPost
                                        showItem={1}
                                        showStart={0}
                                        showEnd={1}
                                        style={3}
                                        desc
                                        category={settings.popular_posts_category !== 'all' ? settings.popular_posts_category : undefined}
                                        sortBy={settings.popular_posts_sort || 'popular'}
                                    />
                                </div>
                                <div className="col-xl-4 mt-30">
                                    <BlogPost
                                        showItem={5}
                                        showStart={1}
                                        showEnd={6}
                                        style={11}
                                        category={settings.popular_posts_category !== 'all' ? settings.popular_posts_category : undefined}
                                        sortBy={settings.popular_posts_sort || 'popular'}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {/* Popular Post area end */}

                {/* newsletter start */}
                <Newsletter1 />
                {/* newsletter end */}

                {/* 5. Hand-Picked News area start */}
                {showHandpick && (
                    <div className="ta-blog-area pt-100 pb-100">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-8">
                                    <div className="row">
                                        <div className="col-xl-12">
                                            <div className="ta-section-wrapper ta-border-top ta-border-top__dark pt-20 pb-40">
                                                <div className="row">
                                                    <div className="col-md-8 align-self-center">
                                                        <div className="ta-section-heading">
                                                            <h2 className="ta-title ta-title--mid">{titleHandpick}</h2>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 d-flex align-self-center justify-content-end">
                                                        <Link href="/blog" className="ta-inline-btn ta-inline-btn__themebg">More Post <i className="far fa-long-arrow-right" /></Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row ta-column-gap-30 mt-none-30">
                                        <BlogPost
                                            showItem={
                                                settings.handpick_posts_mode !== 'auto' && settings.handpick_posts_manual_ids
                                                    ? settings.handpick_posts_manual_ids.split(',').filter(Boolean).length
                                                    : parseInt(settings.handpick_posts_limit) || 8
                                            }
                                            showStart={0}
                                            showEnd={parseInt(settings.handpick_posts_limit) || 8}
                                            style={1}
                                            formatIcon
                                            showPagination
                                            col="col-xl-6 col-lg-6 mt-30"
                                            ids={
                                                settings.handpick_posts_mode !== 'auto' && settings.handpick_posts_manual_ids
                                                    ? settings.handpick_posts_manual_ids
                                                    : undefined
                                            }
                                            category={settings.handpick_posts_category !== 'all' ? settings.handpick_posts_category : undefined}
                                            sortBy={settings.handpick_posts_sort || 'latest'}
                                        />
                                    </div>
                                </div>
                                <div className="col-xl-4">
                                    <BlogSidebar settings={settings} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {/* blog area end */}
            </div>
        </Layout>
    )
}

export default function Home({ initialSettings = {}, initialPosts = [], initialPopularPosts = [] }) {
    const [homeStyle, setHomeStyle] = useState(initialSettings.home_style || 'posty')
    const [settings, setSettings] = useState(initialSettings)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        fetch('/api/settings')
            .then(res => res.json())
            .then(data => {
                if (data.success && data.settings) {
                    setSettings(data.settings)
                    if (data.settings.home_style) {
                        setHomeStyle(data.settings.home_style)
                    }
                }
            })
            .catch(console.error)
            .finally(() => setIsLoaded(true))
    }, [])

    switch (homeStyle) {
        case 'legacy-1':
            return <Home1 settings={settings} />
        case 'index-2':
            return <Home2 />
        case 'index-3':
            return <Home3 />
        case 'index-4':
            return <Home4 />
        case 'index-5':
            return <Home5 />
        case 'index-6':
            return <Home6 />
        case 'index-7':
            return <Home7 />
        case 'index-8':
            return <Home8 />
        case 'index-9':
            return <Home9 />
        case 'index-10':
            return <Home10 />
        case 'index-11':
            return <Home11 />
        case 'index-rtl':
            return <HomeRtl />
        case 'kompas':
            return <KompasHome settings={settings} initialPosts={initialPosts} initialPopularPosts={initialPopularPosts} />
        case 'posty':
        case 'index-1':
        default:
            return <PostyHome settings={settings} initialPosts={initialPosts} initialPopularPosts={initialPopularPosts} />
    }
}

export async function getServerSideProps() {
    try {
        const records = await prisma.setting.findMany()
        const settings = {}
        records.forEach(item => {
            settings[item.key] = item.value
        })

        const [posts, popularPosts] = await Promise.all([
            prisma.post.findMany({
                where: { status: 'PUBLISHED' },
                orderBy: { createdAt: 'desc' },
                take: 50,
                include: {
                    category: { select: { id: true, name: true, slug: true } },
                    author: { select: { id: true, name: true, avatar: true } }
                }
            }),
            prisma.post.findMany({
                where: { status: 'PUBLISHED' },
                orderBy: { views: 'desc' },
                take: 10,
                include: {
                    category: { select: { id: true, name: true, slug: true } },
                    author: { select: { id: true, name: true, avatar: true } }
                }
            })
        ])

        return {
            props: {
                initialSettings: settings,
                initialPosts: JSON.parse(JSON.stringify(posts)),
                initialPopularPosts: JSON.parse(JSON.stringify(popularPosts))
            }
        }
    } catch (err) {
        console.error('Error fetching data in getServerSideProps:', err)
        return {
            props: {
                initialSettings: {},
                initialPosts: [],
                initialPopularPosts: []
            }
        }
    }
}