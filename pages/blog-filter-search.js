import Layout from "@/components/posty/layout/Layout"
import Link from "next/link"
import Head from "next/head"
import { useRouter } from "next/router"
import { useState } from "react"
import { getImageUrl } from "@/lib/imageUtils"
import prisma from "@/lib/prisma"

function formatDate(dateString) {
    if (!dateString) return ""
    try {
        const d = new Date(dateString)
        return d.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric"
        })
    } catch {
        return ""
    }
}

function getCategoryBadgeColor(catName = "") {
    const lower = (catName || "").toLowerCase()
    if (lower.includes("tech") || lower.includes("tekno")) return "bg-blue"
    if (lower.includes("news") || lower.includes("berita")) return "bg-red"
    if (lower.includes("bola") || lower.includes("sport")) return "bg-green"
    if (lower.includes("money") || lower.includes("bisnis") || lower.includes("finansial")) return "bg-yellow"
    if (lower.includes("life") || lower.includes("gaya")) return "bg-pink"
    if (lower.includes("travel") || lower.includes("wisata")) return "bg-blue-light"
    return "bg-blue"
}

export default function BlogFilterSearch({
    initialQuery = "",
    initialPosts = [],
    initialPopularPosts = [],
    initialCategories = [],
    initialTotalPosts = 0,
    initialPage = 1,
    pageSize = 8,
    settings = {}
}) {
    const router = useRouter()
    const { search: querySearch, page: queryPage } = router.query

    const activeSearch = (querySearch !== undefined ? querySearch : initialQuery) || ""
    const [inputKeyword, setInputKeyword] = useState(activeSearch)
    const currentPage = parseInt(queryPage || initialPage || 1, 10)
    const totalPages = Math.ceil(initialTotalPosts / pageSize) || 1

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        if (inputKeyword.trim()) {
            router.push(`/blog-filter-search?search=${encodeURIComponent(inputKeyword.trim())}`)
        } else {
            router.push("/blog-filter-search")
        }
    }

    const siteTitle = settings.site_title || "Gatra Portal"
    const pageTitle = activeSearch ? `Pencarian: "${activeSearch}" - ${siteTitle}` : `Pencarian Berita - ${siteTitle}`

    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle={activeSearch ? `Cari: "${activeSearch}"` : "Pencarian"} settings={settings}>
            <Head>
                <title>{pageTitle}</title>
            </Head>

            <section className="search-bar-section pt-4 pb-4 bg-grey-2 border-bottom">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <form onSubmit={handleSearchSubmit} className="d-flex gap-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    style={{
                                        padding: "12px 20px",
                                        borderRadius: "30px",
                                        fontSize: "15px",
                                        backgroundColor: "#fff",
                                        border: "1px solid #cbd5e1"
                                    }}
                                    placeholder="Masukkan kata kunci pencarian berita..."
                                    value={inputKeyword}
                                    onChange={(e) => setInputKeyword(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    className="default-btn"
                                    style={{ borderRadius: "30px", padding: "0 28px", whiteSpace: "nowrap" }}
                                >
                                    <i className="las la-search" /> Cari
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <section className="news-post-area padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="news-post-wrap">
                                <div className="section-heading mb-40 d-flex justify-content-between align-items-center">
                                    <h3 className="section-title title-border">
                                        <span>
                                            {activeSearch ? `Hasil Pencarian: "${activeSearch}"` : "Semua Berita"}
                                        </span>
                                    </h3>
                                    <span className="text-muted" style={{ fontSize: "14px" }}>
                                        Ditemukan <strong>{initialTotalPosts}</strong> berita
                                    </span>
                                </div>

                                {initialPosts.length === 0 ? (
                                    <div className="card border-0 shadow-sm p-5 text-center my-4" style={{ borderRadius: "12px", background: "#f8fafc" }}>
                                        <i className="las la-search" style={{ fontSize: "56px", color: "#94a3b8" }} />
                                        <h4 className="fw-bold mt-3 mb-2">Tidak ada berita yang sesuai</h4>
                                        <p className="text-muted mb-4">
                                            Tidak ditemukan artikel dengan kata kunci &quot;{activeSearch}&quot;. Silakan coba dengan kata kunci lain.
                                        </p>
                                        <div>
                                            <Link href="/blog" className="default-btn">
                                                Lihat Semua Berita
                                            </Link>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        {initialPosts.map((post) => {
                                            const postUrl = `/blog/${post.slug || post.id}`
                                            const categoryName = post.category?.name || "News"
                                            const categorySlug = post.category?.slug || "news"
                                            const badgeClass = getCategoryBadgeColor(categoryName)
                                            const excerpt =
                                                post.excerpt ||
                                                (post.content
                                                    ? post.content.replace(/<[^>]*>/g, "").slice(0, 160) + "..."
                                                    : "")

                                            return (
                                                <div className="post-card news-post" key={post.id}>
                                                    <div className="post-thumb">
                                                        <Link href={postUrl}>
                                                            <img
                                                                src={getImageUrl(post.img, "/assets/img/post/sports-news-1.jpg")}
                                                                alt={post.title}
                                                                style={{ width: "100%", height: "210px", objectFit: "cover" }}
                                                            />
                                                        </Link>
                                                    </div>
                                                    <div className="post-content">
                                                        <Link
                                                            href={`/blog-filter-category?category=${categorySlug}`}
                                                            className={`card-btn ${badgeClass}`}
                                                        >
                                                            {categoryName}
                                                        </Link>
                                                        <h3 className="title">
                                                            <Link href={postUrl}>{post.title}</Link>
                                                        </h3>
                                                        <ul className="post-list">
                                                            <li className="author">
                                                                oleh <span>{post.author?.name || "Redaksi"}</span>
                                                            </li>
                                                            <li className="date">{formatDate(post.createdAt)}</li>
                                                            <li>
                                                                <i className="las la-eye" /> {post.views || 0}
                                                            </li>
                                                        </ul>
                                                        <p>{excerpt}</p>
                                                        <Link href={postUrl} className="news-post-btn" aria-label={`Baca: ${post.title}`}>
                                                            <i className="las la-arrow-right" />
                                                        </Link>
                                                    </div>
                                                </div>
                                            )
                                        })}

                                        {totalPages > 1 && (
                                            <div className="post-pagination mt-40">
                                                <ul className="pagination-list">
                                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                                                        const isCurrent = p === currentPage
                                                        const href = `/blog-filter-search?${activeSearch ? `search=${encodeURIComponent(activeSearch)}&` : ""}page=${p}`
                                                        return (
                                                            <li key={p} className={isCurrent ? "active" : ""}>
                                                                <Link href={href}>{p}</Link>
                                                            </li>
                                                        )
                                                    })}
                                                </ul>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="col-lg-4">
                            <div className="post-author-box text-center mb-40">
                                <div className="bg" />
                                <img
                                    src="/assets/img/post/post-author.png"
                                    alt={siteTitle}
                                    style={{ width: "90px", height: "90px", objectFit: "cover", borderRadius: "50%", margin: "0 auto" }}
                                />
                                <h3 className="author">{siteTitle}</h3>
                                <p>{settings.site_tagline || "Portal Berita Terkini, Akurat, dan Terpercaya."}</p>
                                <Link href="/about" className="default-btn">
                                    Tentang Kami
                                </Link>
                            </div>

                            {initialPopularPosts.length > 0 && (
                                <div className="trending-post-wrap mb-40">
                                    <div className="section-heading mb-30">
                                        <h3 className="section-title title-border">
                                            <span>Berita Terpopuler</span>
                                        </h3>
                                    </div>
                                    <div className="list-post-area list-2">
                                        {initialPopularPosts.map((pop) => (
                                            <div className="list-post-card" key={pop.id}>
                                                <div className="post-img">
                                                    <Link href={`/blog/${pop.slug || pop.id}`}>
                                                        <img
                                                            src={getImageUrl(pop.img, "/assets/img/post/trending-post-1.jpg")}
                                                            alt={pop.title}
                                                            style={{ width: "80px", height: "70px", objectFit: "cover" }}
                                                        />
                                                    </Link>
                                                </div>
                                                <div className="post-content">
                                                    <h3 className="title">
                                                        <Link href={`/blog/${pop.slug || pop.id}`}>{pop.title}</Link>
                                                    </h3>
                                                    <span>{formatDate(pop.createdAt)}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="categorie-wrap mb-40">
                                <div className="section-heading mb-30">
                                    <h3 className="section-title title-border">
                                        <span>Daftar Kanal</span>
                                    </h3>
                                </div>
                                <ul className="categorie-list">
                                    {initialCategories.map((c) => (
                                        <li key={c.id}>
                                            <Link href={`/blog-filter-category?category=${c.slug}`}>
                                                <h4 className="list-title">
                                                    {c.name} <span>({c.postsCount})</span>
                                                </h4>
                                                <i className="las la-arrow-right" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const { search = "", page = 1 } = context.query
    const pageSize = 8
    const pageNum = Math.max(1, parseInt(page, 10) || 1)
    const searchQuery = typeof search === "string" ? search.trim() : ""

    try {
        const settingsRecords = await prisma.setting.findMany()
        const settings = {}
        settingsRecords.forEach((item) => {
            settings[item.key] = item.value
        })

        const categories = await prisma.category.findMany({
            include: {
                _count: {
                    select: {
                        posts: { where: { status: "PUBLISHED" } }
                    }
                }
            },
            orderBy: { name: "asc" }
        })

        const formattedCategories = categories.map((cat) => ({
            id: cat.id,
            name: cat.name,
            slug: cat.slug,
            postsCount: cat._count?.posts || 0
        }))

        const whereClause = { status: "PUBLISHED" }
        if (searchQuery) {
            whereClause.OR = [
                { title: { contains: searchQuery, mode: "insensitive" } },
                { excerpt: { contains: searchQuery, mode: "insensitive" } }
            ]
        }

        const [posts, totalCount, popularPosts] = await Promise.all([
            prisma.post.findMany({
                where: whereClause,
                orderBy: { createdAt: "desc" },
                take: pageSize,
                skip: (pageNum - 1) * pageSize,
                include: {
                    category: { select: { id: true, name: true, slug: true } },
                    author: { select: { id: true, name: true, avatar: true } }
                }
            }),
            prisma.post.count({
                where: whereClause
            }),
            prisma.post.findMany({
                where: { status: "PUBLISHED" },
                orderBy: { views: "desc" },
                take: 5,
                include: {
                    category: { select: { id: true, name: true, slug: true } }
                }
            })
        ])

        return {
            props: {
                initialQuery: searchQuery,
                initialPosts: JSON.parse(JSON.stringify(posts)),
                initialPopularPosts: JSON.parse(JSON.stringify(popularPosts)),
                initialCategories: JSON.parse(JSON.stringify(formattedCategories)),
                initialTotalPosts: totalCount,
                initialPage: pageNum,
                pageSize,
                settings
            }
        }
    } catch (err) {
        console.error("Error in blog-filter-search getServerSideProps:", err)
        return {
            props: {
                initialQuery: searchQuery,
                initialPosts: [],
                initialPopularPosts: [],
                initialCategories: [],
                initialTotalPosts: 0,
                initialPage: 1,
                pageSize,
                settings: {}
            }
        }
    }
}
