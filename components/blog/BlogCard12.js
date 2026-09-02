import Link from "next/link"
import { getImageUrl } from "@/lib/imageUtils"

export default function BlogCard12({ item }) {
    return (
        <>
            <div className="item mt-30">
                <div className="thumb ta-stroke">
                    <img src={getImageUrl(item.img, "blog-1.webp")} alt="blog" />
                </div>
                <div className="content">
                    <span className="date">Mar 21, {new Date().getFullYear()}</span>
                    <h6 className="title ta-border-effect"><Link href="/blog-details">{item.title}</Link></h6>
                </div>
            </div>
        </>
    )
}
