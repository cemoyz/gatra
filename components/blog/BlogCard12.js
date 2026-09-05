import Link from "next/link"
import { useRouter } from "next/router"
import { getImageUrl } from "@/lib/imageUtils"

export default function BlogCard12({ item = {} }) {
    const router = useRouter()

    const handleCardClick = (e) => {
        const selection = window.getSelection()
        if (selection && selection.toString().length > 0) return
        if (e.target.closest('a, button')) {
            return
        }
        if (item?.id) {
            router.push(`/blog/${item.id}`)
        }
    }

    return (
        <>
            <div className="item mt-30" style={{ cursor: 'pointer' }} onClick={handleCardClick}>
                <div className="thumb ta-stroke">
                    <Link href={`/blog/${item.id || ''}`} style={{ display: 'block', width: '100%', height: '100%' }}>
                        <img src={getImageUrl(item.img, "blog-1.webp")} alt="blog" />
                    </Link>
                </div>
                <div className="content">
                    <span className="date">Mar 21, {new Date().getFullYear()}</span>
                    <h6 className="title ta-border-effect"><Link href={`/blog/${item.id || ''}`}>{item.title}</Link></h6>
                </div>
            </div>
        </>
    )
}
