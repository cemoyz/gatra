import Link from "next/link"
import { useRouter } from "next/router"
import { getImageUrl } from "@/lib/imageUtils"
import { useSettings } from "@/context/SettingsContext"

export default function BlogCard3({ col, desc, item = {} }) {
    const router = useRouter()
    const { settings } = useSettings()
    const comments = item.commentsCount ?? item._count?.comments ?? (item.comments ? item.comments.length : 0)
    const views = item.views ?? 0
    const categoryName = typeof item.category === 'string' ? item.category : (item.category?.name || 'General')
    const authorName = typeof item.author === 'string' ? item.author : (item.author?.name || 'Alexis D.')
    const formattedDate = item.createdAt
        ? new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
        : `March 21, ${new Date().getFullYear()}`
    const imageSrc = getImageUrl(item.img, "blog-3-1.webp")

    const handleCardClick = (e) => {
        const selection = window.getSelection()
        if (selection && selection.toString().length > 0) return
        if (e.target.closest('a, button, input, textarea, select, .ta-blog-box__cats, .author-wrapper, .video-popup, .popup-video, .share-info')) {
            return
        }
        if (item?.id) {
            router.push(`/blog/${item.id}`)
        }
    }

    return (
        <>
            <div className={`${col ? col : ""} d-flex flex-column h-100`}>
                <article
                    className="ta-blog-box ta-thumb-zoom ta-blog-box__featured p-0 ta-stroke w-100 d-flex flex-column h-100"
                    style={{ height: '100%', cursor: 'pointer' }}
                    onClick={handleCardClick}
                >
                    <div className="thumb ta-brd-b-none" style={{ flex: '1 1 0', minHeight: 0, position: 'relative', overflow: 'hidden', background: '#f1f5f9' }}>
                        <div className="ta-post-gallery w-100 h-100" style={{ position: 'relative', width: '100%', height: '100%' }}>
                            <Link href={`/blog/${item.id}`} style={{ display: 'block', width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
                                <img
                                    src={imageSrc}
                                    alt={item.title || "blog"}
                                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </Link>
                        </div>
                        <div className="ta-blog-box__cats ta-blog-box__cats--right">
                            <Link href={`/blog-filter-category?category=${item.categorySlug || categoryName}`}>{categoryName}</Link>
                        </div>
                        <span className="post-format-icon" style={{ pointerEvents: 'none' }}><i className="fal fa-newspaper" /></span>
                    </div>
                    <div className="content position-relative d-flex flex-column justify-content-between p-4 flex-shrink-0" style={{ background: '#ffffff' }}>
                        <div>
                            <h2 className="ta-blog-box__title ta-blog-box__title--big ta-border-effect mt-10 ta-lh-125">
                                <Link href={`/blog/${item.id}`}>{item.title}</Link>
                            </h2>
                            {desc &&
                                <div className="excerpt mt-15">
                                    <p>{item.excerpt || "Explore modern insights and developments in digital publishing and technology."}</p>
                                </div>
                            }
                        </div>
                        <div className="bottom-wrapper mt-25 pt-20 pb-10 d-flex justify-content-between align-items-center flex-wrap ta-border-top" style={{ gap: '10px' }}>
                            <ul className="ta-blog-box__meta-info d-flex justify-content-center align-items-center list-unstyled flex-wrap m-0 p-0" style={{ gap: '12px' }}>
                                <li>
                                    <Link
                                        href={item.authorId ? `/author?id=${item.authorId}` : `/author?name=${encodeURIComponent(authorName)}`}
                                        className="author-wrapper d-flex justify-content-center align-items-center"
                                    >
                                        <span className="by">By</span>
                                        <span className="author-name"> {authorName}</span>
                                    </Link>
                                </li>
                                <li>{formattedDate}</li>
                                {settings?.show_post_views !== 'false' && <li><i className="fa fa-eye" /> {views} Views</li>}
                            </ul>
                            <div className="ta-blog-box__share-info share-info d-flex justify-content-center align-items-center">
                                <ul className="d-flex justify-content-center align-items-center list-unstyled m-0">
                                    {settings?.show_post_comments !== 'false' && <li><i className="fa fa-comment" /> {comments}</li>}
                                    {settings?.show_post_views !== 'false' && <li><i className="fa fa-eye" /> {views}</li>}
                                </ul>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </>
    )
}
