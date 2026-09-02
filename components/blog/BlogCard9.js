import Link from "next/link"

export default function BlogCard9({ item }) {
    return (
        <>

            <article className="ta-blog-box ta-thumb-zoom mt-95 text-center">
                <span className="ta-dot-border"><img src="/assets/img/shape/footer-widget-shape.webp" alt="" /></span>
                <div className="content text-center mt-85">
                    <h2 className="ta-blog-box__title ta-border-effect mt-10"><Link href="/blog-details">{item.title}</Link></h2>
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
