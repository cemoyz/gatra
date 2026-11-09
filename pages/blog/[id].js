import Layout from "@/components/layout/Layout"
import Head from "next/head"
import { useRouter } from "next/router"
import { useState } from "react"
import BlogDetailsArticle from "@/components/sections/BlogDetailsArticle"
import Comments from "@/components/sections/Comments"
import BlogSidebar from "@/components/sections/BlogSidebar"
import { getImageUrl } from "@/lib/imageUtils"
import prisma from "@/lib/prisma"

export default function BlogDetails({ initialPost, settings = {}, domain = 'http://localhost:3000' }) {
    const router = useRouter()
    const [blogPost, setBlogPost] = useState(initialPost)

    const siteTitle = settings.site_title || "Dua Narasi - Portal Berita Terkini"
    const pageTitle = blogPost?.title ? `${blogPost.title} - ${siteTitle}` : siteTitle
    const cleanDomain = domain.replace(/\/$/, '')
    const canonicalUrl = blogPost ? `${cleanDomain}/blog/${blogPost.id}` : cleanDomain
    const excerpt = blogPost?.excerpt || (blogPost?.content ? blogPost.content.replace(/<[^>]*>/g, '').slice(0, 160) : '')
    
    // Absolute image URL for Google & OpenGraph
    const rawImg = blogPost?.img || "blog-2-1.webp"
    const postImgUrl = rawImg.startsWith('http')
        ? rawImg
        : `${cleanDomain}/assets/img/blog/${rawImg}`
    
    const logoUrl = getImageUrl(settings.logo_header || settings.site_logo, `${cleanDomain}/assets/img/logo/logo.webp`)
    const datePublished = blogPost?.createdAt ? new Date(blogPost.createdAt).toISOString() : new Date().toISOString()
    const dateModified = blogPost?.updatedAt ? new Date(blogPost.updatedAt).toISOString() : datePublished

    // Google Schema.org NewsArticle Structured Data
    const newsArticleSchema = blogPost ? {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": canonicalUrl
        },
        "headline": blogPost.title,
        "description": excerpt,
        "image": [{
            "@type": "ImageObject",
            "url": postImgUrl,
            ...(blogPost.imageCaption ? { "caption": blogPost.imageCaption } : {}),
            ...(blogPost.imageTags ? {
                "keywords": blogPost.imageTags.split(',').map(tag => tag.trim()).filter(Boolean)
            } : {})
        }],
        "datePublished": datePublished,
        "dateModified": dateModified,
        "author": {
            "@type": "Person",
            "name": blogPost.author?.name || blogPost.editorName || "Redaksi Dua Narasi"
        },
        "publisher": {
            "@type": "NewsMediaOrganization",
            "name": siteTitle,
            "url": cleanDomain,
            "logo": {
                "@type": "ImageObject",
                "url": logoUrl.startsWith('http') ? logoUrl : `${cleanDomain}${logoUrl}`
            }
        }
    } : null

    const layoutType = blogPost?.layout || 'right-sidebar'
    const isNoSidebar = layoutType === 'no-sidebar'
    const isLeftSidebar = layoutType === 'left-sidebar'

    return (
        <Layout 
            headerStyle={1} 
            footerStyle={1} 
            breadcrumbTitle={blogPost?.title || "Detail Berita"}
            headTitle={pageTitle}
            settings={settings}
        >
            <Head>
                {blogPost && (
                    <>
                        <title>{pageTitle}</title>
                        <meta name="description" content={excerpt} />
                        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
                        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
                        <link rel="canonical" href={canonicalUrl} />

                        {/* OpenGraph / Facebook */}
                        <meta property="og:locale" content="id_ID" />
                        <meta property="og:type" content="article" />
                        <meta property="og:title" content={blogPost.title} />
                        <meta property="og:description" content={excerpt} />
                        <meta property="og:url" content={canonicalUrl} />
                        <meta property="og:site_name" content={siteTitle} />
                        <meta property="og:image" content={postImgUrl} />
                        <meta property="og:image:alt" content={blogPost.imageCaption || blogPost.title} />
                        <meta property="article:published_time" content={datePublished} />
                        <meta property="article:modified_time" content={dateModified} />
                        <meta property="article:section" content={blogPost.category?.name || "Berita"} />
                        <meta property="article:author" content={blogPost.author?.name || "Redaksi"} />

                        {/* Twitter Card */}
                        <meta name="twitter:card" content="summary_large_image" />
                        <meta name="twitter:title" content={blogPost.title} />
                        <meta name="twitter:description" content={excerpt} />
                        <meta name="twitter:image" content={postImgUrl} />

                        {/* Schema.org NewsArticle JSON-LD for Instant Google Indexing */}
                        <script
                            type="application/ld+json"
                            dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleSchema).replace(/</g, '\\u003c') }}
                        />
                    </>
                )}
            </Head>

            <div className="ta-blog-area pt-70 pb-90" style={{ position: 'relative', zIndex: 1, clear: 'both' }}>
                <div className="container">
                    {!blogPost ? (
                        <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748b' }}>
                            <h3>Artikel Tidak Ditemukan</h3>
                            <p>Artikel yang Anda cari tidak tersedia atau belum dipublikasikan.</p>
                        </div>
                    ) : isNoSidebar ? (
                        /* No Sidebar (Full Width) Layout Template */
                        <div className="row justify-content-center" style={{ alignItems: 'flex-start' }}>
                            <div className="col-xl-10 col-lg-12">
                                <div className="ta-blog-details-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                                    <BlogDetailsArticle blogPost={blogPost} />
                                    {settings.show_post_comments !== 'false' && <Comments postId={blogPost.id} />}
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Sidebar Layout Template (Left or Right) */
                        <div className="row" style={{ alignItems: 'flex-start' }}>
                            {isLeftSidebar && (
                                <div className="col-xl-4 col-lg-4 order-2 order-xl-1">
                                    <BlogSidebar />
                                </div>
                            )}

                            <div className={`col-xl-8 col-lg-8 ${isLeftSidebar ? 'order-1 order-xl-2' : ''}`}>
                                <div className="ta-blog-details-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                                    <BlogDetailsArticle blogPost={blogPost} />
                                    {settings.show_post_comments !== 'false' && <Comments postId={blogPost.id} />}
                                </div>
                            </div>

                            {!isLeftSidebar && (
                                <div className="col-xl-4 col-lg-4">
                                    <BlogSidebar />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ params, req }) {
    try {
        const { id } = params
        const postId = parseInt(id)
        const whereCondition = isNaN(postId)
            ? { slug: id }
            : { OR: [{ id: postId }, { slug: id }] }

        const post = await prisma.post.findFirst({
            where: whereCondition,
            include: {
                category: { select: { id: true, name: true, slug: true } },
                author: { select: { id: true, name: true, avatar: true, designation: true, role: true } },
                tags: { select: { id: true, name: true, slug: true } },
                _count: { select: { comments: true } }
            }
        })

        // Fetch settings
        const settingsList = await prisma.setting.findMany()
        const settings = {}
        settingsList.forEach(s => {
            settings[s.key] = s.value
        })

        const protocol = req.headers['x-forwarded-proto'] || 'http'
        const host = req.headers['host'] || 'localhost:3000'
        const domain = settings.site_url?.trim() || `${protocol}://${host}`

        return {
            props: {
                initialPost: post ? JSON.parse(JSON.stringify(post)) : null,
                settings,
                domain
            }
        }
    } catch (error) {
        console.error('Error in BlogDetails getServerSideProps:', error)
        return {
            props: {
                initialPost: null,
                settings: {},
                domain: 'http://localhost:3000'
            }
        }
    }
}
