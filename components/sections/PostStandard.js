import { getImageUrl } from "@/lib/imageUtils"

export default function PostStandard({ img, category = "Berita" }) {
    const src = getImageUrl(img, "blog-details--big-1.webp")
    const categoryName = typeof category === 'string' ? category : (category?.name || 'Berita')

    return (
        <>
            <div className="thumb ta-brd-b-none" style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', marginBottom: '30px' }}>
                <img
                    src={src}
                    alt="Article Banner"
                    onError={(e) => {
                        e.currentTarget.src = '/assets/img/blog/blog-details--big-1.webp'
                    }}
                    style={{ width: '100%', maxHeight: '520px', objectFit: 'cover', display: 'block' }}
                />
                <div className="ta-blog-box__cats ta-blog-box__cats--right" style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 2 }}>
                    <span style={{
                        background: '#da0105',
                        color: '#ffffff',
                        padding: '6px 14px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                    }}>
                        {categoryName}
                    </span>
                </div>
            </div>
        </>
    )
}
