import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState, useMemo } from "react"
import { getImageUrl } from "@/lib/imageUtils"
import prisma from "@/lib/prisma"

function formatTimeAgo(dateString) {
    if (!dateString) return "Baru saja"
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now - date
    const diffSec = Math.floor(diffMs / 1000)
    const diffMin = Math.floor(diffSec / 60)
    const diffHour = Math.floor(diffMin / 60)
    const diffDay = Math.floor(diffHour / 24)

    if (diffMin < 1) return "Baru saja"
    if (diffMin < 60) return `${diffMin} menit yang lalu`
    if (diffHour < 24) return `${diffHour} jam yang lalu`
    if (diffDay < 7) return `${diffDay} hari yang lalu`
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function BreakingNewsPage({ initialPosts = [], settings = {}, categories = [] }) {
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [searchTerm, setSearchTerm] = useState("")

    const filteredPosts = useMemo(() => {
        return initialPosts.filter(post => {
            const matchesCat = selectedCategory === "all" || 
                post.categorySlug?.toLowerCase() === selectedCategory.toLowerCase() ||
                post.category?.toLowerCase() === selectedCategory.toLowerCase()
            
            const matchesSearch = !searchTerm.trim() || 
                post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))

            return matchesCat && matchesSearch
        })
    }, [initialPosts, selectedCategory, searchTerm])

    const leadPost = filteredPosts[0] || null
    const regularPosts = filteredPosts.slice(1)

    return (
        <Layout headerStyle={1} footerStyle={1} settings={settings} breadcrumbTitle="Breaking News" headTitle="Breaking News - Kilas Berita Terkini & Terpercaya | Dua Narasi">
            <style jsx>{`
                .bn-page-wrapper {
                    padding: 40px 0 80px;
                    background: #f8fafc;
                }
                .bn-hero-banner {
                    background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
                    border-radius: 16px;
                    padding: 36px 32px;
                    color: #ffffff;
                    margin-bottom: 36px;
                    box-shadow: 0 10px 30px rgba(15, 23, 42, 0.15);
                    position: relative;
                    overflow: hidden;
                }
                .bn-hero-banner::after {
                    content: "";
                    position: absolute;
                    top: -50%;
                    right: -20%;
                    width: 350px;
                    height: 350px;
                    background: radial-gradient(circle, rgba(218, 1, 5, 0.25) 0%, rgba(218, 1, 5, 0) 70%);
                    pointer-events: none;
                }
                .bn-live-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: #da0105;
                    color: #ffffff;
                    padding: 5px 14px;
                    border-radius: 20px;
                    font-size: 11px;
                    font-weight: 800;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    margin-bottom: 14px;
                }
                .bn-live-dot {
                    width: 8px;
                    height: 8px;
                    background: #ffffff;
                    border-radius: 50%;
                    animation: bnLivePulse 1.4s infinite cubic-bezier(0.45, 0, 0.55, 1);
                }
                @keyframes bnLivePulse {
                    0% { transform: scale(0.9); opacity: 0.6; }
                    50% { transform: scale(1.3); opacity: 1; }
                    100% { transform: scale(0.9); opacity: 0.6; }
                }
                .bn-hero-title {
                    font-size: 32px;
                    font-weight: 800;
                    color: #ffffff;
                    line-height: 1.25;
                    margin-bottom: 10px;
                }
                .bn-hero-desc {
                    font-size: 15px;
                    color: #94a3b8;
                    max-width: 680px;
                    line-height: 1.6;
                    margin: 0;
                }

                /* Controls bar */
                .bn-controls-bar {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    gap: 16px;
                    margin-bottom: 28px;
                    background: #ffffff;
                    padding: 16px 20px;
                    border-radius: 12px;
                    border: 1px solid #e2e8f0;
                }
                .bn-filter-tabs {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    flex-wrap: wrap;
                }
                .bn-tab-btn {
                    background: #f1f5f9;
                    border: 1px solid #e2e8f0;
                    color: #475569;
                    padding: 6px 14px;
                    border-radius: 20px;
                    font-size: 13px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                .bn-tab-btn:hover {
                    background: #e2e8f0;
                    color: #0f172a;
                }
                .bn-tab-btn.active {
                    background: #da0105;
                    border-color: #da0105;
                    color: #ffffff;
                    box-shadow: 0 2px 8px rgba(218, 1, 5, 0.25);
                }
                .bn-search-box {
                    position: relative;
                    min-width: 240px;
                }
                .bn-search-input {
                    width: 100%;
                    padding: 8px 12px 8px 34px;
                    border-radius: 20px;
                    border: 1px solid #cbd5e1;
                    font-size: 13px;
                    outline: none;
                    transition: border-color 0.2s ease;
                }
                .bn-search-input:focus {
                    border-color: #da0105;
                }
                .bn-search-icon {
                    position: absolute;
                    left: 12px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #94a3b8;
                    font-size: 13px;
                    pointer-events: none;
                }

                /* Lead Story Card */
                .bn-lead-card {
                    background: #ffffff;
                    border-radius: 16px;
                    overflow: hidden;
                    border: 1px solid #e2e8f0;
                    margin-bottom: 32px;
                    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
                    transition: transform 0.25s ease, box-shadow 0.25s ease;
                }
                .bn-lead-card:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
                }
                .bn-lead-img-wrapper {
                    position: relative;
                    height: 380px;
                    overflow: hidden;
                    background: #0f172a;
                }
                .bn-lead-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.5s ease;
                }
                .bn-lead-card:hover .bn-lead-img {
                    transform: scale(1.03);
                }
                .bn-lead-badge {
                    position: absolute;
                    top: 20px;
                    left: 20px;
                    background: #da0105;
                    color: #ffffff;
                    padding: 6px 14px;
                    border-radius: 6px;
                    font-weight: 800;
                    font-size: 12px;
                    letter-spacing: 0.8px;
                    text-transform: uppercase;
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    box-shadow: 0 4px 12px rgba(218, 1, 5, 0.35);
                    z-index: 2;
                }
                .bn-lead-content {
                    padding: 28px 32px;
                }
                .bn-meta-row {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    margin-bottom: 12px;
                    font-size: 13px;
                    color: #64748b;
                    flex-wrap: wrap;
                }
                .bn-cat-badge {
                    background: #fee2e2;
                    color: #da0105;
                    font-weight: 700;
                    padding: 3px 10px;
                    border-radius: 6px;
                    font-size: 12px;
                    text-transform: uppercase;
                }
                .bn-lead-title {
                    font-size: 26px;
                    font-weight: 800;
                    line-height: 1.35;
                    margin-bottom: 14px;
                }
                .bn-lead-title a {
                    color: #0f172a;
                    text-decoration: none;
                    transition: color 0.2s ease;
                }
                .bn-lead-title a:hover {
                    color: #da0105;
                }
                .bn-lead-excerpt {
                    font-size: 15px;
                    color: #475569;
                    line-height: 1.65;
                    margin-bottom: 20px;
                }
                .bn-author-row {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    border-top: 1px solid #f1f5f9;
                    padding-top: 16px;
                }
                .bn-author-avatar {
                    width: 38px;
                    height: 38px;
                    border-radius: 50%;
                    object-fit: cover;
                }
                .bn-author-name {
                    font-weight: 700;
                    font-size: 14px;
                    color: #0f172a;
                }
                .bn-author-role {
                    font-size: 12px;
                    color: #64748b;
                }

                /* Grid Cards */
                .bn-grid {
                    display: grid;
                    grid-templateColumns: repeat(auto-fill, minmax(320px, 1fr));
                    gap: 24px;
                }
                .bn-card {
                    background: #ffffff;
                    border-radius: 12px;
                    border: 1px solid #e2e8f0;
                    overflow: hidden;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
                    display: flex;
                    flex-direction: column;
                    transition: all 0.25s ease;
                }
                .bn-card:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
                    border-color: #cbd5e1;
                }
                .bn-card-img-wrapper {
                    position: relative;
                    height: 200px;
                    overflow: hidden;
                    background: #0f172a;
                }
                .bn-card-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.4s ease;
                }
                .bn-card:hover .bn-card-img {
                    transform: scale(1.05);
                }
                .bn-card-urgency {
                    position: absolute;
                    bottom: 12px;
                    left: 12px;
                    background: rgba(15, 23, 42, 0.85);
                    backdrop-filter: blur(4px);
                    color: #ffffff;
                    font-size: 11px;
                    font-weight: 600;
                    padding: 3px 8px;
                    border-radius: 4px;
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                }
                .bn-card-content {
                    padding: 18px 20px;
                    display: flex;
                    flex-direction: column;
                    flex: 1;
                }
                .bn-card-title {
                    font-size: 17px;
                    font-weight: 700;
                    line-height: 1.4;
                    margin: 8px 0 10px;
                    flex: 1;
                }
                .bn-card-title a {
                    color: #0f172a;
                    text-decoration: none;
                    transition: color 0.2s ease;
                }
                .bn-card-title a:hover {
                    color: #da0105;
                }
                .bn-card-footer {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-top: auto;
                    padding-top: 12px;
                    border-top: 1px solid #f1f5f9;
                    font-size: 12px;
                    color: #64748b;
                }

                /* Live Disclaimer Notice */
                .bn-disclaimer {
                    margin-top: 48px;
                    background: #ffffff;
                    border: 1px solid #e2e8f0;
                    border-left: 4px solid #da0105;
                    border-radius: 8px;
                    padding: 16px 20px;
                    display: flex;
                    align-items: flex-start;
                    gap: 14px;
                    color: #475569;
                    font-size: 13.5px;
                    line-height: 1.55;
                }

                @media (max-width: 768px) {
                    .bn-hero-banner {
                        padding: 24px 20px;
                    }
                    .bn-hero-title {
                        font-size: 24px;
                    }
                    .bn-lead-img-wrapper {
                        height: 240px;
                    }
                    .bn-lead-content {
                        padding: 20px;
                    }
                    .bn-lead-title {
                        font-size: 20px;
                    }
                }
            `}</style>

            <div className="bn-page-wrapper">
                <div className="container">
                    
                    {/* Live Header Banner */}
                    <div className="bn-hero-banner">
                        <div className="bn-live-pill">
                            <span className="bn-live-dot" />
                            <span>LIVE UPDATES & BREAKING NEWS</span>
                        </div>
                        <h1 className="bn-hero-title">Kilas Peristiwa Terkini & Berita Mendesak</h1>
                        <p className="bn-hero-desc">
                            Laporan kilat, konfirmasi eksklusif, dan perkembangan peristiwa mendesak langsung dari sumber lapangan terpercaya dengan verifikasi jurnalistik ketat.
                        </p>
                    </div>

                    {/* Filter & Search Bar */}
                    <div className="bn-controls-bar">
                        <div className="bn-filter-tabs">
                            <button 
                                className={`bn-tab-btn ${selectedCategory === "all" ? "active" : ""}`}
                                onClick={() => setSelectedCategory("all")}
                            >
                                Semua Kilasan ({initialPosts.length})
                            </button>
                            {categories.map((cat) => (
                                <button 
                                    key={cat.id} 
                                    className={`bn-tab-btn ${selectedCategory.toLowerCase() === cat.slug.toLowerCase() ? "active" : ""}`}
                                    onClick={() => setSelectedCategory(cat.slug)}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>

                        <div className="bn-search-box">
                            <i className="fa fa-search bn-search-icon" />
                            <input 
                                type="text"
                                className="bn-search-input"
                                placeholder="Cari breaking news..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Content Section */}
                    {filteredPosts.length === 0 ? (
                        <div style={{
                            background: '#ffffff',
                            borderRadius: '16px',
                            padding: '60px 20px',
                            textAlign: 'center',
                            border: '1px solid #e2e8f0'
                        }}>
                            <div style={{
                                width: '64px',
                                height: '64px',
                                background: '#fef2f2',
                                color: '#da0105',
                                borderRadius: '50%',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '24px',
                                marginBottom: '16px'
                            }}>
                                <i className="fa fa-bolt" />
                            </div>
                            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                                Belum Ada Breaking News Baru
                            </h3>
                            <p style={{ color: '#64748b', maxWidth: '440px', margin: '0 auto 20px' }}>
                                Pantauan situasi terkini masih berjalan normal dan terkendali. Silakan kembali beberapa saat lagi atau jelajahi artikel utama kami.
                            </p>
                            <Link href="/" className="ta-button" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                <i className="fa fa-home" /> Kembali ke Beranda
                            </Link>
                        </div>
                    ) : (
                        <>
                            {/* Lead Story Card */}
                            {leadPost && (
                                <div className="bn-lead-card">
                                    <div className="row g-0">
                                        <div className="col-lg-7">
                                            <div className="bn-lead-img-wrapper">
                                                <span className="bn-lead-badge">
                                                    <i className="fa fa-bolt" /> BREAKING ALERT
                                                </span>
                                                <img 
                                                    src={getImageUrl(leadPost.img, "blog-2-1.webp")} 
                                                    alt={leadPost.title} 
                                                    className="bn-lead-img"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-5 align-self-center">
                                            <div className="bn-lead-content">
                                                <div className="bn-meta-row">
                                                    <span className="bn-cat-badge">{leadPost.category}</span>
                                                    <span><i className="fa fa-clock-o" /> {formatTimeAgo(leadPost.createdAt)}</span>
                                                    {leadPost.views > 0 && (
                                                        <span><i className="fa fa-eye" /> {leadPost.views} tayangan</span>
                                                    )}
                                                </div>
                                                <h2 className="bn-lead-title">
                                                    <Link href={`/blog/${leadPost.id}`}>
                                                        {leadPost.title}
                                                    </Link>
                                                </h2>
                                                <p className="bn-lead-excerpt">
                                                    {leadPost.excerpt || (leadPost.content ? leadPost.content.replace(/<[^>]+>/g, '').slice(0, 150) + '...' : '')}
                                                </p>
                                                <div className="bn-author-row">
                                                    <img 
                                                        src={getImageUrl(leadPost.authorAvatar, "/assets/img/author/author-1.webp")} 
                                                        alt={leadPost.author} 
                                                        className="bn-author-avatar"
                                                    />
                                                    <div>
                                                        <div className="bn-author-name">{leadPost.author}</div>
                                                        <div className="bn-author-role">{leadPost.authorRole}</div>
                                                    </div>
                                                    <div style={{ marginLeft: 'auto' }}>
                                                        <Link href={`/blog/${leadPost.id}`} className="ta-button" style={{ padding: '8px 16px', fontSize: '13px' }}>
                                                            Baca Liputan Lengkap <i className="fa fa-arrow-right" />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Additional Breaking Stories Grid */}
                            {regularPosts.length > 0 && (
                                <>
                                    <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <i className="fa fa-list-alt" style={{ color: '#da0105' }} />
                                        <span>Perkembangan Berita Terkini Lainnya</span>
                                    </div>
                                    <div className="bn-grid">
                                        {regularPosts.map((post) => (
                                            <div key={post.id} className="bn-card">
                                                <div className="bn-card-img-wrapper">
                                                    <Link href={`/blog/${post.id}`}>
                                                        <img 
                                                            src={getImageUrl(post.img, "blog-2-2.webp")} 
                                                            alt={post.title} 
                                                            className="bn-card-img"
                                                        />
                                                    </Link>
                                                    <span className="bn-card-urgency">
                                                        <i className="fa fa-bolt" style={{ color: '#f87171' }} />
                                                        {formatTimeAgo(post.createdAt)}
                                                    </span>
                                                </div>
                                                <div className="bn-card-content">
                                                    <div className="bn-meta-row" style={{ margin: 0 }}>
                                                        <span className="bn-cat-badge">{post.category}</span>
                                                    </div>
                                                    <h3 className="bn-card-title">
                                                        <Link href={`/blog/${post.id}`}>
                                                            {post.title}
                                                        </Link>
                                                    </h3>
                                                    <div className="bn-card-footer">
                                                        <span><i className="fa fa-user-circle-o" /> {post.author}</span>
                                                        <Link href={`/blog/${post.id}`} style={{ color: '#da0105', fontWeight: 600 }}>
                                                            Selengkapnya →
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </>
                    )}

                    {/* Live Newsroom Disclaimer */}
                    <div className="bn-disclaimer">
                        <i className="fa fa-info-circle" style={{ color: '#da0105', fontSize: '18px', marginTop: '2px' }} />
                        <div>
                            <strong>Standar Jurnalisme Kilat & Pedoman Siber Dua Narasi:</strong> Informasi dan fakta pada laman breaking news diperbarui secara dinamis mengikuti konfirmasi resmi otoritas, saksi mata lapangan, dan penelusuran ruang redaksi sesuai Pedoman Pemberitaan Media Siber Dewan Pers.
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps() {
    try {
        const breakingTags = ['breaking-news', 'breaking', 'kilas-berita', 'urgent']

        // 1. Fetch posts specifically tagged as breaking
        const posts = await prisma.post.findMany({
            where: {
                status: 'PUBLISHED',
                tags: {
                    some: {
                        slug: { in: breakingTags }
                    }
                }
            },
            include: {
                category: { select: { id: true, name: true, slug: true } },
                author: { select: { id: true, name: true, avatar: true, designation: true, role: true } },
                tags: { select: { id: true, name: true, slug: true } }
            },
            orderBy: { createdAt: 'desc' },
            take: 20
        })

        // 2. Fetch categories for filters
        const categories = await prisma.category.findMany({
            where: { showInHeader: true },
            select: { id: true, name: true, slug: true },
            take: 6
        })

        // 4. Fetch settings
        const settingsList = await prisma.setting.findMany()
        const settings = {}
        settingsList.forEach(s => {
            settings[s.key] = s.value
        })

        const formattedPosts = posts.map(post => ({
            id: post.id,
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            content: post.content,
            img: post.img,
            categoryId: post.categoryId,
            authorId: post.authorId,
            views: post.views,
            status: post.status,
            createdAt: post.createdAt.toISOString(),
            category: post.category?.name || 'Berita',
            categorySlug: post.category?.slug || 'berita',
            author: post.author?.name || 'Redaksi',
            authorRole: post.author?.designation || post.author?.role || 'Penulis',
            authorAvatar: post.author?.avatar || '/assets/img/author/author-1.webp'
        }))

        return {
            props: {
                initialPosts: formattedPosts,
                categories,
                settings
            }
        }
    } catch (error) {
        console.error('Error in Breaking News getServerSideProps:', error)
        return {
            props: {
                initialPosts: [],
                categories: [],
                settings: {}
            }
        }
    }
}

