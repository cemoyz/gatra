import Link from "next/link"
import { useEffect, useState } from "react"
import PostStandard from "./PostStandard"
import ShareModal from "@/components/elements/ShareModal"
import { getImageUrl } from "@/lib/imageUtils"

export default function BlogDetailsArticle({ blogPost }) {
    if (!blogPost) return null

    const {
        id,
        author,
        category = "Berita",
        title = "",
        img = "blog-details--big-1.webp",
        content,
        excerpt,
        postType = "standard",
        videoUrl,
        audioUrl,
        quoteText,
        quoteAuthor,
        externalUrl,
        views = 0,
        createdAt
    } = blogPost

    const [isShareOpen, setIsShareOpen] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [settings, setSettings] = useState({
        show_author_bio: 'true',
        show_related_posts: 'true',
        show_post_views: 'true',
        show_post_comments: 'true'
    })
    const [relatedPosts, setRelatedPosts] = useState([])

    useEffect(() => {
        // Check if user is logged in
        fetch('/api/auth/me')
            .then(res => res.json())
            .then(data => {
                if (data.success && data.user) {
                    setIsLoggedIn(true)
                }
            })
            .catch(() => setIsLoggedIn(false))

        // Fetch display settings
        fetch('/api/settings')
            .then(res => res.json())
            .then(data => {
                if (data.success && data.settings) {
                    setSettings(prev => ({ ...prev, ...data.settings }))
                }
            })
            .catch(console.error)

        // Fetch related posts from same category
        if (category) {
            const catSlug = typeof category === 'string' ? category : category?.slug
            fetch(`/api/posts?category=${encodeURIComponent(catSlug)}&limit=3`)
                .then(res => res.json())
                .then(data => {
                    if (data.success && data.posts) {
                        setRelatedPosts(data.posts.filter(p => p.id !== id).slice(0, 2))
                    }
                })
                .catch(console.error)
        }
    }, [id, category])

    const authorName = typeof author === 'string' ? author : (author?.name || 'Alexis D.')
    const authorBio = author?.bio || 'Penulis dan kontributor redaksi di Hoom Magazine.'
    const authorAvatar = author?.avatar || '/assets/img/author/author-1.webp'

    const formattedDate = createdAt
        ? new Date(createdAt).toLocaleDateString("id-ID", { month: "long", day: "numeric", year: "numeric" })
        : new Date().toLocaleDateString("id-ID", { month: "long", day: "numeric", year: "numeric" })

    const categoryName = typeof category === 'string' ? category : (category?.name || 'Berita')

    return (
        <>
            <article className="ta-blog-box" style={{ background: '#ffffff', borderRadius: '16px', padding: '32px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                {/* Category Badge & Meta Header */}
                <div style={{ marginBottom: '12px' }}>
                    <span style={{
                        background: '#da0105',
                        color: '#ffffff',
                        padding: '5px 12px',
                        borderRadius: '6px',
                        fontSize: '11.5px',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.6px',
                        display: 'inline-block'
                    }}>
                        {categoryName}
                    </span>
                </div>

                {/* Article Title */}
                <h1 style={{
                    fontSize: '32px',
                    fontWeight: 800,
                    marginTop: '6px',
                    marginBottom: '16px',
                    lineHeight: '1.3',
                    color: '#0f172a',
                    letterSpacing: '-0.3px'
                }}>
                    {title}
                </h1>

                {/* Meta info right under title */}
                <ul className="meta-infos d-flex align-items-center list-unstyled flex-wrap" style={{ gap: '14px', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #f1f5f9' }}>
                    <li>
                        <Link
                            href={blogPost?.authorId ? `/author?id=${blogPost.authorId}` : `/author?name=${encodeURIComponent(authorName)}`}
                            className="author-wrapper d-flex justify-content-center align-items-center"
                            style={{ textDecoration: 'none', color: '#1e293b', fontWeight: 600 }}
                        >
                            <span className="author-thumb" style={{ marginRight: '8px' }}>
                                <img
                                    src={authorAvatar}
                                    alt={authorName}
                                    onError={(e) => { e.currentTarget.src = '/assets/img/author/author-1.webp' }}
                                    style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                                />
                            </span>
                            <span className="author-name">{authorName}</span>
                        </Link>
                    </li>
                    <li style={{ color: '#64748b', fontSize: '13px' }}>
                        <i className="fa fa-calendar-o" style={{ marginRight: '5px' }} />
                        {formattedDate}
                    </li>
                    {settings.show_post_views !== 'false' && (
                        <li style={{ color: '#64748b', fontSize: '13px' }}>
                            <i className="fa fa-eye" style={{ marginRight: '5px' }} />
                            {views} Views
                        </li>
                    )}
                    {settings.show_post_comments !== 'false' && (
                        <li style={{ color: '#64748b', fontSize: '13px' }}>
                            <i className="fa fa-comment-o" style={{ marginRight: '5px' }} />
                            {blogPost.commentsCount ?? (blogPost.comments ? blogPost.comments.length : 0)} Komentar
                        </li>
                    )}
                </ul>

                {/* 1. Format-specific Header Media */}
                {postType === "video" && videoUrl ? (
                    <div className="thumb video-wrapper mb-25" style={{ position: 'relative', paddingTop: '56.25%', borderRadius: '12px', overflow: 'hidden' }}>
                        <iframe
                            src={videoUrl.includes('youtube.com/watch?v=') ? videoUrl.replace('watch?v=', 'embed/') : videoUrl}
                            title={title}
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                ) : postType === "audio" && audioUrl ? (
                    <div className="audio-wrapper mb-25" style={{ padding: '20px', background: '#0f172a', borderRadius: '10px' }}>
                        <audio controls style={{ width: '100%' }}>
                            <source src={audioUrl} />
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                ) : postType === "quote" && quoteText ? (
                    <div className="content d-flex flex-column ta-format-quote align-items-center text-center mb-25" style={{ background: '#f8fafc', padding: '30px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                        <div className="qa-icon mx-auto mb-20">
                            <img src="/assets/img/icons/quote-icon.webp" alt="Quote" />
                        </div>
                        <div className="excerpt">
                            <blockquote style={{ fontSize: '20px', fontStyle: 'italic', color: '#1e293b' }}>
                                “{quoteText}”
                            </blockquote>
                        </div>
                        {quoteAuthor && (
                            <div className="qupte-author d-flex align-items-center mx-auto mt-15">
                                <h6 className="name" style={{ margin: 0, color: '#3b82f6' }}>— {quoteAuthor}</h6>
                            </div>
                        )}
                    </div>
                ) : postType === "link" && externalUrl ? (
                    <div className="mb-25" style={{ padding: '24px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '10px' }}>
                        <h5 style={{ color: '#1e40af', marginBottom: '8px' }}>Tautan Sumber Eksternal</h5>
                        <a href={externalUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', fontWeight: 600, wordBreak: 'break-all' }}>
                            {externalUrl} <i className="fa fa-external-link" style={{ marginLeft: '6px' }} />
                        </a>
                    </div>
                ) : (
                    <div style={{ marginBottom: '25px', borderRadius: '12px', overflow: 'hidden' }}>
                        <img
                            src={getImageUrl(img, "blog-details--big-1.webp")}
                            alt={title}
                            onError={(e) => {
                                e.currentTarget.src = '/assets/img/blog/blog-details--big-1.webp'
                            }}
                            style={{ width: '100%', maxHeight: '480px', objectFit: 'cover', display: 'block', borderRadius: '12px' }}
                        />
                    </div>
                )}

                {/* Article Content Directly Below Banner with Perfect Spacing */}
                <div className="post-details-content" style={{ fontSize: '16.5px', lineHeight: '1.85', color: '#334155', marginTop: '0px' }}>
                    {content ? (
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                    ) : (
                        <>
                            <p>{excerpt || 'Temukan berbagai wawasan mendalam, berita terkini, serta analisis komprehensif seputar topik menarik di Hoom Magazine.'}</p>
                            <p>Menjaga kualitas informasi dan pengalaman membaca yang nyaman adalah komitmen kami untuk menghadirkan konten terbaik bagi para pembaca setia.</p>
                        </>
                    )}

                    {settings.show_social_links !== 'false' && (
                        <div className="ta-single-share-wrapper mt-40 pt-25 pb-15 ta-border-top" style={{ borderColor: '#e2e8f0' }}>
                                <div className="d-flex align-items-center justify-content-between flex-wrap" style={{ gap: '16px' }}>
                                    <div className="share-prompt-text">
                                        <h5 className="mb-1" style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>Bagikan Artikel Ini</h5>
                                        <p className="mb-0" style={{ fontSize: '13px', color: '#64748b' }}>Bagikan informasi bermanfaat ini melalui WhatsApp, Telegram, media sosial, atau salin link.</p>
                                    </div>
                                    <div>
                                        <button
                                            type="button"
                                            onClick={() => setIsShareOpen(true)}
                                            className="ta-button ta-share-action-btn"
                                            style={{
                                                padding: '11px 26px',
                                                fontSize: '14px',
                                                borderRadius: '10px',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '9px',
                                                backgroundColor: '#da0105',
                                                color: '#ffffff',
                                                border: 'none',
                                                boxShadow: '0 4px 14px rgba(218, 1, 5, 0.25)',
                                                cursor: 'pointer',
                                                fontWeight: '700',
                                                transition: 'all 0.2s ease'
                                            }}
                                        >
                                            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                                                <polyline points="16 6 12 2 8 6" />
                                                <line x1="12" y1="2" x2="12" y2="15" />
                                            </svg>
                                            Share Artikel
                                        </button>
                                    </div>
                                </div>

                                <ShareModal
                                    isOpen={isShareOpen}
                                    onClose={() => setIsShareOpen(false)}
                                    title={title}
                                    excerpt={excerpt}
                                />
                            </div>
                        )}
                </div>
            </article>

            {/* Author Bio Box (Controlled by show_author_bio setting) */}
            {settings.show_author_bio === 'true' && (
                <div
                    className="ta-author-box p-4"
                    style={{
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '16px',
                        display: 'flex',
                        gap: '20px',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
                    }}
                >
                    <img
                        src={authorAvatar}
                        alt={authorName}
                        onError={(e) => { e.currentTarget.src = '/assets/img/author/author-1.webp' }}
                        style={{ width: '76px', height: '76px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #ffffff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                    />
                    <div style={{ flex: 1, minWidth: '220px' }}>
                        <div style={{ fontSize: '11px', color: '#da0105', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Ditulis Oleh</div>
                        <h4 style={{ margin: '2px 0 6px', fontSize: '18px', fontWeight: 700 }}>
                            <Link href={blogPost?.authorId ? `/author?id=${blogPost.authorId}` : `/author?name=${encodeURIComponent(authorName)}`} style={{ color: '#0f172a', textDecoration: 'none' }}>
                                {authorName}
                            </Link>
                        </h4>
                        <p style={{ margin: 0, fontSize: '14px', color: '#64748b', lineHeight: '1.5' }}>{authorBio}</p>
                    </div>
                </div>
            )}

            {/* Related Posts (Controlled by show_related_posts setting) */}
            {settings.show_related_posts === 'true' && relatedPosts.length > 0 && (
                <div className="ta-related-posts" style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                    <h3 className="ta-title ta-border-bottom pb-15 mb-20" style={{ fontSize: '18px', fontWeight: 700, borderColor: '#e2e8f0' }}>
                        Artikel Terkait
                    </h3>
                    <div className="row">
                        {relatedPosts.map(post => (
                            <div key={post.id} className="col-md-6 mb-3 mb-md-0">
                                <div
                                    style={{
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '12px',
                                        padding: '12px',
                                        background: '#f8fafc',
                                        height: '100%',
                                        display: 'flex',
                                        gap: '12px',
                                        alignItems: 'center',
                                        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                                    }}
                                >
                                    <img
                                        src={getImageUrl(post.img, `blog-2-${(post.id % 12) + 1}.webp`)}
                                        alt={post.title}
                                        onError={(e) => {
                                            e.currentTarget.src = `/assets/img/blog/blog-2-${(post.id % 12) + 1}.webp`
                                        }}
                                        style={{ width: '68px', height: '68px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }}
                                    />
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <span style={{ fontSize: '10.5px', color: '#da0105', fontWeight: 700, textTransform: 'uppercase' }}>
                                            {post.category || categoryName}
                                        </span>
                                        <h5 style={{
                                            fontSize: '13px',
                                            margin: '2px 0 4px 0',
                                            lineHeight: '1.35',
                                            fontWeight: 600,
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden'
                                        }}>
                                            <Link href={`/blog/${post.id}`} style={{ color: '#0f172a', textDecoration: 'none' }}>
                                                {post.title}
                                            </Link>
                                        </h5>
                                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                                            <i className="fa fa-eye" style={{ marginRight: '4px' }} /> {post.views || 0} views
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Navigation back to blog */}
            <div className="ta-dn-wrapper pt-10 pb-10">
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                    <Link href="/" className="ta-inline-btn" style={{ fontWeight: 600, color: '#475569', textDecoration: 'none' }}>
                        <i className="fa fa-long-arrow-left" style={{ marginRight: '6px' }} /> Kembali ke Beranda
                    </Link>
                    {isLoggedIn && (
                        <Link href="/dashboard/posts" className="ta-inline-btn" style={{ fontWeight: 600, color: '#3b82f6', textDecoration: 'none' }}>
                            <i className="fa fa-sliders" style={{ marginRight: '6px' }} /> Kelola di Dashboard
                        </Link>
                    )}
                </div>
            </div>
        </>
    )
}
