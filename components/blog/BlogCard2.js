import Link from "next/link"
import { getImageUrl } from "@/lib/imageUtils"

export default function BlogCard2({ col, item = {} }) {
    const categoryName = typeof item.category === 'string' ? item.category : (item.category?.name || 'General')
    const authorName = typeof item.author === 'string' ? item.author : (item.author?.name || 'Alexis D.')
    const formattedDate = item.createdAt
        ? new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
        : `March 21, ${new Date().getFullYear()}`
    const comments = item.commentsCount ?? item._count?.comments ?? (item.comments ? item.comments.length : 0)
    const views = item.views ?? 0
    const imageSrc = getImageUrl(item.img, "blog-2-1.webp")

    return (
        <>
            <div className={`${col ? col : ""} d-flex`}>
                <article className="ta-blog-box ta-thumb-zoom ta-blog-box__style-2 ta-blog-box__style-5 ta-stroke w-100 d-flex flex-column" style={{ height: '100%' }}>
                    <div className="thumb" style={{ height: '210px', overflow: 'hidden', flexShrink: 0, position: 'relative', background: '#f1f5f9' }}>
                        <img
                            src={imageSrc}
                            alt={item.title || "blog"}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <div className="ta-blog-box__cats ta-blog-box__cats--right">
                            <Link href={`/blog-filter-category?category=${item.categorySlug || categoryName}`}>{categoryName}</Link>
                        </div>
                    </div>
                    <div className="content d-flex flex-column justify-content-between flex-grow-1" style={{ padding: '24px 20px' }}>
                        <div>
                            <ul className="ta-blog-box__meta-info meta-infos d-flex align-items-center list-unstyled p-0 ta-bg-none flex-wrap" style={{ gap: '8px' }}>
                                <li>
                                    <Link
                                        href={item.authorId ? `/author?id=${item.authorId}` : `/author?name=${encodeURIComponent(authorName)}`}
                                        className="author-wrapper d-flex justify-content-center align-items-center"
                                    >
                                        <span className="by">By</span>
                                        <span className="author-name">{authorName}</span>
                                    </Link>
                                </li>
                                <li>{formattedDate}</li>
                                <li><i className="fa fa-eye" /> {views}</li>
                                <li><i className="fa fa-comment" /> {comments}</li>
                            </ul>
                            <h3 className="ta-blog-box__title ta-blog-box__title--small ta-border-effect mt-10 ta-line-2" style={{ minHeight: '44px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                <Link href={`/blog/${item.id}`}>{item.title}</Link>
                            </h3>
                        </div>
                    </div>
                </article>
            </div>
        </>
    )
}
