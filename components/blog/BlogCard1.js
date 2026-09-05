import Link from "next/link"
import { useRouter } from "next/router"
import VideoPopup from "../elements/VideoPopup"
import { getImageUrl } from "@/lib/imageUtils"

export default function BlogCard1({ col, desc, video, formatIcon, item = {} }) {
    const router = useRouter()
    const comments = item.commentsCount ?? item._count?.comments ?? (item.comments ? item.comments.length : 0)
    const views = item.views ?? 0
    const categoryName = typeof item.category === 'string' ? item.category : (item.category?.name || 'General')
    const authorName = typeof item.author === 'string' ? item.author : (item.author?.name || 'Alexis D.')
    const formattedDate = item.createdAt
        ? new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
        : `March 21, ${new Date().getFullYear()}`
    const imageSrc = getImageUrl(item.img, "blog-1.webp")

    const handleCardClick = (e) => {
        const selection = window.getSelection()
        if (selection && selection.toString().length > 0) return
        if (e.target.closest('a, button, input, textarea, select, .ta-blog-box__cats, .author-wrapper, .video-popup, .popup-video')) {
            return
        }
        if (item?.id) {
            router.push(`/blog/${item.id}`)
        }
    }

    return (
        <>
            <div className={`${col ? col : ""} d-flex`}>
                <article
                    className="ta-blog-box ta-thumb-zoom ta-blog-box__style-2 ta-stroke w-100 d-flex flex-column"
                    style={{ height: '100%', cursor: 'pointer' }}
                    onClick={handleCardClick}
                >
                    <div className="thumb" style={{ height: '240px', overflow: 'hidden', flexShrink: 0, position: 'relative', background: '#f1f5f9' }}>
                        <Link href={`/blog/${item.id}`} style={{ display: 'block', width: '100%', height: '100%' }}>
                            <img src={imageSrc} alt={item.title || "blog"} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </Link>
                        <div className="ta-blog-box__cats ta-blog-box__cats--right">
                            <Link href={`/blog-filter-category?category=${item.categorySlug || categoryName}`}>{categoryName}</Link>
                        </div>
                        {formatIcon &&
                            <span className="post-format-icon" style={{ pointerEvents: 'none' }}>
                                {item.postType === "photo" && <i className="fas fa-images" />}
                                {item.postType === "video" && <i className="fas fa-video" />}
                                {item.postType === "audio" && <i className="fas fa-microphone" />}
                                {item.postType === "quote" && <i className="fas fa-quote-left" />}
                                {item.postType === "link" && <i className="fas fa-link" />}
                            </span>
                        }

                        {video &&
                            <VideoPopup style={1} />
                        }

                    </div>
                    <div className="content d-flex flex-column justify-content-between flex-grow-1">
                        <div>
                            <ul className="ta-blog-box__meta-info meta-infos d-flex justify-content-center align-items-center list-unstyled tfy-neg-30 ta-stroke ">
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
                                <li><i className="fa fa-eye" /> {views} Views</li>
                            </ul>
                            <h3 className="ta-blog-box__title ta-blog-box__title--small ta-border-effect " style={{ minHeight: '48px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                <Link href={`/blog/${item.id}`}>{item.title}</Link>
                            </h3>
                            {desc &&
                                <div className="excerpt excerpt__small mt-15" style={{ minHeight: '44px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                    <p>{item.excerpt || "Explore modern insights and developments in digital publishing and technology."}</p>
                                </div>
                            }
                        </div>
                        <div className="bottom-wrapper pt-20 d-flex justify-content-between align-items-center mt-30">
                            <Link href={`/blog/${item.id}`} className="ta-inline-btn">Read More <i className="fa fa-long-arrow-right" /></Link>
                            <div className="ta-blog-box__share-info share-info d-flex justify-content-center align-items-center">
                                <ul className="d-flex justify-content-center align-items-center list-unstyled">
                                    <li><i className="fa fa-comment" /> {comments}</li>
                                    <li><i className="fa fa-eye" /> {views}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </>
    )
}
