import Link from "next/link"
import { useRouter } from "next/router"
import { getImageUrl } from "@/lib/imageUtils"

export default function BlogCard7({ item = {} }) {
    const router = useRouter()
    const categoryName = typeof item.category === 'string' ? item.category : (item.category?.name || 'PHOTO')
    const authorName = typeof item.author === 'string' ? item.author : (item.author?.name || 'Alexis D.')
    const formattedDate = item.createdAt
        ? new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
        : `March 21, ${new Date().getFullYear()}`
    const imageSrc = getImageUrl(item.img, "blog-3-3.webp")

    const handleCardClick = (e) => {
        const selection = window.getSelection()
        if (selection && selection.toString().length > 0) return
        if (e.target.closest('a, button, input, textarea, select, .ta-blog-box__cats, .author-wrapper')) {
            return
        }
        if (item?.id) {
            router.push(`/blog/${item.id}`)
        }
    }

    return (
        <>
            <article className="ta-blog-box ta-blog-box__style-3" style={{ cursor: 'pointer' }} onClick={handleCardClick}>
                <div className="thumb ta-stroke">
                    <Link href={`/blog/${item.id || 1}`} style={{ display: 'block', width: '100%', height: '100%' }}>
                        <img src={imageSrc} alt="blog" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </Link>
                    <div className="inner-content text-center pb-75 pl-60 pr-60">
                        <div className="ta-blog-box__cats position-static">
                            <Link href={`/blog-filter-category?category=${item.categorySlug || categoryName}`}>{categoryName}</Link>
                        </div>
                        <h3 className="ta-blog-box__title ta-blog-box__title--small ta-border-effect mt-20 ta-line-2">
                            <Link href={`/blog/${item.id || 1}`}>{item.title || `Calendars For Web Designer Developer (${new Date().getFullYear()} Edition)`}</Link>
                        </h3>
                    </div>
                </div>
                <div className="content mt-none-40 d-flex justify-content-center align-items-center flex-column">
                    <div className="author-thumb">
                        <img src={item.authorAvatar || "/assets/img/author/author-5.webp"} alt={authorName} style={{ width: '45px', height: '45px', borderRadius: '50%' }} />
                    </div>
                    <ul className="ta-blog-box__meta-info meta-infos pt-30 d-flex justify-content-center align-items-center list-unstyled">
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
                    </ul>
                </div>
            </article>
        </>
    )
}
