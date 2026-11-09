import Layout from "@/components/layout/Layout"
import Head from "next/head"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import BlogDetailsArticle from "@/components/sections/BlogDetailsArticle"
import Comments from "@/components/sections/Comments"
import KompasArticleSidebar from "@/components/kompas/KompasArticleSidebar"
import { getImageUrl } from "@/lib/imageUtils"
import prisma from "@/lib/prisma"

export default function BlogDetails({ initialPost, popularPosts = [], settings = {}, domain = 'http://localhost:3000' }) {
    const router = useRouter()
    const blogPost = initialPost

    const siteTitle = settings.site_title || "KOMPAS.com"
    const siteTagline = settings.site_tagline || "Jernih Melihat Dunia"
    const pageTitle = blogPost?.title ? `${blogPost.title} - ${siteTitle}` : `${siteTitle} - ${siteTagline}`
    const cleanDomain = domain.replace(/\/$/, '')
    const canonicalUrl = blogPost ? `${cleanDomain}/blog/${blogPost.slug || blogPost.id}` : cleanDomain
    const excerpt = blogPost?.excerpt || (blogPost?.content ? blogPost.content.replace(/<[^>]*>/g, '').slice(0, 160) : '')
    
    // Absolute image URL for Google & OpenGraph
    const rawImg = blogPost?.img || "blog-2-1.webp"
    const postImgUrl = rawImg.startsWith('http')
        ? rawImg
        : `${cleanDomain}/assets/img/blog/${rawImg}`
    
    const logoUrl = getImageUrl(settings.logo_header || settings.site_logo, `${cleanDomain}/assets/img/logo/logo-kompascom-31.png`)
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
            "name": blogPost.author?.name || blogPost.editorName || "Redaksi Kompas.com"
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

    return (
        <Layout 
            headerStyle={1} 
            footerStyle={1} 
            breadcrumbTitle={null}
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
                        <meta property="article:section" content={blogPost.category?.name || "News"} />
                        <meta property="article:author" content={blogPost.author?.name || "Redaksi"} />

                        {/* Twitter Card */}
                        <meta name="twitter:card" content="summary_large_image" />
                        <meta name="twitter:title" content={blogPost.title} />
                        <meta name="twitter:description" content={excerpt} />
                        <meta name="twitter:image" content={postImgUrl} />

                        {/* Schema.org NewsArticle JSON-LD */}
                        <script
                            type="application/ld+json"
                            dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleSchema).replace(/</g, '\\u003c') }}
                        />
                    </>
                )}
            </Head>

            <div className="kompas-article-page pt-20 pb-70">
                <div className="kompas-container">
                    {!blogPost ? (
                        <div style={{ textAlign: 'center', padding: '80px 20px', color: '#64748b' }}>
                            <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#1e293b', marginBottom: '12px' }}>Artikel Tidak Ditemukan</h2>
                            <p style={{ fontSize: '15px', color: '#64748b', marginBottom: '24px' }}>Artikel yang Anda cari tidak tersedia, telah diarsipkan, atau tautan yang dimasukkan salah.</p>
                            <a href="/" style={{ background: '#0077d7', color: '#ffffff', padding: '10px 20px', borderRadius: '6px', textDecoration: 'none', fontWeight: 700, fontSize: '14px' }}>
                                Kembali ke Beranda Kompas.com
                            </a>
                        </div>
                    ) : (
                        <div className="row g-4" style={{ alignItems: 'flex-start' }}>
                            {/* Main Column: 8 Cols (~68%) */}
                            <div className="col-xl-8 col-lg-8">
                                <div className="kompas-article-wrapper">
                                    <BlogDetailsArticle key={blogPost.id} blogPost={blogPost} />
                                    {settings.show_post_comments !== 'false' && (
                                        <div className="mt-4">
                                            <Comments key={`comments-${blogPost.id}`} postId={blogPost.id} />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Sidebar Column: 4 Cols (~32%) */}
                            <div className="col-xl-4 col-lg-4">
                                <KompasArticleSidebar
                                    key={`sidebar-${blogPost.id}`}
                                    popularPosts={popularPosts}
                                    currentPostId={blogPost.id}
                                />
                            </div>
                        </div>
                    )}
                </div>

                <style jsx>{`
                    .kompas-article-page {
                        background-color: #ffffff;
                        font-family: 'Roboto', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
                    }
                    .kompas-container {
                        max-width: 1180px;
                        margin: 0 auto;
                        padding: 0 16px;
                        width: 100%;
                    }
                    .kompas-article-wrapper {
                        display: flex;
                        flex-direction: column;
                    }
                `}</style>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ params, req }) {
    try {
        const { id } = params
        const isNumeric = /^\d+$/.test(id)
        const whereCondition = isNumeric
            ? { OR: [{ id: parseInt(id) }, { slug: id }] }
            : { slug: id }

        const post = await prisma.post.findFirst({
            where: whereCondition,
            include: {
                category: { select: { id: true, name: true, slug: true } },
                author: { select: { id: true, name: true, avatar: true, designation: true, role: true } },
                tags: { select: { id: true, name: true, slug: true } },
                _count: { select: { comments: true } }
            }
        })

        // Increment views in background
        if (post?.id) {
            prisma.post.update({
                where: { id: post.id },
                data: { views: { increment: 1 } }
            }).catch(() => {})
        }

        // Fetch popular posts for sidebar
        const popularPosts = await prisma.post.findMany({
            where: { status: 'PUBLISHED' },
            orderBy: { views: 'desc' },
            take: 5,
            include: {
                category: { select: { id: true, name: true, slug: true } }
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
                popularPosts: popularPosts ? JSON.parse(JSON.stringify(popularPosts)) : [],
                settings,
                domain
            }
        }
    } catch (error) {
        console.error('Error in BlogDetails getServerSideProps:', error)
        return {
            props: {
                initialPost: null,
                popularPosts: [],
                settings: {},
                domain: 'http://localhost:3000'
            }
        }
    }
}
