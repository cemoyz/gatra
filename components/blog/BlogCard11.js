import Link from "next/link"

export default function BlogCard11({ item = {} }) {
    const authorName = typeof item.author === 'string' ? item.author : (item.author?.name || 'Alexis D.')
    const formattedDate = item.createdAt
        ? new Date(item.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
        : `March 21, ${new Date().getFullYear()}`

    return (
        <>
            <article className="ta-blog-box ta-thumb-zoom ta-blog-box__style-2 ta-blog-box__style-6 mb-30">
                <div className="content ta-stroke ">
                    <ul className="ta-blog-box__meta-info meta-infos d-flex align-items-center list-unstyled p-0 ta-bg-none">
                        <li>
                            <Link href={item.authorId ? `/author?id=${item.authorId}` : `/author?name=${encodeURIComponent(authorName)}`} className="author-wrapper d-flex justify-content-center align-items-center">
                                <span className="by">By</span>
                                <span className="author-name">{authorName}</span>
                            </Link>
                        </li>
                        <li><Link href={`/blog/${item.id || ''}`}>{formattedDate}</Link></li>
                    </ul>
                    <h3 className="ta-blog-box__title ta-blog-box__title--small ta-border-effect mt-10 ta-line-2">
                        <Link href={`/blog/${item.id || ''}`}>{item.title || "The Anatomy Of Themed Design System Components"}</Link>
                    </h3>
                </div>
            </article>
        </>
    )
}
