import Link from "next/link"

export default function BlogCard5({ item = {} }) {
    const comments = item.commentsCount ?? item._count?.comments ?? (item.comments ? item.comments.length : 0)
    const views = item.views ?? 0
    const categoryName = typeof item.category === 'string' ? item.category : (item.category?.name || 'Technology')
    const authorName = typeof item.author === 'string' ? item.author : (item.author?.name || 'Alexis D.')
    const formattedDate = item.createdAt
        ? new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
        : `March 21, ${new Date().getFullYear()}`

    return (
        <>
            <article className="ta-blog-box mt-60">
                <div className="thumb ta-stroke ">
                    <img src={item.img ? (item.img.startsWith('http') || item.img.startsWith('/') ? item.img : `/assets/img/blog/${item.img}`) : "/assets/img/blog/blog-1.webp"} alt="blog" />
                    <div className="ta-blog-box__cats">
                        <Link href={`/blog-filter-category?category=${item.categorySlug || categoryName}`}>{categoryName}</Link>
                    </div>
                </div>
                <div className="content mt-35 text-center pl-50 pr-50">
                    <ul className="ta-blog-box__meta-info d-flex justify-content-center align-items-center list-unstyled flex-wrap" style={{ gap: '12px' }}>
                        <li>
                            <Link
                                href={item.authorId ? `/author?id=${item.authorId}` : `/author?name=${encodeURIComponent(authorName)}`}
                                className="author-wrapper d-flex justify-content-center align-items-center"
                            >
                                <span className="author-thumb">
                                    <img src={item.authorAvatar || "/assets/img/author/author-1.webp"} alt="author" style={{ width: '28px', height: '28px', borderRadius: '50%' }} />
                                </span>
                                <span className="author-name">{authorName}</span>
                            </Link>
                        </li>
                        <li>{formattedDate}</li>
                        <li><i className="fa fa-eye" /> {views} Views</li>
                    </ul>
                    <h2 className="ta-blog-box__title ta-border-effect mt-10"><Link href={`/blog/${item.id}`}>{item.title}</Link></h2>
                    <div className="excerpt mt-15">
                        <p>{item.excerpt || "Explore modern insights and developments in digital publishing and technology."}</p>
                    </div>
                    <div className="ta-blog-box__share-info d-flex justify-content-center align-items-center mt-35">
                        <ul className="d-flex justify-content-center align-items-center list-unstyled ta-stroke">
                            <li><i className="fa fa-comment" /> {comments}</li>
                            <li><i className="fa fa-eye" /> {views}</li>
                        </ul>
                    </div>
                </div>
            </article>
        </>
    )
}
