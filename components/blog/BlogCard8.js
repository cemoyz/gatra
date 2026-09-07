import Link from "next/link"
import { useRouter } from "next/router"
import { getImageUrl } from "@/lib/imageUtils"

export default function BlogCard8({ col, item = {} }) {
    const router = useRouter()
    const categoryName = typeof item.category === 'string' ? item.category : (item.category?.name || 'General')
    const authorName = typeof item.author === 'string' ? item.author : (item.author?.name || 'Alexis Dowson')
    const formattedDate = item.createdAt
        ? new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
        : `March 21, ${new Date().getFullYear()}`
    const imageSrc = getImageUrl(item.img, "blog-1.webp")

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
            <div className={`${col ? col : ""}`}>
                <article className="ta-blog-box ta-blog-box__style-3 ta-stroke" style={{ cursor: 'pointer' }} onClick={handleCardClick}>
                    <div className="thumb">
                        <Link href={`/blog/${item.id}`} style={{ display: 'block', width: '100%', height: '100%' }}>
                            <img src={imageSrc} alt="blog" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </Link>
                        <div className="ta-blog-box__cats ta-blog-box__cats--right">
                            <Link href={`/blog-filter-category?category=${item.categorySlug || categoryName}`}>{categoryName}</Link>
                        </div>
                    </div>
                    <div className="inner-content text-center pb-55 pl-60 pr-60">
                        <div className="content">
                            <ul className="ta-blog-box__meta-info ta-blog-box__meta-info--white meta-infos d-flex justify-content-center align-items-center list-unstyled flex-wrap" style={{ gap: '10px' }}>
                                <li>
                                    <Link
                                        href={item.authorId ? `/author?id=${item.authorId}` : `/author?name=${encodeURIComponent(authorName)}`}
                                        className="author-wrapper d-flex justify-content-center align-items-center"
                                    >
                                        <span className="author-thumb">
                                            <img src={item.authorAvatar || "/assets/img/author/author-1.webp"} alt={authorName} style={{ width: '28px', height: '28px', borderRadius: '50%' }} />
                                        </span>
                                        <span className="author-name">{authorName}</span>
                                    </Link>
                                </li>
                                <li>{formattedDate}</li>
                                <li><i className="fa fa-eye" /> {item.views || 0} Views</li>
                            </ul>
                            <h3 className="ta-blog-box__title ta-blog-box__title--white ta-border-effect mt-10">
                                <Link href={`/blog/${item.id}`}>{item.title}</Link>
                            </h3>
                        </div>
                    </div>
                </article>
            </div>
        </>
    )
}
