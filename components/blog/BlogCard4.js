import Link from "next/link"
import { useRouter } from "next/router"
import VideoPopup from "../elements/VideoPopup"
import { getImageUrl } from "@/lib/imageUtils"
import { useSettings } from "@/context/SettingsContext"

export default function BlogCard4({ formatIcon, video, item = {} }) {
    const router = useRouter()
    const { settings } = useSettings()
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
        if (e.target.closest('a, button, input, textarea, select, .ta-blog-box__cats, .author-wrapper, .video-popup, .popup-video, .share-info')) {
            return
        }
        if (item?.id) {
            router.push(`/blog/${item.id}`)
        }
    }

    return (
        <>
            <div className="col-xl-12 mt-30">
                <article
                    className="ta-blog-box ta-blog-box__featured ta-blog-box__style-4 ta-stroke "
                    style={{ cursor: 'pointer' }}
                    onClick={handleCardClick}
                >
                    <div className="row">
                        <div className="col-xl-5">
                            <div className="thumb ta-stroke" style={{ minHeight: '200px', height: '100%', position: 'relative' }}>
                                <div className="ta-post-gallery ta-radious-40 ta-stroke" style={{ width: '100%', height: '100%' }}>
                                    <Link href={`/blog/${item.id}`} style={{ display: 'block', width: '100%', height: '100%' }}>
                                        <img src={imageSrc} alt="blog" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </Link>
                                </div>
                                <div className="ta-blog-box__cats ta-blog-box__cats--right">
                                    <Link href={`/blog-filter-category?category=${item.categorySlug || categoryName}`}>{categoryName}</Link>
                                </div>

                                {formatIcon &&
                                    <span className="post-format-icon">
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
                        </div>
                        <div className="col-xl-7">
                            <div className="content position-relative">
                                <ul className="ta-blog-box__meta-info meta-infos d-flex align-items-center list-unstyled flex-wrap" style={{ gap: '10px' }}>
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
                                    {settings?.show_post_views !== 'false' && <li><i className="fa fa-eye" /> {views} Views</li>}
                                </ul>
                                <h2 className="ta-blog-box__title ta-blog-box__title--mid-24 ta-border-effect mt-10">
                                    <Link href={`/blog/${item.id}`}>{item.title}</Link>
                                </h2>
                                <div className="excerpt excerpt__small mt-15">
                                    <p>{item.excerpt || "Explore modern insights and developments in digital publishing and technology."}</p>
                                </div>
                                <div className="bottom-wrapper pt-20 d-flex justify-content-between align-items-center mt-60">
                                    <Link href={`/blog/${item.id}`} className="ta-inline-btn">Read More <i className="fa fa-long-arrow-right" /></Link>
                                    <div className="ta-blog-box__share-info share-info d-flex justify-content-center align-items-center">
                                        <ul className="d-flex justify-content-center align-items-center list-unstyled">
                                            {settings?.show_post_comments !== 'false' && <li><i className="fa fa-comment" /> {comments}</li>}
                                            {settings?.show_post_views !== 'false' && <li><i className="fa fa-eye" /> {views}</li>}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </>
    )
}
