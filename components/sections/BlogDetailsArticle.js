import Link from "next/link"
import { useEffect, useState } from "react"
import { getImageUrl } from "@/lib/imageUtils"

export default function BlogDetailsArticle({ blogPost }) {
    if (!blogPost) return null

    const {
        id,
        author,
        category = "Berita",
        title = "",
        img = "blog-details--big-1.webp",
        imageCaption = "",
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

    const [fontSize, setFontSize] = useState("normal") // "small", "normal", "large"
    const [copied, setCopied] = useState(false)
    const [isPlayingAudio, setIsPlayingAudio] = useState(false)
    const [relatedPosts, setRelatedPosts] = useState([])

    useEffect(() => {
        if (category) {
            const catSlug = typeof category === 'string' ? category : category?.slug
            fetch(`/api/posts?category=${encodeURIComponent(catSlug)}&limit=4`)
                .then(res => res.json())
                .then(data => {
                    if (data.success && Array.isArray(data.posts)) {
                        setRelatedPosts(data.posts.filter(p => p.id !== id).slice(0, 3))
                    }
                })
                .catch(console.error)
        }
    }, [id, category])

    const authorName = typeof author === 'string' ? author : (author?.name || 'Alexis D.')
    const authorAvatar = author?.avatar || '/assets/img/author/author-1.webp'
    const authorBio = author?.bio || 'Jurnalis dan kontributor redaksi Kompas.com menyajikan liputan mendalam dan terpercaya.'
    const editorName = blogPost?.editorName || 'Sarah Connor'
    const categoryName = typeof category === 'string' ? category : (category?.name || 'News')
    const categorySlug = typeof category === 'string' ? category.toLowerCase() : (category?.slug || 'news')

    const formatTime = (dateStr) => {
        if (!dateStr) return "Baru saja"
        try {
            const d = new Date(dateStr)
            const day = String(d.getDate()).padStart(2, '0')
            const month = String(d.getMonth() + 1).padStart(2, '0')
            const year = d.getFullYear()
            const hours = String(d.getHours()).padStart(2, '0')
            const mins = String(d.getMinutes()).padStart(2, '0')
            return `${day}/${month}/${year}, ${hours}:${mins} WIB`
        } catch {
            return "Baru saja"
        }
    }

    const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://kompas.com/blog/${id}`

    const handleCopyLink = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(currentUrl)
            setCopied(true)
            setTimeout(() => setCopied(false), 2500)
        }
    }

    const shareUrl = encodeURIComponent(currentUrl)
    const shareTitle = encodeURIComponent(title)

    const fontStyles = {
        small: { fontSize: '16px', lineHeight: '1.75' },
        normal: { fontSize: '18px', lineHeight: '1.85' },
        large: { fontSize: '20px', lineHeight: '1.95' }
    }

    const formatArticleContent = (rawHtml) => {
        if (!rawHtml) return null
        if (rawHtml.includes('KOMPAS.com')) return rawHtml
        return rawHtml.replace(/<p(\s[^>]*)?>/, '<p$1><strong>JAKARTA, KOMPAS.com</strong> - ')
    }

    const imageTags = String(blogPost.imageTags || '')
        .split(',')
        .map(tag => tag.trim())
        .filter(Boolean)

    return (
        <article className="kompas-article-detail">
            {/* 1. Breadcrumbs */}
            <nav className="kompas-breadcrumbs" aria-label="Breadcrumb">
                <Link href="/" className="bc-item">KOMPAS.com</Link>
                <span className="bc-sep">&gt;</span>
                <Link href={`/blog-filter-category?category=${categorySlug}`} className="bc-item">
                    {categoryName}
                </Link>
                <span className="bc-sep">&gt;</span>
                <span className="bc-current">Berita</span>
            </nav>

            {/* 2. Channel Rubric Tag */}
            <div className="kompas-rubric-header">
                <Link href={`/blog-filter-category?category=${categorySlug}`} className="rubric-tag">
                    KOMPAS {categoryName.toUpperCase()}
                </Link>
            </div>

            {/* 3. Headline Title */}
            <h1 className="kompas-detail-title">
                {title}
            </h1>

            {/* 4. Subtitle / Excerpt */}
            {excerpt && (
                <p className="kompas-detail-dek">
                    {excerpt}
                </p>
            )}

            {/* 5. Kompas Byline & Publication Meta */}
            <div className="kompas-byline-box">
                <div className="byline-source">
                    <span className="source-brand">Kompas.com</span>
                    <span className="source-sep">-</span>
                    <span className="source-time" suppressHydrationWarning>{formatTime(createdAt)}</span>
                </div>
                <div className="byline-editorial">
                    <span className="byline-item">
                        <strong>Penulis :</strong> {authorName}
                    </span>
                    <span className="byline-pipe">|</span>
                    <span className="byline-item">
                        <strong>Editor :</strong> {editorName}
                    </span>
                </div>
            </div>

            {/* 6. Social Share & Reader Tools Bar */}
            <div className="kompas-share-bar">
                <div className="share-buttons-group">
                    <span className="share-label">Bagikan:</span>
                    {/* WhatsApp */}
                    <a
                        href={`https://api.whatsapp.com/send?text=${shareTitle}%20${shareUrl}`}
                        target="_blank"
                        rel="noreferrer"
                        className="share-btn share-wa"
                        title="Bagikan ke WhatsApp"
                    >
                        <i className="fab fa-whatsapp"></i> WhatsApp
                    </a>
                    {/* Facebook */}
                    <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                        target="_blank"
                        rel="noreferrer"
                        className="share-btn share-fb"
                        title="Bagikan ke Facebook"
                    >
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    {/* Twitter / X */}
                    <a
                        href={`https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`}
                        target="_blank"
                        rel="noreferrer"
                        className="share-btn share-x"
                        title="Bagikan ke X"
                    >
                        <i className="fab fa-twitter"></i>
                    </a>
                    {/* Telegram */}
                    <a
                        href={`https://t.me/share/url?url=${shareUrl}&text=${shareTitle}`}
                        target="_blank"
                        rel="noreferrer"
                        className="share-btn share-tg"
                        title="Bagikan ke Telegram"
                    >
                        <i className="fab fa-telegram-plane"></i>
                    </a>
                    {/* Copy Link */}
                    <button
                        onClick={handleCopyLink}
                        className="share-btn share-copy"
                        title="Salin Tautan"
                    >
                        <i className="fas fa-link"></i> {copied ? "Tersalin!" : "Salin"}
                    </button>
                </div>

                {/* Font Resizer & Audio Tool */}
                <div className="reader-tools-group">
                    {audioUrl && (
                        <button
                            className="audio-listen-btn"
                            onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                        >
                            <i className={`fas ${isPlayingAudio ? 'fa-pause' : 'fa-volume-up'} me-1`}></i>
                            <span>Dengarkan</span>
                        </button>
                    )}
                    <div className="font-size-adjuster">
                        <span className="font-label">Ukuran:</span>
                        <button
                            className={`btn-font ${fontSize === 'small' ? 'active' : ''}`}
                            onClick={() => setFontSize('small')}
                            title="Huruf Kecil"
                        >
                            A-
                        </button>
                        <button
                            className={`btn-font ${fontSize === 'normal' ? 'active' : ''}`}
                            onClick={() => setFontSize('normal')}
                            title="Huruf Standar"
                        >
                            A
                        </button>
                        <button
                            className={`btn-font ${fontSize === 'large' ? 'active' : ''}`}
                            onClick={() => setFontSize('large')}
                            title="Huruf Besar"
                        >
                            A+
                        </button>
                    </div>
                </div>
            </div>

            {/* Audio Player if activated */}
            {isPlayingAudio && audioUrl && (
                <div className="audio-player-wrapper">
                    <audio controls autoPlay style={{ width: '100%' }}>
                        <source src={audioUrl} />
                    </audio>
                </div>
            )}

            {/* 7. Featured Media / Photo with Kompas Caption */}
            {postType === "video" && videoUrl ? (
                <div className="kompas-video-wrapper">
                    <iframe
                        src={videoUrl.includes('youtube.com/watch?v=') ? videoUrl.replace('watch?v=', 'embed/') : videoUrl}
                        title={title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            ) : (
                <figure className="kompas-lead-figure">
                    <img
                        src={getImageUrl(img, "blog-details--big-1.webp")}
                        alt={imageCaption || title}
                        className="lead-photo"
                        onError={(e) => {
                            e.currentTarget.src = '/assets/img/blog/blog-details--big-1.webp'
                        }}
                    />
                    <figcaption className="photo-caption">
                        <span className="caption-credit">(KOMPAS.com/DOK. REDAKSI)</span>
                        {imageCaption ? ` - ${imageCaption}` : ` - Foto dokumentasi terkait peristiwa ${title}`}
                    </figcaption>
                </figure>
            )}

            {/* 8. Article Body Content */}
            <div className="kompas-article-body" style={fontStyles[fontSize]}>
                {content ? (
                    <div className="body-html-content" dangerouslySetInnerHTML={{ __html: formatArticleContent(content) }} />
                ) : (
                    <>
                        <p>
                            <strong>JAKARTA, KOMPAS.com</strong> - {excerpt || 'Menyajikan informasi komprehensif, aktual, dan terverifikasi untuk seluruh pembaca di tanah air.'}
                        </p>
                        <p>
                            Liputan mendalam ini mengkaji berbagai sudut pandang penting terkait dinamika peristiwa terkini, didukung oleh data dan konfirmasi narasumber terpercaya.
                        </p>
                    </>
                )}

                {/* Inline "Baca juga" Kompas Callout */}
                {relatedPosts.length > 0 && (
                    <div className="kompas-baca-juga">
                        <span className="baca-juga-badge">Baca juga:</span>
                        <Link href={`/blog/${relatedPosts[0].slug || relatedPosts[0].id}`} className="baca-juga-link">
                            {relatedPosts[0].title}
                        </Link>
                    </div>
                )}
            </div>

            {/* 9. Image Tags / Keywords */}
            {imageTags.length > 0 && (
                <div className="kompas-tag-list">
                    <span className="tag-lead">Tag:</span>
                    {imageTags.map((tag, i) => (
                        <Link key={i} href={`/blog-filter-tag?tag=${encodeURIComponent(tag)}`} className="tag-pill">
                            #{tag}
                        </Link>
                    ))}
                </div>
            )}

            {/* 10. Author / Redaksi Box */}
            <div className="kompas-editorial-profile">
                <div className="profile-avatar-box">
                    <img
                        src={authorAvatar}
                        alt={authorName}
                        onError={(e) => { e.currentTarget.src = '/assets/img/author/author-1.webp' }}
                        className="profile-avatar"
                    />
                </div>
                <div className="profile-info">
                    <h5 className="profile-name">
                        <Link href={`/author?name=${encodeURIComponent(authorName)}`}>
                            {authorName}
                        </Link>
                    </h5>
                    <span className="profile-role">Jurnalis & Penulis Kompas.com</span>
                    <p className="profile-bio">{authorBio}</p>
                </div>
            </div>

            {/* 11. Berita Terkait Grid */}
            {relatedPosts.length > 0 && (
                <div className="kompas-related-section">
                    <div className="related-header">
                        <span className="related-bar"></span>
                        <h4 className="related-title">BERITA TERKAIT</h4>
                    </div>
                    <div className="row g-3">
                        {relatedPosts.map((post) => (
                            <div key={post.id} className="col-md-4">
                                <div className="related-card">
                                    <Link href={`/blog/${post.slug || post.id}`} className="related-thumb-link">
                                        <img
                                            src={getImageUrl(post.img)}
                                            alt={post.title}
                                            className="related-img"
                                            onError={(e) => { e.currentTarget.src = '/assets/img/blog/blog-2-1.webp' }}
                                        />
                                    </Link>
                                    <h5 className="related-post-title">
                                        <Link href={`/blog/${post.slug || post.id}`}>
                                            {post.title}
                                        </Link>
                                    </h5>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <style jsx>{`
                .kompas-article-detail {
                    background: #ffffff;
                    border: 1px solid #e5e7eb;
                    border-radius: 8px;
                    padding: 24px 28px;
                    font-family: 'Roboto', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
                }

                /* Breadcrumb */
                .kompas-breadcrumbs {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 12px;
                    color: #6b7280;
                    margin-bottom: 14px;
                    flex-wrap: wrap;
                }
                .bc-item {
                    color: #6b7280;
                    text-decoration: none;
                }
                .bc-item:hover {
                    color: #0077d7;
                }
                .bc-sep {
                    color: #9ca3af;
                }
                .bc-current {
                    color: #111827;
                    font-weight: 600;
                }

                /* Rubric Header */
                .kompas-rubric-header {
                    margin-bottom: 8px;
                }
                .rubric-tag {
                    font-size: 12px;
                    font-weight: 800;
                    color: #0077d7;
                    letter-spacing: 0.5px;
                    text-decoration: none;
                }
                .rubric-tag:hover {
                    text-decoration: underline;
                }

                /* Title & Dek */
                .kompas-detail-title {
                    font-size: 32px;
                    font-weight: 800;
                    line-height: 1.28;
                    color: #111827;
                    margin-bottom: 12px;
                    letter-spacing: -0.3px;
                }
                .kompas-detail-dek {
                    font-size: 16px;
                    color: #4b5563;
                    line-height: 1.5;
                    margin-bottom: 16px;
                }

                /* Byline Box */
                .kompas-byline-box {
                    border-top: 1px solid #f3f4f6;
                    border-bottom: 1px solid #f3f4f6;
                    padding: 10px 0;
                    margin-bottom: 16px;
                    font-size: 13px;
                    color: #4b5563;
                }
                .byline-source {
                    margin-bottom: 4px;
                }
                .source-brand {
                    font-weight: 700;
                    color: #0077d7;
                }
                .source-sep {
                    margin: 0 6px;
                    color: #9ca3af;
                }
                .source-time {
                    color: #6b7280;
                }
                .byline-editorial {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    flex-wrap: wrap;
                }
                .byline-pipe {
                    color: #d1d5db;
                }

                /* Share Bar */
                .kompas-share-bar {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background: #f9fafb;
                    border: 1px solid #e5e7eb;
                    border-radius: 6px;
                    padding: 8px 14px;
                    margin-bottom: 20px;
                    flex-wrap: wrap;
                    gap: 12px;
                }
                .share-buttons-group {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    flex-wrap: wrap;
                }
                .share-label {
                    font-size: 12px;
                    font-weight: 700;
                    color: #374151;
                }
                .share-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                    padding: 5px 10px;
                    border-radius: 4px;
                    font-size: 12px;
                    font-weight: 600;
                    text-decoration: none;
                    color: #ffffff;
                    border: none;
                    cursor: pointer;
                    transition: opacity 0.15s ease;
                }
                .share-btn:hover {
                    opacity: 0.9;
                    color: #ffffff;
                }
                .share-wa {
                    background: #25d366;
                }
                .share-fb {
                    background: #1877f2;
                }
                .share-x {
                    background: #000000;
                }
                .share-tg {
                    background: #0088cc;
                }
                .share-copy {
                    background: #4b5563;
                }

                .reader-tools-group {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                }
                .audio-listen-btn {
                    background: #0077d7;
                    color: #ffffff;
                    border: none;
                    border-radius: 4px;
                    padding: 5px 10px;
                    font-size: 12px;
                    font-weight: 600;
                    cursor: pointer;
                }
                .font-size-adjuster {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }
                .font-label {
                    font-size: 11.5px;
                    color: #6b7280;
                    font-weight: 600;
                }
                .btn-font {
                    background: #ffffff;
                    border: 1px solid #d1d5db;
                    border-radius: 3px;
                    padding: 2px 6px;
                    font-size: 11px;
                    font-weight: 700;
                    color: #374151;
                    cursor: pointer;
                }
                .btn-font.active {
                    background: #0077d7;
                    color: #ffffff;
                    border-color: #0077d7;
                }

                /* Audio Player */
                .audio-player-wrapper {
                    background: #0f172a;
                    padding: 12px;
                    border-radius: 6px;
                    margin-bottom: 20px;
                }

                /* Lead Figure */
                .kompas-lead-figure {
                    margin: 0 0 24px;
                }
                .lead-photo {
                    width: 100%;
                    max-height: 480px;
                    object-fit: cover;
                    border-radius: 6px;
                    display: block;
                }
                .photo-caption {
                    font-size: 12.5px;
                    color: #6b7280;
                    line-height: 1.5;
                    padding-top: 8px;
                    font-style: italic;
                }
                .caption-credit {
                    font-weight: 700;
                    color: #374151;
                    font-style: normal;
                }

                /* Video Wrapper */
                .kompas-video-wrapper {
                    position: relative;
                    padding-top: 56.25%;
                    border-radius: 6px;
                    overflow: hidden;
                    margin-bottom: 24px;
                    background: #000;
                }
                .kompas-video-wrapper iframe {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    border: none;
                }

                /* Article Body */
                .kompas-article-body {
                    color: #1f2937;
                    margin-bottom: 28px;
                }
                .body-html-content :global(p) {
                    margin-bottom: 20px;
                }
                .body-html-content :global(h2),
                .body-html-content :global(h3) {
                    font-weight: 800;
                    color: #111827;
                    margin: 28px 0 14px;
                }
                .body-html-content :global(img) {
                    max-width: 100%;
                    height: auto;
                    border-radius: 6px;
                    margin: 16px 0;
                }

                /* Baca Juga Inline Box */
                .kompas-baca-juga {
                    background: #f0f9ff;
                    border-left: 4px solid #0077d7;
                    padding: 12px 16px;
                    margin: 24px 0;
                    border-radius: 0 6px 6px 0;
                    font-size: 15px;
                }
                .baca-juga-badge {
                    font-weight: 800;
                    color: #0077d7;
                    margin-right: 8px;
                }
                .baca-juga-link {
                    color: #111827;
                    text-decoration: none;
                    font-weight: 700;
                }
                .baca-juga-link:hover {
                    color: #0077d7;
                    text-decoration: underline;
                }

                /* Tag List */
                .kompas-tag-list {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    flex-wrap: wrap;
                    padding: 16px 0;
                    border-top: 1px solid #e5e7eb;
                    margin-bottom: 24px;
                }
                .tag-lead {
                    font-size: 12.5px;
                    font-weight: 700;
                    color: #374151;
                }
                .tag-pill {
                    font-size: 12px;
                    color: #0077d7;
                    background: #f3f4f6;
                    border: 1px solid #e5e7eb;
                    padding: 4px 10px;
                    border-radius: 14px;
                    text-decoration: none;
                    font-weight: 500;
                    transition: all 0.15s ease;
                }
                .tag-pill:hover {
                    background: #0077d7;
                    color: #ffffff;
                    border-color: #0077d7;
                }

                /* Profile Box */
                .kompas-editorial-profile {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    background: #f9fafb;
                    border: 1px solid #e5e7eb;
                    border-radius: 8px;
                    padding: 16px;
                    margin-bottom: 28px;
                }
                .profile-avatar {
                    width: 58px;
                    height: 58px;
                    border-radius: 50%;
                    object-fit: cover;
                }
                .profile-name {
                    font-size: 15px;
                    font-weight: 800;
                    margin: 0 0 2px;
                }
                .profile-name a {
                    color: #111827;
                    text-decoration: none;
                }
                .profile-name a:hover {
                    color: #0077d7;
                }
                .profile-role {
                    font-size: 11.5px;
                    font-weight: 600;
                    color: #0077d7;
                    display: block;
                    margin-bottom: 4px;
                }
                .profile-bio {
                    font-size: 12.5px;
                    color: #6b7280;
                    line-height: 1.5;
                    margin: 0;
                }

                /* Related Articles */
                .kompas-related-section {
                    border-top: 2px solid #e5e7eb;
                    padding-top: 20px;
                }
                .related-header {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-bottom: 16px;
                }
                .related-bar {
                    display: inline-block;
                    width: 4px;
                    height: 18px;
                    background: #0077d7;
                    border-radius: 2px;
                }
                .related-title {
                    font-size: 16px;
                    font-weight: 800;
                    color: #111827;
                    margin: 0;
                }
                .related-thumb-link {
                    display: block;
                    width: 100%;
                    aspect-ratio: 16 / 10;
                    border-radius: 6px;
                    overflow: hidden;
                    background: #f3f4f6;
                    margin-bottom: 8px;
                }
                .related-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.3s ease;
                }
                .related-thumb-link:hover .related-img {
                    transform: scale(1.04);
                }
                .related-post-title {
                    font-size: 13.5px;
                    font-weight: 700;
                    line-height: 1.35;
                }
                .related-post-title a {
                    color: #111827;
                    text-decoration: none;
                    transition: color 0.15s ease;
                }
                .related-post-title a:hover {
                    color: #0077d7;
                }

                @media (max-width: 767px) {
                    .kompas-detail-title {
                        font-size: 24px;
                    }
                    .kompas-article-detail {
                        padding: 16px;
                    }
                    .kompas-share-bar {
                        flex-direction: column;
                        align-items: flex-start;
                    }
                }
            `}</style>
        </article>
    )
}
