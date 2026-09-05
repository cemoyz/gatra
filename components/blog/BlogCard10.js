import Link from "next/link"
import { useRouter } from "next/router"
import { getImageUrl } from "@/lib/imageUtils"

export default function BlogCard10({ item = {} }) {
    const router = useRouter()

    const handleCardClick = (e) => {
        const selection = window.getSelection()
        if (selection && selection.toString().length > 0) return
        if (e.target.closest('a, button, input, textarea, select, .ta-blog-box__cats, .author-wrapper, .ta-blog-box__share-info')) {
            return
        }
        if (item?.id) {
            router.push(`/blog/${item.id}`)
        }
    }

    return (
        <>
            <article className="ta-blog-box mt-60 ta-sticky-post" style={{ cursor: 'pointer' }} onClick={handleCardClick}>
                <div className="thumb ta-stroke ">
                    <Link href={`/blog/${item.id || ''}`} style={{ display: 'block', width: '100%', height: '100%' }}>
                        <img src={getImageUrl(item.img, "blog-1.webp")} alt="blog" />
                    </Link>
                    <div className="ta-blog-box__cats">
                        <Link href="#0">Technology</Link>
                    </div>
                </div>
                <div className="content mt-35 text-center pl-100 pr-100">
                    <ul className="ta-blog-box__meta-info d-flex justify-content-center align-items-center list-unstyled">
                        <li>
                            <Link href="#0" className="author-wrapper d-flex justify-content-center align-items-center">
                                <span className="author-thumb">
                                    <img src="/assets/img/author/author-1.webp" alt="author" />
                                </span>
                                <span className="author-name">Pratik Joglekar</span>
                            </Link>
                        </li>
                        <li><Link href="#0">jan 19, {new Date().getFullYear()}</Link></li>
                        <li><Link href="#0"><i className="fa fa-clock" /> 18 Min Read</Link></li>
                    </ul>
                    <h2 className="ta-blog-box__title ta-border-effect mt-10"><Link href={`/blog/${item.id}`}>{item.title}</Link></h2>
                    <div className="excerpt mt-15">
                        <p>Let’s talk about Next.js, one of the most well-known React frameworks used for production.
                            From new components to font optimization</p>
                    </div>
                    <div className="ta-blog-box__share-info d-flex justify-content-center align-items-center mt-35">
                        <ul className="d-flex justify-content-center align-items-center list-unstyled ta-stroke">
                            <li><i className="fa fa-comment" /> 82</li>
                            <li><i className="fa fa-eye" /> 12000</li>
                            <li><i className="fa fa-heart" /> 258</li>
                            <li className="like-btn"><Link href="#0"><i className="fa fa-heart" /></Link></li>
                        </ul>
                        <Link href="#0" className="ta-share-btn ta-stroke"><i className="fa fa-share" /> Share</Link>
                    </div>
                </div>
            </article>




        </>
    )
}
