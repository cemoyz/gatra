import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Autoplay, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import SocialLinks from "@/components/elements/SocialLinks"
import { getImageUrl } from "@/lib/imageUtils"

export default function BlogSidebar({ settings: initialSettings }) {
    const router = useRouter()
    const [categories, setCategories] = useState([])
    const [popularPosts, setPopularPosts] = useState([])
    const [trendingPosts, setTrendingPosts] = useState([])
    const [authors, setAuthors] = useState([])
    const [leadAuthor, setLeadAuthor] = useState(null)
    const [email, setEmail] = useState('')
    const [subscribed, setSubscribed] = useState(false)
    const [settings, setSettings] = useState(() => {
        if (initialSettings && Object.keys(initialSettings).length > 0) {
            return initialSettings
        }
        return {
            show_sidebar_ad: 'true',
            sidebar_ad_title: 'Dua Narasi',
            sidebar_ad_subtitle: 'Portal Berita & Opini Terpercaya',
            sidebar_ad_image: '/assets/img/bg/sidebar-ad.webp',
            sidebar_ad_url: '',
            sidebar_ad_open_new_tab: 'true'
        }
    })

    useEffect(() => {
        if (initialSettings && Object.keys(initialSettings).length > 0) {
            setSettings(prev => ({ ...prev, ...initialSettings }))
        } else {
            fetch('/api/settings')
                .then(res => res.json())
                .then(data => {
                    if (data.success && data.settings) {
                        setSettings(prev => ({ ...prev, ...data.settings }))
                    }
                })
                .catch(console.error)
        }
    }, [initialSettings])

    useEffect(() => {
        // Fetch real categories
        fetch('/api/categories')
            .then(res => res.json())
            .then(data => {
                if (data.success && data.categories) {
                    setCategories(data.categories.slice(0, 8))
                }
            })
            .catch(console.error)

        // Fetch authors for auto slider
        fetch('/api/authors')
            .then(res => res.json())
            .then(data => {
                if (data.success && Array.isArray(data.authors) && data.authors.length > 0) {
                    setAuthors(data.authors)
                    setLeadAuthor(data.authors[0])
                }
            })
            .catch(console.error)

        // Fetch Paling Banyak Dibaca (All-time most viewed)
        fetch('/api/posts?limit=5&sortBy=popular&status=PUBLISHED')
            .then(res => res.json())
            .then(data => {
                if (data.success && data.posts) {
                    setPopularPosts(data.posts)
                }
            })
            .catch(console.error)

        // Fetch Sedang Viral / Topik Hangat (Recent velocity spike)
        fetch('/api/posts?limit=4&sortBy=trending&status=PUBLISHED')
            .then(res => res.json())
            .then(data => {
                if (data.success && data.posts) {
                    setTrendingPosts(data.posts)
                }
            })
            .catch(console.error)
    }, [])

    const [subscribing, setSubscribing] = useState(false)
    const handleSubscribe = async (e) => {
        e.preventDefault()
        if (!email.trim() || subscribing) return
        setSubscribing(true)
        try {
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email.trim(), topics: ['General News'], frequency: 'weekly' })
            })
            const data = await res.json()
            if (data.success) {
                setSubscribed(true)
                setEmail('')
                setTimeout(() => setSubscribed(false), 5000)
            } else {
                alert(data.message || 'Gagal berlangganan. Silakan coba lagi.')
            }
        } catch (err) {
            console.error('Subscription error:', err)
        } finally {
            setSubscribing(false)
        }
    }

    const getPostImage = (img, id = 1) => {
        if (!img) return `/assets/img/blog/blog-2-${(id % 12) + 1}.webp`
        if (img.startsWith('http') || img.startsWith('/')) return img
        if (img.endsWith('.webp') || img.endsWith('.jpg') || img.endsWith('.png') || img.endsWith('.jpeg')) {
            return `/assets/img/blog/${img}`
        }
        return `/assets/img/blog/blog-2-${(id % 12) + 1}.webp`
    }

    const tags = ['Design', 'Technology', 'UI/UX', 'AI', 'Marketing', 'Travel', 'Podcast', 'Lifestyle']

    return (
        <>
            <div className="ta-sidebar-wrapper mt-none-60 pl-20">
                <style jsx>{`
                    :global(.author-slider-widget .swiper-pagination) {
                        bottom: 4px !important;
                    }
                    :global(.author-slider-widget .swiper-pagination-bullet) {
                        background: #cbd5e1 !important;
                        opacity: 0.7 !important;
                        width: 7px !important;
                        height: 7px !important;
                        transition: all 0.3s ease !important;
                    }
                    :global(.author-slider-widget .swiper-pagination-bullet-active) {
                        background: #da0105 !important;
                        opacity: 1 !important;
                        width: 20px !important;
                        border-radius: 4px !important;
                    }
                    /* Hilangkan border putih lonjong di belakang avatar */
                    :global(.author-slider-widget .ta-author-wrapper .thumb) {
                        width: 100px !important;
                        height: 100px !important;
                        margin: -50px auto 0 auto !important;
                        border: none !important;
                        background: transparent !important;
                        border-radius: 50% !important;
                        box-shadow: none !important;
                    }
                    :global(.author-slider-widget .ta-author-wrapper .thumb a) {
                        display: block !important;
                        width: 100% !important;
                        height: 100% !important;
                        border-radius: 50% !important;
                    }
                    :global(.author-slider-widget .ta-author-wrapper .thumb img) {
                        width: 100px !important;
                        height: 100px !important;
                        border-radius: 50% !important;
                        object-fit: cover !important;
                        border: none !important;
                        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15) !important;
                    }
                    /* Hilangkan titik-titik (border-shape) yang menabrak section sebelah kiri */
                    :global(.ta-sidebar-wrapper .border-shape),
                    :global(.ta-blog-widget .border-shape),
                    :global(.ta-blog-widget .border-shape::before),
                    :global(.ta-blog-widget .border-shape::after) {
                        display: none !important;
                        content: none !important;
                        width: 0 !important;
                        height: 0 !important;
                        opacity: 0 !important;
                    }
                    :global(.ta-sidebar-wrapper .ta-widget-title) {
                        display: inline-flex !important;
                        align-items: center !important;
                        justify-content: center !important;
                        position: relative !important;
                        margin-bottom: 15px !important;
                    }
                `}</style>

                {/* Author Auto Slider Widget */}
                <div className="ta-blog-widget widget mt-60 author-slider-widget">
                    <div className="ta-author-wrapper position-relative" style={{ overflow: 'hidden' }}>
                        {authors.length > 0 ? (
                            <Swiper
                                modules={[Autoplay, Pagination]}
                                slidesPerView={1}
                                spaceBetween={0}
                                autoplay={{
                                    delay: 3500,
                                    disableOnInteraction: false,
                                    pauseOnMouseEnter: true
                                }}
                                loop={authors.length > 1}
                                pagination={{ clickable: true }}
                                style={{ paddingBottom: '24px' }}
                            >
                                {authors.map((author) => (
                                    <SwiperSlide key={author.id}>
                                        <div className="top text-center bg_img" style={{ backgroundImage: "url('/assets/img/bg/author-bg.webp')" }}>
                                            <span className="designation">{author.role || 'Penulis'}</span>
                                            <h4 className="name">
                                                <Link href={`/author?id=${author.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                                    {author.name}
                                                </Link>
                                            </h4>
                                        </div>
                                        <div className="thumb">
                                            <Link href={`/author?id=${author.id}`}>
                                                <img
                                                    src={author.avatar || '/assets/img/author/author-1.webp'}
                                                    alt={author.name}
                                                    style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%' }}
                                                />
                                            </Link>
                                        </div>
                                        <div className="content mb-20">
                                            <p>{author.bio || 'Penulis dan kontributor artikel di Hoom Magazine.'}</p>
                                            {author.postsCount > 0 && (
                                                <div style={{ marginTop: '8px' }}>
                                                    <span style={{ fontSize: '11px', fontWeight: 600, background: '#f1f5f9', color: '#475569', padding: '3px 10px', borderRadius: '12px' }}>
                                                        ✍️ {author.postsCount} Artikel
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <SocialLinks className="d-flex justify-content-center align-items-center mb-10" />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        ) : (
                            <div>
                                <div className="top text-center bg_img" style={{ backgroundImage: "url('/assets/img/bg/author-bg.webp')" }}>
                                    <span className="designation">{leadAuthor?.role || 'Chief Editor'}</span>
                                    <h4 className="name">
                                        <Link href="/author" style={{ color: 'inherit', textDecoration: 'none' }}>
                                            {leadAuthor?.name || 'Alexis D.'}
                                        </Link>
                                    </h4>
                                </div>
                                <div className="thumb">
                                    <img src={leadAuthor?.avatar || '/assets/img/author/author-2.webp'} alt="Author" />
                                </div>
                                <div className="content mb-30">
                                    <p>{leadAuthor?.bio || 'Penulis dan pengelola portal berita Hoom Magazine.'}</p>
                                </div>
                                <SocialLinks className="d-flex justify-content-center align-items-center" />
                            </div>
                        )}
                    </div>
                </div>

                {/* 1. Sedang Viral / Topik Hangat (Trending Posts) */}
                <div className="ta-blog-widget widget mt-60">
                    <div className="ta-widget-title-wrapper text-center">
                        <h4 className="ta-widget-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                            <span style={{ color: '#ef4444' }}>🔥</span> Sedang Viral / Topik Hangat
                        </h4>
                    </div>
                    <div className="ta-latest-posts" style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        {trendingPosts.length === 0 ? (
                            <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '13px', marginTop: '20px' }}>Memuat topik hangat...</p>
                        ) : (
                            trendingPosts.map((post, idx) => (
                                <div
                                    key={post.id}
                                    onClick={(e) => {
                                        const selection = window.getSelection()
                                        if (selection && selection.toString().length > 0) return
                                        if (e.target.closest('a, button')) return
                                        if (post?.id) router.push(`/blog/${post.id}`)
                                    }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        padding: '6px',
                                        borderRadius: '8px',
                                        transition: 'background 0.2s ease',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <div style={{ position: 'relative', width: '74px', height: '74px', flexShrink: 0, overflow: 'hidden', borderRadius: '8px', background: '#f1f5f9' }}>
                                        <Link href={`/blog/${post.id}`} style={{ display: 'block', width: '100%', height: '100%' }}>
                                            <img
                                                src={getPostImage(post.img, post.id)}
                                                alt={post.title}
                                                onError={(e) => {
                                                    e.currentTarget.src = `/assets/img/blog/blog-2-${(post.id % 12) + 1}.webp`
                                                }}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                            />
                                        </Link>
                                        <span style={{
                                            position: 'absolute',
                                            top: '4px',
                                            left: '4px',
                                            background: 'linear-gradient(135deg, #ef4444, #f97316)',
                                            color: '#fff',
                                            fontSize: '10px',
                                            fontWeight: 800,
                                            padding: '2px 6px',
                                            borderRadius: '4px',
                                            lineHeight: '1.2',
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                                            zIndex: 2,
                                            pointerEvents: 'none'
                                        }}>
                                            #{idx + 1}
                                        </span>
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <span style={{ fontSize: '11px', color: '#ef4444', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.4px' }}>
                                            ⚡ {post.category || 'Viral'}
                                        </span>
                                        <h6 style={{
                                            fontSize: '13px',
                                            lineHeight: '1.4',
                                            margin: '3px 0',
                                            fontWeight: 600,
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden'
                                        }}>
                                            <Link href={`/blog/${post.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                                {post.title}
                                            </Link>
                                        </h6>
                                        {settings.show_post_views !== 'false' && (
                                            <div style={{ display: 'flex', gap: '10px', fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                                                <span><i className="fa fa-fire" style={{ marginRight: '3px', color: '#ef4444' }} />{post.views || 0} views</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* 2. Paling Banyak Dibaca (Popular Posts) */}
                <div className="ta-blog-widget widget mt-60">
                    <div className="ta-widget-title-wrapper text-center">
                        <h4 className="ta-widget-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                            <span style={{ color: '#3b82f6' }}>📖</span> Banyak Dibaca
                        </h4>
                    </div>
                    <div className="ta-latest-posts" style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        {popularPosts.length === 0 ? (
                            <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '13px', marginTop: '20px' }}>Memuat artikel populer...</p>
                        ) : (
                            popularPosts.map((post, idx) => (
                                <div
                                    key={post.id}
                                    onClick={(e) => {
                                        const selection = window.getSelection()
                                        if (selection && selection.toString().length > 0) return
                                        if (e.target.closest('a, button')) return
                                        if (post?.id) router.push(`/blog/${post.id}`)
                                    }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        padding: '6px',
                                        borderRadius: '8px',
                                        transition: 'background 0.2s ease',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <div style={{ position: 'relative', width: '74px', height: '74px', flexShrink: 0, overflow: 'hidden', borderRadius: '8px', background: '#f1f5f9' }}>
                                        <Link href={`/blog/${post.id}`} style={{ display: 'block', width: '100%', height: '100%' }}>
                                            <img
                                                src={getPostImage(post.img, post.id)}
                                                alt={post.title}
                                                onError={(e) => {
                                                    e.currentTarget.src = `/assets/img/blog/blog-2-${(post.id % 12) + 1}.webp`
                                                }}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                            />
                                        </Link>
                                        <span style={{
                                            position: 'absolute',
                                            top: '4px',
                                            left: '4px',
                                            background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                                            color: '#fff',
                                            fontSize: '10px',
                                            fontWeight: 800,
                                            padding: '2px 6px',
                                            borderRadius: '4px',
                                            lineHeight: '1.2',
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                                            zIndex: 2,
                                            pointerEvents: 'none'
                                        }}>
                                            #{idx + 1}
                                        </span>
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <span style={{ fontSize: '11px', color: '#3b82f6', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.4px' }}>
                                            {post.category || 'General'}
                                        </span>
                                        <h6 style={{
                                            fontSize: '13px',
                                            lineHeight: '1.4',
                                            margin: '3px 0',
                                            fontWeight: 600,
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden'
                                        }}>
                                            <Link href={`/blog/${post.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                                {post.title}
                                            </Link>
                                        </h6>
                                        <div style={{ display: 'flex', gap: '10px', fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                                            {settings.show_post_views !== 'false' && (
                                                <span><i className="fa fa-eye" style={{ marginRight: '3px' }} />{post.views || 0}</span>
                                            )}
                                            {settings.show_post_comments !== 'false' && (
                                                <span><i className="fa fa-comment" style={{ marginRight: '3px' }} />{post.commentsCount || 0}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Categories Widget */}
                {categories.length > 0 && (
                    <div className="ta-blog-widget widget mt-60">
                        <div className="ta-widget-title-wrapper text-center">
                            <h4 className="ta-widget-title">
                                Categories
                            </h4>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
                            {categories.map(c => (
                                <Link
                                    key={c.id}
                                    href={`/blog-filter-category?category=${c.slug}`}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        padding: '10px 14px',
                                        borderRadius: '8px',
                                        background: '#f8fafc',
                                        color: '#334155',
                                        textDecoration: 'none',
                                        fontSize: '13px',
                                        fontWeight: 600,
                                        border: '1px solid #e2e8f0',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    <span style={{ textTransform: 'capitalize' }}>{c.name}</span>
                                    <span style={{ background: '#e2e8f0', padding: '2px 8px', borderRadius: '10px', fontSize: '11px', color: '#64748b' }}>
                                        {c.postsCount || 0}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Trending Tags */}
                <div className="ta-blog-widget widget mt-60">
                    <div className="ta-widget-title-wrapper text-center">
                        <h4 className="ta-widget-title">
                            Trending Tags
                        </h4>
                    </div>
                    <div className="tagcloud">
                        {tags.map(t => (
                            <Link key={t} href={`/blog-filter-tag?tag=${t.toLowerCase()}`}>
                                <span>#</span> {t}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Newsletter Form */}
                <div className="ta-blog-widget widget mt-60">
                    <div className="ta-widget-title-wrapper text-center">
                        <h4 className="ta-widget-title">
                            Newsletter
                        </h4>
                    </div>
                    <div className="ta-newsletter-form ta-input-field">
                        {subscribed ? (
                            <div style={{ background: '#dcfce7', border: '1px solid #86efac', padding: '12px', borderRadius: '8px', color: '#166534', fontSize: '13px', textAlign: 'center' }}>
                                <i className="fa fa-check-circle" style={{ marginRight: '6px' }} />
                                Thank you! You have subscribed to Hoom Magazine.
                            </div>
                        ) : (
                            <form onSubmit={handleSubscribe}>
                                <div>
                                    <input
                                        type="email"
                                        placeholder="Business email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <i className="fa fa-envelope-open" />
                                    <button className="ta-button" type="submit">
                                        Subscribe <i className="fa fa-paper-plane" />
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>

                {/* Ad Banner */}
                {settings.show_sidebar_ad !== 'false' && (
                    <div className="ta-blog-widget widget mt-60">
                        <div className="ta-sidebar-ad ta-stroke" style={{ position: 'relative', background: '#ffffff' }}>
                            {settings.sidebar_ad_url ? (
                                <a
                                    href={settings.sidebar_ad_url}
                                    target={settings.sidebar_ad_open_new_tab !== 'false' ? '_blank' : '_self'}
                                    rel="noopener noreferrer"
                                    style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
                                >
                                    <div className="thumb" style={{ overflow: 'hidden' }}>
                                        <img
                                            src={getImageUrl(settings.sidebar_ad_image, "/assets/img/bg/sidebar-ad.webp")}
                                            alt={settings.sidebar_ad_title || 'Ad Banner'}
                                            style={{ width: '100%', height: 'auto', display: 'block' }}
                                        />
                                    </div>
                                    {(settings.sidebar_ad_title || settings.sidebar_ad_subtitle) && (
                                        <div className="content">
                                            {settings.sidebar_ad_title && <h6 className="title">{settings.sidebar_ad_title}</h6>}
                                            {settings.sidebar_ad_subtitle && <p>{settings.sidebar_ad_subtitle}</p>}
                                        </div>
                                    )}
                                </a>
                            ) : (
                                <div>
                                    <div className="thumb" style={{ overflow: 'hidden' }}>
                                        <img
                                            src={getImageUrl(settings.sidebar_ad_image, "/assets/img/bg/sidebar-ad.webp")}
                                            alt={settings.sidebar_ad_title || 'Ad Banner'}
                                            style={{ width: '100%', height: 'auto', display: 'block' }}
                                        />
                                    </div>
                                    {(settings.sidebar_ad_title || settings.sidebar_ad_subtitle) && (
                                        <div className="content">
                                            {settings.sidebar_ad_title && <h6 className="title">{settings.sidebar_ad_title}</h6>}
                                            {settings.sidebar_ad_subtitle && <p>{settings.sidebar_ad_subtitle}</p>}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
