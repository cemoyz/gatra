import Layout from "@/components/posty/layout/Layout"
import Link from "next/link"
import Head from "next/head"
import { useRouter } from "next/router"
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

export default function BlogFilterTag({
    initialTag = "",
    initialPosts = [],
    initialPopularPosts = [],
    initialCategories = [],
    initialTags = [],
    initialTotalPosts = 0,
    initialPage = 1,
    pageSize = 8,
    settings = {}
}) {
    const router = useRouter()
    const { tag: queryTag, page: queryPage } = router.query

    const activeTag = (queryTag !== undefined ? queryTag : initialTag) || ""
    const currentPage = parseInt(queryPage || initialPage || 1, 10)
    const totalPages = Math.ceil(initialTotalPosts / pageSize) || 1

    const siteTitle = settings.site_title || "Gatra Portal"
    const pageTitle = activeTag ? `Topik: #${activeTag} - ${siteTitle}` : `Tag Berita - ${siteTitle}`

    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle={activeTag ? `Tag: #${activeTag}` : "Tag Berita"} settings={settings}>
            <Head>
                <title>{pageTitle}</title>
            </Head>

            {/* Tag Pills */}
            <section className="tag-filter-bar pt-4 pb-2 bg-grey-2 border-bottom">
                <div className="container">
                    <div className="d-flex align-items-center flex-wrap gap-2 py-2" style={{ gap: "8px" }}>
                        <span className="me-2 fw-bold text-dark d-flex align-items-center" style={{ fontSize: "14px" }}>
                            <i className="las la-tags me-1" style={{ fontSize: "18px", color: "#004CFF" }} />
                            Topik Terkait:
                        </span>
                        {initialTags.map((t) => {
                            const isSelected = activeTag.toLowerCase() === t.slug.toLowerCase() || activeTag.toLowerCase() === t.name.toLowerCase()
                            return (
                                <Link
                                    key={t.id || t.slug}
                                    href={`/blog-filter-tag?tag=${t.slug}`}
                                    className={`btn btn-sm ${isSelected ? "btn-primary" : "btn-light"}`}
                                    style={{
                                        borderRadius: "20px",
                                        padding: "6px 16px",
                                        fontWeight: 600,
                                        fontSize: "13px",
                                        backgroundColor: isSelected ? "#004CFF" : "#ffffff",
                                        borderColor: isSelected ? "#004CFF" : "#e2e8f0",
                                        color: isSelected ? "#ffffff" : "#334155",
                                        boxShadow: isSelected ? "0 4px 12px rgba(0, 76, 255, 0.25)" : "none"
                                    }}
                                >
                                    #{t.name}
                                </Link>
                            )
                        })}
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
                                        <span>{activeTag ? `Berita Topik: #${activeTag}` : "Semua Berita"}</span>
                                    </h3>
                                    <span className="text-muted" style={{ fontSize: "14px" }}>
                                        Ditemukan <strong>{initialTotalPosts}</strong> berita
                                    </span>
                                </div>

                                {initialPosts.length === 0 ? (
                                    <div className="card border-0 shadow-sm p-5 text-center my-4" style={{ borderRadius: "12px", background: "#f8fafc" }}>
                                        <i className="las la-newspaper" style={{ fontSize: "56px", color: "#94a3b8" }} />
                                        <h4 className="fw-bold mt-3 mb-2">Belum ada berita untuk topik ini</h4>
                                        <p className="text-muted mb-4">
                                            Silakan pilih topik atau kanal lainnya untuk melihat berita terkini.
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
                                                        const href = `/blog-filter-tag?${activeTag ? `tag=${encodeURIComponent(activeTag)}&` : ""}page=${p}`
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
    const { tag = "", page = 1 } = context.query
    const pageSize = 8
    const pageNum = Math.max(1, parseInt(page, 10) || 1)
    const tagQuery = typeof tag === "string" ? tag.trim() : ""

    try {
        const settingsRecords = await prisma.setting.findMany()
        const settings = {}
        settingsRecords.forEach((item) => {
            settings[item.key] = item.value
        })

        const [categories, tags] = await Promise.all([
            prisma.category.findMany({
                include: {
                    _count: {
                        select: {
                            posts: { where: { status: "PUBLISHED" } }
                        }
                    }
                },
                orderBy: { name: "asc" }
            }),
            prisma.tag.findMany({
                take: 15,
                orderBy: { name: "asc" }
            })
        ])

        const formattedCategories = categories.map((cat) => ({
            id: cat.id,
            name: cat.name,
            slug: cat.slug,
            postsCount: cat._count?.posts || 0
        }))

        const whereClause = { status: "PUBLISHED" }
        if (tagQuery) {
            whereClause.tags = {
                some: {
                    OR: [
                        { slug: { equals: tagQuery, mode: "insensitive" } },
                        { name: { equals: tagQuery, mode: "insensitive" } }
                    ]
                }
            }
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
                initialTag: tagQuery,
                initialPosts: JSON.parse(JSON.stringify(posts)),
                initialPopularPosts: JSON.parse(JSON.stringify(popularPosts)),
                initialCategories: JSON.parse(JSON.stringify(formattedCategories)),
                initialTags: JSON.parse(JSON.stringify(tags)),
                initialTotalPosts: totalCount,
                initialPage: pageNum,
                pageSize,
                settings
            }
        }
    } catch (err) {
        console.error("Error in blog-filter-tag getServerSideProps:", err)
        return {
            props: {
                initialTag: tagQuery,
                initialPosts: [],
                initialPopularPosts: [],
                initialCategories: [],
                initialTags: [],
                initialTotalPosts: 0,
                initialPage: 1,
                pageSize,
                settings: {}
            }
        }
    }
}
