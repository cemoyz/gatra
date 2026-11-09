import Link from "next/link"
import { getImageUrl } from "@/lib/imageUtils"

export default function KompasFokusSection({ posts = [] }) {
  const highlightPosts = posts.slice(4, 8)
  if (highlightPosts.length === 0) return null

  return (
    <section className="kompas-fokus-section">
      <div className="container">
        {/* Section Header */}
        <div className="kompas-section-bar">
          <div className="bar-left">
            <span className="bar-tag">FOKUS</span>
            <h3 className="bar-title">Topik Khusus & Liputan Mendalam</h3>
          </div>
          <Link href="/blog" className="bar-more-link">
            Lihat Indeks <i className="fas fa-chevron-right ms-1"></i>
          </Link>
        </div>

        {/* 4 Thematic Cards */}
        <div className="row g-3">
          {highlightPosts.map((post) => (
            <div key={post.id} className="col-lg-3 col-sm-6">
              <div className="kompas-fokus-card">
                <Link href={`/blog/${post.slug || post.id}`} className="fokus-img-box">
                  <img
                    src={getImageUrl(post.img)}
                    alt={post.title}
                    className="fokus-img"
                    onError={(e) => {
                      e.currentTarget.src = "/assets/img/blog/blog-2-3.webp"
                    }}
                  />
                  {post.category && (
                    <span className="fokus-cat-badge">{post.category.name}</span>
                  )}
                </Link>
                <div className="fokus-body">
                  <h4 className="fokus-title">
                    <Link href={`/blog/${post.slug || post.id}`}>
                      {post.title}
                    </Link>
                  </h4>
                  {post.excerpt && (
                    <p className="fokus-desc">
                      {post.excerpt}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .kompas-fokus-section {
          padding: 24px 0;
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
          border-bottom: 1px solid #e2e8f0;
        }

        .kompas-section-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 2px solid #e2e8f0;
          padding-bottom: 10px;
          margin-bottom: 18px;
        }
        .bar-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .bar-tag {
          background: #0077d7;
          color: #ffffff;
          font-size: 11px;
          font-weight: 800;
          padding: 3px 8px;
          border-radius: 4px;
          letter-spacing: 0.5px;
        }
        .bar-title {
          font-size: 17px;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
        }
        .bar-more-link {
          font-size: 12.5px;
          font-weight: 600;
          color: #0077d7;
          text-decoration: none;
          transition: color 0.15s ease;
        }
        .bar-more-link:hover {
          color: #0284c7;
        }

        .kompas-fokus-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          overflow: hidden;
          height: 100%;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .kompas-fokus-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px -4px rgba(0, 0, 0, 0.08);
        }
        .fokus-img-box {
          position: relative;
          display: block;
          width: 100%;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          background: #f1f5f9;
        }
        .fokus-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        .fokus-img-box:hover .fokus-img {
          transform: scale(1.05);
        }
        .fokus-cat-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background: rgba(0, 64, 133, 0.9);
          color: #ffffff;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          padding: 2px 7px;
          border-radius: 3px;
        }
        .fokus-body {
          padding: 12px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .fokus-title {
          font-size: 14px;
          font-weight: 700;
          line-height: 1.35;
          color: #1e293b;
          margin-bottom: 6px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .fokus-title a {
          color: inherit;
          text-decoration: none;
          transition: color 0.15s ease;
        }
        .fokus-title a:hover {
          color: #0077d7;
        }
        .fokus-desc {
          font-size: 12px;
          color: #64748b;
          line-height: 1.5;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  )
}

